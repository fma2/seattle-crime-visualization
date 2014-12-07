
// API Call
var sodaUrl = "https://data.seattle.gov/resource/3k2p-39jp.json?$where=within_box(incident_location, 47.615152, -122.351639, 47.575152, -122.311639)";
var sodaUrl1000 = "https://data.seattle.gov/resource/3k2p-39jp.json?$where=within_box(incident_location, 47.615152, -122.351639, 47.575152, -122.311639)&$offset=1000";

$.getJSON(sodaUrl, function(rawData) {
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
    zoom: 15,
    styles: styleArray,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
	var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
	var data_to_map = prepareDataforMap(rawData);
	for (i = 0; i < data_to_map.length; i++) {
    addMarker(data_to_map[i][0], data_to_map[i][1], data_to_map[i][2], data_to_map[i][3],data_to_map[i][4],data_to_map[i][5], data_to_map[i][6], data_to_map[i][7], map)
  }
	google.maps.event.addDomListener(window, 'load');
});

// $.getJSON(sodaUrl1000, function(rawData) {
// 	var styleArray = [
// 	  {
// 	    featureType: "all",
// 	    stylers: [
// 	      { saturation: -80 }
// 	    ]
// 	  },{
// 	    featureType: "road.arterial",
// 	    elementType: "geometry",
// 	    stylers: [
// 	      { hue: "#00ffee" },
// 	      { saturation: 50 }
// 	    ]
// 	  },{
// 	    featureType: "poi.business",
// 	    elementType: "labels",
// 	    stylers: [
// 	      { visibility: "off" }
// 	    ]
// 	  }
//   ];
//   var mapOptions = {
//     center: { lat: 47.595152, lng: -122.331639},
//     zoom: 15,
//     styles: styleArray,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };
// 	var map = new google.maps.Map(document.getElementById('map-canvas'),
//       mapOptions);
// 	var data_to_map = prepareDataforMap(rawData);
// 	for (i = 0; i < data_to_map.length; i++) {
//     addMarker(data_to_map[i][0], data_to_map[i][1], data_to_map[i][2], data_to_map[i][3],data_to_map[i][4],data_to_map[i][5], data_to_map[i][6], data_to_map[i][7], map)
//   }
// 	google.maps.event.addDomListener(window, 'load');
// });

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
function addMarker(latitude, longitude, hundred_block_location, general_offense_number, event_clearance_date, event_clearance_group, event_clearance_subgroup, event_clearance_description, map) {
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


