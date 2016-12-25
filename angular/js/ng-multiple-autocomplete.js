
function ctrlMultipleInput($scope) {
    $scope.seloptions = [ {txt_input: "", is_active: true} ];
    
    $scope.add = function() {
        var last = $scope.seloptions.length -1;

        $scope.seloptions[last].is_active = false;
        $scope.seloptions.push( {txt_input: "", is_active: true} );
    };

    $scope.delete = function(id) {
        $scope.seloptions.splice(id, 1);

        var last = $scope.seloptions.length -1;
        $scope.seloptions[last].is_active = true;
    }
}

angular.module('modAutocomplete', []).directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
        iElement.autocomplete({
            source: function( request, response ) {
                var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
                response( $.grep( scope[iAttrs.uiItems], function( item ){
                    return matcher.test( item );
                }) );
            },
            select: function() {
                $timeout(function() {
                  iElement.trigger('input');
                }, 0);
                scope.add();
            }
        });
    };
});

angular.module('modAutofocus', []).directive('initFocus', function() {
    var timer;
    
    return function(scope, elm, attr) {
        if (timer) clearTimeout(timer);
        
        timer = setTimeout(function() {
            elm[0].focus();
        }, 0);
    };
});

angular.element(document).ready(function() {
    angular.bootstrap(document, ['modAutocomplete', 'modAutofocus']);
});
