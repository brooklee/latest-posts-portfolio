var user= 'brookleewilson',
    key = 'PvGPyGItszq1AdYz2qNFOnFvtII8GyAn',
    api = `https://api.behance.net/v2/users/${user}/projects?client_id=${key}`;

// Dribbble access token
var dribbbleAccessToken = '1ca8ee77f40167f36538dd41f2e34c4ee07e4122f5cdfd79b2874342bb0f843b';

//behance api calls=======================
    var data = [],
    list = $('[data-be-projects]')
function mountHtml(data) {
  $.each(data, function(index, value) {
    var project = value.name
    var cover = value.covers.original;
    // var cover = value.covers.[202];
    var projectItem = `<li class="be-project">
      <a href=${value.url} target="_blank">
      <img src=${cover}>
      <div class="cover-details">
        <span class="project-title">${project}</span>
        <span class="project-labels">${value.fields}</span>
      </div>
      </a>
    </li>`;
    list.append( projectItem )
  });
}

function fetchData (){
  $.ajax({
    url: api,
    type: "get",
    // data: {projects: {}},
    dataType: "jsonp"
  }).done((response) => {
    // var expirationMS = expirationMin * 60 * 1000;
    var expirationHours = 1
    var expirationMS =  expirationHours *60*60*1000;

    // var expirationMS = 6000

    data = {data: response.projects, timestamp: new Date().getTime() + expirationMS};
    window.localStorage.setItem('behanceData',JSON.stringify(data));
    // ls2.save('behanceData', data, 1200);
    mountHtml(data.data)
  }).fail((error) => {
    console.log("Ajax request fails")
    console.log(error);
  });
}

// localStorage.removeItem('behanceData')

if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    data = JSON.parse(window.localStorage.getItem('behanceData'));
    // data = ls2.load('behanceData');


  if(data === null || data === false ) {
    fetchData()
  } else {

    if (new Date().getTime() < data.timestamp) {
      mountHtml(data.data)
    } else {
      fetchData()
    }
  }
} else {
  // Sorry! No Web Storage support..
  fetchData()
}
// Dribbble=========================================
$.ajax({
  url: 'https://api.dribbble.com/v2/user/shots?access_token='+dribbbleAccessToken,
  dataType: 'json',
  type: 'GET',
  success: function(data) {  
    if (data.length > 0) { 
      $.each(data.reverse(), function(i, val) {                
        $('#shots').prepend(
          '<a class="shot" target="_blank" href="'+ val.html_url +'" title="' + val.title + '"><img class="img-shot" src="'+ val.images.hidpi +'"/></a>'
          )
      })
    }
    else {
      $('#shots').append('<p>No shots yet!</p>');
    }
  }
});// Dribbble End=========================================