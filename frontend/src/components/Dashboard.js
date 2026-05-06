import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
const Dashboard = () => {

    const navigate = useNavigate(); 
    const username = localStorage.getItem("UserName");
    const userId = localStorage.getItem("UserId");

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
    }, [userId, navigate]);  

    return (
        <div className="container mt-5">
  <div className="row g-3">  {/* small gaps */}

    {/* Card 1 */}
    <div className="col-md-4">
      <div className="card card-hover bg-primary text-white h-100" style={{ minHeight: "180px" }}>
        <div className="card-body">
          <h5><i className="fas fa-calendar-day me-2"></i>Today's Expense</h5>
          <p className="fs-4">₹ 500</p>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="col-md-4">
      <div className="card card-hover bg-success text-white h-100" style={{ minHeight: "180px" }}>
        <div className="card-body">
          <h5><i className="fas fa-wallet me-2"></i>Monthly Expense</h5>
          <p className="fs-4">₹ 3000</p>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="col-md-4">
      <div className="card card-hover bg-danger text-white h-100" style={{ minHeight: "180px" }}>
        <div className="card-body">
          <h5><i className="fas fa-chart-line me-2"></i>Total Expense</h5>
          <p className="fs-4">₹ 10000</p>
        </div>
      </div>
    </div>

    {/* Row 2 */}

    {/* Card 4 */}
    <div className="col-md-4">
      <div className="card card-hover bg-warning text-dark h-100" style={{ minHeight: "180px" }}>
        <div className="card-body">
          <h5><i className="fas fa-coins me-2"></i>Savings</h5>
          <p className="fs-4">₹ 2000</p>
        </div>
      </div>
    </div>

    {/* Card 5 */}
    <div className="col-md-4">
      <div className="card card-hover bg-info text-white h-100" style={{ minHeight: "180px" }}>
        <div className="card-body">
          <h5><i className="fas fa-receipt me-2"></i>Total Transactions</h5>
          <p className="fs-4">45</p>
        </div>
      </div>
    </div>

    {/* Card 6 */}
    <div className="col-md-4">
      <div className="card card-hover bg-dark text-white h-100" style={{ minHeight: "180px" }}>
        <div className="card-body">
          <h5><i className="fas fa-chart-pie me-2"></i>Category Split</h5>
          <p className="fs-4">View</p>
        </div>
      </div>
    </div>

  </div>
</div>
    );
};

export default Dashboard;