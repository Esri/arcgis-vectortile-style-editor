define([
  'jquery',
  'esri/config',
  'esri/IdentityManager',
  'esri/urlUtils',
  'esri/domUtils',
  'esri/arcgis/OAuthInfo',
  'esri/arcgis/Portal',
  'dojo/on',
  'app/components/vtstyleeditor',
  'app/components/itemlist',
  'app/components/notice',
  'dojo/domReady!'
], function ($, esriConfig, esriId, urlUtils, domUtils, OAuthInfo, arcgisPortal, on, VTStyleEditor, ItemList, notice) {

  var mainContainer = document.getElementById('main-container');
  var itemsNode = document.getElementById('items-container');
  var itemsList = document.getElementById('item-list');
  var actionsNode = document.getElementById('style-editor-actions');
  var noticeNode = document.getElementById('notice-container');
  var signoutBtn = document.getElementById('signout');

  domUtils.hide(mainContainer);
  domUtils.hide(actionsNode);
  domUtils.show(itemsNode);

  function initStyleEditor(portal, id) {
    styleEditor = new VTStyleEditor({
      portal: portal,
      itemid: id
    });

    styleEditor.start();

    domUtils.hide(itemsNode);
    domUtils.show(mainContainer);
    domUtils.show(actionsNode);
  }

  require(['split-pane', 'bootstrap'], function () {
    $('#main-container').splitPane();
    $('[data-toggle="popover"]').popover();
  });

  var urlObjects = urlUtils.urlToObject(location.href);

   var portalUrl = 'www.arcgis.com';
   var itemid;
  if (urlObjects.query) {
    portalUrl = urlObjects.query.portal || portalUrl;
    itemid = urlObjects.query.itemid;
  }

  esriConfig.defaults.io.corsEnabledServers.push(portalUrl);

  var info = new OAuthInfo({
    appId: 'eELUS9Vvk8xP3Kkg',
    portalUrl: 'http://' + portalUrl,
    popup: false
  });

  var portal = new arcgisPortal.Portal(info.portalUrl);

  esriId.registerOAuthInfos([info]);

  var styleEditor;

  esriId.checkSignInStatus(info.portalUrl)
    .then(startApplication)
    .otherwise(
      function () {
        console.log('otherwise');
        esriId.getCredential(info.portalUrl)
          .then(startApplication);
      }
    );

  on(signoutBtn, 'click', function() {
    esriId.destroyCredentials();
    window.location.reload();
  });

  function startApplication(user) {
    portal.signIn().then(function() {

      domUtils.show(signoutBtn);
      console.log(user);
      if (itemid) {
        initStyleEditor(portalUrl, itemid);
      } else {
        portal.queryItems({
          q: 'type:"Vector Tile Service", owner:"' + user.userId + '"',
          //q: 'type:"vector tiles"',
          num: 100
        }).then(function (items) {
          console.log('found items', items);
          if (items.results.length) {
            var list = new ItemList({ data: items.results, node: itemsList });
            list.start();

            on(itemsList, '.item-thumb:click', function (e) {
              e.preventDefault();
              console.log('item clicked', e.target);
              var id = e.target.getAttribute('data-itemid');
              console.log('itemid', id);
              if (id) {
                initStyleEditor(portalUrl, id);
              }
            });
          } else {
            // TODO - add notice
            notice(noticeNode);
            domUtils.show(noticeNode);
          }
        });
      }

    });

  }

});