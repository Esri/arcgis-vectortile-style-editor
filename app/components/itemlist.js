define([
  'esri/lang',
  'dojo/text!./templates/itemcard.html'
], function(lang, template) {

  var ItemList = function ItemList(options) {
    this.node = options.node;
    this.data = options.data;
  }

  ItemList.prototype.start = function start() {
    var node = this.node;
    var data = this.data;
    var docFrag = document.createDocumentFragment();
    data.map(function(x) {
      var elem = document.createElement('div');
      var elemString = lang.substitute(x, template);
      elem.innerHTML = elemString;
      if (x.thumbnailUrl) {
        var thumb = elem.firstChild.querySelector('.item-thumb');
        thumb.style.backgroundImage = 'url(' + x.thumbnailUrl + ')';
      }
      docFrag.appendChild(elem.firstChild);
    });
    node.appendChild(docFrag);
  };

  return ItemList;
});