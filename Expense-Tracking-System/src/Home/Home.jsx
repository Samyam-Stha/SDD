import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import "./Home.css";

const Home = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [expenses, setExpenses] = useState([]);

  const chartRef = useRef(null); // Reference to the chart instance

  // Automatically populate the date field with the current date
  const populateDate = () => {
    const now = new Date();
    setDate(now.toISOString().split("T")[0]);
  };

  // Update the time field every second to make it tick
  const updateTime = () => {
    const now = new Date();
    setTime(now.toTimeString().split(" ")[0]);
  };

  // Save expenses to localStorage
  const saveExpenses = (expensesToSave) => {
    localStorage.setItem("expenses", JSON.stringify(expensesToSave));
  };

  // Load expenses from localStorage
  const loadExpenses = () => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  };

  // Filter expenses to only include today's expenses
  const filterTodayExpenses = () => {
    const today = new Date().toISOString().split("T")[0];
    return expenses.filter(expense => expense.date === today);
  };

  // Initialize categories
  const allCategories = ["food", "entertainment", "shopping", "travel", "others"];

  // Group today's expenses by category and include all categories
  const groupExpensesByCategory = () => {
    const todayExpenses = filterTodayExpenses();
    const groupedExpenses = allCategories.reduce((acc, category) => {
      acc[category] = 0; // Initialize category with zero
      return acc;
    }, {});

    todayExpenses.forEach((expense) => {
      const { type, amount } = expense;
      const expenseAmount = parseFloat(amount);
      groupedExpenses[type] += expenseAmount;
    });

    return groupedExpenses;
  };

  // Update the expenses summary (now only for today's expenses)
  const updateExpensesSummary = () => {
    const todayExpenses = filterTodayExpenses();
    let totalToday = 0;

    todayExpenses.forEach((expense) => {
      totalToday += parseFloat(expense.amount);
    });

    return { totalToday };
  };

  const plugin = {
    beforeInit(chart) {
      const origFit = chart.legend.fit;
      chart.legend.fit = function fit() {
        origFit.bind(chart.legend)();
        this.width += 30;
      };
    },
  };

  // Update donut chart (now only for today's expenses)
  const updateDonutChart = () => {
    const ctx = document.getElementById("expense-donut-chart").getContext("2d");
    const todayExpenses = filterTodayExpenses();
    const categories = {};
    let totalExpenses = 0;
  
    if (todayExpenses.length > 0) {
      todayExpenses.forEach((expense) => {
        const { type, amount } = expense;
        const expenseAmount = parseFloat(amount);
  
        categories[type] = categories[type]
          ? categories[type] + expenseAmount
          : expenseAmount;
        totalExpenses += expenseAmount;
      });
  
      // Destroy the existing chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }
  
      // Create a new chart and store its reference
      chartRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: Object.keys(categories),
          datasets: [
            {
              data: Object.values(categories),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#FF5733",
                "#4CAF50",
              ],
              hoverOffset: 4,
            },
          ],
        },
        plugins: [plugin],
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: "right",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = `${context.label || ""}: `;
                  const percentage = (
                    (context.raw / totalExpenses) *
                    100
                  ).toFixed(2);
                  return `${label} Rs ${context.raw} (${percentage}%)`;
                },
              },
            },
          },
        },
      });
    } else {
      // Destroy the existing chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }
  
      // Create a new chart with a gray segment when there are no expenses
      chartRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["No Expenses"],
          datasets: [
            {
              data: [1], // Arbitrary non-zero value
              backgroundColor: ["#C0C0C0"], // Gray color
              hoverOffset: 4,
            },
          ],
        },
        plugins: [plugin],
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: "right",
            },
            tooltip: {
              callbacks: {
                label: (context) => `No Expenses`,
              },
            },
          },
        },
      });
    }
  };

  // Add new expense
  const handleAddExpense = (e) => {
    e.preventDefault(); // Prevent default form submission
  
    const newExpense = { description, amount, type, date, time };
    const updatedExpenses = [...expenses, newExpense];
  
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  
    // Clear the form
    setDescription("");
    setAmount("");
    setType("");
    // The date and time are set automatically, so you don't need to clear them
  };

  // Delete expense
  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  // Delete all expenses
  const handleDeleteAll = () => {
    setExpenses([]);
    localStorage.removeItem("expenses");
  };

  useEffect(() => {
    populateDate();
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    loadExpenses();

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    updateDonutChart();
  }, [expenses]);

  const { totalToday } = updateExpensesSummary();
  const groupedExpenses = groupExpensesByCategory();

  return (
    <div className="main-body">
      <div className="sidebar">
        <h2>Expense Tracker</h2>
        <ul>
          <li>Dashboard</li>
          <li>Accounts</li>
          <li>Reports</li>
          <li>Settings</li>
          <li>Help</li>
        </ul>
      </div>
    <div className="main-box">

      <div className="main-content">
        <header>
          <h1>Welcome, User</h1>
          <div className="search-bar">
            <input type="text" placeholder="Search transactions" />
            <img src="profile-pic.png" alt="Profile" />
          </div>
        </header>

        <div className="investment-summary">
          <div className="total-expense">
            <h3>Today's Expense</h3>
            <div className="investment-amount">Rs {totalToday.toFixed(2)}</div>
          </div>
          <div className="investment-chart">
            <canvas id="expense-donut-chart" height="200" width="500"></canvas>
          </div>
        </div>

        <div className="expenses-summary">
          <h3>Expenses by Category Today</h3>
          <div className="categories-summary">
            {allCategories.map((category) => (
              <div key={category} className="category-summary">
                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                <p>Total: Rs {groupedExpenses[category].toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="expense-input">
          <h3>Add New Expense</h3>
          <form onSubmit={handleAddExpense}>
            <input
              type="text"
              placeholder="Expense Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Expense Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required>
              <option value="" disabled hidden>
                Expense Type
              </option>
              <option value="food">Food</option>
              <option value="entertainment">Entertainment</option>
              <option value="shopping">Shopping</option>
              <option value="travel">Travel</option>
              <option value="others">Others</option>
            </select>
            <input
              type="text"
              value={date}
              readOnly
              placeholder="Expense Date"
            />
            <input
              type="text"
              value={time}
              readOnly
              placeholder="Expense Time"
            />
            <button type="submit">Add Expense</button>
          </form>
        </div>

        <div className="expense-table">
          <h3>Today's Expenses</h3>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterTodayExpenses().map((expense, index) => (
                <tr key={index}>
                  <td>{expense.description}</td>
                  <td>Rs {expense.amount}</td>
                  <td>{expense.type}</td>
                  <td>{expense.date}</td>
                  <td>{expense.time}</td>
                  <td>
                    <button onClick={() => handleDeleteExpense(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleDeleteAll} className="delete-button">
            Delete All Records
          </button>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Home;
