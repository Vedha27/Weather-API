let chartRendered = false;

function renderChart() {
  const ctx = document.getElementById('usageChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['India', 'USA', 'Europe', 'Asia', 'Africa'],
      datasets: [{
        label: 'User Base by Region',
        data: [38, 25, 15, 12, 10],
        backgroundColor: ['#00d1ff', '#26d0ce', '#00ffaa', '#ffd32a', '#ff6b6b'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#ccc'
          }
        }
      }
    }
  });
}

// Scroll trigger logic
window.addEventListener('scroll', () => {
  const chart = document.getElementById('usageChart');
  const rect = chart.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

  if (isVisible && !chartRendered) {
    renderChart();
    chartRendered = true;
  }
});

// Testimonial Slider
let index = 0;
const testimonials = document.querySelectorAll('.testimonial');
setInterval(() => {
  testimonials.forEach(t => t.classList.remove('active'));
  testimonials[index].classList.add('active');
  index = (index + 1) % testimonials.length;
}, 4000);
