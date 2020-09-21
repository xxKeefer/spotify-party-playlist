
// DATA
const data = [
  {track: 'Never Gonna Give You Up', artist: 'Rick Astley', album: 'Whenever You Need Somebody', year: '1987'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
  {track: 'Underwear Goes Inside the Pants', artist: 'Lazyboy', album: 'Lazyboy TV', year: '2004'}, 
]

// global var of number of user inputs on page
var userCount = 3

// HTML ELEMENTS and ONCLICK LISTENERS
let addUserIdButton = document.getElementById('addUserIdButton')
addUserIdButton.addEventListener('click', () => {
  addUserIdInput(userCount)
  userCount++
})

let generatePlaylistButton = document.getElementById('generatePlaylistButton')
generatePlaylistButton.addEventListener('click', () => {generatePlaylist(data)})

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
  input.classList.add('form-control', 'my-2', 'col-10')
  img.setAttribute('id', `user-input-${num}`)
  input.placeholder = "User ID"

  div.append(input, img)
  inputCont.appendChild(div)
}

function removeUserInput(num) {
  document.getElementById(`user-cont-${num}`).remove()
}



function generateList(data) {
  let list = document.getElementById('playlist-list')

  console.log(data);
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

  let timeout = 1000
  // clear the playlist that's there
  document.getElementById('playlist-list').innerHTML = ''

  // set the headers
  document.getElementById('right-cont-header').textContent = "Getting Your Playlist"
  document.getElementById('right-cont-sub-header').textContent = ""
  // the playlist container gets hidden because I think when it is appended it will show the list
  // hide the home page
  // show the loading gif
  // generate the playlist from the array
  generateList(data)
  hideElement('playlist-cont')
  hideElement('home-page-cont')
  showElement('loadingPlaylistGif')

  setTimeout(() => {
    document.getElementById('right-cont-header').textContent = "Success!!"
    document.getElementById('right-cont-sub-header').textContent = ""
    hideElement('loadingPlaylistGif')
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






