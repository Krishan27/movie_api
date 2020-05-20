var request = require('request');
const axios = require('axios');

var getMovies = async function (searchText){

  var options = {
    'method': 'GET',
    'url': 'http://www.omdbapi.com/?apikey=30a29aa0&s='+searchText,
  };
  try {
    const response = await axios.get('http://www.omdbapi.com/?apikey=30a29aa0&s='+searchText);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.body);
  }


};


function getMovie(movieId){

  router.get('http://www.omdbapi.com?i='+movieId)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {getMovie, getMovies};

module.exports = {
  getMovie,
  getMovies,
}
