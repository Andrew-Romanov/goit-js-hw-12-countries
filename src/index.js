import './sass/main.scss';

import showError from './js/show-error';
import fetchCountries from './js/fetch-countries';

import countriesListMarkup from './templates/countries';
import countryDataMarkup from './templates/country';

// const debounce = require('lodash.debounce');
import debounce from 'lodash.debounce';

const INPUT_DELAY = 1000;

const countryToSearchEl = document.querySelector('[name="countryToSearch"]');
const countriesContainerEl = document.querySelector('.countries-container');

countryToSearchEl.addEventListener('input', debounce(onCountryNameInput, INPUT_DELAY));

// console.log(countriesContainerEl);
     
function onCountryNameInput() {
  fetchCountries(countryToSearchEl.value)
    .then(countriesData => {

      console.log('Received data: ', countriesData);

      if (countriesData.length > 10) {
        throw new Error("Too many matches found. Enter a more specific query")
      } else if (countriesData.length === 1) {
        renderCountryInfoMarkup(countriesData);
      } else {
        renderCountriesListMarkup(countriesData);
      };

    })
    .catch(catchedError => {
      showError(catchedError);
      // console.error("Error: ", catchedError);
    });
};

function renderCountryInfoMarkup(countriesData) {
  countriesContainerEl.innerHTML = countryDataMarkup(countriesData);
};

function renderCountriesListMarkup(countriesData) {
  countriesContainerEl.innerHTML = countriesListMarkup(countriesData);
};