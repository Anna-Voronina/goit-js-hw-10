const BASE_URL = 'https://api.thecatapi.com';
const API_KEY =
  'live_58EZFxSAPDqSSkId45l3jfghh0OkcA1R8u1LmTKmcPwH5BWt5B4HTiienpJhpLhV';

export const fetchBreeds = () => {
  return fetch(`${BASE_URL}/v1/breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};

export const fetchCatByBreed = breedId => {
  const searchParams = new URLSearchParams({
    breed_ids: breedId,
    api_key: API_KEY,
  });

  return fetch(`${BASE_URL}/v1/images/search?${searchParams}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    }
  );
};
