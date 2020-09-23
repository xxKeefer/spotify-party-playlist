import apiData, { getUserInputs } from "./controller.js";
import * as chart from "./dataCharts.js";
let playlistData = async () => {
  return await apiData();
};

// global var of number of user inputs on page
var userCount = 3;

// HTML ELEMENTS and ONCLICK LISTENERS
let addUserIdButton = document.getElementById("addUserIdButton");
addUserIdButton.addEventListener("click", () => {
  addUserIdInput(userCount);
  userCount++;
});

let generatePlaylistButton = document.getElementById("generatePlaylistButton");
generatePlaylistButton.addEventListener("click", generatePlaylist);

let logoImg = document.getElementById("logo");
let logoWordsImg = document.getElementById("logo-words");
logoImg.addEventListener("click", showHomePage);
logoWordsImg.addEventListener("click", showHomePage);

// let tempDebug = document.getElementById("tempDebug");
// tempDebug.onclick = async () => {
//   let data = await playlistData();
//   data = chart.filterByCommonArtists(data);
//   let dataSet = chart.getDecadesByUser(data);
//   console.log({ dataSet });
// };

// FUNCTIONS

function addUserIdInput(num) {
  let div = document.createElement("div");
  div.classList.add("row");
  div.setAttribute("id", `user-cont-${num}`);

  let img = document.createElement("img");
  img.src = "img/times.svg";
  img.setAttribute("id", `user-remove-${num}`);
  img.classList.add("remove-user-input", "col-2");
  img.addEventListener("click", () => {
    removeUserInput(num);
  });

  let inputCont = document.getElementById("input-cont");

  let input = document.createElement("input");
  input.classList.add("form-control", "my-2", "col-10", "user-input");
  img.setAttribute("id", `user-input-${num}`);
  input.placeholder = "User ID";

  div.append(input, img);
  inputCont.appendChild(div);
}

function removeUserInput(num) {
  document.getElementById(`user-cont-${num}`).remove();
}


function generateList(dataArray) {
  let list = document.getElementById("playlist-list");

  // let data = filterLists(dataArray);
  let data = chart.filterByCommonArtists(dataArray);
  generateCharts(data);

  document.getElementById("playlist-header").textContent = `${(data.length > 0) ? data.length : "No"} Bangers Found!`;

  if (data.length < 1) {
    let item = document.createElement("li");
    item.classList.add("list-group-item", "row");
    item.textContent = "Sorry no similar songs were found.";
    list.appendChild(item);
    return false;
  }

  hideElement("not-found");

  data.forEach((element) => {
    let item = document.createElement("li");
    item.classList.add("list-group-item", "row");

    let row1 = document.createElement("div");
    row1.classList.add("row", "pl-3");
    let row2 = document.createElement("div");
    row2.classList.add("row", "pl-2");

    let imgSpan = document.createElement("span");
    imgSpan.classList.add("col-3", "d-inline");

    let img = document.createElement("img");
    img.style.width = "50%";
    img.src = "img/music_note.png";
    img.alt = "";

    let text = document.createElement("span");
    text.classList.add("d-inline", "pl-1");
    text.innerHTML = `<strong>${element.artist}: </strong> ${
      element.name.length > 30 ? element.name.slice(0, 30) : element.name
    }`;

    let link = document.createElement("a");
    link.classList.add("text-right", "col-9");
    link.style.cursor = "pointer";
    link.textContent = "Open in Spotify";
    link.href = element.link;
    link.setAttribute("target", "_blank");

    row1.appendChild(text);

    imgSpan.appendChild(img);
    row2.appendChild(imgSpan);
    row2.appendChild(link);

    item.appendChild(row1);
    item.appendChild(row2);

    list.appendChild(item);
  });

  return true;
}

async function generatePlaylist() {
  if (!getUserInputs()) return;

  let timeout = 100;
  // clear the playlist that's there
  document.getElementById("playlist-list").innerHTML = "";

  // set the headers
  document.getElementById("right-cont-header").textContent =
    "Getting Your Playlist";
  document.getElementById("right-cont-sub-header").textContent =
    "Bare with us, lot's of background things happening.";
  // the playlist container gets hidden because I think when it is appended it will show the list
  // hide the home page
  // show the loading gif
  // generate the playlist from the array
  hideElement("not-found");
  hideElement("playlist-cont");
  hideElement("home-page-cont");
  showElement("loading-cont");

  let data = await playlistData();

  if (data.hasOwnProperty('error')) {
    alert(data.msg)
    showHomePage()
    return
  }

  console.log(data);

  setTimeout(() => {
    if (generateList(data)) {
      document.getElementById("right-cont-header").textContent = "Success!!";
      document.getElementById("right-cont-sub-header").textContent =
        "And here's a data breakdown of your playlist";
      hideElement("form-cont");
      hideElement("not-found");
      showElement("playlist-cont");
      showElement("chart-cont");
    } else {
      document.getElementById("right-cont-header").textContent = "Uh Oh!";
      document.getElementById("right-cont-sub-header").textContent =
        "We didn't find any matching songs :(";
      showElement("playlist-cont");
      document.getElementById("playlist-cont").style.height = "auto";
      showElement("not-found");
    }

    hideElement("loading-cont");
  }, timeout);
}

function showHomePage() {
  document.getElementById("playlist-header").textContent = "";
  hideElement("playlist-cont");
  hideElement("chart-cont");
  hideElement("not-found");
  hideElement('loading-cont')
  showElement("home-page-cont");
  showElement("form-cont");
  // let userInputs = document.getElementsByClassName()
  for (let i = 1; i < userCount; i++) {
    let input = document.getElementById(`user-input-${i}`)
    input.value = ""
  }
  if (userCount > 3) {
    for (let i = 3; i <= userCount; i++) {
      document.getElementById(`user-cont-${i}`).remove();
    }
  }
  userCount = 3
}


