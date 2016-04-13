services
    .factory('Postman', ['$http', '$q', function ($http, $q) {
        return {
            httpGet: function (action, param) {
                var deferred = $q.defer();
                $http.get(KONIC.config.URL + action, {params: param})
                    .success(function (data) {
                        KONIC.debug(data, action + " Success");
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        KONIC.debug(data, action + " Error");
                        deferred.reject(data);
                    });
                return deferred.promise;
            },

            httpGetUrl: function (url, param) {
                var deferred = $q.defer();
                $http.get(url, {params: param})
                    .success(function (data) {
                        KONIC.debug(data, url + " Success");
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        KONIC.debug(data, url + " Error");
                        deferred.reject(data);
                    });
                return deferred.promise;
            },

            httpPost: function (action, param, headers) {
                var deferred = $q.defer();
                $http.post(KONIC.config.URL + action, param, {headers: headers})
                    .success(function (data) {
                        KONIC.debug(data, action + " Success");
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        KONIC.debug(data, action + " Error");
                        deferred.reject(data);
                    });
                return deferred.promise;
            },

            httpPostUrl: function (url, param, headers) {
                var deferred = $q.defer();
                $http.post(url, param, {headers: headers})
                    .success(function (data) {
                        KONIC.debug(data, url + " Success");
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        KONIC.debug(data, url + " Error");
                        deferred.reject(data);
                    });
                return deferred.promise;
            },

            httpPut: function (action, param) {
                var deferred = $q.defer();
                $http.put(KONIC.config.URL + action, param)
                    .success(function (data) {
                        KONIC.debug(data, action + " Success");
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        KONIC.debug(data, action + " Error");
                        deferred.reject(data);
                    });
                return deferred.promise;
            },

            httpDelete: function (action, param) {
                var deferred = $q.defer();
                $http.delete(KONIC.config.URL + action, {params: param})
                    .success(function (data) {
                        KONIC.debug(data, action + " Success");
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        KONIC.debug(data, action + " Error");
                        deferred.reject(data);
                    });
                return deferred.promise;
            }
        };
    }]);
