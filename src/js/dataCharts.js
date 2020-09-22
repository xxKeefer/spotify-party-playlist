export const testFunc = async (apiCall) => {
  let data = await apiCall;
  console.log(data);
};

export const processData = async (apiCall) => {
  let data = await apiCall;
  console.log(getAvgPopularity(data));
};

const getAvgPopularity = (data) => {
  data = data.flat();
  let sumPopular = data
    .map((el) => el.popularity)
    .reduce((acc, val) => acc + val, 0);
  return sumPopular / data.length;
};

export const filterByCommonArtists = (data) => {
  let commonArrays = [];
  let flatData = data.flat();
  do {
    let compare = data.shift();
    for (let user of data) {
      let compareArtists = compare.map((song) => song.artist);
      let userArtists = user.map((song) => song.artist);
      let common = compareArtists.filter((item) => userArtists.includes(item));
      commonArrays.push(common);
    }
  } while (data.length > 1);
  let commonArtists = Array.from(new Set(commonArrays.flat()));

  let filteredData = flatData.filter((song) =>
    commonArtists.includes(song.artist)
  );

  return filteredData.sort(function (a, b) {
    let artistA = a.artist.toUpperCase();
    let artistB = b.artist.toUpperCase();
    if (artistA < artistB) return -1;
    if (artistA > artistB) return 1;
    return 0;
  });
};

export const getNumTracksByUser = (data) => {
  data = filterByCommonArtists(data);
  let dataSet = [];
  let userIds = Array.from(new Set(data.map((el) => el.from_user)));
  for (let user of userIds) {
    let contributed = data.filter((song) => song.from_user === user);
    dataSet.push(contributed.length);
  }
  return dataSet;
};
