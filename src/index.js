import './sass/main.scss';

import showError from './js/show-error';
import fetchCountries from './js/fetch-countries';

import countriesListMarkup from './templates/countries';
import countryDataMarkup from './templates/country';

import debounce from 'lodash.debounce';

const INPUT_DELAY = 1000;

const countryToSearchEl = document.querySelector('[name="countryToSearch"]');
const countriesContainerEl = document.querySelector('.countries-container');

countryToSearchEl.addEventListener('input', debounce(onCountryNameInput, INPUT_DELAY));

function onCountryNameInput() {

  if (countryToSearchEl.value === '') {
    resetMarkup();
    return;
  };

  fetchCountries(countryToSearchEl.value)
    .then(countriesData => {

      // console.log('Received data: ', countriesData);

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
    });
};

function resetMarkup() {
  countriesContainerEl.innerHTML = '';
};

function renderCountryInfoMarkup(countriesData) {
  countriesContainerEl.innerHTML = countryDataMarkup(countriesData);
};

function renderCountriesListMarkup(countriesData) {
  countriesContainerEl.innerHTML = countriesListMarkup(countriesData);
};