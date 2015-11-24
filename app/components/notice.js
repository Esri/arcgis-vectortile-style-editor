define([
  'esri/lang',
  'dojo/text!./templates/notice.html'
], function(lang, template) {

  function notice(node) {
    var elem = lang.substitute(null, template);
    node.innerHTML = elem;
    return node;
  }

  return notice;

});