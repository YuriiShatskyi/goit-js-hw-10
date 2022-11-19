import './css/styles.css';
var debounce = require('lodash.debounce');
import fetchCountry from "./fetchCounties";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
   
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(event) {
    event.preventDefault()

    const searchCountry = refs.input.value.trim();

    if (!searchCountry) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
    return;  
    }
    
    fetchCountry(searchCountry)
        
        .then(renderCountries)
        .catch(notFindError);
}

function renderCountries(country) {

    
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    if (country.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }

    if (country.length >= 2 && country.length <= 10) {
        const list = country.map(({flags, name}) => {
            return `<li class="country-list__item"><img class="mini-flag" src="${flags.svg}" alt="" width="50" height="40"><h2 class="country-list__title">${name.official}</h2></li>`
        }).join('');
      refs.countryList.innerHTML = list;
    }

    
 if (country.length === 1) {
     const markup = country
      .map(({ flags, name, capital, population, languages }) => {
         
     return `<div>
            <img  src="${flags.svg}" alt="${name.official}" width="70" height="50">
            <h2>${name.official}</h2>
            <p>Capital: ${capital}</p>
            <p>Population: ${population}</p>
            <p>Languages: ${Object.values(languages)}</p>
            </div>`;
       
    })
    .join("");
  refs.countryInfo.innerHTML = markup;
}
 }

    function notFindError(error) {
        Notiflix.Notify.failure("Oops, there is no country with that name");
    }


