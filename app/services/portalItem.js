define(['esri/request'], function(esriRequest) {
  return function getitemid(portal, itemid) {
    return esriRequest({
      url: ['//', portal, '/sharing/rest/content/items/', itemid].join(''),
      content: { f: 'json' },
      handleAs: 'json'
    });
  };
});