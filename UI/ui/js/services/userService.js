app.factory('User',function ($http) {
    userFactory={};

    // userFactory.setWeb3 = function (data) {
    //      return $http.post('/',data);
    // }
    userFactory.getAllUserOngoingICOs = function (address) {
      //   return $http.get('/  /'+address);
    }
    userFactory.getICODetails = function (id) {
      //   return $http.get('/  /'+id);
    }
    return userFactory;
    
});