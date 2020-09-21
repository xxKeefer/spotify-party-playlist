

let addUserIdButton = document.getElementById('addUserIdButton')
addUserIdButton.addEventListener('click', addUserIdInput)

let generatePlaylistButton = document.getElementById('generatePlaylistButton')
generatePlaylistButton.addEventListener('click', generatePlaylist)

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
  let loadingGif = document.getElementById('loadingPlaylistGif')
  
  loadingGif.style.display = "block"
  setTimeout(() => {
    loadingGif.style.display = "none"
  }, 2000);
}
