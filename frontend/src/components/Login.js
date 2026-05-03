import React, {useState} from 'react'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useNavigate,Link} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
        const [formData,setFormData] = useState({
          Email:'',
          Password:'',
        });
    
        const handleChange = (e) => {
          setFormData({...formData,[e.target.name]:e.target.value})
        };
    
        const handleSubmit = async(e)=>{
          e.preventDefault();
          try{
            const response = await fetch("http://127.0.0.1:8000/api/login/",{
              method :'POST',
              headers:{'Content-Type':'application/json'},
              body: JSON.stringify(formData),
            });
            const data = await response.json();
            if(response.status===200){
              toast.success("Login Successful ");
              localStorage.setItem('UserId',data.UserId);
              localStorage.setItem('UserName',data.UserName);
              setTimeout(()=>{
                navigate('/dashboard');
              },2000)
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
  <Link to="/Signup" style={{color:'black'}}>Sign Up</Link>
</div> */}
          <div className='text-center mb-4'>
            <h1><i className='fa fa-user'></i>Login page</h1>
            <p className='text-mutated'>Login to your account to start tracking expences</p>
          </div>
          <form className='p-4 border rounded shadow mx-auto' style={{maxWidth:'400px'}} onSubmit={handleSubmit}>
            
            <div className='mb-3'>
              <label className='form-label'>Email</label>
              <div className='input-group'>
                <span className='input-group-text'>
                  <i className='fas fa-envelope'></i>
                </span>
                <input onChange={handleChange} name='Email'type='email' className='form-control' value={formData.Email}required placeholder='Enter you Email' />
              </div>
              
              
            </div>
            <div className='mb-3'>
              <label className='form-label'>Password</label>
              <div className='input-group'>
                <span className='input-group-text'>
                  <i className='fas fa-lock'></i>
                </span>
                <input name='Password'type='password' onChange={handleChange} className='form-control' value={formData.Password} required placeholder='Enter you Password' />
              </div>
              
              
            </div>
            <button type="submit" className='btn btn-primary w-100 mt-3'><i className='fa fa-sign-in'></i>Login </button>
          </form>
          <ToastContainer/>
    </div>
  )
}

export default Login
