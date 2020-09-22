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
  let userNames = Array.from(new Set(data.map((el) => el.username)));
  for (let user of userNames) {
    let contributed = data.filter((song) => song.username === user);
    dataSet.push(contributed.length);
  }
  return [userNames, dataSet];
};

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});
