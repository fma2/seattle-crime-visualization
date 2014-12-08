var countofIncidentsbyMonthSodaUrl ="https://data.seattle.gov/resource/3k2p-39jp.json?$select=date_trunc_ym(event_clearance_date) AS month, count(*) AS total&$group=month&$where=within_box(incident_location, 47.615152, -122.351639, 47.575152, -122.3116390)";
var typesOfIncidentsSodaUrl = "https://data.seattle.gov/resource/3k2p-39jp.json?$where=within_box(incident_location, 47.615152, -122.351639, 47.575152, -122.3116390)&$select=event_clearance_group";
var totalCountSodaUrl = "https://data.seattle.gov/resource/3k2p-39jp.json?$where=within_box(incident_location, 47.615152, -122.351639, 47.575152, -122.3116390)&$select=count(*)";

//Overall count
$.getJSON(totalCountSodaUrl, function(data) {
	var count;
	for (i=0; i<data.length; i++) {
		count = data[i].count
		console.log(count)
	}

})

// Pie Chart
google.load("visualization", "1", {packages:["corechart"]});

function drawIncidentsPieChart(url) {
	var incidentsCount; var programsArr; var data;
	var options = {
    legend: 'none',
    slices: { 2: {offset: 0.4},
              8: {offset: 0.2},
              7: {offset: 0.1},
              0: {offset: 0.3}
            },
    width: 400,
    height: 375,
    pieSliceText: 'percentage',
    // top: 0,
    // left: 0
  	}
	$.getJSON(url, function(data) {
		incidentsCount = countIncidents(data);
		programsArr = prepareIncidentsCount(incidentsCount);
		data = google.visualization.arrayToDataTable(programsArr);
		chart = new google.visualization.PieChart(document.getElementById('piechart'));
		chart.draw(data, options);
	})
}

function countIncidents(data){
	var incidentsCount = {};
	for (i=0; i<data.length; i++)	{
			var issue = data[i].event_clearance_group;
			incidentsCount[issue] = 0;
	}
	for (i=0; i<data.length; i++) {
		var issue = data[i].event_clearance_group;
		incidentsCount[issue] += 1;	
	}
	return incidentsCount;
}

function prepareIncidentsCount(hsh) {
  var incidentsArr = new Array()
  incidentsArr.push(['Issue', 'Number of Times '])
  for (var k in hsh) {
    incidentsArr.push([k, hsh[k]]);
  }
  return incidentsArr
}

setTimeout(function(){
	drawIncidentsPieChart(typesOfIncidentsSodaUrl);
}, 2000);


//Line Graph
function drawDatesLineChart(url) {
	var options = {
		width: 1100,
		height: 563,
		hAxis: {
			title: 'Year-Month'
		},
		vAxis: {
			title: 'Number of Incidents'
		},
		legend: 'none'
	}
	$.getJSON(url, function(data) {
		var datesIncidentsArr = prepareDatesData(data);
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'X');
    data.addColumn('number', 'Number of Incidents');
    data.addRows(datesIncidentsArr);
		chart = new google.visualization.LineChart(document.getElementById('linechart'))
		chart.draw(data, options);
	});
}

function prepareDatesData(data) {
	var datesIncidentsArr = new Array ()
	for (i=0; i< data.length-1; i++) {
			var month = data[i].month.split("T")[0];
			var noOfIncidents = data[i].total;
			datesIncidentsArr.push([month, parseInt(noOfIncidents)]);
	}
	return datesIncidentsArr;
}
setTimeout(function(){
	drawDatesLineChart(countofIncidentsbyMonthSodaUrl);
}, 2000);

