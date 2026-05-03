import React from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
    const user_id=localStorage.getItem('UserId');
    const handle_logout = () => {
        localStorage.removeItem('UserId');
        localStorage.removeItem('UserName');
        navigate('/login');
    };
  return (
    <nav  className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
       
  <div className="container-fluid">
    <Link className="navbar-brand" to="#"><i class="fa-solid fa-wallet me-2"></i>Expense Tracker</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
  <Link className="nav-link active " to="/">
    <i className="fa-solid fa-house me-1"></i> Home
  </Link>
</li>
{!user_id ? (
    <>
    <li className="nav-item">
  <Link className="nav-link " to="/Signup">
    <i className="fa-solid fa-user-plus me-1"></i> Signup
  </Link>
</li>

<li className="nav-item">
  <Link className="nav-link " to="/Login">
    <i className="fa-solid fa-right-to-bracket me-1"></i> Login
  </Link>
</li>

    </>
):(
    <>
    <li className="nav-item">
  <Link className="nav-link " to="/dashboard">
    <i className="fa-solid fa-chart-line me-1"></i> Dashboard
  </Link>
</li>

<li className="nav-item">
  <Link className="nav-link " to="/add-expense">
    <i className="fa-solid fa-circle-plus me-1"></i> Add Expense
  </Link>
</li>

<li className="nav-item">
  <Link className="nav-link " to="/manage-expense">
    <i className="fa-solid fa-list-check me-1"></i> Manage Expense
  </Link>
</li>
<li className="nav-item">
  <Link className="nav-link " to="/expense-report">
    <i className="fa-solid fa-list-check me-1"></i> Expense Report
  </Link>
</li>
<li className="nav-item">
  <Link className="nav-link " to="/change-password">
    <i className="fa-solid fa-key me-1"></i>Change Password
  </Link>
</li>
<li>
<button className='btn btn-danger btn-sm ms-2 mt-1' onClick={handle_logout}>
   Log Out
  </button>
</li>
    </>
)}


        
        
      </ul>
      
    </div>
  </div>
  
</nav>
  )
}

export default Navbar
