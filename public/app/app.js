var app = angular.module('WordResumeApp', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  '$httpProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');

    $urlRouterProvider.otherwise('/404');

    $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/views/user.html',
    controller: 'UserCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/views/userSignup.html',
    controller: 'SignupCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'app/views/userLogin.html',
    controller: 'LoginCtrl'
  })
  .state('404', {
    url: '/404',
    templateUrl: 'app/views/404.html'
  });

    $locationProvider.html5Mode(true);
  }]);
