define(['esri/request'], function (esriRequest) {
  return function portalSaveItem(portal, item) {
    return esriRequest({
      url: [
        '//',
        portal,
        '/sharing/rest/content/users/',
        item.owner,
        '/',
        (item.ownerFolder ? (item.ownerFolder + '/') : '/'),
        'items/',
        item.id,
        '/removeResources'
      ].join(''),
      content: {
        f: 'json',
        resource: 'styles/root.json'
      },
      handleAs: 'json'
    }, { usePost: true });
  };
});