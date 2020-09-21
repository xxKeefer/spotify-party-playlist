
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

// function removeUserIdInput() {

// }



function generateList(data) {
  let list = document.getElementById('playlist-list')

  data.forEach(element => {
    let item = document.createElement('li')
    item.classList.add('list-group-item', 'row')
    
    let img = document.createElement('img')
    img.style = "width: 9%;"
    img.classList.add('col-2')
    img.style.display = 'inline-block'
    img.src = 'img/music_note.png'
    img.alt = ""

    let text = document.createElement('p')
    text.classList.add('col-10')
    text.style.display = 'inline-block'
    text.innerHTML = `<strong>${element.artist}:</strong> ${element.track}`
    text.style.margin = 0
    
    item.appendChild(img)
    item.appendChild(text)

    list.appendChild(item)
  });
}

function generatePlaylist() {

  let timeout = 2000

  document.getElementById('right-cont-header').textContent = "Getting Your Playlist"
  showElement('loadingPlaylistGif')
  hideElement('playlist-cont')
  generateList(data)
  
  setTimeout(() => {
    document.getElementById('right-cont-header').textContent = "Success!!"
    hideElement('loadingPlaylistGif')
    showElement('playlist-cont')
}, timeout);
}





function showElement(id) {
  document.getElementById(id).style.display = "block"
}

function hideElement(id) {
  document.getElementById(id).style.display = "none"
}


// function showElement(el) {
//   el.style.display = "block"
// }

// function hideElement(el) {
//   el.style.display = "none"
// }

// function showLoadingGif(id, time) {
//   let loadingGif = document.getElementById(id)
//   showElement(loadingGif)
//   setTimeout(() => {
//     hideElement(loadingGif)
//   }, time);
// }





