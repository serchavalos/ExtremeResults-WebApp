(function () {
    'use strict';

    angular
        .module('xr.menuBar')
        .directive('xrUserInfo', xrUserInfoDirective);

    xrUserInfoDirective.$inject = [];

    function xrUserInfoDirective() {
        return {
            restrict: 'AE',
            templateUrl: 'menuBar/userInfo/userInfo.partial.html',
            controller: 'UserInfoController',
            controllerAs: 'vm'
        };
    }


})();