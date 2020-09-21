

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

export function showLoadingGif(id, time) {
  let loadingGif = document.getElementById(id)

  // showElement(loadingGif)
  loadingGif.style.display = "block"

  setTimeout(() => {
    // hideElement(loadingGif)
    loadingGif.style.display = "none"
  }, time);
}


function showElement(el) {
  return el.style.display = "block"
}

function hideElement(el) {
  return el.style.display = "none"
}


export { showLoadingGif }