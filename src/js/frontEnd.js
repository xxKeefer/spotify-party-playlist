import { data } from './apiActions.js'


// HTML ELEMENTS
let addUserIdButton = document.getElementById('addUserIdButton')
addUserIdButton.addEventListener('click', addUserIdInput)

let generatePlaylistButton = document.getElementById('generatePlaylistButton')
generatePlaylistButton.addEventListener('click', generatePlaylist)




// FUNCTIONS

function addUserIdInput() {
  let inputCont = document.getElementById('input-cont')
  let input = document.createElement('input')
  input.classList.add('form-control', 'my-2')
  input.placeholder = "User ID"
  inputCont.appendChild(input)
}



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
  document.getElementById('playlist-list').innerHTML = ''

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
  document.getElementById(id).classList.remove('d-none')
}

function hideElement(id) {
  document.getElementById(id).classList.add('d-none')
}





