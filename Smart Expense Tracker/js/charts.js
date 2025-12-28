/**
 * Chart Manager
 * Handles Chart.js initializations and updates
 */

export class ChartManager {
    constructor() {
        this.mainChart = null; // Bar chart
        this.categoryChart = null; // Pie chart
    }

    initCharts() {
        this.initMainChart();
        this.initCategoryChart();
    }

    initMainChart() {
        const ctx = document.getElementById('mainChart').getContext('2d');
        this.mainChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Monthly Spending',
                    data: [],
                    backgroundColor: '#0f766e',
                    borderRadius: 6,
                    barThickness: 20
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { borderDash: [5, 5] }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    initCategoryChart() {
        const ctx = document.getElementById('categoryChart').getContext('2d');
        this.categoryChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#ef4444', // Food - Red
                        '#0ea5e9', // Travel - Blue
                        '#d97706', // Bills - Orange
                        '#ec4899', // Shopping - Pink
                        '#6366f1', // Entertainment - Indigo
                        '#6b7280'  // Others - Gray
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { boxWidth: 12, usePointStyle: true }
                    }
                }
            }
        });
    }

    updateCharts(stats) {
        // Update Main Chart (Trend)
        if (this.mainChart) {
            this.mainChart.data.labels = stats.trendData.labels;
            this.mainChart.data.datasets[0].data = stats.trendData.amounts;
            this.mainChart.update();
        }

        // Update Category Chart
        if (this.categoryChart) {
            const labels = Object.keys(stats.categoryData);
            const data = Object.values(stats.categoryData);

            // Sync colors with static definitions if possible, but map defines order
            // Re-ordering colors to match labels is complex without a fixed map, 
            // but for now relying on default order is acceptable for standard categories.
            // A better way is to map categories to specific colors.

            const colorMap = {
                'Food': '#ef4444',
                'Travel': '#0ea5e9',
                'Bills': '#d97706',
                'Shopping': '#ec4899',
                'Entertainment': '#6366f1',
                'Others': '#6b7280'
            };

            const bgColors = labels.map(cat => colorMap[cat] || '#cbd5e1');

            this.categoryChart.data.labels = labels;
            this.categoryChart.data.datasets[0].data = data;
            this.categoryChart.data.datasets[0].backgroundColor = bgColors;
            this.categoryChart.update();
        }
    }
}
