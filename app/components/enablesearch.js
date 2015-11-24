define(['jquery', 'dojo/on'], function($, on) {

  return function enableearch(editor) {
    var node = document.getElementById('edit');
    var input = document.createElement('input');
    input.className = 'hidden';
    input.type = 'text';
    input.name = 'editsearch';
    input.id = 'editsearch';
    var addon = document.createElement('div');
    addon.className = 'input-group-addon search-addon';
    var icon = document.createElement('span');
    icon.className = 'glyphicon glyphicon-search';
    addon.appendChild(icon);
    var container = document.createElement('div');
    container.id = 'search-container';
    container.className = 'input-group search-min';
    container.appendChild(addon);
    container.appendChild(input);

    on(input, 'keyup', function searchEditor(e) {
      editor.clearSelection();
      editor.findAll(input.value,{
          wrap: true,
          caseSensitive: false,
          regExp: false
      });
    });

    on(addon, 'click', function() {
      $(container).toggleClass('search-min search-max');
      $(input).toggleClass('hidden');
    });

    node.appendChild(container);

    return editor;
  }

});