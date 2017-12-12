(function() {
    var app = angular.module('cumminsFinalProject')
    app.directive('noScopeRepeat', function($compile) {
        return function(scope, elem, attrs) {
            scope.$watch(attrs.items, function(items) {
                if (!items) return;

                // Example template that will be repeated, with above markup,  
                // #OBJ#.myValue will be replaced by card.items[idx].myValue at each step
                console.log(attrs.template);
                var template = '<div>{{ #OBJ#.title }}</div>';

                items.forEach(function(val, key) {
                    var newElement = angular.element(
                        template.replace(/#OBJ#/g, attrs.items + '[' + key + ']')
                    );
                    $compile(newElement)(scope);
                    elem.append(newElement);
                });
            });
        };
    })
})();