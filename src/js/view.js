import apiData from './controller.js'
import { getUserInputs } from './controller.js'
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


function filterLists(dataArray) {

  let smallestArr = dataArray.reduce((prev, next) => prev.length > next.length ? next : prev)

  const filteredArray = smallestArr.filter((el) => {

    for (let i = 0; i < dataArray.length; i++) {
      // loop the the dataArray, and if the current element it's looking at is the smallest array, skip it
      // otherwise filter through the remaining elements in the dataArray
      if (dataArray[i] === smallestArr) {
        continue
      } 
      
      else {
        return dataArray[i].some((f) => {
          return f.name === el.name && f.artist === el.artist;
        });
      }
    }
  });

  return filteredArray
}


function generateList(dataArray) {
  let list = document.getElementById('playlist-list')

  let data = filterLists(dataArray)

  if (data.length < 1) {
    let item = document.createElement('li')
    item.classList.add('list-group-item', 'row')
    item.textContent = "Sorry no similar songs were found."
    list.appendChild(item)
    return false
  }

  hideElement('not-found')

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

  return true

}

async function generatePlaylist() {

  if (!getUserInputs()) return

  let timeout = 100
  // clear the playlist that's there
  document.getElementById('playlist-list').innerHTML = ''

  // set the headers
  document.getElementById('right-cont-header').textContent = "Getting Your Playlist"
  document.getElementById('right-cont-sub-header').textContent = ""
  // the playlist container gets hidden because I think when it is appended it will show the list
  // hide the home page
  // show the loading gif
  // generate the playlist from the array
  hideElement('playlist-cont')
  hideElement('home-page-cont')
  showElement('loading-cont')

  let data = await playlistData()

  setTimeout(() => {

    if (generateList(data)) {
      document.getElementById('right-cont-header').textContent = "Success!!"
      document.getElementById('right-cont-sub-header').textContent = ""
      showElement('playlist-cont')
    } else {
      document.getElementById('right-cont-header').textContent = "Uh Oh!"
      showElement('playlist-cont')
      document.getElementById('playlist-cont').style.height = "auto"
      showElement('not-found')
    }

    hideElement('loading-cont')
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
