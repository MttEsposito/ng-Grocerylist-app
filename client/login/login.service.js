angular.module('nGgroceryList').service('loginSrv', function($http,$q,appCostants) {
   //check for the blank input
   this.checkBlankInput=function(emailUser,passwordUser){
       switch (true) {
           case emailUser == "" && passwordUser == "" :
               {
                   $("#emailUser").addClass("errorblankInpt");
                   setTimeout(function () {
                       $('#emailUser').removeClass('errorblankInpt');
                    }, 700);
                    $("#passwordUser").addClass("errorblankInpt");
                    setTimeout(function () {
                        $('#passwordUser').removeClass('errorblankInpt');
                    }, 700); 
               break;
               }
            case emailUser == "" :
                {
                    $("#emailUser").addClass("errorblankInpt");
                   setTimeout(function () {
                       $('#emailUser').removeClass('errorblankInpt');
                    }, 700);
                    break;
                }
            case passwordUser == "" :
                {
                    $("#passwordUser").addClass("errorblankInpt");
                    setTimeout(function () {
                        $('#passwordUser').removeClass('errorblankInpt');
                    }, 700);
                    break;
                }
           default:
              {
                break;
              }
       }
   }
   //function for exec the login 
   this.loginExec=function(configHttp){
        let config=configHttp;
        return $q(function(resolve,reject){
            let startAjaxCall=function(){
                $http(config)
                .then(successResult)
                .catch(failResult)
            };
            let successResult=function(res){
                resolve(res);
            };
            let failResult=function(err){
                reject(err);
            };
            startAjaxCall();
        });
   }
   //show the toast app on error input worng email/psw or ajax fail
   this.showToastApp=function(textToast){
       let toast;
       toast = document.getElementById("appToast");
       toast.innerHTML=textToast;
       toast.className = "show";
       setTimeout(function(){
           toast.className = toast.className.replace("show", "");
       }, 4000);
   }
   //set enable disable button signin on click
   this.btnSignInEvent=function(number){
       if(number== 0){
           $('#btnLogin').html(appCostants.loaderIconBtn);
           $('#btnLogin').addClass('disBtn');
       }else{
           $('#btnLogin').removeClass('disBtn');
           $('#btnLogin').html(appCostants.loginDefault);
       }
   }
})