define(['esri/request'], function (esriRequest) {
  return function portalSaveItem(portal, item, data) {
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
        '/addResources'
      ].join(''),
      content: {
        f: 'json',
        resourcesPrefix: 'styles',
        filename: 'root.json',
        text: JSON.stringify(data)
      },
      handleAs: 'json'
    }, { usePost: true })
  };
});