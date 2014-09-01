angular.module('starter.services', [])

.service('trackInfoService', function($q, $http, $timeout){

	this.findNew = function(param) {

		var deferred = $q.defer();
		console.log(param);

		$timeout(function() {
	      var tId = param.page * param.limit;
	      var payload = [];
	      for(var x=0; x < param.limit; x++){
	        payload.push({ title: 'New Track '+ ++tId, artist: 'Artist Name', image: 'http://placehold.it/285x175', id: tId });
	      }
	      deferred.resolve(payload);
	    },700);

	    return deferred.promise;
	} //end findNew

	this.getCategories = function(param) {

		var deferred = $q.defer();

		$timeout(function() {
	      var payload = [
						'Alternative',
						'Blues',
						'Classical',
						'Comedy',
						'Country',
						'Dance/Electronic',
						'Decades',
						'Dinner/Cooking',
						'EDM Festivals',
						'Easy Listening',
						'Family',
						'Hip Hop/Rap',
						'Indian',
						'Indie',
						'Jazz',
						'Latin',
						'Love Songs',
						'Metal',
						'New Age',
						'Oldies',
						'Party',
						'Pop',
						'Puerto Rico',
						'R&B/Soul/Funk',
						'Reggae',
						'Rock',
						'Songwriters/Folk',
						'Summer',
						'Workout',
						'World',
						]
	      deferred.resolve(payload);
	    },700);

	    return deferred.promise;
	} //end getCategories
	
	this.getTrackData = function(trackID) {
		var deferred = $q.defer();
		$timeout(function() {
			var payload = { title: 'Fetched Track '+ trackID, artist: 'Artist Name', image: 'http://placehold.it/285x175', id: trackID, url: 'https://archive.org/download/SteveAoki/KidCudi-PursuitOfHappinessSteveAokiRemix.ogg', type: 'audio/ogg' };
			deferred.resolve(payload);
		}, 700);
		return deferred.promise;
	}
	
})


;


// $http reference
// angular.module('myApp.services', []).
//     service('Activities', function($http, $q) {
//         this.get = function(from, to){
//             var deferred = $q.defer();
//             var url = 'user/activities?from='+from+'&to='+to;
//             $http.get(url).success(function(data, status) {
//                 // Some extra manipulation on data if you want...
//                 deferred.resolve(data);
//             }).error(function(data, status) {
//                 deferred.reject(data);
//             });

//             return deferred.promise;
//         }
//     }
// );