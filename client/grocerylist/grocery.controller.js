angular.module('nGgroceryList').controller('groceryCtrl', function($scope,$http,$kookies,$state,$timeout,grocerySrv) {
    $scope.products = [];
    $scope.addItem = function () {
        if($("#item").val()==""){
            grocerySrv.blankInput("item");
        }else{
            $scope.products = grocerySrv.createArrItem($scope.products,$scope.item.toLowerCase());
            }
            $scope.item="";
            grocerySrv.checkCompleteFabButton($scope.products);
            $('#item').focus();
            $timeout(function() {
              $("#groceryListPrint").scrollTop($("#groceryListPrint")[0].scrollHeight);
            }, 0, false);
    }
    $scope.removeItem = function (index) {
        $scope.products.splice(index, 1);
        grocerySrv.checkCompleteFabButton($scope.products);
    }
    $scope.addNum=function(index){
        $scope.products[index].numberitem=$scope.products[index].numberitem+1;
    }
    $scope.removeNum=function(index){
        if($scope.products[index].numberitem!=1){
        $scope.products[index].numberitem=$scope.products[index].numberitem-1;
        }
    }
    $scope.checkItem = function (index,event) {
            grocerySrv.chckIt(index,event,$scope.products);
            grocerySrv.checkCompleteFabButton($scope.products);
    }
    $scope.checkKeyInput=function(keyPress){
        if((keyPress.which >= 65 && keyPress.which <= 122) || keyPress.which == 8){ 
        }else{
            event.preventDefault(); 
        }
    }
})