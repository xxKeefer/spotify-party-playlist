import apiData from './apiActions.js'
let playlistData = async () =>{return await apiData()}

// global var of number of user inputs on page
var userCount = 3

// HTML ELEMENTS and ONCLICK LISTENERS
let addUserIdButton = document.getElementById('addUserIdButton')
addUserIdButton.addEventListener('click', () => {
  addUserIdInput(userCount)
  userCount++
})

let generatePlaylistButton = document.getElementById('generatePlaylistButton')
// generatePlaylistButton.addEventListener('click', () => {generatePlaylist(playlistData)})
generatePlaylistButton.addEventListener('click', generatePlaylist)

let logoImg = document.getElementById('logo')
let logoWordsImg = document.getElementById('logo-words')
logoImg.addEventListener('click', showHomePage)
logoWordsImg.addEventListener('click', showHomePage)



// FUNCTIONS

function addUserIdInput(num) {
  let div = document.createElement('div')
  div.classList.add('row')
  div.setAttribute('id', `user-cont-${num}`)

  let img = document.createElement('img')
  img.src = 'img/times.svg'
  img.setAttribute('id', `user-remove-${num}`)
  img.classList.add('remove-user-input', 'col-2')
  img.addEventListener('click', ()=> {removeUserInput(num)})

  let inputCont = document.getElementById('input-cont')

  let input = document.createElement('input')
  input.classList.add('form-control', 'my-2', 'col-10', 'user-input')
  img.setAttribute('id', `user-input-${num}`)
  input.placeholder = "User ID"

  div.append(input, img)
  inputCont.appendChild(div)
}

function removeUserInput(num) {
  document.getElementById(`user-cont-${num}`).remove()
}


function getUserInputs() {
  let inputs = document.querySelectorAll(".user-input");
  let arr = Array.from(inputs);
  return arr.map((el) => el.value);
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
    text.innerHTML = `<strong>${element.artist}:</strong> ${element.name}`
    text.style.margin = 0
    
    item.appendChild(img)
    item.appendChild(text)

    list.appendChild(item)
  });
}

async function generatePlaylist() {

  let timeout = 3000
  // clear the playlist that's there
  document.getElementById('playlist-list').innerHTML = ''

  // set the headers
  document.getElementById('right-cont-header').textContent = "Getting Your Playlist"
  document.getElementById('right-cont-sub-header').textContent = ""
  // the playlist container gets hidden because I think when it is appended it will show the list
  // hide the home page
  // show the loading gif
  // generate the playlist from the array

  let data = await playlistData()
  generateList(data)

  hideElement('playlist-cont')
  hideElement('home-page-cont')
  showElement('loading-cont')

  setTimeout(() => {
    document.getElementById('right-cont-header').textContent = "Success!!"
    document.getElementById('right-cont-sub-header').textContent = ""
    hideElement('loading-cont')
    showElement('playlist-cont')
  }, timeout);

}



function showHomePage() {
  hideElement('playlist-cont')
  showElement('home-page-cont')
}


function showElement(id) {
  document.getElementById(id).classList.remove('d-none')
}

function hideElement(id) {
  document.getElementById(id).classList.add('d-none')
}
