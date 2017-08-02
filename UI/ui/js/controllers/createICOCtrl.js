app.controller('createICOCtrl', function (ICOService,$scope,$state,$rootScope,$window,$anchorScroll) {
$scope.formData = {};
$scope.web3 = $rootScope.web3;
$scope.tokenDetailsLoader = false;

$scope.tokenDistributionNextClick = function(){

    var tokenDetails = {
       tokenName : $scope.formData.tokenName,
       tokenSymbol : $scope.formData.symbol,
       initialSupply : $scope.formData.initialSupply,
       decimal : $scope.formData.decimal
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
$scope.ICONextClick = function(){
    $state.go('icodetails');
}


 $scope.datePicker = false;
 $scope.goEvent = function(){
   $scope.datePicker = !$scope.datePicker;
 }
 $scope.close = function(){
   $scope.datePicker = false;
 }
  
//      /* datepicker auto close */
//   $scope.$watch('formData.closingDate', function() {
// 	  if($scope.formData.closingDate!== undefined){
//      $scope.datePicker = !$scope.datePicker;
// 	  }else{
// 		  $scope.datePicker = false;
// 	  }
// });


    // $(function () {
    // $('#datetimepicker6').datetimepicker();
    // $('#datetimepicker7').datetimepicker({
    //     useCurrent: false //Important! See issue #1075
    // });
    // $("#datetimepicker6").on("dp.change", function (e) {
    //     $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
    // });
    // $("#datetimepicker7").on("dp.change", function (e) {
    //     $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
    // });
    // });

});

