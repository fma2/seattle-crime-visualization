
// API Call
var sodaUrls = "https://data.seattle.gov/resource/3k2p-39jp.json?$where=within_box(incident_location, 47.615152, -122.351639, 47.575152, -122.3116390)&$limit=500";
var sodaUrlsecond1000 = "https://data.seattle.gov/resource/3k2p-39jp.json?$where=within_box(incident_location, 47.615152, -122.351639, 47.575152, -122.311639)&$offset=1000";
var sodaUrlthird1000 = "https://data.seattle.gov/resource/3k2p-39jp.json?$where=within_box(incident_location, 47.615152, -122.351639, 47.575152, -122.311639)&$offset=2000";


google.maps.event.addDomListener(window, 'load', drawMap);
// mapCrimeData(sodaUrlfirst1000);
// mapCrimeData(sodaUrlsecond1000);
// mapCrimeData(sodaUrlthird1000);
addHeatMap(sodaUrlsecond1000);
addHeatMap(sodaUrlthird1000)
addHeatMap(sodaUrlfirst1000);

function mapCrimeData(url) {
	$.getJSON(url,function(data) {
		var data_to_map = prepareDataforMap(data);
		for (i = 0; i < data_to_map.length; i++) {
	    createMarker(data_to_map[i][0], data_to_map[i][1], data_to_map[i][2], data_to_map[i][3],data_to_map[i][4],data_to_map[i][5], data_to_map[i][6], data_to_map[i][7], map)
	  }
	});
}

var heatmap;
function addHeatMap(url) {
	$.getJSON(url,function(data) {
		var dataArr = new Array();
		var data_to_map = prepareDataforMap(data);
		for (i = 0; i < data_to_map.length; i++) {
	    dataArr.push(
	    	new google.maps.LatLng(parseFloat(data_to_map[i][0]), parseFloat(data_to_map[i][1]))
	    	)
	  }
	  console.log(dataArr)
	  var pointArray = new google.maps.MVCArray(dataArr);
		heatmap = new google.maps.visualization.HeatmapLayer({data:pointArray});
		heatmap.setMap(map);
	});
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}



var styleArray = [
{
  featureType: "all",
  stylers: [
    { saturation: -80 }
  ]
},{
  featureType: "road.arterial",
  elementType: "geometry",
  stylers: [
    { hue: "#00ffee" },
    { saturation: 50 }
  ]
},{
  featureType: "poi.business",
  elementType: "labels",
  stylers: [
    { visibility: "off" }
 	 ]
	}
];
var mapOptions = {
  center: { lat: 47.595152, lng: -122.331639},
  zoom: 13,
  styles: styleArray,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

function drawMap(){}

function prepareDataforMap(data) {
	var dataArr = new Array();
  for (i = 0; i < data.length; ++i) {
    dataArr.push([
      parseFloat(data[i].latitude), 
      parseFloat(data[i].longitude),
      data[i].hundred_block_location,
      data[i].general_offense_number,
      data[i].event_clearance_date,
      data[i].event_clearance_group,
      data[i].event_clearance_subgroup,
      data[i].event_clearance_description,
      ])
  };
  return dataArr;
};
function createMarker(latitude, longitude, hundred_block_location, general_offense_number, event_clearance_date, event_clearance_group, event_clearance_subgroup, event_clearance_description, map) {
  var point = new google.maps.LatLng(latitude, longitude);
  var marker = new google.maps.Marker({
      position: point,
      icon: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png",
      map: map,
      title: event_clearance_group
  });

   var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h3 id="firstHeading" class="firstHeading">' + event_clearance_group + '</h3>' +
      '<div id="bodyContent">'+
      '<p><b>Location: </b>' + hundred_block_location + '</p>' +
      '<p><b>Date: </b>' + event_clearance_date + '<br>' +
      '<b>Description: </b>' + event_clearance_description + '</p>' +
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({ content: contentString });
  google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(contentString);
      infowindow.open(map, marker);
  });
}

