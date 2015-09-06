function mainController($scope, $http) {

    $scope.id = 0;
    $scope.transactions = [];
    angular.element(document).ready(function() {
        alert("inside");
        $http.get("/gettransactions").success(function(response) {
            $scope.transactions = response;
        });
    });
    $scope.logout = function() {
        $http.post("/logout", {}).success(function(response) {

        });
    }
    $scope.add_transaction = function() {
        $scope.user_id = 1;
        var transaction = {
            'user_id': $scope.user_id,
            'description': $scope.transaction_new
        }
        $http.post("/transaction/add", transaction).success(function(response) {
            if (response == true) {
                $scope.transactions.push(transaction);
            }
        });
    }
    $scope.downloadimage = function(path) {
        $http.get("/image?path="+path).success(function(response) {
            console.log(response);
            $scope.bookmarks.push(word);
        });
    }
}