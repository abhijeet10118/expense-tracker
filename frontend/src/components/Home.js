import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
    const username=localStorage.getItem('UserName');
  return (
    <div className='container text-center mt-5'>
      <h2>Welcome to your Expense Tracker</h2>
        {username ? (
            <Link className='btn btn-warning mx-4 mt-4' to={'/dashboard'}>Go To Dashboard</Link>
        ) : (
            <>
            <Link className='btn btn-success mx-4 mt-4' to={'/login'}>Login</Link>
            <Link className='btn btn-danger mx-4 mt-4' to={'/signup'}>Sign Up</Link>
            </>
        )}
      
      
    </div>
  )
}

export default Home;
