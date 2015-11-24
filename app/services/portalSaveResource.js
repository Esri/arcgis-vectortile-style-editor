define([
  'dojo/Deferred',
  './portalDeleteResource',
  './portalAddResource'
], function (
  Deferred,
  deleteResource,
  addResource
  ) {
    return function portalSaveItem(portal, item, data) {
      function add() {
        return addResource(portal, item, data);
      }
      return deleteResource(portal, item).then(add);
    };
  });