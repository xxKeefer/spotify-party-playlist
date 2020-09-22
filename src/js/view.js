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
  let largestArr = dataArray.reduce((prev, next) =>
    prev.length < next.length ? next : prev
  );

  // get only the artists out of the smallest array
  // then get the unique values from the array
  let largeArtist = largestArr.map((el) => el.artist);
  let largeArtistUniq = Array.from(new Set(largeArtist));

  // get the other arrays that aren't the smallest and flatten them into one array
  // get only the artists out of that flattened array of other arrays
  // get the unique values out of that array
  let flattened = dataArray.filter((arr) => arr != largestArr).flat();
  let allArtistsFlat = flattened.map((el) => el.artist);
  let allArtistsFlatUniq = Array.from(new Set(allArtistsFlat));

  let filteredArtists = [];

  // loop through the smallest array of artists
  // and if the other array includes an artist from the smallest array of artists
  // then push that artist to the filtered array
  for (let i = 0; i < largeArtistUniq.length; i++) {
    const element = largeArtistUniq[i];
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

  filteredArray = filteredArray.sort(function (a, b) {
    let artistA = a.artist.toUpperCase();
    let artistB = b.artist.toUpperCase();
    if (artistA < artistB) return -1;
    if (artistA > artistB) return 1;
    return 0;
  });


  alert(filteredArray.length)

  return filteredArray;

  // let commonArrays = [];
  // let flatData = data.flat();
  // do {
  //   let compare = data.shift();
  //   for (let user of data) {
  //     let compareArtists = compare.map((song) => song.artist);
  //     let userArtists = user.map((song) => song.artist);
  //     let common = compareArtists.filter((item) => userArtists.includes(item));
  //     commonArrays.push(common);
  //   }
  // } while (data.length > 1);
  // let commonArtists = Array.from(new Set(commonArrays.flat()));
  // let filteredData = flatData.filter((song) =>
  //   commonArtists.includes(song.artist)
  // );

  // let test = filteredData.sort(function (a, b) {
  //   let artistA = a.artist.toUpperCase();
  //   let artistB = b.artist.toUpperCase();
  //   if (artistA < artistB) return -1;
  //   if (artistA > artistB) return 1;
  //   return 0;
  // });

  // test = Array.from(new Set(test));

  // alert(test.length)

  // return test


}

function generateList(dataArray) {
  let list = document.getElementById("playlist-list");

  let data = filterLists(dataArray);

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

  setTimeout(() => {
    if (generateList(data)) {
      document.getElementById("right-cont-header").textContent = "Success!!";
      document.getElementById("right-cont-sub-header").textContent =
        "Here's your banger playlist!";
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
  hideElement("playlist-cont");
  hideElement("chart-cont");
  showElement("home-page-cont");
  showElement("form-cont");
  hideElement("not-found");
}

function showElement(id) {
  document.getElementById(id).classList.remove("d-none");
}

function hideElement(id) {
  document.getElementById(id).classList.add("d-none");
}
