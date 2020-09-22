import apiData from "./controller.js";
import { getUserInputs } from "./controller.js";
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

let tempDebug = document.getElementById("tempDebug");
tempDebug.onclick = async () => {
  let data = await playlistData();
  let dataSet = chart.getNumTracksByUser(data);
  console.log({ dataSet });
};

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

function filterLists(dataArray) {
  // find the smallest array in the array of arrays
  let smallestArr = dataArray.reduce((prev, next) =>
    prev.length > next.length ? next : prev
  );

  // get only the artists out of the smallest array
  // then get the unique values from the array
  let smallArtist = smallestArr.map((el) => el.artist);
  let smallArtistUniq = Array.from(new Set(smallArtist));

  // get the other arrays that aren't the smallest and flatten them into one array
  // get only the artists out of that flattened array of other arrays
  // get the unique values out of that array
  let flattened = dataArray.filter((arr) => arr != smallestArr).flat();
  let allArtistsFlat = flattened.map((el) => el.artist);
  let allArtistsFlatUniq = Array.from(new Set(allArtistsFlat));

  let filteredArtists = [];

  // loop through the smallest array of artists
  // and if the other array includes an artist from the smallest array of artists
  // then push that artist to the filtered array
  for (let i = 0; i < smallArtistUniq.length; i++) {
    const element = smallArtistUniq[i];
    if (allArtistsFlatUniq.includes(element)) {
      filteredArtists.push(element);
    }
  }

  // flatten all objects into one array to filter
  // filter that first large flattened array of objects by the artists that are in our filtered artists we just found
  let dataArrayFlatObjects = dataArray.flat();
  let filteredArray = dataArrayFlatObjects.filter((e) =>
    filteredArtists.includes(e.artist)
  );
  return filteredArray;
}

function generateList(dataArray) {
  let list = document.getElementById("playlist-list");

  // let data = filterLists(dataArray);
  let data = chart.filterByCommonArtists(dataArray);

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
    text.innerHTML = `<strong>${element.artist}: </strong> ${element.name}`;

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
    // item.appendChild(row2)
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
  hideElement("playlist-cont");
  hideElement("home-page-cont");
  showElement("loading-cont");

  let data = await playlistData();

  setTimeout(() => {
    if (generateList(data)) {
      document.getElementById("right-cont-header").textContent = "Success!!";
      document.getElementById("right-cont-sub-header").textContent =
        "Here's your banger playlist!";
      hideElement("form-cont");
      showElement("playlist-cont");
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
  hideElement("playlist-cont");
  hideElement("playlist-cont");
  showElement("home-page-cont");
}

function showElement(id) {
  document.getElementById(id).classList.remove("d-none");
}

function hideElement(id) {
  document.getElementById(id).classList.add("d-none");
}
