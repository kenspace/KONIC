controllers
    .controller('MainCtrl', ['$rootScope', '$state', '$ionicViewSwitcher', function ($rootScope, $state, $ionicViewSwitcher) {
        // 屏幕参数
        $rootScope.screenWidth = document.documentElement.clientWidth;
        $rootScope.screenHeight = document.documentElement.clientHeight;

        //深度克隆函数
        $rootScope.cloneObj = function (obj) {
            var newobj = obj.constructor === Object ? {} : [];
            if (typeof JSON === 'object') {
                var s = JSON.stringify(obj);
                newobj = JSON.parse(s);
            } else {
                if (newobj.constructor === Array) {
                    newobj.concat(obj);
                } else {
                    for (var i in obj) {
                        newobj[i] = obj[i];
                    }
                }
            }
            return newobj;
        };

        // 跳转函数
        $rootScope.goURL = function (url, paramates, type) {
            if (url !== 'tab.index') {
                $rootScope.hiddenTopBar = false;
            }
            if (type) {
                switch (type) {
                    case 'forward' :
                        $ionicViewSwitcher.nextDirection('forward');
                        break;
                    case 'back' :
                        $ionicViewSwitcher.nextDirection('back');
                        break;
                    default :
                        break;
                }
            }
            $state.go(url, paramates);
        };
    }])

    .controller('IndexCtrl', ['$scope',function($scope) {
    }])

    .controller('DirectivesCtrl', ['$scope', function ($scope) {

    }])

    .controller('ContactCtrl', ['$scope', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    }]);
