export default function findName(country) {

    return fetch(`https://restcountries.com/v3.1/name/${country}`).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);;
    } 
    return response.json();
  });
}
