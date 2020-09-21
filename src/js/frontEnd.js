
// import { showLoadingGif } from './helpers.js'

// HTML ELEMENTS
let addUserIdButton = document.getElementById('addUserIdButton')
addUserIdButton.addEventListener('click', addUserIdInput)

let generatePlaylistButton = document.getElementById('generatePlaylistButton')
generatePlaylistButton.addEventListener('click', generatePlaylist)



// DATA
const data = [
  {track: 'Never Gonna Give You Up', artist: 'Rick Astley', album: 'Whenever You Need Somebody', year: '1987'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
]



// FUNCTIONS

function addUserIdInput() {
  let inputCont = document.getElementById('input-cont')
  let input = document.createElement('input')
  input.classList.add('form-control', 'my-2')
  input.placeholder = "User ID"
  inputCont.appendChild(input)
}



function removeUserIdInput() {

}



function generatePlaylist() {
  showLoadingGif('loadingPlaylistGif', 2000)
  showPlaylist()

}




function showElement(el) {
  el.style.display = "block"
}

function hideElement(el) {
  el.style.display = "none"
}

function showLoadingGif(id, time) {
  let loadingGif = document.getElementById(id)
  showElement(loadingGif)
  setTimeout(() => {
    hideElement(loadingGif)
  }, time);
}





