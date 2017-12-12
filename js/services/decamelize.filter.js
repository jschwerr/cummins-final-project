(function() {
    angular
        .module('cumminsFinalProject')
        .filter('decamelize', function() {
            return function(input) {
                if (typeof input != 'string') {
                    return input;
                }
            
                var result = input.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
                result = result.charAt(0).toUpperCase() + result.slice(1);
                
                return result;
            }
        })
})();