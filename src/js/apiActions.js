const getData = document.getElementById("getData");
const inputData = document.getElementById("inputData");
const output = document.getElementById("output");

const getDataFromApi = async () => {
  try {
    // track takes the form:
    // track = {
    //   name: t.track.name,
    //   artist: t.track.artists[0].name,
    //   album: t.track.album.name,
    //   release_date: t.track.album.release_date,
    //   popularity: t.track.popularity,
    //   link: t.track.external.urls.spotify,
    // };
    let tracks = await processApiData(inputData.value);

    // for (track of tracks) {
    //   let { name, artist, album, release_date, popularity, link } = track;
    //   console.log({ track });
    // }
  } catch (e) {
    console.error(e);
  }
};

getData.onclick = getDataFromApi;
