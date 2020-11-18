'use strict';

function displayResults(responseJson) {
    console.log(responseJson);
    // if there are previous results, remove them
    $('#results-list').empty();
    responseJson.forEach(function(repo) {
    $('#results-list').append(`<li>${repo.name} <a href="${repo.html_url}" target="_blank">Link to Repo</a></li>`);
    })
    //display the results section  
    $('#results').removeClass('hidden');
}

function getRepos(user) {
    const url = `https://api.github.com/users/${user}/repos`;

    console.log(url);

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function handleSubmit() {
    $('form').submit(event => {
      event.preventDefault();
      const user = $('#js-user').val();
      getRepos(user);
    });
}

$(handleSubmit);