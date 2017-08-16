 'use strict';

var app = angular.module('app', ['ui.router','ui.bootstrap'])

 app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    //$httpProvider.interceptors.push('responseObserver');
    
    $urlRouterProvider.otherwise('/home');
    $urlRouterProvider.when("/createico", "/createico");
    //$urlRouterProvider.when("/dashboard/:userId", "/dashboard/:userId/userinvestments");
    
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/hometemplates/home.html',
			controller: 'homeCtrl'
        })
         .state('tokendetails', {
            url: '/tokendetails',
            templateUrl: 'templates/formtemplates/tokendetails.html',
            controller: 'createICOCtrl'
        })
        .state('tokendistribution', {
            url: '/tokendistribution',
            templateUrl: 'templates/formtemplates/tokendistribution.html',
            controller: 'createICOCtrl'
        })
        .state('crowdfunddetails', {
            url: '/crowdfunddetails',
            templateUrl: 'templates/formtemplates/crowdfundDetails.html',
            controller: 'createICOCtrl'
        })
        .state('reviewpage', {
            url: '/reviewpage/:icoid',
            templateUrl: 'templates/formtemplates/reviewpage.html',
            controller: 'homeCtrl'
        })
            
    })
    .run(function($rootScope,$window) {
        // Use Mist/MetaMask's provider
        $rootScope.checkWeb3 = false;
        if(window.web3){
        window.web3 = new Web3(web3.currentProvider);
        $rootScope.web3 = window.web3;
        $rootScope.checkWeb3 = true;
         console.log($rootScope.checkWeb3);
        console.log("Metamask used");
        web3.eth.getAccounts(function(error, accounts) {
             if(!error){
                 console.log("account",accounts[0]);
                 $rootScope.address = accounts[0];
             }else{
                 console.log(error);
             }
        });
        }else{
            $rootScope.checkWeb3 = false;
            console.log("could not connect to the Metamask");
           // $window.alert("Please login to Metamask account!");
        }

    });

