// api.js
import axios from 'axios';

const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3', // Replace with your API base URL
  params : {
    api_key : 'YOUR_API_KEY_FOR_THE_MOVIE_DB'
  },
  headers: {
    'accept' : 'application/json',
    'Authorization': 'Bearer YOUR_THE_MOVIE_DB_TOKEN', // Replace with your token
  },
});

export default movieApi;