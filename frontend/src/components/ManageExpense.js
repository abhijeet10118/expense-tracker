import React, {useState,useEffect} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useNavigate,Link} from 'react-router-dom';
const ManageExpense = () => {
    const userId = localStorage.getItem("UserId");
    const [user_data,setUserData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
            if (!userId) {
                navigate('/login');
            }
            fetchExpense(userId);
        }, [userId, navigate]);
        const fetchExpense = async(userId)=>{
            try{
                const data = await fetch(`http://127.0.0.1:8000/api/manage_expense/${userId}/`);
                const data_response=await(data.json())
                setUserData(data_response)
            }
            catch(error){
                console.log(error);
            }
            
        };


         const handleUpdate = async () => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/update_expense/${editExpense.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editExpense)
      }
    );

    if (response.status === 200) {
      toast.success('Expense updated successfully');
      setEditExpense(null);
      fetchExpense(userId);
    }
    else{
        toast.error('Failed to update expense');
    }

  } catch (error) {
    console.log(error);
    
  }
};

const handleDelete = async (expenseid) => {
  if (window.confirm("Are you sure you want to delete this expense?")) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/delete_expense/${expenseid}/`,
        {
          method: 'DELETE',
        }
      );

      if (response.status === 200) {
        toast.success('Expense deleted successfully');
        fetchExpense(userId);
      } else {
        toast.error('Failed to delete expense');
      }
    } catch (error) {
      console.log(error);
    }
  }
};

        console.log(user_data);
        const [editExpense,setEditExpense] = useState(null);
            
        const handleEdit = (expense) =>{
    setEditExpense({ ...expense });  // ✅ clone object
};
        const handleChange = (e) => {
  const { name, value } = e.target;

  setEditExpense(prev => ({
    ...prev,
    [name]: value
  }));
};
        
  return (
    <div>
      <div className='text-center mb-4'>
            <h1><i className='fa fa-wallet mt-5'></i>Manage Your Expense</h1>
            <p className='text-muted'>You can Manage your Expenses Here</p>
          </div>
          <div className='ms-5 me-5'>
            <table className='table table-striped table-bordered '>
                <thead className='table-dark text-center'>
                    <tr>
                    <th>id</th>
                    <th>Date</th>
                    <th>Item</th>
                    <th>Cost</th>
                    <th>Action</th>
                    </tr>
                 </thead>
                 
                 <tbody className='text-center'>
                    {user_data.length>0?(
                        user_data.map((exp, index)=>(
                                <tr key={exp.id||index}>
                        <td>{index+1}</td>
                        <td>{exp.ExpenseDtae}</td>
                        <td>{exp.ExpenseItem}</td>
                        <td>{exp.ExpenseCost}</td>
                        <td>
                            <button className='btn btn-sm btn-info ' onClick={()=>handleEdit(exp)}><i className='fas fa-edit' ></i></button>
                            <button className='btn btn-sm btn-danger ms-1' onClick={()=>handleDelete(exp.id)}><i className='fas fa-trash-alt'></i></button>
                        </td>
                        
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
            </table>
          </div>
          {editExpense && (
             <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header bg-primary text-white">
        <h5 className="modal-title"><i className='fas fa-pen me-2'></i>Edit Expense</h5>
        <button type="button" className="btn-close" onClick={()=>setEditExpense(null)} ></button>
      </div>
      <div className="modal-body">
        <div className='mb-3'>
             <div className='mb-3'>
          <label className='form-label'>Date</label>
          <div className='input-group'>
            <span className='input-group-text'>
              <i className='fa fa-calendar'></i>
            </span>
            <input 
  name='ExpenseDtae'
  type='date'
  value={editExpense?.ExpenseDtae?.slice(0,10) || ''}
  onChange={handleChange}
  className='form-control'
/>
          </div>
          
          
        </div>
        <div className='mb-3'>
          <label className='form-label' >Expense Item</label>
          <div className='input-group'>
            <span className='input-group-text'>
              <i className='fa-solid fa-cart-shopping'></i>
            </span>
           <input  
  name='ExpenseItem'
  value={editExpense?.ExpenseItem || ''}
  onChange={handleChange}
  className='form-control'
/>
          </div>
          
          
        </div>
        <div className='mb-3'>
          <label className='form-label'>Expense Cost ₹</label>
          <div className='input-group'>
            <span className='input-group-text'>
              <i className='fas fa-rupee-sign'></i>
            </span>
           <input 
  type="number"
  name='ExpenseCost'
  value={editExpense?.ExpenseCost || ''}
  onChange={handleChange}
  className='form-control'
/>
          </div>
          
          
        </div> 
              
              
            
              
              
            </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={()=>setEditExpense(null)}>Close</button>
        <button type="button" className="btn btn-primary" onClick={()=>handleUpdate()}>Save changes</button>
      </div>
    </div>
  </div>
</div>
          )}
         
          <ToastContainer/>
    </div>
  )
}

export default ManageExpense;
