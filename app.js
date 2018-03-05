angular.module('nGgroceryList', ['ngMaterial', 'ui.router', 'ngResource', 'ngKookies','ngSanitize','ngTouch'])
  //on run set default page Login 
  .run(["$state", function($state) {
    $state.go('login');
  }])
  //set the routing on the webapp
  .config(function($stateProvider, $urlRouterProvider) {
    // state app of the login
    $stateProvider
      .state('login', {
        controller: 'loginCtrl',
        controllerAs: 'loginCtrl',
        url: '/login',
        templateUrl: 'client/login/login.html',
        onEnter: function($state){
         if($.cookie('sessionLog')=='set'){
           $state.go('grocerylist');
         }
        },
        onExit: '',
      })
      // state dashboard for data user
      .state('dashboard', {
        controller: 'dashCtrl',
        controllerAs: 'dashCtrl',
        url: '/dashboard',
        templateUrl: 'client/dashboard/dashboard.html',
        onEnter: function($state){
         if($.cookie('sessionLog')!='set'){
           $state.go('login');
         }else{
             $(".navbarApp").css("display","block");
             $('.userName').html($.cookie('user'))
         }
         $('#dashboard').addClass('btnTabAct');
        },
        onExit: function(){
            $('#dashboard').removeClass('btnTabAct');
        },
      })
      // state grocerylist core of the app
       .state('grocerylist', {
        controller: 'groceryCtrl',
        controllerAs: 'groceryCtrl',
        url: '/grocerylist',
        templateUrl: 'client/grocerylist/grocery.html',
        onEnter: function($state){
         if($.cookie('sessionLog')!='set'){
           $state.go('login');
         }else{
             $(".navbarApp").css("display","block");
             $('.userName').html($.cookie('user'))
         }
         $('#grocery').addClass('btnTabAct');
        },
        onExit: function(){
            $('#grocery').removeClass('btnTabAct');
        },
      })
      //on error location redirect
      $urlRouterProvider.otherwise(function($injector, $location){
         let state = $injector.get('$state');
         if($.cookie('sessionLog')=='set'){
           state.go('grocerylist');
         }else{
           state.go('login');
         }
         return $location.path();
    });
  })
  //directive function for the logout button in the navbar
.directive("userLogOut",function ($kookies,$state) {
  return{
    link:function(scope, element, attrs){
        element.click(function(){
                $('body').append("<close><center><div class='loader'></div><center></close>");
                $kookies.set('sessionLog', 'unset');
                $kookies.set('user', '');
                $kookies.set('userId', '');
                setTimeout(function(){
                    $(".navbarApp").css("display","none");
                    $state.go('login');
                    $('close').remove();
                },1500)
          }); 
        }
    }
})
// directive for clear the app resource on exit
.directive('exitApp',function($kookies){
    return{
        link:function(){
            window.onbeforeunload = function(){
                $kookies.set('sessionLog', 'unset');
                $kookies.set('user', '');
                $kookies.set('userId', '');
            }
        }
    }
})