function showElement(id) {
  document.getElementById(id).classList.remove("d-none");
}

function hideElement(id) {
  document.getElementById(id).classList.add("d-none");
}

// CHART STUFF


function resetChart(chart) {
  chart.reset()
}

function generateCharts(data) {
  let pieData = chart.getNumTracksByUser(data);
  let radarData = chart.getAvgPopularityByUser(data);
  let lineData = chart.getDecadesByUser(data);
  let barData = chart.getNumTracksByArtist(data);

  let amountOfColors = pieData[0].length > 10 ? pieData[0].length : 10;
  let colors = getChartColor(amountOfColors);

  generatePieChart(pieData, colors);
  if (pieData[0].length > 2) {
    generateRadarChart(radarData, colors);
    hideElement("myRadarChart-alert");
    document.getElementById('myRadarChart').style.height = '700px'

  } else {
    showElement("myRadarChart-alert");
    document.getElementById('myRadarChart').style.height = '0px'
  }
  generateLineChart(lineData, colors);
  generateBarChart(barData, colors);
}

function generatePieChart(data, colors) {
  let dataLabel = data[0];
  let dataSet = data[1];

  let pieData = {
    datasets: [
      {
        label: "Pie Chart",
        data: dataSet,
        highlight: colors.backgroundColors,
        backgroundColor: colors.backgroundColors,
        borderWidth: colors.borderWidth,
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: dataLabel,
  };

  let myPieChart = document.getElementById("myPieChart").getContext("2d");
  let pieChart = new Chart(myPieChart, {
    type: "pie",
    data: pieData,
    options: {
      responsive: true,
      title: {
        display: false,
        text: "Pie Chart",
      },
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: null,
      },
    },
  });

  logoImg.addEventListener("click", () => { resetChart(pieChart) });
  logoWordsImg.addEventListener("click", () => { resetChart(pieChart) });
}

function generateRadarChart(data, colors) {
  let dataLabel = data[0];
  let dataSet = data[1];

  let radarData = {
    datasets: [
      {
        label: "Your Banger Playlist",
        data: dataSet,
        backgroundColor: colors.backgroundColors[0],
        borderColor: colors.borderColors[0],
        borderWidth: colors.borderWidth,
        fill: true,
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: dataLabel,
  };

  let myRadarChart = document.getElementById("myRadarChart").getContext("2d");
  let radarChart = new Chart(myRadarChart, {
    type: "radar",
    data: radarData,
    options: {
      plugins: {
        filler: {
          propagate: true,
        },
      },
      scale: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  });

  logoImg.addEventListener("click", () => { resetChart(radarChart) });
  logoWordsImg.addEventListener("click", () => { resetChart(radarChart) });
}

function generateLineChart(data, colors) {
  // dataLabel is an array of strings(names)
  // dataSet is an array of arrays(of the data)
  let dataLabels = data[0];
  let dataSets = data[1];

  let dataSetArray = [];

  for (let i = 0; i < dataLabels.length; i++) {
    const label = dataLabels[i];
    const set = dataSets[i];
    const border = colors.borderColors[i];
    const width = colors.borderWidth[i];

    let obj = {
      label: label,
      data: set,
      borderColor: border,
      borderWidth: width,
      fill: false,
      lineTension: 0.4,
    };
    dataSetArray.push(obj);
  }

  let lineData = {
    datasets: dataSetArray,
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["50s", "60s", "70s", "80s", "90s", "00s", "10s", "20s"],
  };

  let myLineChart = document.getElementById("myLineChart").getContext("2d");
  let lineChart = new Chart(myLineChart, {
    type: "line",
    data: lineData,
    options: {
      responsive: true,
      title: {
        display: false,
        text: "Line Chart",
      },
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Decade",
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Preferences",
            },
          },
        ],
      },
    },
  });

  logoImg.addEventListener("click", () => { resetChart(lineChart) });
  logoWordsImg.addEventListener("click", () => { resetChart(lineChart) });
}

function generateBarChart(data, colors) {
  let dataLabel = data[0];
  let dataSet = data[1];

  let barData = {
    datasets: [
      {
        label: "Banger Playlist",
        data: dataSet,
        backgroundColor: colors.backgroundColors,
        borderColor: colors.borderColors,
        borderWidth: colors.borderWidth,
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: dataLabel,
  };

  let myBarChart = document.getElementById("myBarChart").getContext("2d");
  let barChart = new Chart(myBarChart, {
    type: "bar",
    data: barData,
    options: {
      hover: { mode: null },
      responsive: true,
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  logoImg.addEventListener("click", () => { resetChart(barChart) });
  logoWordsImg.addEventListener("click", () => { resetChart(barChart) });
}

function getChartColor(num) {
  let opacity = 0.4;
  let colorStrings = chart.globalColorStrings;
  let count = 0;
  let backgroundColors = [];
  let borderColors = [];
  let borderWidth = 1;

  while (count < num) {
    let keys = Object.keys(colorStrings);
    let border = colorStrings[keys[(keys.length * Math.random()) << 0]];

    if (!borderColors.includes(border)) {
      borderColors.push(border);
      const regex = /, 1\)/g;
      let background = border.replace(regex, `, ${opacity}`);
      backgroundColors.push(background);
    }

    count++;
  }

  return { backgroundColors, borderColors, borderWidth };
}
