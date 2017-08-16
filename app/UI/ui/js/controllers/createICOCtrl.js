app.controller('createICOCtrl', function (ICOService,$scope,$state,$rootScope,$window,$anchorScroll) {
$scope.formData = {};
$scope.web3 = $rootScope.web3;
$scope.tokenDetailsLoader = false;
$scope.closingDate = '';


$scope.percentageTokensDistributed = 0;
$scope.devShare = 0;
$scope.marketmakersShare = 0;
$scope.futureStakeholdersShare = 0;
$scope.foundersShare = 0;
$scope.crowdfundShare = 0;

$scope.checkDistribution = function(val){
    
    if(val > (100 - $scope.percentageTokensDistributed) || (100 - $scope.percentageTokensDistributed) < 0){
    $window.alert($scope.percentageTokensDistributed);
    }
    else{
    $scope.percentageTokensDistributed = $scope.devShare + $scope.marketmakersShare + $scope.futureStakeholdersShare + $scope.foundersShare + $scope.crowdfundShare;
    }

}

$scope.ICONextClick = function(){
    if( $scope.percentageTokensDistributed != 100){
          $window.alert("Distribution is not done properly!");  
     }
    else{
    $state.go('crowdfunddetails');
    }
}


$scope.tokenDistributionNextClick = function(){
    
    var tokenDetails = {
       tokenName : $scope.tokenName,
       tokenSymbol : $scope.symbol,
       initialSupply : $scope.initialSupply,
       decimal : $scope.decimal
    }
    var data = {
        tokendetails : tokenDetails,
        web3 : $scope.web3
    }
    $scope.tokenDetailsLoader = true;
    ICOService.tokenDetails(data).then(function(result){
        console.log(result.data);
        if(result.data != 'undefined'){
            $scope.tokenDetailsLoader = false;
             $state.go('tokendistribution');
        }else{
             $scope.tokenDetailsLoader = false;
            $window.alert("no transaction could be made");
        }
    }); 

   
}


 $scope.datePicker1 = false;
 $scope.goEventStartDate = function(){
   $scope.datePicker1 = !$scope.datePicker1;
 }
 $scope.close1 = function(){
   $scope.datePicker1 = false;
 }

 $scope.datePicker2 = false;
 $scope.goEventCloseDate = function(){
   $scope.datePicker2 = !$scope.datePicker2;
 }
 $scope.close2 = function(){
   $scope.datePicker = false;
 }

$scope.finished = function(){
    var data = {
        "closingDate":$scope.closingDate
    }
    console.log(data);
} 

});

