(function () {
    'use strict';

    angular
        .module('xr.createReflection')
        .controller('CreateReflectionController', CreateReflectionController);

    CreateReflectionController.$inject = ['ParseService', '$location', 'reflectionType', 'XrUtils', 'AuthService'];

    function CreateReflectionController(ParseService, $location, reflectionType, XrUtils, AuthService) {
        var vm = this;
        vm.save = save;
        vm.header = generateHeader();
        vm.relatedEntries = [];

        ParseService.callFunction('getRelatedEntriesForReflection',
                    {typeName: reflectionType.typeName},
                    AuthService.getUserToken())
            .then(function (data) {
                vm.relatedEntries = data;
            });

        function save() {
            var weeklyReflection = {
                firstThingThatWentWell: vm.firstThingThatWentWell,
                secondThingThatWentWell: vm.secondThingThatWentWell,
                thirdThingThatWentWell: vm.thirdThingThatWentWell,
                firstThingToImprove: vm.firstThingToImprove,
                secondThingToImprove: vm.secondThingToImprove,
                thirdThingToImprove: vm.thirdThingToImprove,
                effectiveDate: {
                    '__type': 'Date',
                    'iso': new Date().toISOString()
                },
                typeName: reflectionType.typeName,
                ACL: {
                    '*': { }
                }
            };

            weeklyReflection.ACL[AuthService.getCurrentUser().objectId] = {
                read: true,
                write: true
            };

            ParseService.postObject(reflectionType.className, weeklyReflection)
                .then(function () {
                    $location.path('overview');
                });
        }

        function generateHeader() {
            return XrUtils.getEntryHeader(reflectionType) + ' for ' +
                XrUtils.getFormattedEntryDate(reflectionType, new Date());
        }

    }

})();