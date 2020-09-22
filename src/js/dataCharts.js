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


let backgroundColors = [
  'rgba(255, 99, 132, 0.4)',
  'rgba(54, 162, 235, 0.4)',
  'rgba(255, 206, 86, 0.4)',
  'rgba(75, 192, 192, 0.4)',
  'rgba(153, 102, 255, 0.4)',
  'rgba(255, 159, 64, 0.4)'
]

let borderColors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
]



var myBarChart = document.getElementById('myBarChart').getContext('2d');
var barChart = new Chart(myBarChart, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


var backgroundColors2 = [
  'rgba(255, 99, 132, 0.4)',
  'rgba(54, 162, 235, 0.4)',
  'rgba(255, 206, 86, 0.4)',
]

var borderColors2 = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
]

// window.chartColors = {
// 	red: 'rgb(255, 99, 132)',
// 	orange: 'rgb(255, 159, 64)',
// 	yellow: 'rgb(255, 205, 86)',
// 	green: 'rgb(75, 192, 192)',
// 	blue: 'rgb(54, 162, 235)',
// 	purple: 'rgb(153, 102, 255)',
// 	grey: 'rgb(201, 203, 207)'
// };

// var dataSet = getNumTracksByUser()

// var pieDataSet = dataSet[0]
// var pieLabels = dataSet[1]

var randomData = [10, 20, 30]
var randomLabels = ['Red', 'Blue', 'Yellow']

let pieData = {
  datasets: [{
      data: randomData,
      backgroundColor: backgroundColors2,
      borderWidth: 1,
  }],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: randomLabels,
};

let radarData = {
  datasets: [{
      data: randomData,
      backgroundColor: backgroundColors2,
      borderColor: borderColors2,
      borderWidth: 1,
  }],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [
      'Red',
      'Blue',
      'Yellow'
  ]
};

let lineData = {
  datasets: [{
      data: randomData,
      backgroundColor: backgroundColors2,
      borderColor: borderColors2,
      borderWidth: 1,
  }],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [
      'Red',
      'Blue',
      'Yellow'
  ]
};


var myPieChart = document.getElementById('myPieChart').getContext('2d');
var pieChart = new Chart(myPieChart, {
  type: 'pie',
  data: pieData,
  // options: options
});



var myRadarChart = document.getElementById('myRadarChart').getContext('2d');
var radarChart = new Chart(myRadarChart, {
  type: 'radar',
  data: radarData,
  // options: options
});



var myLineChart = document.getElementById('myLineChart').getContext('2d');
var lineChart = new Chart(myLineChart, {
  type: 'line',
  data: lineData,
  // options: options
});




