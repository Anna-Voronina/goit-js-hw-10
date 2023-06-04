export function createSelectOption(breeds) {
  const breedsArr = breeds.map(breed => {
    return `<option value="${breed.id}">${breed.name}</option>`;
  });

  return breedsArr.join('');
}

export function createBreedCard(breed) {
  return `<img class="cat-img" src="${breed[0].url}" alt="${breed[0].breeds[0].name}" />
      <div class="cat-description">
       <h2 class="cat-name">${breed[0].breeds[0].name}</h2>
       <p class="">${breed[0].breeds[0].description}</p>
       <p>
       <span class="cat-temperament">Temperament:</span>
        ${breed[0].breeds[0].temperament}
      </p>
      </div>`;
}
