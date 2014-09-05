angular.module('starter.services', [])

.service('trackInfoService', function($q, $http, $log, $timeout){
	
	var urlBase = 'http://localhost:1337/api/v1';


	this.findNew = function(param) {

		var deferred = $q.defer();
		console.log(param);

		// $timeout(function() {
	 //      var tId = param.page * param.limit;
	 //      var payload = [];
	 //      for(var x=0; x < param.limit; x++){
	 //        payload.push({ title: 'New Track '+ ++tId, artist: 'Artist Name', image: 'http://placehold.it/285x175', id: tId });
	 //      }
	 //      deferred.resolve(payload);
	 //    },700);
		
		$http.get(urlBase + '/track', {params: {limit: param.limit, skip: param.page*param.limit, sort:'createdAt DESC'} } )
			.success(function(data) {
				deferred.resolve(data);
			}).error(function(msg, code) {
	          deferred.reject(msg);
	          $log.error(msg, code);
	       });

	    return deferred.promise;
	} //end findNew

	this.getCategoryTracks = function(param){
		var deferred = $q.defer();
		$http.get(urlBase + '/category/' + param)
			.success(function(data) {
				deferred.resolve(data);
			}).error(function(msg, code) {
	          deferred.reject(msg);
	          $log.error(msg, code);
	       });
		return deferred.promise;
	}

	this.getCategories = function(param) {

		

		var deferred = $q.defer();


		$http.get(urlBase + '/category')
			.success(function(data) {
				deferred.resolve(data);
			}).error(function(msg, code) {
	          deferred.reject(msg);
	          $log.error(msg, code);
	       });

		// $timeout(function() {

	 //     //  var payload = [
		// 				// 'Alternative',
		// 				// 'Blues',
		// 				// 'Classical',
		// 				// 'Comedy',
		// 				// 'Country',
		// 				// 'Dance/Electronic',
		// 				// 'Decades',
		// 				// 'Dinner/Cooking',
		// 				// 'EDM Festivals',
		// 				// 'Easy Listening',
		// 				// 'Family',
		// 				// 'Hip Hop/Rap',
		// 				// 'Indian',
		// 				// 'Indie',
		// 				// 'Jazz',
		// 				// 'Latin',
		// 				// 'Love Songs',
		// 				// 'Metal',
		// 				// 'New Age',
		// 				// 'Oldies',
		// 				// 'Party',
		// 				// 'Pop',
		// 				// 'Puerto Rico',
		// 				// 'R&B/Soul/Funk',
		// 				// 'Reggae',
		// 				// 'Rock',
		// 				// 'Songwriters/Folk',
		// 				// 'Summer',
		// 				// 'Workout',
		// 				// 'World',
		// 				// ]
	 //      deferred.resolve(payload);
	 //    },700);

	    return deferred.promise;
	} //end getCategories
	
	this.getTrackData = function(trackID) {
		var deferred = $q.defer();

		$http.get(urlBase + '/track/' + trackID)
		.success(function(data) {
			deferred.resolve(data);
		}).error(function(msg, code) {
	      deferred.reject(msg);
	      $log.error(msg, code);
	   });


		// $timeout(function() {
		// 	var payload = { title: 'Fetched Track '+ trackID, artist: 'Artist Name', image: 'http://placehold.it/285x175', id: trackID, url: 'https://archive.org/download/SteveAoki/KidCudi-PursuitOfHappinessSteveAokiRemix.mp3', type: 'audio/mp3' };
		// 	deferred.resolve(payload);
		// }, 700);

		return deferred.promise;
	}


	this.findTracks = function(searchData){

		  // //simple finder
		  // //outputs GET /api/v1/user?name=rob
		  // $http.get('/api/v1/user',{params: {name: 'rob'}})
		  
		  // //this *should* work but doesn't (bug i think)
		  // $http.get('/api/v1/user',{params: {name: 'rob', limit: 5}})
		  
		  // //workaround (how waterline works on backend is)
		  // var query = { where: {name: 'rob'}, limit: 5};
		  // $http.get('/api/v1/user',{params: query});

		var deferred = $q.defer();

		var query = { 
			where: {
				or:[
					{ title: {'contains':searchData} }, 
					{ artist_name: {'contains':searchData} } 
				]
			}
		};
		
		$http.get(urlBase + '/track', {params: query})
		.success(function(data) {
			deferred.resolve(data);
		}).error(function(msg, code) {
	      deferred.reject(msg);
	      $log.error(msg, code);
	   });
		return deferred.promise;
	} //end findTracks



	this.addFavorite = function(params){
		var deferred = $q.defer();

	
		$http.post(urlBase + '/track/' + params.trackId + '/favoritedby/' + params.userId)
		.success(function(data) {
			deferred.resolve(data);
		}).error(function(msg, code) {
	      deferred.reject(msg);
	      $log.error(msg, code);
	   });
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