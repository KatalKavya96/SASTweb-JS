// Select all grid items
const gridItems = document.querySelectorAll('.grid-item');

// Popup elements
const popupOverlay = document.getElementById('popupOverlay');
const popupContent = document.getElementById('popupContent');
const closePopup = document.getElementById('closePopup');

// Store original charts and canvases
const charts = [];
const canvases = [];

// Function to initialize a chart for a specific grid-item
function createChart(container, index) {
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    container.appendChild(canvas);
    canvases.push(canvas); // Store the canvas for later use

    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // X-axis labels (time)
            datasets: [{
                label: `Sensor ${index + 1}`, // Unique label for each chart
                data: [], // Y-axis values
                borderColor: `hsl(${(index * 60) % 360}, 70%, 50%)`, // Unique line color
                borderWidth: 2,
                tension: 0.4, // Smooth curve
                fill: true,
                backgroundColor: `hsla(${(index * 60) % 360}, 70%, 50%, 0.2)` // Semi-transparent fill
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 800 },
            plugins: {
                legend: { display: true, position: 'top' }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Time (s)', color: 'white' },
                    ticks: { color: 'white', autoSkip: true, maxTicksLimit: 10 }
                },
                y: {
                    title: { display: true, text: 'Value', color: 'white' },
                    ticks: { color: 'white', beginAtZero: true, stepSize: 20 }
                }
            }
        }
    });

    // Store the chart for later use
    charts.push(chart);

    // Add click event to open the popup with this chart
    container.addEventListener('click', () => {
        popupOverlay.style.display = 'flex'; // Show popup

        // Move the canvas to the popup
        popupContent.appendChild(canvas);
        canvas.style.width = '100%'; // Adjust width for the popup
        canvas.style.height = '90%'; // Adjust height for the popup
    });

    // Function to add random data points
    function addDataPoint(label, value) {
        chart.data.labels.push(label); // Add label
        chart.data.datasets[0].data.push(value); // Add value

        // Limit data points
        if (chart.data.labels.length > 15) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }

        chart.update(); // Update the chart
    }

    // Simulate real-time data
    let counter = 0;
    setInterval(() => {
        counter++;
        const now = `${counter}s`;
        const randomValue = Math.random() * (index + 1) * 50; // Simulated data
        addDataPoint(now, randomValue);
    }, 1000);
}

// Initialize charts for all grid items
gridItems.forEach((gridItem, index) => createChart(gridItem, index));

// Add event to close popup
closePopup.addEventListener('click', () => {
    popupOverlay.style.display = 'none'; // Hide popup

    // Move the canvas back to its original grid-item
    canvases.forEach((canvas, index) => {
        const container = gridItems[index];
        if (!container.contains(canvas)) {
            container.appendChild(canvas);

            // Restore the canvas dimensions to match the grid-item
            canvas.style.width = `${container.clientWidth}px`;
            canvas.style.height = `${container.clientHeight}px`;
        }
    });
});
