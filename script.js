document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("random-advice-button");
  generateButton.addEventListener("click", generateAdvice);
});

async function generateAdvice() {
  const generateButton = document.getElementById("random-advice-button");
  const adviceID = document.getElementById("advice-id");
  const adviceQuote = document.getElementById("advice-text");
  const diceIcon = document.getElementById("dice-icon");
  const apiURL = "https://api.adviceslip.com/advice";

  generateButton.disabled = true;
  adviceQuote.textContent = "Loading...";
  animateDice(diceIcon);

  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    const adviceJson = data["slip"];
    adviceID.textContent = adviceJson["id"];
    adviceQuote.textContent = adviceJson["advice"];
  } catch (error) {
    adviceQuote.textContent = "Failed to fetch advice. Please try again.";
  } finally {
    generateButton.disabled = false;
  }
}

function animateDice(diceIcon = document.getElementById("dice-icon")) {
  const currentRotation = getRotationAngle(diceIcon);
  if (currentRotation === 0) {
    diceIcon.style.transform = "rotate(-180deg)";
  } else {
    diceIcon.style.transform = "rotate(0deg)";
  }
  diceIcon.style.transition = "transform 0.5s ease";
}

function getRotationAngle(element) {
  const st = window.getComputedStyle(element, null);
  const tr = st.getPropertyValue("transform");
  if (tr && tr !== "none") {
    let values = tr.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
    const a = values[0];
    const b = values[1];
    let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle < 0 ? angle + 360 : angle;
  }
  return 0;
}

function handleClick() {
  var generateButton = document.getElementById("random-advice-button");
  generateButton.disabled = true; // Disable the button

  // Set a timeout to enable the button after a few seconds (e.g., 3 seconds in this example)
  setTimeout(() => {
    generateButton.disabled = false; // Enable the button
  }, 3000); // 3000 milliseconds = 3 seconds
}
