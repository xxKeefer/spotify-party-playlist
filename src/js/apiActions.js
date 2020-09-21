
export default async () => {
  const input = document.getElementById('user-input-1')
    try {
      return await processApiData(input.value);
    } catch (e) {
      console.error(e);
    }
};