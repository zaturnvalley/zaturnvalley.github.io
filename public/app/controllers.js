angular.module('JobCtrls', ['JobServices'])
.controller('HomeCtrl', ['$scope', 'Job', function($scope, Job) {
  $scope.jobs = [];

  Job.query(function success(data) {
    $scope.jobs = data;
  }, function error(data) {
    console.log(data);
  });

  $scope.deleteJob = function(id, recipesIdx) {
    Job.delete({ id: id }, function success(data) {
      $scope.jobs.splice(recipesIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  };
}])
.controller('ShowCtrl', ['$scope', '$stateParams', 'Job', function($scope, $stateParams, Job) {
  $scope.job = {};

  Job.get({ id: $stateParams.id }, function success(data) {
    $scope.job = data;
  }, function error(data) {
    console.log(data);
  });
}])
.controller('NewJobCtrl', ['$scope', '$location', 'Job', function($scope, $location, Job) {
  $scope.job = {
    description: ''
  };

  $scope.createJob = function() {
    Job.save($scope.job, function success(data) {
      console.log('click');
      console.log(data);
      $location.path('/show');
    }, function error(data) {
      console.log(data);
    });
  };
}])
.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.Auth = Auth;
  $scope.logout = function() {
    Auth.removeToken();
    console.log('My Token: ', Auth.getToken());
  };
}])
.controller('SignupCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success(res) {
      $state.go('home');
    }, function error(res) {
      console.log(res);
    });
  };
}])
.controller('LoginCtrl', ['$scope', '$http', '$state', 'Auth', function($scope, $http, $state, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      $state.go('home');
    }, function error(res) {
      console.log(res);
    });
  };
}])
.controller('JobCtrl', ['$scope', '$http', '$stateParams', '$state', 'Job', function($scope, $http, $stateParams, $state, Job) {

  $scope.showWordCloud = function() {
    console.log("Called!");
    // Job.get({ description: $stateParams.description }, function success(data) {
    //   console.log('Yay '+data);
    //   $scope.job = data;
    // }, function error(data) { 
    //   console.log("error "+data);
    // });
    console.log($scope.description);
    // var job = {
    //   description: $scope.description
    // };
    console.log('90 ', job);
    var job = wordFrequency(removeStopwords($scope.description));
    // $state.go('show', job);


  };
}]);


function removeStopwords(jobDescription) {
  var stopwords = "a, able, about, across, after, all, almost, also, am, among, an, and, any, are, as, at, be, because, been, but, by, can, cannot, could, dear, did, do, does, either, else, ever, every, for, from, get, got, had, has, have, he, her, hers, him, his, how, however, i, if, in, into, is, it, its just, least, let, like, likely, may, me, might, most, must, my, neither, no, nor, not, of, off, often, on, only, or, other, our, own, rather, said, say, says, she, should, since, so, some, than, that, the, their, them, then, there, these, they, this, tis, to, too, us, wants, was, we, were, what, when, where, which, while, who, whom, why, will, with, would, yet, you, your, arent, cant, couldve, couldnt, hell, hes, id, isnt, mustve, mustnt, its, shell, shes, shouldnt, shouldve, thatll, thats, theres, theyd, theyll, theres, youd, youll, youre, youve";
    var allWordArr = jobDescription.match(/\w+/g);
    var stopwordsObj = {};
    var keywordArr = [];
    
    stopwords = stopwords.split(',');
    for (var i = 0; i < stopwords.length; i++ ) {
        stopwordsObj[ stopwords[i].trim() ] = true;
    }
    
    for (i = 0; i < allWordArr.length; i++ ) {
        var word = allWordArr[i].trim().toLowerCase();
        if ( !stopwordsObj[word] ) {
            keywordArr.push(word);
        }
    }
    console.log(keywordArr);
    return keywordArr;
}

function wordFrequency(arr) {
    var wordObj = [];
    var prev;
    
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            wordObj.push({
             text: arr[i],
             weight: 1
            });
        } else {
            wordObj[wordObj.length-1].weight++;
        }
        prev = arr[i];
    }
    console.log(wordObj);
    return wordObj;
}