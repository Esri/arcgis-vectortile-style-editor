define([
  'dojo/topic',
  './enablesearch',
  './colorpicker',
  'ace/ace'
], function(
  topic,
  enablesearch,
  enablecolorpicker
) {

  function loadEditor(domid) {
    var editor = window.ace.edit(domid);
    editor.getSession().setMode('ace/mode/json');
    editor.setTheme('ace/theme/github');

    editor.on('dblclick', function(e) {
      // small timeout to selection can occur
      setTimeout(function delaydbliclick() {
        var sel = editor.getSelectedText();
        if (sel.indexOf('#') !== 0) {
          var og_range = editor.getSelectionRange();
          var range = og_range.clone();

          range.setStart(range.start.row, range.start.column - 1);

          editor.selection.setRange(range);

          var sel2 = editor.getSelectedText();;
          if (sel2.indexOf('#') !== 0) {
            editor.selection.setRange(og_range);
          }
        }
      }, 150);
    });

    return enablesearch(enablecolorpicker(editor));
  }

  return {
    load: loadEditor
  };

});