// AUTHORIZATION
// this function calls the token endpoint to generate an access token

const getAuthToken = async () => {
  // a 64bit encoded "client_id:client_secret"
  const encodedSecret =
    "YWQxYjIzNzIyNTNiNDgyMmI0ZGIyNTE2MzBjZjM3Yjc6ZWY4NDI4ZmVlZWJhNDE1NDhhYTk4Y2RjNzI2YzAzNjc=";

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic " + encodedSecret);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  try {
    let raw = await fetch(
      "https://accounts.spotify.com/api/token",
      requestOptions
    );
    let res = await raw.json();
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
  }
};

// this function grabs the access token then passes it to whatever apiCall you are making
const getDataFromSpotify = async (apiCall, userId) => {
  let auth = await getAuthToken();
  apiCall(auth.access_token, userId);
};

// this gets the json data from the endpoint specified
const fetchEndpoint = async (token, endPoint) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    let raw = await fetch(
      "https://api.spotify.com/v1/" + endPoint,
      requestOptions
    );
    let res = await raw.json();
    console.log(res);
    data.innerHTML = raw;
  } catch (e) {
    console.error(e);
  }
};

// takes a user id and playlist name and returns the playlist id
// optional: limit and offset if target playlist is deeper in list
const getPlaylistId = async (
  userId,
  playlistName = "publicLiked",
  limit = 50,
  offset = 0
) => {
  let endpointUrl = `https://api.spotify.com/v1/users/${userId}/playlists?limit=${limit}&offset=${offset}`;
  let token = getAuthToken;

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    let raw = await fetch(endpointUrl, requestOptions);
    let res = await raw.json();
    let playlistId;
    for (playlist of res) {
      playlist.name === playlistName ? (playlistId = playlist.id) : "";
    }
    console.log({ playlistId, playlistName });
    return playlistId;
  } catch (e) {
    console.error(e);
  }
};
