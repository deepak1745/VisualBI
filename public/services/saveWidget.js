var hotChocolate = angular.module("hotChocolate");
hotChocolate.factory('widget',
                      function($http) {
                           return {
                             saveWidget: function (parameters) {
                               console.log(parameters);
                               var req = {
                                            method: 'POST',
                                            url: '/widget/new',
                                            data: {parameter: JSON.stringify(parameters)}
                                         };
                               return $http(req);
                             },
                             getSavedWidgets: function (userName) {
                               var parameters = {username: userName};
                               return $http.get('/widget/getSavedWidgets',{params: parameters});
                             }
                           };
                        });
