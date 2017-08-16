app.controller('homeCtrl', function (ICOService,User,$scope,$window,$rootScope,$stateParams,$state,$anchorScroll) {
    
	$scope.checkWeb3 = $rootScope.checkWeb3;
	$scope.checkOngoingICOs = false;    
    $scope.OngoingICOs = [];
	$scope.icoDetails = {};
    $scope.shareFlag;
    $scope.loadOngoingICOs = function(){
		var address = $rootScope.address;
        // User.getAllUserOngoingICOs(address).then(function(result){
		// 	console.log(result.data.length);
		// 	if(result.data.length != 0){
		// 	$scope.checkOngoingICOs = true;
		// 	$scope.OngoingICOs = result.data;
		// 	}
		// })
        $scope.checkOngoingICOs = true;
		$scope.OngoingICOs = [ 
		{   id : "123",
			name: "John",
			symbol: "DXY",
			tokenSupply :"100",
			status: "68",
			goal:"100",
			remainingDays: "14"
		},

		{   id:"124",
			name: "Jane",
			symbol: "EXT",
			tokenSupply : "2000",
			status: "78",
			goal:"230",
			remainingDays: "8"
		}
		];
	}
   
    $scope.goToICOForm = function(){
		$state.go("tokendetails");
	}
	$scope.goToReviewPage = function(id){
		$state.go("reviewpage" ,{ 'icoid': id });
	}
	$scope.showICODetails = function(){
		$window.localStorage.icoid = $stateParams.icoid;
		$scope.icoid = $stateParams.icoid;
		// User.getICODetails($scope.icoid).then(function(result){
        //    console.log(result.data.length);
		// 	if(result.data.length != 0){
		// 	   $scope.icoDetails = result.data;
		// 	}
		// });
		$scope.icoDetails = {   id : "123",
								name: "Jon Snow",
								symbol: "DXY",
								tokenSupply :"100",
								status: "68",
								goal:"100",
								remainingDays: "14",
								startingDate: "10/10/2017",
								closingDate : "12/12/2017",
								distribution: {
									founders : '2',
									crowdfunding : '80',
									developers : '5',
									futurestakeholders : '10',
									marketmakers : '3'
								},
								tokensLeftFor:{
                                    founders : '2000',
									crowdfunding : '8000000',
									developers : '500',
									futurestakeholders : '1000',
									marketmakers : '3000'
								}
							}
		console.log($scope.icoDetails);

	}
    $scope.DistributeShare = function(val){
          $scope.shareFlag = val;
	}
    $scope.distribute = function(){
		var data = {
			         tokenAmount : $scope.tokenAmount,
					 address : $scope.recieverAddr,
					 flag : $scope.shareFlag
		};
		console.log(data);
		 $scope.distributeLoader = true;
		ICOService.distributeTokensToShareholder(data).then(function(response){
           console.log(response);
		   if(response!=undefined){
			   $scope.distributeLoader = false;
		   }
		}).catch(function(err){
                console.log(err);
				 $scope.distributeLoader = true;
		});
	}
   

	$(window).scroll(function() {

	if ($(window).scrollTop() > 100) {
		$('.main_h').addClass('sticky');
	} else {
		$('.main_h').removeClass('sticky');
	}
	});

	// Mobile Navigation
	$('.mobile-toggle').click(function() {
	if ($('.main_h').hasClass('open-nav')) {
		$('.main_h').removeClass('open-nav');
	} else {
		$('.main_h').addClass('open-nav');
	}
	});

	$('.main_h li a').click(function() {
	if ($('.main_h').hasClass('open-nav')) {
		$('.navigation').removeClass('open-nav');
		$('.main_h').removeClass('open-nav');
	}
	});

	// navigation scroll lijepo radi materem
	$('nav a').click(function(event) {
	var id = $(this).attr("href");
	var offset = 70;
	var target = $(id).offset().top - offset;
	$('html, body').animate({
		scrollTop: target
	}, 500);
	event.preventDefault();
	});



})
