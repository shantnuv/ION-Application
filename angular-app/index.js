
/**
 * The Angular module for ion application.
 * @type {!angular.Module}
 */
const app = angular.module('ionApp', [
  'ui.router',
  'ngMaterial',
  'ngMessages',
  'loginModule',
  'dashboardModule',
  'statusModule'
]);

/**
 * Returns a promise resolving to whether the user is logged in.
 * @param  {UserService} userService
 * @param  {$state} $state
 * @return {!angular.$q.Promise}
 */
const isUserLoggedIn = (userService, $state) => {
  const userLoggedInPromise = new Promise((resolve, reject) => {
    if (userService.getLoginStatus() != 'logged-in') {
      $state.go('home');
    } else {
      resolve(true);
    }
  });

  return userLoggedInPromise;
};

/**
 * Service to store username and login status of the user.
 */
class UserService {
  constructor() {
    /** @private @type {string} */
    this.username_;

    /** @private @type {string} */
    this.loginStatus_ = 'logged-out';
  }

  /**
   * Returns the user name of the user.
   * @return {string}
   */
  getUserName() {
    return this.username_;
  }

  /**
   * Sets the user name of the user.
   * @param {string} username
   */
  setUserName(username) {
    this.username_ = username;
  }

  /**
   * Returns the login status of the user.
   * @return {string}
   */
  getLoginStatus() {
    return this.loginStatus_;
  }

  /**
   * Sets the current login status of the user.
   * @param {string} status
   */
  setLoginStatus(status) {
    this.loginStatus_ = status;
  }
}

app.service('userService', UserService);

app.config(["$stateProvider", "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");
      $stateProvider
        .state({
          name: 'home',
          url: '/',
          views: {
            'status@': {
              templateUrl: './app/pages/status/status.html',
              controller: 'statusController',
              controllerAs: 'statusCtrl',
            },
            'main@': {
              templateUrl: './app/pages/home/home.html'
            },
            'login@': {
              template: '<md-button class=\'md-raised md-primary\' ' +
                                    'ui-sref=\'home.login\'> Login </md-button>'
            }
          }
        })
        .state({
          name: 'home.login',
          url: '/login',
          views: {
            'login@': {
              templateUrl: './app/pages/login/login.html',
              controller: 'loginController',
              controllerAs: 'loginCtrl',
            },
          }
        })
        .state({
          name: 'home.dashboard',
          resolve: {
            userLoggedIn: isUserLoggedIn,
          },
          url: '/dashboard',
          views: {
            'login@': {},
            'main@': {
              templateUrl: './app/pages/dashboard/dashboard.html',
              controller: 'dashboardController',
              controllerAs: 'dashboardCtrl',
            }
          }
        });
  }
]);
