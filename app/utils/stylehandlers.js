define([
  'dojo/on',
  'dojo/topic',
  'toastr'
], function(
  on, topic, toastr
) {

  function loadHandlers(initialStyle) {

    console.log('initial style', initialStyle);

    var initialStyleString = JSON.stringify(initialStyle, null, '\t');

    var layer = this.layer;
    var editor = this.editor;

    var styleHistory = [];

    on(document, 'keydown', function(e){
      if(e.ctrlKey && e.which === 83){ // Check for the Ctrl key being pressed, and if the key = [S] (83)
        var annotations = editor.getSession().getAnnotations();
        if (annotations.length) {
          toastr.error('Review style editor for errors')
          return;
        }
        var val = editor.getValue();
        var data = JSON.parse(val);
        styleHistory.push(data);
        layer.setStyle(JSON.parse(val));
        return false;
      }
      if(e.ctrlKey && e.which === 90){ // Check for the Ctrl key being pressed, and if the key = [Z] (90)
        styleHistory.pop();
        var data2 = styleHistory[styleHistory.length - 1];
        if (!data2) {
          styleHistory.push(JSON.parse(initialStyleString));
          data2 = JSON.parse(initialStyleString);
        }
        var val2 = JSON.stringify(data2, null, '\t');
        editor.setValue(val2);
        editor.gotoLine(0);
        topic.publish('update-layer-style');
        layer.setStyle(JSON.parse(val2));
        return false;
      }
    });

    on(document.getElementById('submit'), 'click', function (e) {
      var annotations = editor.getSession().getAnnotations();
      if (annotations.length) {
        toastr.error('Review style editor for errors')
        return;
      }
      var val = editor.getValue();
      styleHistory.push(JSON.parse(val));
      layer.setStyle(JSON.parse(val));
    });

    on(document.getElementById('undo'), 'click', function (e) {
      styleHistory.pop();
      var data = styleHistory[styleHistory.length - 1];
      if (!data) {
        styleHistory.push(JSON.parse(initialStyleString));
        data = JSON.parse(initialStyleString);
      }
      var val = JSON.stringify(data, null, '\t');
      editor.setValue(val);
      editor.gotoLine(0);
      layer.setStyle(data);
    });

    on(document.getElementById('reset'), 'click', function (e) {
      styleHistory.length = 0;
      editor.setValue(initialStyleString);
      editor.gotoLine(0);
      layer.setStyle(JSON.parse(initialStyleString));
    });

    on(document.getElementById('save'), 'click', function (e) {
      var annotations = editor.getSession().getAnnotations();
      if (annotations.length) {
        toastr.error('Review style editor for errors')
        return;
      }
      var val = editor.getValue();
      var data = JSON.parse(val);
      styleHistory.push(data);
      layer.setStyle(data);

      topic.publish('save-style', JSON.parse(val));

    });

  }

  function StyleHandlers(options) {
    this.layer = options.layer;
    this.editor = options.editor;
  }

  StyleHandlers.prototype.load = loadHandlers;

  return StyleHandlers;

});