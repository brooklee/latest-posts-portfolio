var user= 'brookleewilson',
    key = 'PvGPyGItszq1AdYz2qNFOnFvtII8GyAn',
    api = `https://api.behance.net/v2/users/${user}/projects?client_id=${key}`;

    var data = [],
    list = $('[data-projects]')
function mountHtml(data) {
  $.each(data, function(index, value) {
    var project = value.name
    var cover = value.covers[404];
    var projectItem = `<li>
      <a href=${value.url} target="_blank">
      <img class="be-projects" src=${cover}>
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
