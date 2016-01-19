define([
  'esri/map',
  'esri/layers/VectorTileLayer',
  'esri/dijit/Search',
  'esri/request',
  'dojo/topic',
  './editor',
  './../services/portalItem',
  './../services/portalStyle',
  './../services/portalSaveResource',
  './../utils/stylehandlers'
], function(
  Map, VectorTileLayer, Search, esriRequest,
  topic,
  Editor,
  portalItem,
  portalStyle,
  saveStyle,
  StyleHandlers
) {

  function VTSyleEditor(options) {
    this.portal = options.portal;
    this.itemid = options.itemid;
    this.file = '/resources/styles/root.json';
    this.styleHistory = [];

    topic.subscribe('update-layer-style', this._updateLayerStyle.bind(this));
    topic.subscribe('save-style', this._saveLayerStyle.bind(this));
  }

  VTSyleEditor.prototype.start = function start() {

    var portal = this.portal;
    var itemid = this.itemid;

    portalItem(portal, itemid).then(function(item) {
      this.item = item;
      var mapName = document.getElementById('mapName');
      mapName.innerText = item.title;
      return portalStyle(portal, itemid);
    }.bind(this)).then(this._onPortalStyle.bind(this));
  };

  VTSyleEditor.prototype._onPortalStyle = function onPortalStyle(result) {
    var styleHistory = this.styleHistory;
    styleHistory.push(result);
    var layer = new VectorTileLayer(result);
    this.layer = layer;
    var map = new Map('map');
    var s = new Search({ map: map }, 'search');
    s.startup();

    map.addLayer(layer);

    var editor = Editor.load('edit');
    var value = JSON.stringify(result, null, '\t');
    editor.setValue(value);
    editor.gotoLine(0);
    this.edtor = editor;

    var styleHandlers = new StyleHandlers({ layer: layer, editor: editor });
    styleHandlers.load(result);
    this.styleHandlers = styleHandlers;
  };

  VTSyleEditor.prototype._updateLayerStyle = function updateLayerStyle(data) {
    this.layer.setStyle(data);
  };

  VTSyleEditor.prototype._saveLayerStyle = function saveLayerStyle(data) {
    saveStyle(this.portal, this.item, data).then(function(results) {
      console.log(results);
    }).otherwise(function(err) {
      console.log('Error in saving style: ', err);
    });
  };

  return VTSyleEditor;

});