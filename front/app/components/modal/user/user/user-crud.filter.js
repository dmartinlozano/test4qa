'use strict';

/**
 * @ngdoc function
 * @name testingItApp.filter:testProjectsFilter
 * @description
 * # testProjectsFilter
 * filter of the testingItApp
 */
angular.module('testingItApp')
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
