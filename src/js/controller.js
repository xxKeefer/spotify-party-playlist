export function getUserInputs() {
  let inputs = document.querySelectorAll(".user-input");
  let arr = Array.from(inputs);
  if (!checkEmptyInputFromArr(arr)) {
    alert("There is an empty input. Please provide at least 2 user IDs.")
    return false
  }
  return arr.map((el) => el.value).filter((el) => el !== null);
}

function checkEmptyInputFromArr(arr) {
  arr.forEach(element => {
    return (element.value === '') ? false : true
  });
}

export default async () => {
  let userArray = await getUserInputs();
  let apiCalls = [];

  try {
    userArray.forEach((user) => {
      apiCalls.push(processApiData(user));
    });
    const userDataArray = await Promise.all(apiCalls);
    return userDataArray;
  } catch (e) {
    console.error(e);
  }
};
