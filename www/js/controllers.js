angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, categories) {
  
  $scope.categories = categories;

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

.controller('HomeCtrl', function($scope, $timeout, trackInfoService) {
  
  // this needs to be mocked up as rest call and moved into service
  $scope.scrollInfo = {};
  $scope.scrollInfo.page = 0;
  $scope.scrollInfo.limit = 5;
  $scope.scrollInfo.newTracks = [];
  
  
  $scope.loadMore = function(){
    trackInfoService.findNew($scope.scrollInfo).then(
      function(fetchedTracks) {
        fetchedTracks.forEach(function(track){
          $scope.scrollInfo.newTracks.push(track);
        });
        $scope.scrollInfo.page++;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }
    );
  };

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

.controller('CategoryCtrl', function($scope, $stateParams) {

  $scope.pageTitle = $stateParams.category;
    $scope.results = [
    { title: 'New Track 1', artist: 'Artist Name', image: 'http://placehold.it/75x75', id: 1 },
    { title: 'New Track 2', artist: 'Artist Name', image: 'http://placehold.it/75x75', id: 2 },
    { title: 'New Track 3', artist: 'Artist Name', image: 'http://placehold.it/75x75', id: 3 }
  ];
})

.controller('PlayerCtrl', function(  $scope, $stateParams, $ionicLoading, trackInfoService) {
    
  $ionicLoading.show({
    template: '<i class="icon ion-loading-c"></i> Loading...'
  });

  $scope.currTrack = {};

    //call service to get track data from id
  trackInfoService.getTrackData($stateParams.trackid).then(
    function(fetchedTrack){

      console.log(fetchedTrack);
      $scope.trackData = fetchedTrack;
      $scope.pageTitle = $scope.trackData.title;

      $scope.playlist1[0] = {src:$scope.trackData.url, type:$scope.trackData.type};
      $ionicLoading.hide();
      console.log($scope.playlist1);
    }
  );
  
  $scope.currTrack.isPlaying = false;
  $scope.seekPercentage = function ($event) {
        var percentage = ($event.offsetX / $event.target.offsetWidth);
        if (percentage <= 1) {
          return percentage;
        } else {
          return 0;
        }
      };
  $scope.currTrack.playerControl = function(){

    $scope.currTrack.isPlaying = !$scope.currTrack.isPlaying;
    $scope.audio1.playPause();

    $scope.$watch('audio1.ended',function(){
      if($scope.audio1.ended){
        console.log("ended do something");
         $scope.currTrack.isPlaying = !$scope.currTrack.isPlaying;
      }
    });
  }

  $scope.currTrack.addFavorite = function(){
    console.log("add favorite");
  }

  


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
