class DashboardController {
  constructor($state, userService) {
    /** @const @private {UserService} */
    this.userService_ = userService;
    /** @const @private {$state} */
    this.state_ = $state;

    /** @const {string} Username of the user. */
    this.username = this.userService_.getUserName();
  }

  /**
   * Logs out the user.
   */
  logout() {
    this.userService_.setLoginStatus('logged-out');
    this.state_.go('home');
  }
}

const dashboardModule = angular.module('dashboardModule', []);

DashboardController.$inject = ['$state', 'userService'];

dashboardModule.controller('dashboardController', DashboardController)
