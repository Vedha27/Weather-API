// Select DOM Elements
const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time-location p");
const dateandTimeField = document.querySelector(".time-location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search-area");
const form = document.querySelector("form");

// Default target location
let target = "Chennai";

// Add form submit listener safely
if (form) {
  form.addEventListener("submit", searchForLocation);
}

// Fetch and display weather results
const fetchResults = async (targetLocation) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=547a812ff4f144fd934174439252106&q=${targetLocation}&aqi=no`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    const { name, localtime } = data.location;
    const { temp_c, condition } = data.current;

    updateDetails(temp_c, name, localtime, condition.text);
  } catch (err) {
    console.error(err);
    alert("❌ Failed to fetch weather data. Please check the city name or API key.");
  }
};

// Update the DOM with fetched weather details
function updateDetails(temp, locationName, time, condition) {
  const [date, timeStr] = time.split(" ");
  const dayName = getDayName(new Date(date).getDay());

  temperatureField.innerText = `${temp} °C`;
  locationField.innerText = locationName;
  dateandTimeField.innerText = `${date} ${dayName} ${timeStr}`;
  conditionField.innerText = condition;
}

// Handle city search
function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value.trim();
  if (target) {
    fetchResults(target);
  }
}

// Get day name from index
function getDayName(index) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[index];
}

// Typewriter quote effect
const quotes = [
  "The sun always shines above the clouds.",
  "Wherever you go, bring your own sunshine.",
  "Sunshine is delicious, rain is refreshing.",
  "Climate is what we expect, weather is what we get."
];

let quoteIndex = 0;
let charIndex = 0;
const typingEl = document.getElementById("typing-quote");

function typeQuote() {
  if (!typingEl) return;
  if (charIndex < quotes[quoteIndex].length) {
    typingEl.textContent += quotes[quoteIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeQuote, 100);
  } else {
    setTimeout(() => {
      typingEl.textContent = "";
      quoteIndex = (quoteIndex + 1) % quotes.length;
      charIndex = 0;
      typeQuote();
    }, 3000);
  }
}

// Initial execution
document.addEventListener("DOMContentLoaded", () => {
  fetchResults(target);
  typeQuote();
});
