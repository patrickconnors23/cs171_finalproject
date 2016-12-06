var margin = { top: 50, right: 0, bottom: 10, left: 30 };

var height = 800 - margin.top - margin.bottom;
var width = 600 - margin.left - margin.right;

var svg = d3.select("#tile-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var gridSize = Math.floor(width/24);


var buckets = 9;
var colors = ["#FFFFFF","#DFE9F7","#BFD4EF","#9FBEE7","#7FA9DF","#5F93D7","#3F7ECF","#1F68C7","#0053BF"];
var days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

var times = ["12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p",
"7p", "8p", "9p", "10p", "11p"];

var data;

loadData();

function loadData() {
  d3.csv("data/average.csv", function(error, csv){
    csv.forEach(function(d){
      d.Uber = d.Uber.replace(/\,/g,"");
      d.Uber = +d.Uber;
      d["other 8 bases"] = d["other 8 bases"].replace(/\,/g,"");
      d["other 8 bases"] = +d["other 8 bases"];
      d.Weekday = +d.Weekday;
      d.Hour = +d.Hour;
    });
    data = csv;

    visualize();
  });
}

function visualize() {
  var dayLabels = svg.selectAll(".dayLabel")
    .data(days)
    .enter().append("text")
      .text(function (d) {
        return d;
      })
      .attr("x", function(d,i){
        return i * gridSize;
      })
      .attr("y", 0)
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + gridSize / 2 + ", -6)")
      .attr("class", function (d, i) {
        return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis");
      });

  var timeLabels = svg.selectAll(".timeLabel")
      .data(times)
      .enter().append("text")
        .text(function(d) {
          return d;
        })
        .attr("x", 0)
        .attr("y", function(d,i){
          return i * gridSize;
        })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", function(d, i) {
          return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis");
        });

  var uberColorScale = d3.scale.quantile()
      .domain([0, buckets - 1, d3.max(data, function (d){
        return d.Uber;
        })
      ])
      .range(colors);

  var cards = svg.selectAll(".hour")
      .data(data, function(d) {
        return d.Weekday+':'+d.Hour;
      });

  cards.append("title");

  cards.enter().append("rect")
      .attr("x", function(d) {
        return (d.Weekday - 1) * gridSize;
      })
      .attr("y", function(d) {
        return (d.Hour - 1) * gridSize;
      })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("class", "hour bordered")
      .attr("width", gridSize)
      .attr("height", gridSize)
      .style("fill", colors[0]);

  cards.transition().duration(1000)
      .style("fill", function(d) { return uberColorScale(d.Uber); });

  cards.select("title").text(function(d) { return d.Uber; });

}
