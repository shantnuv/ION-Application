class StatusController {
  constructor(userService) {
    this.userService = userService;
  }
}

StatusController.$inject = ['userService'];

const statusModule = angular.module('statusModule', []);

statusModule.controller('statusController', StatusController);
