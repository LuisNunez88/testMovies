const url = 'https://www.omdbapi.com/?apikey=5eec5adc&s=love&type=movie&y=2020';

export const fetchMovies = async page => {
  try {
    const res = await fetch(`${url}&page=${page}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
