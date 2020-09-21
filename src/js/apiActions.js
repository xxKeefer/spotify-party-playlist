const getData = document.getElementById("getData");
const inputData = document.getElementById("inputData");
const output = document.getElementById("output");

const getDataFromApi = async () => {
  try {
    let playlistUrl = await getPlaylistId(inputData.value);
    let playlistItems = await getPlaylistItems(playlistUrl);
    console.log({ playlistItems });
    let stringTracks = "";
    for (track of playlistItems) {
      stringTracks += `${track.track.name} by ${track.track.artists[0].name} has score of ${track.track.popularity}, `;
    }
    output.innerHTML = stringTracks;
  } catch (e) {
    console.error(e);
  }
};

getData.onclick = getDataFromApi;
