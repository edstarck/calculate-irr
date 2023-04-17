export const fetchData = (url) => {
  return fetch(url).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw `error with status ${response.status}`;
    }
  });
};
