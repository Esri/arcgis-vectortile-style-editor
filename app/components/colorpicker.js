define([
  'jquery',
  'spectrum'
], function($) {

  return function enableColorPicker(editor) {
    $("#colorpicker").spectrum({
      showInput: true,
      preferredFormat: 'hex',
      move: function move(color) {
        var clr = color.toHexString();
        editor.forEachSelection({
          exec: function(edtr) {
            var sel = edtr.getSelectedText();
            if (sel.indexOf('#') === 0 && sel.length === 7) {
              var range = edtr.getSelectionRange();
              edtr.session.replace(range, clr);
              edtr.selection.setRange(range);
            }
          }
        });
      }
    });
    return editor;
  }

});