// Dummy Forecast Data (replace with real API if needed)
let forecastData = [
    { day: "Tomorrow", icon: "🌤", tempC: 30, humidity: 60 },
    { day: "Day 2", icon: "🌦", tempC: 27, humidity: 72 },
    { day: "Day 3", icon: "⛅", tempC: 28, humidity: 65 }
  ];
  
  // DOM injection
  const forecastContainer = document.getElementById("forecast-cards");
  
  function renderCards(unit = "C") {
    forecastContainer.innerHTML = "";
    forecastData.forEach(f => {
      const temp = unit === "C" ? `${f.tempC}°C` : `${Math.round(f.tempC * 9/5 + 32)}°F`;
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h3>${f.day}</h3>
        <p style="font-size: 2rem">${f.icon}</p>
        <p><strong>${temp}</strong></p>
        <p>Humidity: ${f.humidity}%</p>
      `;
      forecastContainer.appendChild(card);
    });
  }
  
  // Chart.js Temperature Graph
  const ctx = document.getElementById("tempChart").getContext("2d");
  let tempChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: forecastData.map(f => f.day),
      datasets: [{
        label: "Temperature (°C)",
        data: forecastData.map(f => f.tempC),
        fill: true,
        backgroundColor: "rgba(0, 209, 255, 0.2)",
        borderColor: "#00d1ff",
        tension: 0.3
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
  
  // Toggle Unit
  document.querySelectorAll('input[name="unit"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      const unit = e.target.value;
      renderCards(unit);
  
      // Update chart
      const temps = forecastData.map(f =>
        unit === "C" ? f.tempC : Math.round(f.tempC * 9/5 + 32)
      );
      tempChart.data.datasets[0].data = temps;
      tempChart.data.datasets[0].label = `Temperature (°${unit})`;
      tempChart.update();
    });
  });
  
  // Initial load
  renderCards();
  