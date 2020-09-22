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
