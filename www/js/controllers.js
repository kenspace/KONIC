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

    .controller('IndexCtrl', ['$scope', 'Postman', function ($scope, Postman) {
        $scope.rep = {};
        $scope.ajax = function (type) {
            var promise;
            if (type === 'get') {
                promise = Postman.httpGetUrl('http://127.0.0.1:3000', {key: 'konic'});
                promise.then(function (data) {
                    $scope.rep.get = JSON.stringify(data);
                }, function (data) {
                });
            } else if (type === 'post') {
                promise = Postman.httpPostUrl('http://127.0.0.1:3000', {key: 'konic'});
                promise.then(function (data) {
                    $scope.rep.post = JSON.stringify(data);
                }, function (data) {
                });
            }
        };
    }])

    .controller('DirectivesCtrl', ['$scope', function ($scope) {

    }])

    .controller('IonicDirectivesCtrl', ['$scope', function ($scope) {

    }])

    .controller('IonicContentCtrl', ['$scope', '$ionicScrollDelegate', '$ionicPopup','$timeout', function ($scope, $ionicScrollDelegate, $ionicPopup,$timeout) {
        $scope.doRefresh = function () {
            $ionicPopup.alert({
                title: '操作提示',
                template: '下拉松开后所执行函数'
            });
            // 广播刷新完成，为了展示效果，这里做了1s的延时
            $timeout(function(){
                $scope.$broadcast('scroll.refreshComplete');
            },1000);
        };


        $scope.loadMoreData = function () {
            $ionicPopup.alert({
                title: '操作提示',
                template: '上拉到底部松开后所执行函数，本例子是执行滚动到内容顶部函数'
            });
            // 广播加载完成，为了展示效果，这里做了1s的延时
            $timeout(function(){
                $ionicScrollDelegate.scrollTop();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            },1000);
        };
    }])

    .controller('ContactCtrl', ['$scope', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    }]);
