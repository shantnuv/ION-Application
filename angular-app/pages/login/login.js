class LoginController {
  constructor($state, loginService, userService) {
    /** @const @private {$state} */
    this.state_ = $state;
    /** @const @private {LoginService} */
    this.loginService_ = loginService;
    /** @const @private {UserService} */
    this.userService_ = userService;

    /** @private @type {string} User name of the user */
    this.userName = '';
    /** @private @type {string} Password of the user */
    this.password = '';
    /** @type {string} Error message */
    this.errorMessage = '';
    /** @type {boolean} Whether to show the loader. */
    this.showLoader = false;
  }

  /**
   * Login function fir the user.
   */
  login() {
    this.showLoader = true;
    this.errorMessage = '';
    this.userService_.setLoginStatus('logging-in');

    this.loginService_.login(this.userName, this.password)
      .then((res) => {
        this.showLoader = false;
        if (!res.data.success) {
          this.errorMessage = res.data.errorMessage;
          return;
        }
        this.userService_.setUserName(this.userName);
        this.userService_.setLoginStatus('logged-in');
        this.state_.go('home.dashboard');
      });
  }
}

/**
 * Login service for logging the user.
 */
class LoginService {
  constructor($http) {
    /** @const @private {$http} */
    this.http_ = $http;
  }

  /**
   * Returns a promise resolving to user login.
   * @param {string} username
   * @param {string} password
   * @return {!angular.$q.Promise}
   */
  login(username, password) {
    return this.http_.post('/login',{username: username, password: password});
  }
}

const loginModule = angular.module('loginModule', []);

LoginController.$inject = ['$state', 'loginService', 'userService'];
LoginService.$inject = ['$http'];

loginModule.controller('loginController', LoginController);
loginModule.service('loginService', ['$http', LoginService]);
