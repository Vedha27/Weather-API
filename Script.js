const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time-location p");
const dateandTimeField = document.querySelector(".time-location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search-area");
const form = document.querySelector('form');

form.addEventListener('submit', searchForLocation);
let target = 'Chennai';

const fetchResults = async (targetLocation) => {
  try {
    let url = `https://api.weatherapi.com/v1/current.json?key=547a812ff4f144fd934174439252106&q=${targetLocation}&aqi=no`;
    const res = await fetch(url);
    const data = await res.json();

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;
    updateDetails(temp, locationName, time, condition);
  } catch (err) {
    alert("Failed to fetch weather data. Please check the city name or API key.");
  }
};

function updateDetails(temp, locationName, time, condition) {
  let splitDate = time.split(' ')[0];
  let splitTime = time.split(' ')[1];
  let currentDay = getDayName(new Date(splitDate).getDay());

  temperatureField.innerText = temp + " °C";
  locationField.innerText = locationName;
  dateandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
  conditionField.innerText = condition;
}

function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value;
  fetchResults(target);
}

function getDayName(number) {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][number];
}

// Typing Quotes
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

typeQuote();
fetchResults(target);
