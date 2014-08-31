angular.module('starter.services', [])

.service('getNewTracksService', function($q, $http, $timeout){

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
	    },1000);

	    return deferred.promise;
	}


	// return {
	// 	loadMore: function(page, limit){
 //    		var tempTracks = {};
 //    		tempTracks.info = [];

	// 	      console.log("loading page" + page +" and limit "+limit);
	// 	      var tId = page * limit;
	// 	      for(var x=0; x < limit; x++){
	// 	        tempTracks.info.push({ title: 'New Track '+ ++tId, artist: 'Artist Name', image: 'http://placehold.it/285x175', id: tId });
	// 	      }
	// 		return tempTracks;
	// 	}
	// };
	
})

;


// reference
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