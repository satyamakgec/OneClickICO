app.factory('ICOService',function ($http) {
    icofactory={};
    
    icofactory.createToken = function (tokenData) {
        return $http.post('/api/v1/createToken',tokenData);
    }
    icofactory.distributeTokensToShareholder = function(data){
        return $http.post('/api/tokendetails',data);
    }
    return icofactory;
    
});