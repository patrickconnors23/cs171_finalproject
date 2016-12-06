// svg drawing area

var margin = {top: 40, right: 40, bottom: 60, left: 60};

var width = 700 - margin.right - margin.left;
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#vehicle-map").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var formatDate = d3.time.format("%d-%b-%y");

var data;
// Initialize data
loadData();

function loadData() {
  d3.csv("data/aggregate.csv", function(error, csv){
    csv.forEach(function(d){
      d.Date = formatDate.parse(d.Date);
      d.Uber = d.Uber.replace(/\,/g,"");
      d.Uber =  +d.Uber;
      d["Yellow Taxis"] = d["Yellow Taxis"].replace(/\,/g,"");
      d["Yellow Taxis"] = +d["Yellow Taxis"];
    });
    data = csv;

    visualize();
  });
}

function visualize() {


  var timeExtent = d3.extent(data, function(d){
    return d.Date;
  });

  var x = d3.time.scale()
    .domain(timeExtent)
    .range([margin.left, width]);

  var y = d3.scale.linear()
    .domain([0, 1000000])
    .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(d3.time.format("%m/%d"));

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var XG = svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0, 400)")
      .call(xAxis)
    .selectAll("text")
      .attr("y", 5)
      .attr("x", 0)
      .attr("transform", "translate(-10, 5)")
      .style("text-anchor", "start");

  var YG = svg.append("g")
      .attr("class", "axis y-axis")
      .attr("transform", "translate(60, 0)")
      .call(yAxis);

  var uberLine = d3.svg.line()
    .interpolate("cardinal")
    .x(function(d){
      return x(d.Date);
    })
    .y(function(d){
      return y(d.Uber);
    });

  var uberPath = svg.append("path")
      .attr("d", uberLine(data))
      .attr("stroke", "black")
      .attr("stroke-width", "2")
      .attr("fill", "none");

  var totalLength = uberPath.node().getTotalLength();

  uberPath
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .attr("marker-end", "url(#uber)")
      .transition()
      .duration(2000)
      .ease("linear")
      .attr("stroke-dashoffset", 0);


  var taxiLine = d3.svg.line()
    .interpolate("cardinal")
    .x(function(d){
        return x(d.Date);
    })
    .y(function(d){
        return y(d["Yellow Taxis"]);
    });

    var taxiPath = svg.append("path")
      .attr("d", taxiLine(data))
      .attr("stroke", "yellow")
      .attr("stroke-width", "2")
      .attr("fill", "none");

    var totalTaxiLength = taxiPath.node().getTotalLength();

    taxiPath
      .attr("stroke-dasharray", totalTaxiLength + " " + totalTaxiLength)
      .attr("stroke-dashoffset", totalTaxiLength)
      .transition()
      .duration(2000)
      .ease("linear")
      .attr("stroke-dashoffset", 0)
      .attr("marker-end", "url(#taxi)");

    d3.xml('images/uber.svg', "image/svg+xml", function(xml) {
      var importedNode = document.importNode(xml.documentElement, true).getElementsByTagName("g")[0];

      defs = svg.append("defs")
      var uberMarker = defs.append("marker")
				.attr({
					"id":"uber",
					"viewBox":"0 0 100 100",
					"refX":50,
					"refY":50,
					"markerWidth":70,
					"markerHeight":70,
					"orient":"0",
          "fill": "red"
				})
				.node().appendChild(importedNode);

    });

    d3.xml('images/taxi2.svg', "image/svg+xml", function(xml) {
      var importedNode = document.importNode(xml.documentElement, true).getElementsByTagName("g")[0];

      defs = svg.append("defs")
      var taxiMarker = defs.append("marker")
				.attr({
					"id":"taxi",
					"viewBox":"0 0 100 100",
					"refX":50,
					"refY":50,
					"markerWidth":30,
					"markerHeight":30,
					"orient":"0",
          "fill": "yellow"
				})
				.node().appendChild(importedNode);

      });

}
