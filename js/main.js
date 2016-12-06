
var allData = [];
var geoData;

// Variable for the visualization instance
var stationMap;

// Start application by loading the data
loadData();


function loadData() {

	queue()
		// .defer(d3.csv,"https://raw.githubusercontent.com/fivethirtyeight/uber-tlc-foil-response/master/uber-trip-data/uber-raw-data-apr14.csv")
		.defer(d3.csv,"data/4thOfJuly14.csv")
		.defer(d3.json,"https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson")
		// .defer(d3.csv,"https://raw.githubusercontent.com/fivethirtyeight/uber-tlc-foil-response/master/uber-trip-data/uber-raw-data-aug14.csv")
		// .defer(d3.csv,"https://raw.githubusercontent.com/fivethirtyeight/uber-tlc-foil-response/master/uber-trip-data/uber-raw-data-jul14.csv")
		// .defer(d3.csv,"https://raw.githubusercontent.com/fivethirtyeight/uber-tlc-foil-response/master/uber-trip-data/uber-raw-data-jun14.csv")
		// .defer(d3.csv,"https://raw.githubusercontent.com/fivethirtyeight/uber-tlc-foil-response/master/uber-trip-data/uber-raw-data-may14.csv")
		// .defer(d3.csv,"https://raw.githubusercontent.com/fivethirtyeight/uber-tlc-foil-response/master/uber-trip-data/uber-raw-data-sep14.csv")
		.await(cleanData);
}

function cleanData(error,apr,geoj) {

		if(error) { console.log(error); }

		apr.forEach(function (d) {
			d.Lon =+ d.Lon;
			d.Lat =+ d.Lat;
			allData.push(d);
		})
		geoData = geoj;
		createVis();
}

var NYCMap;
var timer = 0;

function createVis() {
  // TO-DO: INSTANTIATE VISUALIZATION
	var myVar = setInterval(myTimer, 100);
	var NYCMap = new TimeLapse("ny-map",allData,[40.7829, -73.9654],[2014,07,04],geoData);
	var boroughs = new BoroughMap("borough-map",allData,[40.6782, -73.9442],geoData);

	function myTimer() {
			timer++;
			NYCMap.eventHandler();
	}
}
