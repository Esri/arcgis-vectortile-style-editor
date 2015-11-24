var dojoConfig = {
  async: true,
  deps: ['app/main'],
  packages: [/*{
    name: 'esri',
    location: '../esri'
  }, */{
    name: 'app',
    location: location.pathname.replace(/\/[^\/]+$/, '') + '/app'
  }, {
    name: 'jquery',
    location: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/',
    main: 'jquery.min'
  }, {
    name: 'split-pane',
    location: location.pathname.replace(/\/[^\/]+$/, '') + '/libs/split-pane',
    main: 'split-pane'
  }, {
    name: 'spectrum',
    location: 'https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.7.1/',
    main: 'spectrum.min'
  }, {
    name: 'bootstrap',
    location: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/',
    main: 'bootstrap.min'
  }, {
    name: 'ace',
    location: location.pathname.replace(/\/[^\/]+$/, '') + '/libs/ace'
  }, {
    name: 'toastr',
    location: 'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.2/',
    main: 'toastr.min'
  }]
};