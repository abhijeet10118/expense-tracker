# 💰 Expense Tracker

A full-stack expense tracking web application built with **Django REST Framework** (backend) and **React.js** (frontend). Users can register, log in, add and manage their daily expenses, view date-wise reports, and monitor spending through an interactive dashboard with charts.

> 🔗 GitHub: [github.com/abhijeet10118/expense-tracker](https://github.com/abhijeet10118/expense-tracker)

---

## ✨ Features

- 🔐 **User Auth** — Signup, Login, Logout, and Change Password
- ➕ **Add Expense** — Log an expense with item name, date, and cost
- ✏️ **Edit & Delete** — Update or remove any expense via an inline modal
- 📊 **Dashboard** — Real-time expense breakdown:
  - Today / Yesterday / Last 7 Days / Last 30 Days / This Year / Grand Total
  - Pie chart showing expense distribution by item
- 📅 **Expense Report** — Search expenses by date range with grand total
- 🛡️ **Protected Routes** — Unauthenticated users are automatically redirected to login
- 💾 **Persistent Session** — UserId and UserName stored in localStorage

---

## 🛠️ Tech Stack

### Backend

| Technology            | Purpose                        |
| --------------------- | ------------------------------ |
| Python / Django       | Web framework                  |
| Django REST Framework | Building JSON APIs             |
| SQLite                | Default database               |
| `@csrf_exempt`        | API access from React frontend |

### Frontend

| Technology                 | Purpose                               |
| -------------------------- | ------------------------------------- |
| React.js                   | UI framework                          |
| React Router DOM           | Client-side routing & protected pages |
| Chart.js + react-chartjs-2 | Pie chart on dashboard                |
| Bootstrap 5                | Styling and layout                    |
| Font Awesome               | Icons                                 |
| React Toastify             | Toast notifications                   |
| localStorage               | Session management                    |

---

## 📁 Project Structure

```
expense-tracker/
│
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   └── expense/                   # Main Django app
│       ├── models.py              # UserDetail & Expense models
│       ├── views.py               # API logic (signup, login, CRUD, search)
│       ├── urls.py                # API route definitions
│       └── apps.py
│
└── frontend/
    └── src/
        ├── App.js                 # Route definitions
        └── components/
            ├── Navbar.js          # Responsive navbar with auth state
            ├── Home.js            # Landing page
            ├── Login.js           # Login form
            ├── Signup.js          # Registration form
            ├── Dashboard.js       # Expense overview + Pie chart
            ├── Dashboard.css      # Card hover animations
            ├── AddExpense.js      # Add new expense form
            ├── ManageExpense.js   # View, edit, delete expenses
            ├── ExpenseReport.js   # Date-range search + total
            └── ChangePassword.js  # Update user password
```

---

## 🗄️ Database Models

### `UserDetail`

| Field    | Type          | Notes                 |
| -------- | ------------- | --------------------- |
| FullName | CharField     | Max 50 chars          |
| Email    | EmailField    | Unique                |
| Password | CharField     | Plain text (dev only) |
| RegDate  | DateTimeField | Auto on creation      |

### `Expense`

| Field       | Type       | Notes                         |
| ----------- | ---------- | ----------------------------- |
| UserId      | ForeignKey | Links to UserDetail (CASCADE) |
| ExpenseItem | CharField  | Item name                     |
| ExpenseDtae | DateField  | User-provided expense date    |
| ExpenseCost | FloatField | Amount in ₹                   |
| NoteDate    | DateField  | Auto on creation              |

---

## 🔌 API Endpoints

| Method | Endpoint                                                       | Description                     |
| ------ | -------------------------------------------------------------- | ------------------------------- |
| POST   | `/api/signup/`                                                 | Register a new user             |
| POST   | `/api/login/`                                                  | Login and get UserId + UserName |
| POST   | `/api/add_expense/`                                            | Add a new expense               |
| GET    | `/api/manage_expense/<user_id>/`                               | Fetch all expenses for a user   |
| PUT    | `/api/update_expense/<expense_id>/`                            | Update an expense               |
| DELETE | `/api/delete_expense/<expense_id>/`                            | Delete an expense               |
| GET    | `/api/search_expense/<user_id>/?from=YYYY-MM-DD&to=YYYY-MM-DD` | Date-range expense report       |
| POST   | `/api/change_password/<user_id>/`                              | Change user password            |

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+ and npm
- Git

---

### 🔧 Backend Setup

```bash
# 1. Clone the repo
git clone https://github.com/abhijeet10118/expense-tracker.git
cd expense-tracker

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Run database migrations
python manage.py makemigrations
python manage.py migrate

# 5. Start the Django server
python manage.py runserver
```

✅ Backend runs at: `http://127.0.0.1:8000`

---

### ⚛️ Frontend Setup

```bash
# 1. Navigate to the frontend folder
cd frontend

# 2. Install Node dependencies
npm install

# 3. Start the React development server
npm start
```

✅ Frontend runs at: `http://localhost:3000`

## 👨‍💻 Author

**Abhijeet Sandilya**

- 🐙 GitHub: [@abhijeet10118](https://github.com/abhijeet10118)
- 💼 LinkedIn: [linkedin.com/in/abhijeet-sandilya](https://www.linkedin.com/in/abhijeet-sandilya)
