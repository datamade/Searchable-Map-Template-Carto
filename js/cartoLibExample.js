$(function() {
  // Autocomplete when user searches for an address.
  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('search-address'));
  // Example object.
  var exMap = new CartoLib
  exMap.setTableName('chicago_libraries_2016');
  exMap.setUserName('datamade');
  exMap.setFields('full_address, name, hours_of_operation, phone');
  exMap.setMapDivName('mapCanvas');
  exMap.setDefaultZoom(11);
  exMap.setCentroid(41.901557, -87.630360)
  exMap.initiateMap()
  exMap.addInfoBox('bottomright', 'infoBox')
  var layer1 = exMap.defineSublayer("select * from chicago_libraries_2016", '#carto-result-style');
  // Custom code.
  exMap.createCartoLayer(layer1).addTo(exMap._mapSettings.map)
      .done(function(layer) {
        var mapName = "#" + exMap._mapSettings.mapDivName + " div"

        layerZero = layer.getSubLayer(0);
        layerZero.setInteraction(true);
        layerZero.on('featureOver', function(e, latlng, pos, data, subLayerIndex) {
          $(mapName).css('cursor','pointer');
          // Add custom text to the info window.
          var text = makeInfoText(data);
          CartoLib.prototype.updateInfoBox(text, "infoBox");
        });
        layerZero.on('featureOut', function() {
          $(mapName).css('cursor','inherit');
          CartoLib.prototype.clearInfoBox("infoBox");
        });
        layerZero.on('featureClick', function(data){
          // You can add something here, e.g., a modal window.
        });
      }).error(function(e) {
        console.log(e)
      });


      $("#btnSearch").on("click", function() {
        exMap.doSearch();
      });
});

// Build this custom function yourself. It should format data from your Carto map into HTML.
function makeInfoText(data) {
  var name = "<h4>" + data.name + "</h4>"
  var address = "<p><i class='fa fa-map-marker' aria-hidden='true'></i> " + data.full_address + "</p>"
  var hours = "<p><i class='fa fa-calendar' aria-hidden='true'></i> " + data.hours_of_operation + "</p>"
  var phone = "<p><i class='fa fa-phone' aria-hidden='true'></i> " + data.phone + "</p>"
  var html = name + address + hours + phone

  return html
};


