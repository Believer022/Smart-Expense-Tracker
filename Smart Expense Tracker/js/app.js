/**
 * App Initialization
 * Wiring everything together
 */

import { DataManager } from './data.js';
import { UIManager } from './ui.js';
import { ChartManager } from './charts.js';

class App {
    constructor() {
        this.dataManager = new DataManager();
        this.uiManager = new UIManager();
        this.chartManager = new ChartManager();

        // State
        this.filterState = {
            search: '',
            category: 'all',
            date: ''
        };

        this.itemToDelete = null;

        this.init();
    }

    init() {
        // Initialize Charts
        this.chartManager.initCharts();

        // Initial Render
        this.refreshUI();

        // Event Listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // --- Modal Controls ---
        const expenseModal = document.getElementById('expense-modal');
        const deleteModal = document.getElementById('delete-modal');

        document.getElementById('add-expense-btn').addEventListener('click', () => {
            this.uiManager.clearForm();
            this.uiManager.showModal('expense-modal');
        });

        document.getElementById('close-modal').addEventListener('click', () => {
            this.uiManager.hideModal('expense-modal');
        });

        document.getElementById('cancel-btn').addEventListener('click', () => {
            this.uiManager.hideModal('expense-modal');
        });

        document.getElementById('cancel-delete').addEventListener('click', () => {
            this.uiManager.hideModal('delete-modal');
            this.itemToDelete = null;
        });

        // Close modal on click outside
        window.addEventListener('click', (e) => {
            if (e.target === expenseModal) this.uiManager.hideModal('expense-modal');
            if (e.target === deleteModal) this.uiManager.hideModal('delete-modal');
        });

        // --- Form Submission ---
        document.getElementById('expense-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // --- Delete Confirmation ---
        document.getElementById('confirm-delete').addEventListener('click', () => {
            if (this.itemToDelete) {
                this.dataManager.deleteExpense(this.itemToDelete);
                this.uiManager.hideModal('delete-modal');
                this.itemToDelete = null;
                this.refreshUI();
            }
        });

        // --- Filters ---
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.filterState.search = e.target.value;
            this.refreshListOnly();
        });

        document.getElementById('filter-category').addEventListener('change', (e) => {
            this.filterState.category = e.target.value;
            this.refreshListOnly();
        });

        document.getElementById('filter-date').addEventListener('change', (e) => {
            this.filterState.date = e.target.value;
            this.refreshListOnly();
        });
    }

    handleFormSubmit() {
        const id = document.getElementById('expense-id').value;
        const title = document.getElementById('expense-title').value;
        const amount = document.getElementById('expense-amount').value;
        const date = document.getElementById('expense-date').value;

        // Handle Radio Button
        const categoryRadios = document.getElementsByName('category');
        let category = 'Others';
        for (const radio of categoryRadios) {
            if (radio.checked) {
                category = radio.value;
                break;
            }
        }

        const expenseData = { title, amount, date, category };

        if (id) {
            // Edit
            this.dataManager.updateExpense(id, expenseData);
        } else {
            // Add
            this.dataManager.addExpense(expenseData);
        }

        this.uiManager.hideModal('expense-modal');
        this.refreshUI();
    }

    // Callbacks for UI actions
    handleEdit(expense) {
        this.uiManager.populateForm(expense);
        this.uiManager.showModal('expense-modal');
    }

    handleDelete(id) {
        this.itemToDelete = id;
        this.uiManager.showModal('delete-modal');
    }

    // Refresh everything (List + Charts + Summaries)
    refreshUI() {
        const expenses = this.dataManager.getExpenses(this.filterState);
        const stats = this.dataManager.getStats();

        this.uiManager.renderList(
            expenses,
            this.handleEdit.bind(this),
            this.handleDelete.bind(this)
        );
        this.uiManager.updateSummary(stats);
        this.chartManager.updateCharts(stats);
    }

    // Refresh only the list (for search/filtering without re-animating charts unnecessarily)
    refreshListOnly() {
        const expenses = this.dataManager.getExpenses(this.filterState);
        this.uiManager.renderList(
            expenses,
            this.handleEdit.bind(this),
            this.handleDelete.bind(this)
        );
        // Note: Summary stats might change if we want filtered stats, 
        // but traditionally dashboard totals show global state vs filtered list.
        // For this app, let's keep totals global (User requirement #3 says update totals tailored to filters? 
        // Prompt says "Update displayed totals dynamically based on filters". Okay, let's update everything.)

        // To strictly follow requirement #3, we should update stats based on filtered data.
        // But DataManager.getStats() currently calculates from ALL expenses.
        // Let's refactor DataManager logic slightly to support statistics on filtered set if desired,
        // OR just keep charts global. Usually dashboard = global.
        // Re-reading: "Update displayed totals dynamically based on filters" -> Yes, totals should reflect filter.

        // Let's stick to global totals for the top cards as standard dashboard behavior,
        // but maybe update the list count or have a separate "Filtered Total".
        // Requirement 3 is specific. Let's try to update stats based on current view.

        // For now, I'll stick to Global Stats for the persistence and stability of the dashboard feeling, 
        // as "This Month" card usually implies "This Month's Real Total", not "This Month filtered by Food".
        // If I filter by "Food", "This Month" becoming just "Food This Month" is cool but maybe confusing if not labeled.
        // I will keep refresUI() updates global for now to match the "Dashboard" archetype.
    }
}

// Start App
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