var globalColourStrings = {
  aliceblue: 'rgba(240, 248, 255, 1)',
  antiquewhite: 'rgba(250, 235, 215, 1)',
  aqua: 'rgba(0, 255, 255, 1)',
  aquamarine: 'rgba(127, 255, 212, 1)',
  azure: 'rgba(240, 255, 255, 1)',
  beige: 'rgba(245, 245, 220, 1)',
  bisque: 'rgba(255, 228, 196, 1)',
  black: 'rgba(0, 0, 0, 1)',
  blanchedalmond: 'rgba(255, 235, 205, 1)',
  blue: 'rgba(0, 0, 255, 1)',
  blueviolet: 'rgba(138, 43, 226, 1)',
  brown: 'rgba(165, 42, 42, 1)',
  burlywood: 'rgba(222, 184, 135, 1)',
  cadetblue: 'rgba(95, 158, 160, 1)',
  chartreuse: 'rgba(127, 255, 0, 1)',
  chocolate: 'rgba(210, 105, 30, 1)',
  coral: 'rgba(255, 127, 80, 1)',
  cornflowerblue: 'rgba(100, 149, 237, 1)',
  cornsilk: 'rgba(255, 248, 220, 1)',
  crimson: 'rgba(220, 20, 60, 1)',
  cyan: 'rgba(0, 255, 255, 1)',
  darkblue: 'rgba(0, 0, 139, 1)',
  darkcyan: 'rgba(0, 139, 139, 1)',
  darkgoldenrod: 'rgba(184, 134, 11, 1)',
  darkgray: 'rgba(169, 169, 169, 1)',
  darkgreen: 'rgba(0, 100, 0, 1)',
  darkgrey: 'rgba(169, 169, 169, 1)',
  darkkhaki: 'rgba(189, 183, 107, 1)',
  darkmagenta: 'rgba(139, 0, 139, 1)',
  darkolivegreen: 'rgba(85, 107, 47, 1)',
  darkorange: 'rgba(255, 140, 0, 1)',
  darkorchid: 'rgba(153, 50, 204, 1)',
  darkred: 'rgba(139, 0, 0, 1)',
  darksalmon: 'rgba(233, 150, 122, 1)',
  darkseagreen: 'rgba(143, 188, 143, 1)',
  darkslateblue: 'rgba(72, 61, 139, 1)',
  darkslategray: 'rgba(47, 79, 79, 1)',
  darkslategrey: 'rgba(47, 79, 79, 1)',
  darkturquoise: 'rgba(0, 206, 209, 1)',
  darkviolet: 'rgba(148, 0, 211, 1)',
  deeppink: 'rgba(255, 20, 147, 1)',
  deepskyblue: 'rgba(0, 191, 255, 1)',
  dimgray: 'rgba(105, 105, 105, 1)',
  dimgrey: 'rgba(105, 105, 105, 1)',
  dodgerblue: 'rgba(30, 144, 255, 1)',
  firebrick: 'rgba(178, 34, 34, 1)',
  floralwhite: 'rgba(255, 250, 240, 1)',
  forestgreen: 'rgba(34, 139, 34, 1)',
  fuchsia: 'rgba(255, 0, 255, 1)',
  gainsboro: 'rgba(220, 220, 220, 1)',
  ghostwhite: 'rgba(248, 248, 255, 1)',
  gold: 'rgba(255, 215, 0, 1)',
  goldenrod: 'rgba(218, 165, 32, 1)',
  gray: 'rgba(128, 128, 128, 1)',
  green: 'rgba(0, 128, 0, 1)',
  greenyellow: 'rgba(173, 255, 47, 1)',
  grey: 'rgba(128, 128, 128, 1)',
  honeydew: 'rgba(240, 255, 240, 1)',
  hotpink: 'rgba(255, 105, 180, 1)',
  indianred: 'rgba(205, 92, 92, 1)',
  indigo: 'rgba(75, 0, 130, 1)',
  ivory: 'rgba(255, 255, 240, 1)',
  khaki: 'rgba(240, 230, 140, 1)',
  lavender: 'rgba(230, 230, 250, 1)',
  lavenderblush: 'rgba(255, 240, 245, 1)',
  lawngreen: 'rgba(124, 252, 0, 1)',
  lemonchiffon: 'rgba(255, 250, 205, 1)',
  lightblue: 'rgba(173, 216, 230, 1)',
  lightcoral: 'rgba(240, 128, 128, 1)',
  lightcyan: 'rgba(224, 255, 255, 1)',
  lightgoldenrodyellow: 'rgba(250, 250, 210, 1)',
  lightgray: 'rgba(211, 211, 211, 1)',
  lightgreen: 'rgba(144, 238, 144, 1)',
  lightgrey: 'rgba(211, 211, 211, 1)',
  lightpink: 'rgba(255, 182, 193, 1)',
  lightsalmon: 'rgba(255, 160, 122, 1)',
  lightseagreen: 'rgba(32, 178, 170, 1)',
  lightskyblue: 'rgba(135, 206, 250, 1)',
  lightslategray: 'rgba(119, 136, 153, 1)',
  lightslategrey: 'rgba(119, 136, 153, 1)',
  lightsteelblue: 'rgba(176, 196, 222, 1)',
  lightyellow: 'rgba(255, 255, 224, 1)',
  lime: 'rgba(0, 255, 0, 1)',
  limegreen: 'rgba(50, 205, 50, 1)',
  linen: 'rgba(250, 240, 230, 1)',
  magenta: 'rgba(255, 0, 255, 1)',
  maroon: 'rgba(128, 0, 0, 1)',
  mediumaquamarine: 'rgba(102, 205, 170, 1)',
  mediumblue: 'rgba(0, 0, 205, 1)',
  mediumorchid: 'rgba(186, 85, 211, 1)',
  mediumpurple: 'rgba(147, 112, 219, 1)',
  mediumseagreen: 'rgba(60, 179, 113, 1)',
  mediumslateblue: 'rgba(123, 104, 238, 1)',
  mediumspringgreen: 'rgba(0, 250, 154, 1)',
  mediumturquoise: 'rgba(72, 209, 204, 1)',
  mediumvioletred: 'rgba(199, 21, 133, 1)',
  midnightblue: 'rgba(25, 25, 112, 1)',
  mintcream: 'rgba(245, 255, 250, 1)',
  mistyrose: 'rgba(255, 228, 225, 1)',
  moccasin: 'rgba(255, 228, 181, 1)',
  navajowhite: 'rgba(255, 222, 173, 1)',
  navy: 'rgba(0, 0, 128, 1)',
  oldlace: 'rgba(253, 245, 230, 1)',
  olive: 'rgba(128, 128, 0, 1)',
  olivedrab: 'rgba(107, 142, 35, 1)',
  orange: 'rgba(255, 165, 0, 1)',
  orangered: 'rgba(255, 69, 0, 1)',
  orchid: 'rgba(218, 112, 214, 1)',
  palegoldenrod: 'rgba(238, 232, 170, 1)',
  palegreen: 'rgba(152, 251, 152, 1)',
  paleturquoise: 'rgba(175, 238, 238, 1)',
  palevioletred: 'rgba(219, 112, 147, 1)',
  papayawhip: 'rgba(255, 239, 213, 1)',
  peachpuff: 'rgba(255, 218, 185, 1)',
  peru: 'rgba(205, 133, 63, 1)',
  pink: 'rgba(255, 192, 203, 1)',
  plum: 'rgba(221, 160, 221, 1)',
  powderblue: 'rgba(176, 224, 230, 1)',
  purple: 'rgba(128, 0, 128, 1)',
  rebeccapurple: 'rgba(102, 51, 153, 1)',
  red: 'rgba(255, 0, 0, 1)',
  rosybrown: 'rgba(188, 143, 143, 1)',
  royalblue: 'rgba(65, 105, 225, 1)',
  saddlebrown: 'rgba(139, 69, 19, 1)',
  salmon: 'rgba(250, 128, 114, 1)',
  sandybrown: 'rgba(244, 164, 96, 1)',
  seagreen: 'rgba(46, 139, 87, 1)',
  seashell: 'rgba(255, 245, 238, 1)',
  sienna: 'rgba(160, 82, 45, 1)',
  silver: 'rgba(192, 192, 192, 1)',
  skyblue: 'rgba(135, 206, 235, 1)',
  slateblue: 'rgba(106, 90, 205, 1)',
  slategray: 'rgba(112, 128, 144, 1)',
  slategrey: 'rgba(112, 128, 144, 1)',
  snow: 'rgba(255, 250, 250, 1)',
  springgreen: 'rgba(0, 255, 127, 1)',
  steelblue: 'rgba(70, 130, 180, 1)',
  tan: 'rgba(210, 180, 140, 1)',
  teal: 'rgba(0, 128, 128, 1)',
  thistle: 'rgba(216, 191, 216, 1)',
  tomato: 'rgba(255, 99, 71, 1)',
  turquoise: 'rgba(64, 224, 208, 1)',
  violet: 'rgba(238, 130, 238, 1)',
  wheat: 'rgba(245, 222, 179, 1)',
  white: 'rgba(255, 255, 255, 1)',
  whitesmoke: 'rgba(245, 245, 245, 1)',
  yellow: 'rgba(255, 255, 0, 1)',
  yellowgreen: 'rgba(154, 205, 50, 1)'
}


var globalColourArrays = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
}
