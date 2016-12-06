BoroughMap = function(_parentElement, _data, _center,_geo) {

		this.parentElement = _parentElement;
		this.data = _data;
		this.center = _center;
    this.geoData = _geo;
		this.initVis();
}

BoroughMap.prototype.initVis = function() {
		var vis = this;
	  vis.map = L.map(vis.parentElement).setView(vis.center, 10);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		 attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	 }).addTo(vis.map);

		vis.eventHandler();
}

BoroughMap.prototype.eventHandler = function () {
		var vis = this;
    vis.wrangleData();
};

BoroughMap.prototype.wrangleData = function() {
		var vis = this;
		vis.updateVis();
}

BoroughMap.prototype.updateVis = function() {
		var vis = this;
    console.log(geoData);
    var geoArray = [];
    var geoHolder;
    vis.geoData.features.forEach(function (d) {
      geoHolder = L.geoJSON(d, {
        style: function(d) {
            return {
              color: "green",
              opacity: 1
            };
        }
      })
      geoArray.push(geoHolder);
    })
    var group = L.featureGroup(geoArray).addTo(vis.map);
}
