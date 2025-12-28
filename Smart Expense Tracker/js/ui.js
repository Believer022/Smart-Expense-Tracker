/**
 * UI Manager
 * Handles DOM manipulation and rendering
 */

export class UIManager {
    constructor() {
        this.listContainer = document.getElementById('expense-list');
        this.totalAmountEl = document.getElementById('total-amount');
        this.monthAmountEl = document.getElementById('month-amount');
        this.topCategoryEl = document.getElementById('top-category-name');

        // Formatters
        this.currencyFormatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        });

        this.dateFormatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Render Expense List
    renderList(expenses, onEdit, onDelete) {
        this.listContainer.innerHTML = '';

        if (expenses.length === 0) {
            this.listContainer.innerHTML = `
                <div class="empty-state">
                    <i class="ri-bill-line"></i>
                    <p>No expenses found matching your criteria.</p>
                </div>
            `;
            return;
        }

        expenses.forEach(expense => {
            const item = document.createElement('div');
            item.className = 'expense-item';

            item.innerHTML = `
                <div class="expense-info-left">
                    <div class="cat-icon ${expense.category}">
                        ${this.getCategoryIcon(expense.category)}
                    </div>
                    <div class="expense-details">
                        <h4>${expense.title}</h4>
                        <span class="expense-date">${this.formatDate(expense.date)}</span>
                    </div>
                </div>
                <div class="expense-right">
                    <span class="expense-amount">-${this.formatMoney(expense.amount)}</span>
                </div>
                <div class="expense-actions">
                    <button class="action-btn edit-btn" aria-label="Edit"><i class="ri-edit-line"></i></button>
                    <button class="action-btn delete-btn" aria-label="Delete"><i class="ri-delete-bin-line"></i></button>
                </div>
            `;

            // Attach specific event listeners to buttons
            const editBtn = item.querySelector('.edit-btn');
            const deleteBtn = item.querySelector('.delete-btn');

            editBtn.addEventListener('click', () => onEdit(expense));
            deleteBtn.addEventListener('click', () => onDelete(expense.id));

            this.listContainer.appendChild(item);
        });
    }

    // Update Summary Cards
    updateSummary(stats) {
        this.totalAmountEl.textContent = this.formatMoney(stats.total);
        this.monthAmountEl.textContent = this.formatMoney(stats.monthTotal);
        this.topCategoryEl.textContent = stats.topCategory;
    }

    // Helpers
    formatMoney(amount) {
        return this.currencyFormatter.format(amount);
    }

    formatDate(dateStr) {
        const date = new Date(dateStr);
        // Add time zone offset handling if needed, but for simple expense date keep it simple
        return this.dateFormatter.format(date);
    }

    getCategoryIcon(category) {
        const icons = {
            'Food': '<i class="ri-restaurant-line"></i>',
            'Travel': '<i class="ri-car-line"></i>',
            'Bills': '<i class="ri-home-wifi-line"></i>',
            'Shopping': '<i class="ri-shopping-bag-3-line"></i>',
            'Entertainment': '<i class="ri-movie-line"></i>',
            'Others': '<i class="ri-grid-line"></i>'
        };
        return icons[category] || '<i class="ri-grid-line"></i>';
    }

    // Modal Handling
    showModal(modalId) {
        document.getElementById(modalId).classList.remove('hidden');
    }

    hideModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    }

    // Populate Form for Editing
    populateForm(expense) {
        document.getElementById('expense-id').value = expense.id;
        document.getElementById('modal-title').textContent = 'Edit Expense';
        document.getElementById('expense-title').value = expense.title;
        document.getElementById('expense-amount').value = expense.amount;
        document.getElementById('expense-date').value = expense.date;

        // Select Radio
        const radios = document.getElementsByName('category');
        radios.forEach(r => {
            if (r.value === expense.category) r.checked = true;
        });
    }

    clearForm() {
        document.getElementById('expense-form').reset();
        document.getElementById('expense-id').value = '';
        document.getElementById('modal-title').textContent = 'Add New Expense';
    }
}
