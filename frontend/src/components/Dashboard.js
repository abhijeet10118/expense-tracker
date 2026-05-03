import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();  // ✅ inside component

    const username = localStorage.getItem("UserName");
    const userId = localStorage.getItem("UserId");

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
    }, [userId, navigate]);  

    return (
        <div className='text-center mt-5'>
            <h2>Welcome <span>{username}</span></h2>
            <p className='lead'>This is your summary for all transactions</p>
        </div>
    );
};

export default Dashboard;