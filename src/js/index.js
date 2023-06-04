import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import { createSelectOption, createBreedCard } from './templates.js';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  breedInfoContainer: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
};

refs.breedSelect.classList.add('is-hidden');
refs.breedInfoContainer.classList.add('is-hidden');

fetchBreeds()
  .then(breeds => {
    setTimeout(() => {
      refs.loader.classList.add('is-hidden');
      refs.breedSelect.classList.remove('is-hidden');

      refs.breedSelect.innerHTML = createSelectOption(breeds);

      new SlimSelect({
        select: '#single',
      });
    }, 500);
  })
  .catch(error => {
    refs.loader.classList.add('is-hidden');
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  });

refs.breedSelect.addEventListener('change', onBreedSelectChange);

function onBreedSelectChange(event) {
  const selectValue = event.currentTarget.value;

  fetchCatByBreed(selectValue)
    .then(breed => {
      refs.loader.classList.remove('is-hidden');
      refs.breedInfoContainer.innerHTML = '';

      setTimeout(() => {
        refs.loader.classList.add('is-hidden');
        refs.breedInfoContainer.classList.remove('is-hidden');

        refs.breedInfoContainer.innerHTML = createBreedCard(breed);
      }, 250);
    })
    .catch(error => {
      refs.loader.classList.remove('is-hidden');
      refs.breedSelect.classList.add('is-hidden');

      setTimeout(() => {
        refs.loader.classList.add('is-hidden');
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
      }, 250);
    });
}
