angular.module('konic', ['ionic', 'konic.controllers', 'konic.services', 'konic.directives'])
    .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
        // 设置TAB位置为底部
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.tabs.style('standard');
        // 禁止侧滑返回
        $ionicConfigProvider.views.swipeBackEnabled(false);

        // http请求兼容方案
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        /*解决angular的Post的非转译问题，实现post传递参的数param方法*/
        var param = function (obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }

            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };
        $httpProvider.defaults.transformRequest = [function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];

        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tab.index', {
                url: '/index',
                views: {
                    'tab-index': {
                        templateUrl: 'templates/index.html',
                        controller: 'IndexCtrl'
                    }
                }
            })
            .state('tab.chats', {
                url: '/directives',
                views: {
                    'tab-directives': {
                        templateUrl: 'templates/directives.html',
                        controller: 'DirectivesCtrl'
                    }
                }
            })
            .state('tab.contact', {
                url: '/contact',
                views: {
                    'tab-contact': {
                        templateUrl: 'templates/contact.html',
                        controller: 'ContactCtrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/tab/index');
    }]);

var controllers = angular.module('konic.controllers', []),
    directives = angular.module('konic.directives', []),
    services = angular.module('konic.services', []);