google.load('visualization', '1', {packages: ['corechart', 'line']});
google.setOnLoadCallback(drawChart);

var listContainer = document.getElementById('startup-list');
var generateProfile = function(startup, i){
  var t = '<li><div class="startup"><span class="count">'+(i+1);
  t += '</span>';
  if (startup.avatar != null){
    t += '<img class="avatar" src="'+startup.avatar+'" />';
  } else {
    t += '<div class="avatar"></div>'
  }

  t+= '<div class="details">';
  t += '<div class="row primary"><span class="name">';
  t += startup.name;
  t += '</span><span class="bus">';
  t += startup.bus;
  t += '</span></div><div class="row secondary"><span class="score">';
  t += startup.score;
  t += '</span><span class="social">';
  if (startup.twitter != null ){
    t += '<a href="'+startup.twitter+'" target="_blank">';
    t += '<i class="icon icon-twitter"></i>';
    t += '</a>';
  } else {
    t += '<i class="icon icon-twitter icon-locked"></i>';
  }
  if (startup.fb != null){
    t += '<a href="'+startup.fb+'" target="_blank">';
    t += '<i class="icon icon-facebook"></i>';
    t += '</a>';
  } else {
    t += '<i class="icon icon-facebook icon-locked"></i>';
  }
  if (startup.insta != null){
    t += '<a href="'+startup.insta+'" target="_blank">';
    t += '<i class="icon icon-instagram"></i>';      
    t += '</a>';
  }    else {
    t += '<i class="icon icon-instagram icon-locked"></i>';   
  }             

  t += '</span></div></div></div></div>';
  return t;
};

function drawChart() {
  // Add your sheets url and range below
  var spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1j5rBewuSQma6EUSkSkWi8RamDWhyuLZM-3Zs2r2MBOE/edit?range=A1:G50";
  var query = new google.visualization.Query(spreadsheetUrl);
  query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
  var dataTable = response.getDataTable();
  dataTable.sort([{column:3, desc: true}]);

  for (var i=0, numRows = dataTable.getNumberOfRows(); i < numRows; i++ ){
    var startup = {};
    startup.name = dataTable.getValue(i,0);
    startup.avatar = dataTable.getValue(i,1);
    startup.bus = dataTable.getValue(i,2);
    startup.score = dataTable.getValue(i,3);
    startup.twitter = dataTable.getValue(i,4);
    startup.fb = dataTable.getValue(i,5);
    startup.insta = dataTable.getValue(i,6);
    console.log(startup);
    listContainer.innerHTML += generateProfile(startup, i);
  }
}
