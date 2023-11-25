import "./base.css";
import welcomeImg from "./images/welcome.png";

const form = document.querySelector("form");
const img = document.querySelector("img");
const h1 = document.querySelector("h1");
const localtime = document.querySelector(".local-time");
const humidity = document.querySelector(".humidity");
const tempC = document.querySelector(".temp-c");
const tempF = document.querySelector(".temp-f");
const country = document.querySelector(".country");
const region = document.querySelector(".region");
const changeTemp = document.querySelector(".changeTemp");
const f = document.querySelector(".f");
const c = document.querySelector(".c");

img.src = welcomeImg;

const getData = async (location) => {
  try {
    const key = "de9ae217b86b49b9b5f175910232011";
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`,
      {
        mode: "cors",
      }
    );
    if (!response.ok) {
      throw Error("Bad Response!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (event.target[0].value !== "") {
    const data = await getData(event.target[0].value);
    if (data !== undefined) {
      if (!data.hasOwnProperty("error")) {
        changeTemp.style.visibility = "visible";
        img.src = "https:" + data["current"]["condition"]["icon"];
        h1.textContent = data["current"]["condition"]["text"];
        localtime.textContent = "Local Time " + data["location"]["localtime"];
        humidity.textContent = "Humidity " + data["current"]["humidity"];
        tempF.textContent = "Tempreture " + data["current"]["temp_c"];
        tempC.textContent = "Tempreture " + data["current"]["temp_f"];
        country.textContent = "Country : " + data["location"]["country"];
        region.textContent = "Region : " + data["location"]["region"];
      }
    }
  }
});

let TempSwitch = true;

f.addEventListener("click", () => {
  if (TempSwitch) {
    f.classList.add("clickedTemp");
    c.classList.remove("clickedTemp");
    tempC.style.display = "none";
    tempF.style.display = "block";
    TempSwitch = false;
  }
});

c.addEventListener("click", () => {
  if (!TempSwitch) {
    c.classList.add("clickedTemp");
    f.classList.remove("clickedTemp");
    tempF.style.display = "none";
    tempC.style.display = "block";
    TempSwitch = true;
  }
});

f.click();
