/**
 * Data Manager
 * Handles data persistence using LocalStorage and business logic for expenses.
 */

export class DataManager {
    constructor() {
        this.STORAGE_KEY = 'smart_expense_tracker_data';
        this.expenses = this.loadData();
    }

    // Load data from LocalStorage
    loadData() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    // Save data to LocalStorage
    saveData() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.expenses));
    }

    // Get all expenses, optionally filtered
    getExpenses(filters = {}) {
        let result = [...this.expenses];

        // Filter by Category
        if (filters.category && filters.category !== 'all') {
            result = result.filter(e => e.category === filters.category);
        }

        // Filter by Date
        if (filters.date) {
            result = result.filter(e => e.date === filters.date);
        }

        // Search by Title
        if (filters.search) {
            const term = filters.search.toLowerCase();
            result = result.filter(e => e.title.toLowerCase().includes(term));
        }

        // Sort by Date (Latest first)
        result.sort((a, b) => new Date(b.date) - new Date(a.date));

        return result;
    }

    // Get a single expense
    getExpenseById(id) {
        return this.expenses.find(e => e.id === id);
    }

    // Add new expense
    addExpense(expenseData) {
        const newExpense = {
            id: Date.now().toString(), // Simple unique ID
            ...expenseData,
            createdAt: new Date().toISOString()
        };
        this.expenses.push(newExpense);
        this.saveData();
        return newExpense;
    }

    // Update existing expense
    updateExpense(id, updatedData) {
        const index = this.expenses.findIndex(e => e.id === id);
        if (index !== -1) {
            this.expenses[index] = { ...this.expenses[index], ...updatedData };
            this.saveData();
            return true;
        }
        return false;
    }

    // Delete expense
    deleteExpense(id) {
        this.expenses = this.expenses.filter(e => e.id !== id);
        this.saveData();
    }

    // Calculate Statistics
    getStats() {
        const total = this.expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
        
        // Current Month Spending
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const monthTotal = this.expenses
            .filter(e => {
                const d = new Date(e.date);
                return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
            })
            .reduce((sum, e) => sum + parseFloat(e.amount), 0);

        // Calculate Category Data for Charts
        const categoryMap = {};
        this.expenses.forEach(e => {
            categoryMap[e.category] = (categoryMap[e.category] || 0) + parseFloat(e.amount);
        });

        // Find Top Category
        let topCategory = '-';
        let topAmount = 0;
        Object.entries(categoryMap).forEach(([cat, amount]) => {
            if (amount > topAmount) {
                topAmount = amount;
                topCategory = cat;
            }
        });

        // Monthly Trend Data (Last 6 months)
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const trendData = { labels: [], amounts: [] };
        
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const m = d.getMonth();
            const y = d.getFullYear();
            
            const label = `${monthNames[m]}`;
            trendData.labels.push(label);
            
            const amount = this.expenses
                .filter(e => {
                    const ed = new Date(e.date);
                    return ed.getMonth() === m && ed.getFullYear() === y;
                })
                .reduce((sum, e) => sum + parseFloat(e.amount), 0);
            
            trendData.amounts.push(amount);
        }

        return {
            total,
            monthTotal,
            topCategory,
            categoryData: categoryMap,
            trendData
        };
    }
}
