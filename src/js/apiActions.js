const generatePlaylistButton = document.getElementById(
  "generatePlaylistButton"
);
const inputData = document.getElementById("user-input-1");
const output = document.getElementById("output");

import { getPlaylistId, getPlaylistItems } from "./apiInterface.js";

const getDataFromApi = async () => {
  try {
    let playlistUrl = await getPlaylistId(inputData.value);
    let playlistItems = await getPlaylistItems(playlistUrl);
    console.log({ playlistItems });
    let stringTracks;
    for (element of playlistItems) {
      stringTracks += `${element.track.name} by ${element.track.artists[0].name} has score of ${element.track.popularity}, `;
    }
    output.innerHTML = stringTracks;
  } catch (e) {
    console.error(e);
  }
};

generatePlaylistButton.onclick = getDataFromApi;

// DATA
export const data = [];
