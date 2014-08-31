angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('HomeCtrl', function($scope, $timeout) {
  
  // this needs to be mocked up as rest call and moved into service
  $scope.scrollInfo ={};
  $scope.scrollInfo.page = 1;
  $scope.scrollInfo.limit = 5;

  $scope.newTracks = [
    { title: 'New Track 1', artist: 'Artist Name', image: 'http://placehold.it/285x175', id: 1 },
    { title: 'New Track 2', artist: 'Artist Name', image: 'http://placehold.it/285x175', id: 2 },
    { title: 'New Track 3', artist: 'Artist Name', image: 'http://placehold.it/285x175', id: 3 },
    { title: 'New Track 4', artist: 'Artist Name', image: 'http://placehold.it/285x175', id: 4 },
    { title: 'New Track 5', artist: 'Artist Name', image: 'http://placehold.it/285x175', id: 5 }
  ];

  $scope.loadMore = function(){
    
    $timeout(function() {
      console.log("loading page" + $scope.scrollInfo.page);
      var tId = $scope.scrollInfo.page * $scope.scrollInfo.limit;
      for(var x=0; x < $scope.scrollInfo.limit; x++){
        $scope.newTracks.push({ title: 'New Track '+ ++tId, artist: 'Artist Name', image: 'http://placehold.it/285x175', id: tId });
      }
      $scope.scrollInfo.page++;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    },500);
  }

})

.controller('SearchCtrl', function($scope) {
  $scope.results = [
    { title: 'New Track 1', artist: 'Artist Name', image: 'http://placehold.it/75x75', id: 1 },
    { title: 'New Track 2', artist: 'Artist Name', image: 'http://placehold.it/75x75', id: 2 },
    { title: 'New Track 3', artist: 'Artist Name', image: 'http://placehold.it/75x75', id: 3 }
  ];
  $scope.getItemHeight = function(item, index) {
    //Make evenly indexed items be 10px taller, for the sake of example
    return (index % 2) === 0 ? 50 : 60;
  };
})

.controller('FavoritesCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Fave1', id: 1 },
    { title: 'Fave2', id: 2 },
    { title: 'Fave3', id: 3 }
  ];
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
