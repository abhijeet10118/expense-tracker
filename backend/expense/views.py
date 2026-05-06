from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import*
#signup api
@csrf_exempt
def signup(request):
    if request.method=='POST':
        data=json.loads(request.body)
        fullname=data.get('FullName')
        email=data.get('Email')
        password=data.get('Password')
        
        if UserDetail.objects.filter(Email=email).exists():
            return JsonResponse({'message':'Email already exits'},status=400)
        UserDetail.objects.create(FullName=fullname,Email=email,Password=password)
        return JsonResponse({'message':'User registered successfully'},status=201)


#log in api
@csrf_exempt
def login(request):
    if request.method=='POST':
        data=json.loads(request.body)
        email=data.get('Email')
        password=data.get('Password')
        
        try:
            User = UserDetail.objects.get(Email=email,Password=password)
            return JsonResponse({'message':'Login Successful','UserId':User.id,'UserName':User.FullName},status=200)
        except:
        
            return JsonResponse({'message':'Invalid Crediantials'},status=400)

#add_expense
@csrf_exempt
def add_expense(request):
    if request.method=='POST':
        data=json.loads(request.body)
        expenseItem=data.get('ExpenseItem')
        expenseDtae=data.get('ExpenseDtae')
        expenseCost=data.get('ExpenseCost')
        user_id = data.get('UserId')
        try:
            user = UserDetail.objects.get(id=user_id)

            Expense.objects.create(
                UserId=user,
                ExpenseItem=expenseItem,
                ExpenseDtae=expenseDtae,
                ExpenseCost=expenseCost
            )

            return JsonResponse({'message': 'Expense added'}, status=201)

        except UserDetail.DoesNotExist:
            return JsonResponse({'message': 'User not found'}, status=400)

@csrf_exempt
def manage_expense(request,user_id):
    if request.method == 'GET':
        Expense_details=Expense.objects.filter(UserId=user_id)
        expense_list=list(Expense_details.values())

        return JsonResponse(expense_list,safe=False)

@csrf_exempt
def update_expense(request,expense_id):
    if request.method == 'PUT':
        data=json.loads(request.body)
        try:
            expense=Expense.objects.get(id=expense_id)
            expense.ExpenseDtae = data.get('ExpenseDtae',expense.ExpenseDtae)
            expense.ExpenseItem = data.get('ExpenseItem',expense.ExpenseItem)
            expense.ExpenseCost = data.get('ExpenseCost',expense.ExpenseCost)
            expense.save()
            return JsonResponse({'message':'Expense Updates Successfully'})
        except:
            return JsonResponse({'message':'Expense not found'},status=400)
        
        
@csrf_exempt
def delete_expense(request, expense_id):
    if request.method == 'DELETE':
        try:
            expense = Expense.objects.get(id=expense_id)
            expense.delete()
            return JsonResponse({'message': 'Expense deleted successfully'}, status=200)
        
        except Expense.DoesNotExist:
            return JsonResponse({'message': 'Expense not found'}, status=404)
        
from django.db.models import Sum        
@csrf_exempt
def search_expense(request,user_id):
    if request.method == 'GET':
        from_date = request.GET.get('from')
        to_date = request.GET.get('to')
        expense=Expense.objects.filter(UserId=user_id,ExpenseDtae__range=[from_date,to_date])
        expense_list=list(expense.values())
        agg=expense.aggregate(Sum('ExpenseCost'))
        total=agg['ExpenseCost__sum'] or 0
        return JsonResponse({'expenses':expense_list,'total':total})
    
@csrf_exempt
def change_password(request,user_id):
    if request.method=='POST':
        data=json.loads(request.body)
        old_password=data.get('OldPassword')
        new_password=data.get('NewPassword')
        try:
            user = UserDetail.objects.get(id=user_id)
            if(old_password!=user.Password):
                return JsonResponse({'message': 'Old password dose not match'}, status=400)
            
            user.Password=new_password
            user.save()
            return JsonResponse({'message': 'Password Updated'}, status=200)

           

        except UserDetail.DoesNotExist:
            return JsonResponse({'message': 'User not found'}, status=404)
