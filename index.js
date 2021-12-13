//   .getContext('2d');
// const chartContinent = document
//   .getElementById('#chartContinent')

const graph = document.getElementById('chartContinent').getContext('2d');

const buttonConti = document.querySelector('.buttonConti');
const contiDiv2 = document.querySelector('.contiDiv2');
const contiDiv1 = document.querySelector('.contiDiv1');
const asiaButton = document.querySelector('.asiaButton');
const europeButton = document.querySelector('.europeButton');
const oceaniaButton = document.querySelector('.oceaniaButton');
const americaButton = document.querySelector('.americaButton');
const africaButton = document.querySelector('.africaButton');

const asiaDeathButton = document.querySelector('.deaths');

let chartContinent = new Chart(graph, {});

let arrEurope = [];
let europeConfirmed = [];
let europeName = [];
let europeDeaths = [];
let europeRecoverd = [];
let europeCriticalCondition = [];

let arrAfrica = [];
let africaConfirmed = [];
let africaName = [];
let africaDeaths = [];
let africaRecoverd = [];
let africaCriticalCondition = [];

let arrAmerica = [];
let americaConfirmed = [];
let americaName = [];
let americaDeaths = [];
let americaRecoverd = [];
let americaCriticalCondition = [];

let arrAsia = [];
let asia = [];
let asiaName = [];
let asiaConfirmed = [];
let asiaRecoverd = [];
let asiaDeaths = [];
let asiaCriticalCondition = [];

let arrOceania = [];
let oceaniaConfirmed = [];
let oceaniaName = [];
let oceaniaDeaths = [];
let oceaniaRecoverd = [];
let oceaniaCriticalCondition = [];

let restOfTheWorld = [];

const urlCountries =
  'https://intense-mesa-62220.herokuapp.com/https://corona-api.com/countries';
async function getCountry() {
  const newArr = await fetch(urlCountries);
  const res = await newArr.json();
  let allCountriesArr = [];
  for (let item of res.data) {
    allCountriesArr.push({
      name: item.name,
      code: item.code,
      ConfirmedCases: item.latest_data.confirmed,
      numberofDeaths: item.latest_data.deaths,
      numberOfRecovered: item.latest_data.recovered,
      numberOfCriticalCondition: item.latest_data.critical,
    });
  }

  return allCountriesArr;
}

const urlContinent =
  'https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1';
async function getConti(allCountriesArr) {
  const fetchContinentFromUrl = await fetch(urlContinent);
  const fetchcontinentFromUrlJson = await fetchContinentFromUrl.json();
  for (let i = 0; i < fetchcontinentFromUrlJson.length; i++) {
    for (let j = 0; j < allCountriesArr.length; j++) {
      if (
        allCountriesArr[j].name === fetchcontinentFromUrlJson[i].name.common
      ) {
        allCountriesArr[j].region = fetchcontinentFromUrlJson[i].region;
      }
    }
  }
  return allCountriesArr;
}
// const world = {
//   asia: {},
//   america: {},
//   africa: {},
//   europe: {},
// };

function newArrOfRegion(allCountriesArr) {
  allCountriesArr.forEach((state) => {
    switch (state.region) {
      case 'Asia':
        arrAsia.push(state);
        asiaConfirmed.push(state.ConfirmedCases);
        asiaName.push(state.name);
        asiaDeaths.push(state.numberofDeaths);
        asiaRecoverd.push(state.numberOfRecovered);
        asiaCriticalCondition.push(state.numberOfCriticalCondition);
        break;
      case 'Europe':
        arrEurope.push(state);
        europeConfirmed.push(state.ConfirmedCases);
        europeName.push(state.name);
        europeDeaths.push(state.numberofDeaths);
        europeRecoverd.push(state.numberOfRecovered);
        europeCriticalCondition.push(state.numberOfCriticalCondition);
        break;
      case 'America':
        arrAmerica.push(state);
        americaConfirmed.push(state.ConfirmedCases);
        americaName.push(state.name);
        americaDeaths.push(state.numberofDeaths);
        americaRecoverd.push(state.numberOfRecovered);
        americaCriticalCondition.push(state.numberOfCriticalCondition);
        break;
      case 'Africa':
        arrAfrica.push(state);
        africaConfirmed.push(state.ConfirmedCases);
        africaName.push(state.name);
        africaDeaths.push(state.numberofDeaths);
        africaRecoverd.push(state.numberOfRecovered);
        africaCriticalCondition.push(state.numberOfCriticalCondition);
        break;
      case 'Oceania':
        arrOceania.push(state);
        oceaniaConfirmed.push(state.ConfirmedCases);
        oceaniaName.push(state.name);
        oceaniaDeaths.push(state.numberofDeaths);
        oceaniaRecoverd.push(state.numberOfRecovered);
        oceaniaCriticalCondition.push(state.numberOfCriticalCondition);
        break;
      default:
        restOfTheWorld.push(state);
    }
  });
}


async function showStat() {
  contiDiv2.addEventListener("click", (e) => {
    console.log(e.target.className)
    if (e.target.className.includes("asia")) {
      chartContinent.destroy();
      drawChart(asiaConfirmed, asiaName);
      return "asia";
    }
    else if (e.target.className.includes("america")) {
      chartContinent.destroy();
      drawChart(americaConfirmed, americaName);
      return "america";
    }
    else if (e.target.className.includes("europe")) {
      chartContinent.destroy();
      drawChart(europeConfirmed, europeName);
      return "europe";
    }
    else if (e.target.className.includes("africa")) {
      chartContinent.destroy();
      drawChart(africaConfirmed, africaName);
      return "africa";
    }
    else if (e.target.className.includes("oceania")) {
      chartContinent.destroy();
      drawChart(oceaniaConfirmed, oceaniaName);
      return "oceania";
    }
  })
}

async function showStatsByCase() {
  contiDiv1.addEventListener("click", (e2) => {
    console.log(e2.target.className);
    if (e2.target.className.includes("confirmed")) {
      console.log(asiaConfirmed);
      chartContinent.destroy();
      drawChart(asiaConfirmed, asiaName);
    }
    else if (e2.target.className.includes("deaths")) {
      console.log(asiaDeaths);
      chartContinent.destroy();
      drawChart(asiaDeaths, asiaName);
    }
    else if (e2.target.className.includes("recovered")) {
      console.log(asiaRecoverd);
      chartContinent.destroy();
      drawChart(asiaRecoverd, asiaName);
    }
    else if (e2.target.className.includes("critial")) {
      console.log(asiaCriticalCondition);
      chartContinent.destroy();
      drawChart(asiaCriticalCondition, asiaName);
    }

  })

}


//hilas show stat --make it appear onload 
// async function showStat() {
//   asiaButton.addEventListener('click', (e) => {
//     chartContinent.destroy();
//     // console.log(e.target.className);
//     if(e.target.className.contains("asia")){
//       drawChart(asiaConfirmed, asiaName);
//     }
//     // else if(e.target.className.contains("america"))
//     asiaDeathButton.addEventListener("click",()=>{
//       chartContinent.destroy();
//       drawChart(asiaDeaths, asiaName);
//     })
//   });

function drawChart(covidData, continent) {
  chartContinent = new Chart(graph, {
    type: 'bar',
    data: {
      labels: continent,
      datasets: [
        {
          label: 'covid statisitc',
          data: covidData,
        },
      ],
    },
    options: {},
  });
}


async function main() {
  let allCountriesArr = await getCountry();
  allCountriesArr = await getConti(allCountriesArr);
  allCountriesArr = newArrOfRegion(allCountriesArr);
  await showStat();
  await showStatsByCase();
}
main();