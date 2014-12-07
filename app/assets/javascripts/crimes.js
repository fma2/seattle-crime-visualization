
// API Call
var sodaUrl = "https://data.seattle.gov/resource/3k2p-39jp.json?$where=within_box(incident_location, 47.615152, -122.351639, 47.575152, -122.311639)";

// Get json from the SODA API
$.getJSON(sodaUrl, function(rawData) {
	console.log(rawData.length)
	console.log(rawData)
	// console.log(prepareDataforMap(rawData))

	google.maps.event.addDomListener(window, 'load', initialize);
  //all of the magic happens in here
});


function prepareDataforMap(data) {
  var dataArr = new Array();
  for (i = 0; i < data.length; ++i) {
    dataArr.push([
      data[i].cad_cdw_id
      ])
  };
  return dataArr;
};
function addMarker(school_name, lat, lng, address, city, state, zip, school_type, total_students, program_highlights, overview_paragraph, extracurricular_activities, website, map) {
  // var point = new google.maps.LatLng(lat, lng);
  // var marker = new google.maps.Marker({
  //     position: point,
  //     icon: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png",
  //     map: map,
  //     title: school_name
  // });

  //  var contentString = '<div id="content">'+
  //     '<div id="siteNotice">'+
  //     '</div>'+
  //     '<h3 id="firstHeading" class="firstHeading">' + school_name + '</h3>' +
  //     '<div id="bodyContent">'+
  //     '<p><b>Address: </b>' + address + ', ' + city + ', ' + state + ' ' + zip + '<br>' +
  //     '<b>Type of School: </b>' + school_type + '</p>' +
  //     '<p><b>Overview: </b>' + overview_paragraph + '<br>' +
  //     '<b>Program Highlights: </b>' + program_highlights + '<br>' +
  //     '<b>Extracurricular Activities: </b>' + extracurricular_activities+ '<br>' +
  //     '<b>Website: <a href=' + website + '>'+ website + '</a><br><br>' + 
  //     '</div>'+
  //     '</div>';

  // var infowindow = new google.maps.InfoWindow({ content: contentString });
  // google.maps.event.addListener(marker, 'click', function() {
  //     infowindow.setContent(contentString);
  //     infowindow.open(map, marker);
  // });
}

function initialize() {
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

47.615152, -122.351639, 47.575152, -122.311639
  var mapOptions = {
    center: { lat: 47.595152, lng: -122.331639},
    zoom: 15,
    styles: styleArray,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  map.setTilt(45);

  //test markers
  // addMarker("Hello", 40.718961617000446, -73.97606602099967, map);
  // addMarker("Yo", 40.8, -73.97606602099967, map);
  // addMarker("Hi", 40.723, -73.97606602099967, map);

  // var schoolData = prepareDataforMap(gon.schools);
  // for (i = 0; i < schoolData.length; i++) {
  //   addMarker(schoolData[i][0], schoolData[i][1], schoolData[i][2], schoolData[i][3],schoolData[i][4],schoolData[i][5], schoolData[i][6], schoolData[i][7], schoolData[i][8], schoolData[i][9], schoolData[i][10], schoolData[i][11], schoolData[i][12], map)
  // }

  // Marker Clusterer code
  // var schoolData= prepareDataforMap(gon.schools);
  // var markers = [];
  // for (var i = 0; i < schoolData.length; ++i) {
  //   if (schoolData[i][1] != null || schoolData[i][2] != null) {
  //     var latlng = new google.maps.LatLng(schoolData[i][1], schoolData[i][2]);
  //     var marker = new google.maps.Marker(latlng);
  //     markers.push(marker);
  //   }
  // }
  // var markerCluster = new MarkerClusterer(map, markers);
}
google.maps.event.addDomListener(window, 'load', initialize);