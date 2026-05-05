
import React, {useState,useEffect} from 'react'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useNavigate,Link} from 'react-router-dom';
const ChangePassword = () => {
     const navigate = useNavigate();
    const userId = localStorage.getItem("UserId");
    
        useEffect(() => {
            if (!userId) {
                navigate('/login');
            }
        }, [userId, navigate]);  
   
    const [formData,setFormData] = useState({
      OldPassword:'',
      NewPassword:'',
      ConfirmPassword:'',
    });

    const handleChange = (e) => {
      setFormData({...formData,[e.target.name]:e.target.value})
    };

    const handleSubmit = async(e)=>{
      e.preventDefault();
      if(formData.NewPassword!==formData.ConfirmPassword){
        toast.error("New Passwords does Not Match");
        return;
      }
      try{
        const response = await fetch(`http://127.0.0.1:8000/api/manage_expense/${userId}/`,{
          method :'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            OldPassword:formData.OldPassword,
            NewPassword:formData.NewPassword,
          }),
        });
        const data=await response.json();
        if(response.status===200){
            
          toast.success(data.message);
          setFormData({OldPassword:'',NewPassword:'',ConfirmPassword:'',})
        }
        else{
          
          toast.error(data.message);
        }
      }
      catch(error){
        console.error('Error:',error);
        toast.error('Something went Wrong . Try Again .')
      }
    };
  return (
    <div className='container mt-5'>
      {/* <div className="text-end">
  <Link to="/login" style={{color:'black'}}>Login</Link>
</div> */}
      <div className='text-center mb-4'>
        <h1><i className='fa-solid fa-key me-2'></i>Change Password</h1>
        <p className='text-mutated'>Make your Account Secure</p>
      </div>
      <form className='p-4 border rounded shadow mx-auto' style={{maxWidth:'400px'}} onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Old Password</label>
          <div className='input-group'>
            <span className='input-group-text'>
              <i className='fas fa-lock'></i>
            </span>
            <input name='OldPassword'type='password' className='form-control' required placeholder='Enter your Old Password' value={formData.OldPassword}onChange={handleChange}/>
          </div>
          
          
        </div>
        <div className='mb-3'>
          <label className='form-label'>New Password</label>
          <div className='input-group'>
            <span className='input-group-text'>
              <i className='fas fa-lock-open'></i>
            </span>
            <input onChange={handleChange} name='NewPassword'type='password' className='form-control' value={formData.NewPassword}required placeholder='Enter your New Password' />
          </div>
          
          
        </div>
        <div className='mb-3'>
          <label className='form-label'>Confirm Password</label>
          <div className='input-group'>
            <span className='input-group-text'>
              <i className='fa fa-key'></i>
            </span>
            <input name='ConfirmPassword'type='password' onChange={handleChange} className='form-control' value={formData.ConfirmPassword} required placeholder='Confirm Password' />
          </div>
          
          
        </div>
        <button type="submit" className='btn btn-primary w-100 mt-3'><i className='fa-solid fa-key me-2'></i>Change Password</button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default ChangePassword
