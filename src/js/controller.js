function getUserInputs() {
  let inputs = document.querySelectorAll(".user-input");
  let arr = Array.from(inputs);
  return arr.map((el) => el.value).filter((el) => el !== null);
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
