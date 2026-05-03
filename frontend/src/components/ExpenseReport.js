import React from 'react'
import  {useState,useEffect} from 'react'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useNavigate,Link} from 'react-router-dom';

const ExpenseReport = () => {
        const navigate = useNavigate();
            const userId = localStorage.getItem('UserId');
            useEffect(()=>{
                if(!userId){
                    navigate('/login');
                }
            },[])
            
            const [fromDate,setFormDate] = useState('');
            const [toDate,setToDate] = useState('');
            const [expenses,setExpense]=useState([]);
            const [grandTotal,setGrandTotal]=useState(0);
        
            
        
            const handleSubmit = async(e)=>{
              e.preventDefault();
              try{
                const response = await fetch(`http://127.0.0.1:8000/api/search_expense/${userId}/?from=${fromDate}&to=${toDate}`);
                const data = await response.json();
                setExpense(data.expenses);
                setGrandTotal(data.total);
                
              }
              catch(error){
                console.error('Error fetching expenses:',error);
                toast.error('Something went Wrong . Try Again .')
              }};
  return (
   <div>
         <div className='container mt-5'>
         {/* <div className="text-end">
     <Link to="/login" style={{color:'black'}}>Login</Link>
   </div> */}
         <div className='text-center mb-4'>
           <h1><i className='fa-solid fa-file-invoice me-2'></i>Datewise Expense Report</h1>
           <p className='text-mutated'>Lets see your Expenses</p>
         </div>
         <form className='row g-3'  onSubmit={handleSubmit}>
           <div className='col-md-4'>
             <div className='input-group'>
               <span className='input-group-text'>
                 <i className='fa fa-calendar'></i>
               </span>
               <input name='fromdate' type='date' className='form-control' required  value={fromDate}onChange={(e)=>setFormDate(e.target.value)}/>
             </div>
           </div>
           <div className='col-md-4'>
             <div className='input-group'>
               <span className='input-group-text'>
                 <i className='fa fa-calendar'></i>
               </span>
               <input name='todate' type='date' className='form-control' required  value={toDate}onChange={(e)=>setToDate(e.target.value)}/>
             </div>
           </div>
           <div className='col-md-4'>
             <button type="submit" className='btn btn-primary w-100 '><i className='fas fa-search me-4'></i>Search</button>
           </div>
           
         </form>
         <div className='mt-2'>
         <table className='table table-striped table-bordered '>
                <thead className='table-dark text-center'>
                    <tr>
                    <th>id</th>
                    <th>Date</th>
                    <th>Item</th>
                    <th>Cost</th>
                    
                    </tr>
                 </thead>
                 
                 <tbody className='text-center'>
                    {expenses.length>0?(
                        expenses.map((exp, index)=>(
                                <tr key={exp.id||index}>
                        <td>{index+1}</td>
                        <td>{exp.ExpenseDtae}</td>
                        <td>{exp.ExpenseItem}</td>
                        <td>{exp.ExpenseCost}</td>
                       
                        
                    </tr>
                        ))
                                    
                        
                    ):(
                        <>
                         <tr >
                        <td colSpan="5" className="text-center text-muted">no expense found</td>
                        
                    </tr>
                        </>
                    )}
                    
                   
               </tbody>
               <tfoot>
                    <tr>
                        <td colspan="3" className='text-end fw-bold'>Grand Total</td>
                        <td className='fw-bold text-success'>₹{grandTotal}</td>
                    </tr>
               </tfoot>
            </table>
            </div>
         <ToastContainer/>
       </div>
       </div>
  )
}

export default ExpenseReport;
