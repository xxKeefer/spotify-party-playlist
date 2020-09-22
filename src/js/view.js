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
  chart.processData(data);
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
  let smallestArr = dataArray.reduce((prev, next) =>
    prev.length > next.length ? next : prev
  );

  // let filteredArray = []

  // // loop through the smallest array in the list of arrays in dataArray
  // for (let i = 0; i < smallestArr.length; i++) {
  //   const smallEl = smallestArr[i];

  //   for (let j = 0; j < dataArray.length; j++) {
  //     // loop the the dataArray, and if the current element it's looking at is the smallest array, skip it
  //     // otherwise filter through the remaining elements in the dataArray
  //     if (dataArray[j] === smallestArr) {
  //       continue
  //     }
      
  //     else {

  
  //       let filter = dataArray[j].filter(el => el.artist == smallEl.artist)
              
  //       console.log('filter');
  //       console.log(filter);

  //       filteredArray.concat(filter)
  //     }
  //   }
    
  // }


  const filteredArray = smallestArr.filter((el) => {
    for (let i = 0; i < dataArray.length; i++) {
      // loop the the dataArray, and if the current element it's looking at is the smallest array, skip it
      // otherwise filter through the remaining elements in the dataArray
      if (dataArray[i] === smallestArr) {
        continue;
      } else {
        return dataArray[i].some((f) => {
          // return f.name === el.name && f.artist === el.artist;
          return f.artist === el.artist;
        });
      }
    }
  });

  return filteredArray;
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

  hideElement('not-found')

  data.forEach(element => {
    let item = document.createElement('li')
    item.classList.add('list-group-item', 'row')

    let row1 = document.createElement('div')
    row1.classList.add('row')
    let row2 = document.createElement('div')
    row2.classList.add('row')
    let row3 = document.createElement('div')
    row3.classList.add('row')

    let imgSpan = document.createElement('span')
    imgSpan.classList.add('col-3', 'd-inline')

    let img = document.createElement('img')
    img.style.width = "50%"
    img.src = 'img/music_note.png'
    img.alt = ""

    let artist = document.createElement('span')
    artist.classList.add('col-9', 'd-inline', 'm-0')
    artist.innerHTML = `<strong>${element.artist}</strong>`

    let track = document.createElement('p')
    track.classList.add('col', 'font-italic', 'm-0', 'ml-2')
    track.innerHTML = `${element.name}`

    let link = document.createElement('a')
    link.classList.add('text-right', 'col-9')
    link.style.cursor = 'pointer'
    link.textContent = 'Open in Spotify'

    row1.appendChild(artist)

    row2.appendChild(track)

    imgSpan.appendChild(img)
    row3.appendChild(imgSpan)
    row3.appendChild(link)

    item.appendChild(row1)
    item.appendChild(row2)
    item.appendChild(row3)

    list.appendChild(item)
  });

    let text = document.createElement("p");
    text.classList.add("col-8");
    text.style.display = "inline-block";
    text.innerHTML = `<strong>${element.artist}:</strong> ${element.name}`;
    text.style.margin = 0;

    let link = document.createElement("a");
    link.classList.add("text-right", "col-3");
    link.style.cursor = "pointer";
    link.textContent = "Open in Spotify";

    item.appendChild(img);
    item.appendChild(text);
    item.appendChild(link);

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
      hideElement('form-cont')
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
  hideElement('playlist-cont')
  hideElement("playlist-cont");
  showElement("home-page-cont");
}

function showElement(id) {
  document.getElementById(id).classList.remove("d-none");
}

function hideElement(id) {
  document.getElementById(id).classList.add("d-none");
}
