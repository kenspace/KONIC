angular.module('starter.directives', [])
    .directive('historyBack', ['$window',function ($window) {
        return {
            restrict: 'EA',
            replace: false,
            transclude: true,
            scope: true,
            template: '<ion-item ng-click="goBack()" class="nav-bar-button"><i class="ion-chevron-left color-project"></i></ion-item>',
            link: function(scope) {
                scope.goBack = function() {
                    $window.history.back();
                };
            }
        };
    }]);
