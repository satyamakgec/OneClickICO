app.factory('ICOService',function ($http) {
    icofactory={};
    
    icofactory.tokenDetails = function (userData) {
        return $http.post('/api/tokendetails',userData);
    }
    icofactory.distributeTokensToShareholder = function(data){
        return $http.post('/api/tokendetails',data);
    }
    return icofactory;
    
});