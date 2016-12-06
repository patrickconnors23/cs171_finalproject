

var margin_precip = {bottom: 100, top:10, right: 50, left:100};

var precip_width = 800- margin_precip.left - margin_precip.right;

var precip_height = 600 - margin_precip.top - margin_precip.bottom;





d3.csv("data/430weather.csv", function(data){
   console.log(data);


   var svg = d3.select("#weather-area")
               .append("svg")
               .attr("width", precip_width + margin_precip.right + margin_precip.left)
               .attr("height", precip_height + margin_precip.top + margin_precip.bottom)
               .append("g")
               .attr("transform", "translate(" + margin_precip.left + "," + margin_precip.top + ")");

   data.forEach(function(d){
     if (d.PrecipitationIn == "N/A"){
       d.PrecipitationIn = "0.00";
     };

   d.date = new Date(d.DateUTC);
   d.date = d3.time.hour.offset(d.date, -4)
     d.PrecipitationIn = +d.PrecipitationIn;
   });


   console.log(data);



   var precip_max = d3.max(data,function(d){
       return d.PrecipitationIn;
   });

   var x = d3.time.scale()
     .domain(d3.extent(data, function(d) {return d.date;}))
     .range([0,precip_width]);

   var y = d3.scale.linear()
     .domain([0,precip_max])
     .range([precip_height, 0]);

   var chart_area = d3.svg.area()
       .x(function(d){
           return x(d.date);
       })
       .y0(precip_height)
       .y1(function(d){
           return y(d.PrecipitationIn);
       });

   var path = svg.append("path")
       .datum(data)
       .attr("class", "area")
       .style("fill", "blue")
       .style("opacity", .6)
       .style("stroke", "black")
       .attr("d", chart_area);

   var x_axis = d3.svg.axis()
       .scale(x)
       .tickFormat(d3.time.format("%I:%M %p"))
       .orient("bottom");

   var y_axis = d3.svg.axis()
       .scale(y)
       .orient("left");

   svg.append("g")
       .attr("class", "x-axis")
       .attr("transform", "translate(0,"+ precip_height +")")
       .style("stroke", "black")
       .style("fill", "none")
       .call(x_axis)
       .selectAll("text")
           .attr("transform", function(d) {
                   return "rotate(-90) translate (-10, -13)";

           })
           .style("text-anchor", "end")
           .style("fill", "black");

   svg.append("g")
       .attr("class", "axis y-axis")
       .style("stroke", "black")
       .style("fill", "none")
       .call(y_axis)
       .selectAll("text")
       .style("fill", "black");

   svg.append("text")
       .text("Precipitation Levels (In.) for 4/30 ")
       .attr("class", "area-title")
       .attr("y", 20)
       .attr("x", 60)
       .style("font-size", 30);

   //var date _scale = d3.time.scale

});


d3.csv("data/423weather.csv", function(data){
   console.log(data);


   var svg1 = d3.select("#weather-area2")
               .append("svg")
               .attr("width", precip_width + margin_precip.right + margin_precip.left)
               .attr("height", precip_height + margin_precip.top + margin_precip.bottom)
               .append("g")
               .attr("transform", "translate(" + margin_precip.left + "," + margin_precip.top + ")");

   data.forEach(function(d){
       if (d.PrecipitationIn == "N/A"){
           d.PrecipitationIn = "0.00";
       };

       d.date = new Date(d.DateUTC);
       d.date = d3.time.hour.offset(d.date, -4)
       d.PrecipitationIn = +d.PrecipitationIn;
   });


   console.log(data);



   var precip_max = d3.max(data,function(d){
           return d.PrecipitationIn;
   });

   var x = d3.time.scale()
       .domain(d3.extent(data, function(d) {return d.date;}))
       .range([0,precip_width]);

   var y = d3.scale.linear()
       .domain([0,precip_max])
       .range([precip_height, 0]);

   var chart_area = d3.svg.area()
       .x(function(d){
           return x(d.date);
       })
       .y0(precip_height)
       .y1(function(d){
           return y(d.PrecipitationIn);
       });

   var path = svg1.append("path")
       .datum(data)
       .attr("class", "area")
       .style("fill", "blue")
       .style("opacity", .6)
       .style("stroke", "black")
       .attr("d", chart_area);

   var x_axis = d3.svg.axis()
       .scale(x)
       .tickFormat(d3.time.format("%I:%M %p"))
       .orient("bottom");

   var y_axis = d3.svg.axis()
       .scale(y)
       .orient("left");

   svg1.append("g")
       .attr("class", "x-axis")
       .attr("transform", "translate(0,"+ precip_height +")")
       .style("stroke", "black")
       .style("fill", "none")
       .call(x_axis)
       .selectAll("text")
           .attr("transform", function(d) {
                   return "rotate(-90) translate (-10, -13)";

           })
           .style("text-anchor", "end")
           .style("fill", "black");

   svg1.append("g")
       .attr("class", "axis y-axis")
       .style("stroke", "black")
       .style("fill", "none")
       .call(y_axis)
       .selectAll("text")
       .style("fill", "black");

   svg1.append("text")
       .text("Precipitation Levels (In.) for 4/23 ")
       .attr("class", "area-title")
       .attr("y", 20)
       .attr("x", 60)
       .style("font-size", 30);

   //var date _scale = d3.time.scale

});
