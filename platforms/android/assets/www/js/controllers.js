/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('CartoesCtrl', function($scope) {

})

.controller('TotalCtrl', function($scope) {

})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
    var dataValores = [0,1,2,3];
    dataValores[0] = {
        nome:"Soc. Ginastica",
        venc: "10/10/15",
        valor: "120"
    };
    dataValores[1] = {
        nome:"PIO XII",
        venc: "23/10/15",
        valor: "360"
    };
    dataValores[2] = {
        nome:"COMUSA",
        venc: "30/10/15",
        valor: "150"
    };
    dataValores[3] = {
        nome:"AES Sul",
        venc: "30/10/15",
        valor: "220"
    };
    $scope.dataValores = dataValores;
    $scope.valortotal = 0;
    $scope.orders = [];
    $scope.calcularTotal = function(valor, ordem) {
        var ordersFunction = $scope.orders;
        var total = $scope.valortotal;
        var adicionou = true;
        if (ordersFunction.length == 0) {
            ordersFunction.push(ordem);
            total = total + valor;
            $scope.valortotal = total;
            $scope.orders = ordersFunction;
            
        } else {
            for (var index = 0; index < ordersFunction.length; index++) {
                if (ordersFunction[index] == ordem) {
                    total = total - valor;
                    $scope.valortotal = total;
                    ordersFunction.splice(index, 1);
                    $scope.orders = ordersFunction;
                    adicionou = false;

                };
            }
            if (adicionou == true) {
                ordersFunction.push(ordem);
                total = total + valor;
                $scope.valortotal = total;
                $scope.orders = ordersFunction;
            };
        };
    }


})
;
