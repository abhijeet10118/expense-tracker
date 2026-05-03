import React, {useState} from 'react'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useNavigate,Link} from 'react-router-dom';



const Signup = () => {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
      FullName:'',
      Email:'',
      Password:'',
    });

    const handleChange = (e) => {
      setFormData({...formData,[e.target.name]:e.target.value})
    };

    const handleSubmit = async(e)=>{
      e.preventDefault();
      try{
        const response = await fetch("http://127.0.0.1:8000/api/signup/",{
          method :'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(formData),
        });
        if(response.status===201){
          toast.success("Signup Successful Please Login");
          setTimeout(()=>{
            navigate('/login');
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
    
    <div className='container mt-5'>
      {/* <div className="text-end">
  <Link to="/login" style={{color:'black'}}>Login</Link>
</div> */}
      <div className='text-center mb-4'>
        <h1><i className='fa-solid fa-user-plus me-2'></i>signup page</h1>
        <p className='text-mutated'>Create your account to start tracking expences</p>
      </div>
      <form className='p-4 border rounded shadow mx-auto' style={{maxWidth:'400px'}} onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Full Name</label>
          <div className='input-group'>
            <span className='input-group-text'>
              <i className='fas fa-user'></i>
            </span>
            <input name='FullName'type='text' className='form-control' required placeholder='Enter you FullName' value={formData.FullName}onChange={handleChange}/>
          </div>
          
          
        </div>
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
        <button type="submit" className='btn btn-primary w-100 mt-3'><i className='fa-solid fa-user-plus me-2'></i>Sign Up</button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Signup
