

// export default async (userArr) => {
//   let dataArr = []
//   userArr.forEach(person => {
//     let userData = await processApiData(person);
//     dataArr.push(userData)
//     // try {
//     //   let userData = await processApiData(userId);
//     //   dataArr.push(userData)
//     // } catch (e) {
//     //   console.error(e);
//     // }
//   });
//   return dataArr
// };

export default async () => {
  const input = document.getElementById('user-input-1')
    try {
      return await processApiData(input.value);
    } catch (e) {
      console.error(e);
    }
};

