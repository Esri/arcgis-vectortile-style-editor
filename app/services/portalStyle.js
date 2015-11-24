define(['esri/request', 'dojo/Deferred'], function (esriRequest, Deferred) {
  var file = '/resources/styles/root.json';
  return function portalStyle(portal, itemid) {
    var def = new Deferred();
    var url = [
      '//',
      portal,
      '/sharing/rest/content/items/',
      itemid,
      file
    ].join('')
    esriRequest({
      url: url,
      content: { f: 'json' },
      handleAs: 'json'
    }).then(function(result) {
      delete result._ssl;
      def.resolve(result);
    });

    return def.promise;
  };
});