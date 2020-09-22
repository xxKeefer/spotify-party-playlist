export function getUserInputs() {
  let inputs = document.querySelectorAll(".user-input");
  let arr = Array.from(inputs);
  arr = arr.filter((x) => x.value != "");
  if (arr.length < 2) {
    alert("There is an empty input. Please provide at least 2 user IDs.");
    return false;
  }
  return arr.map((el) => el.value);
}

export default async () => {
  let userArray = getUserInputs();
  let apiCalls = [];

  try {
    userArray.forEach((user) => {
      apiCalls.push(processApiData(user));
    });
    const userDataArray = await Promise.all(apiCalls);
    for (let res of userDataArray) {
      if (res.hasOwnProperty("error")) {
        console.log({ res });
        return res;
      }
    }
    return userDataArray;
  } catch (e) {
    console.error(e);
  }
};
