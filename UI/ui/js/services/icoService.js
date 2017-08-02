app.factory('ICOService',function ($http) {
    icofactory={};
    
    icofactory.tokenDetails = function (userData) {
        return $http.post('/api/tokendetails',userData);
    }

    return icofactory;
    
});