'use strict'

var myMap;
var toggle; //Añadimos un widget para poder cambiar de mapa base
require([
    "esri/map", 
    "esri/geometry/Extent", 
    "esri/dijit/BasemapToggle", 
    "esri/layers/ArcGISDynamicMapServiceLayer", 
    "esri/dijit/PopupTemplate",
    "esri/layers/FeatureLayer",
    
        
    "dojo/parser", 
    "dojo/on", 
        
    "dijit/layout/BorderContainer", 
    "dijit/layout/ContentPane", 
    "dijit/TitlePane",
    "dojo/domReady!"], 
         function(Map, Extent, BasemapToggle, ArcGISDynamicMapServiceLayer, PopupTemplate, FeatureLayer, parser, on, ){

    parser.parse();

    myMap = new Map ("divMap", {
    basemap: "topo",
    extent: new Extent(
    {
      xmax: -9616690.296771392,
      xmin: -19244086.883343354,
      ymax: 10369049.757311666,
      ymin: 2170108.3553327005,
      spatialReference: {wkid: 102100}
    }
    ),
    }),
         
    toggle = new BasemapToggle({
    map: myMap,
    basemap: "gray"
     }, "BasemapToggle");
    toggle.startup();

    var mapserver = new ArcGISDynamicMapServiceLayer ("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer");
    myMap.addLayer(mapserver);
    mapserver.setOpacity(0.25);

    var popup  = new PopupTemplat(
        {"title": "Quake magnitude:  {MAGNITUDE}",
        "fieldInfos": [
        {
            "fieldName": "PLACE",
            "format": 
            {
            "places": 2,
            "digitSeparator": true
            }
        }],
        "description": "Current location: {PLACE}"
        });


    var terremotos = new FeatureLayer("https://services.arcgis.com/ue9rwulIoeLEI9bj/arcgis/rest/services/Earthquakes/FeatureServer/0", {
        infoTemplate: popup,
    });
    myMap.addLayer(terremotos);
    terremotos.setDefinitionExpression("MAGNITUDE >= '2'");

    
    


});