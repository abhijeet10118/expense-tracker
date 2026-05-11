import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import {Pie} from 'react-chartjs-2';
import {Chart,ArcElement,Tooltip,Legend} from 'chart.js';
Chart.register(ArcElement,Tooltip,Legend);
const Dashboard = () => {

    const navigate = useNavigate(); 
    const username = localStorage.getItem("UserName");
    const userId = localStorage.getItem("UserId");
    const [expenses,setExpenses]=useState([]);
    const [TodayExpense,setTodayExpense]=useState(0);
    const [YesterdayExpense,setYesterdayExpenseE]=useState(0);
    const [Last7DayExpense,setLast7DayExpense]=useState(0);
    const [Last30DayExpense,setLast30DayExpense]=useState(0);
    const [YearExpense,setYearExpense]=useState(0);
    const [TotalExpense,setTotalExpense]=useState(0);
    
    const pieData={
      labels: expenses.map(exp => exp.ExpenseItem),

datasets: [
  {
    label: 'Expense',
    
    data: expenses.map(exp => parseFloat(exp.ExpenseCost)),

    backgroundColor: [
      'red',
      'blue',
      'green'
    ],

    borderWidth: 1,
  }
]
    }
    
    
    
    
    
    
    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
        fetchExpense(userId);
    }, [userId, navigate]);  

    const fetchExpense = async(userId)=>{
            try{
                const data = await fetch(`http://127.0.0.1:8000/api/manage_expense/${userId}/`);
                const data_response=await(data.json());
                setExpenses(data_response);
                settotals(data_response);
            }
            catch(error){
                console.log(error);
            }
            
        };
        const settotals=(data)=>{
          const today = new Date();
          today.setDate(today.getDate());
          const yesterday = new Date();
          yesterday.setDate(today.getDate()-1);
          const last7days = new Date();
          last7days.setDate(today.getDate()-7);
          const last30days = new Date();
          last30days.setDate(today.getDate()-30);
          const currentyear = today.getFullYear();
          let todaysum = 0;
          let yesterdaysum = 0;
          let last7daysum = 0;
          let last30daysum = 0;
          let yearsum=0;
          let grandsum = 0;
          
          data.forEach(item=>{
            const ExpenseDtae = new Date(item.ExpenseDtae);
            const amount = parseFloat(item.ExpenseCost) || 0;

            if (ExpenseDtae.toDateString()===today.toDateString()){
              todaysum+=amount;
            }
            if (ExpenseDtae.toDateString()=== yesterday.toDateString()){
              yesterdaysum+=amount;
            }
            if (ExpenseDtae.toDateString()>= last7days.toDateString()){
              last7daysum+=amount;
            }
            if (ExpenseDtae.toDateString()>=last30days.toDateString()){
              last30daysum+=amount;
            }
            if (ExpenseDtae.getFullYear()===currentyear){
              yearsum+=amount;
            }
            grandsum+=amount;
          })
          setTodayExpense(todaysum);
          setYesterdayExpenseE(yesterdaysum);
          setLast7DayExpense(last7daysum);
          setLast30DayExpense(last30daysum);
          setYearExpense(yearsum);
          setTotalExpense(grandsum);
        }
    return (
        <div className="container mt-5">
          <div className='text-center'>
            <h2>Welcome, {username}</h2>
            <p className='text-muted'>Here's your Expense Overview</p>
          </div>
  <div className="row g-3">  {/* small gaps */}

    {/* Card 1 */}
    <div className="col-md-4">
      <div className="card card-hover bg-primary text-white h-100" style={{ minHeight: "180px" }}>
        <div className="card-body">
          <h5><i className="fas fa-calendar-day me-2"></i>Today's Expense</h5>
          <p className="fs-4">₹ {TodayExpense}</p>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="col-md-4">
      <div className="card card-hover bg-success text-white h-100" style={{ minHeight: "180px" }}>
        <div className="card-body">
          <h5><i className="fas fa-wallet me-2"></i>yesterday Expense</h5>
          <p className="fs-4">₹ {YesterdayExpense}</p>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="col-md-4">
      <div className="card card-hover bg-danger text-white h-100" style={{ minHeight: "180px" }}>
        <div className="card-body">
          <h5><i className="fas fa-chart-line me-2"></i>Last 7 Day's Expense</h5>
          <p className="fs-4">{Last7DayExpense}</p>
        </div>
      </div>
    </div>

    {/* Row 2 */}

    {/* Card 4 */}
    <div className="col-md-4">
      <div className="card card-hover bg-warning text-dark h-100" style={{ minHeight: "180px" }}>
        <div className="card-body">
          <h5><i className="fas fa-coins me-2"></i>Last 30 day's Expense</h5>
          <p className="fs-4">₹ {Last30DayExpense}</p>
        </div>
      </div>
    </div>

    {/* Card 5 */}
    <div className="col-md-4">
      <div className="card card-hover bg-info text-white h-100" style={{ minHeight: "180px" }}>
        <div className="card-body">
          <h5><i className="fas fa-receipt me-2"></i>Whole year Expense</h5>
          <p className="fs-4">₹ {YearExpense}</p>
        </div>
      </div>
    </div>

    {/* Card 6 */}
    <div className="col-md-4">
      <div className="card card-hover bg-dark text-white h-100" style={{ minHeight: "180px" }}>
        <div className="card-body">
          <h5><i className="fas fa-chart-pie me-2"></i>Grand Sum</h5>
          <p className="fs-4">₹{TotalExpense}</p>
        </div>
      </div>
    </div>

  </div>
  <div style={{width:'400px', height:'400px',  margin: 'auto'}}>
    <h4 className='text-center'>Expense Distribution</h4>
    <Pie data={pieData}/>
  </div>
</div>
    );
};

export default Dashboard;