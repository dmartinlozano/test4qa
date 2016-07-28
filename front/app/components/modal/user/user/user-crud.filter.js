'use strict';

/**
 * @ngdoc function
 * @name test4qaApp.filter:testProjectsFilter
 * @description
 * # testProjectsFilter
 * filter of the test4qaApp
 */
angular.module('test4qaApp')
//In user management, the dropdown show the name of testProjects:
.filter('testProjectsFilter', function () {
    return function (input, map) {
        if (typeof map !== "undefined") {
            for (var i = 0; i < map.length; i++) {
                if (map[i]._id === input) {
                    return map[i].name;
                }
            }
        }
    };
});
