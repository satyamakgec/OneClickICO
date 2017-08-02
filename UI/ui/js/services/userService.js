app.factory('User',function ($http) {
    userFactory={};

    userFactory.getAllUserOngoingICOs = function (address) {
      //   return $http.get('/  /'+address);
    }
    userFactory.getICODetails = function (id) {
      //   return $http.get('/  /'+id);
    }
    return userFactory;
    
});