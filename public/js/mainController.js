function mainController($scope, $http, $window) {

    $scope.id = 0;
    $scope.transaction = {};
    $scope.transactions = [];
    $scope.coloumns = ['Id','__v','_id','Amount','Category_id','Date','Description','Receipt'];
    angular.element(document).ready(function() {
        $http.get("/gettransactions").success(function(response) {
            $scope.transactions = response;
        });
    });
    $scope.logout = function() {
        $http.post("/logout", {}).success(function(response) {

        });
    };
    $scope.add_transaction = function(transaction) {
        $http.post("/transaction/add", transaction).success(function(response) {
            if (response != 'false') {
                alert('Sucessfully added a new transaction');
                $window.location.href = 'http://localhost:8080/profile';
            }else {
                alert('Error:: Amount and Category_id should be an integer');
            }
        });
    };
    $scope.downloadimage = function(path) {
        $http.get("/image?path="+path).success(function(response) {
            console.log(response);
            $scope.bookmarks.push(word);
        });
    };
}