import React from 'react'
import  {useState,useEffect} from 'react'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useNavigate,Link} from 'react-router-dom';

const AddExpense = () => {
    const navigate = useNavigate();
        const userId = localStorage.getItem('UserId');
        useEffect(()=>{
            if(!userId){
                navigate('/login');
            }
        },[])
        
        const [formData,setFormData] = useState({
          
          ExpenseItem:'',
          ExpenseDtae:'',
          ExpenseCost:'',
        });
    
        const handleChange = (e) => {
          setFormData({...formData,[e.target.name]:e.target.value})
        };
    
        const handleSubmit = async(e)=>{
          e.preventDefault();
          try{
            const response = await fetch("http://127.0.0.1:8000/api/add_expense/",{
              method :'POST',
              headers:{'Content-Type':'application/json'},
              body: JSON.stringify({
  ...formData,
  UserId: userId
}),
              
            });
            if(response.status===201){
              toast.success("Expense added");
              setTimeout(()=>{
                navigate('/dashboard');
              },2000)
            }
            else{
              const data = await response.json();
              toast.error(data.message);
            }
          }
          catch(error){
            console.error('Error:',error);
            toast.error('Something went Wrong . Try Again .')
          }
        };
    
  return (
    <div>
      <div className='container mt-5'>
      {/* <div className="text-end">
  <Link to="/login" style={{color:'black'}}>Login</Link>
</div> */}
      <div className='text-center mb-4'>
        <h1><i className='fa-solid fa-plus-circle me-2'></i>AddExpense</h1>
        <p className='text-mutated'>Track your spending</p>
      </div>
      <form className='p-4 border rounded shadow mx-auto' style={{maxWidth:'400px'}} onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Date</label>
          <div className='input-group'>
            <span className='input-group-text'>
              <i className='fa fa-calendar'></i>
            </span>
            <input name='ExpenseDtae' type='date' className='form-control' required  value={formData.ExpenseDtae}onChange={handleChange}/>
          </div>
          
          
        </div>
        <div className='mb-3'>
          <label className='form-label'>Expense Item</label>
          <div className='input-group'>
            <span className='input-group-text'>
              <i className='fa-solid fa-cart-shopping'></i>
            </span>
            <input onChange={handleChange} name='ExpenseItem' className='form-control' value={formData.ExpenseItem}required placeholder='Enter your Purchase' />
          </div>
          
          
        </div>
        <div className='mb-3'>
          <label className='form-label'>Expense Cost ₹</label>
          <div className='input-group'>
            <span className='input-group-text'>
              <i className='fas fa-rupee-sign'></i>
            </span>
            <input type="number"name='ExpenseCost' onChange={handleChange} className='form-control' value={formData.ExpenseCost} required placeholder='Cost' />
          </div>
          
          
        </div>
        <button type="submit" className='btn btn-primary w-100 mt-3'><i className='fa-solid fa-plus me-2'></i>Add Expense</button>
      </form>
      <ToastContainer/>
    </div>
    </div>
  )
}

export default AddExpense;
