var request = require('request');
const axios = require('axios');

var getMovies = async function (searchText){


  try {
    const response = await axios.get('http://www.omdbapi.com/?apikey=30a29aa0&s='+searchText);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.body);
    return []
  }


};


async function getMovie(movieId){
  try {
    const response = await axios.get('http://www.omdbapi.com/?apikey=30a29aa0&i='+movieId);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.body);
    return []
  }

};

module.exports = {getMovie, getMovies};

module.exports = {
  getMovie,
  getMovies,
}
