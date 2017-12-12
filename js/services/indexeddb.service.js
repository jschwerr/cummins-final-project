(function(){
    'use strict';
    
    angular
        .module('cumminsFinalProject')
        .service('indexedDB', indexedDB);
    
    indexedDB.$inject = ['$q'];                           
    function indexedDB($q) {
                
        this.read = function(storeName, key) {
            var transaction = db.transaction([storeName]);
            var objectStore = transaction.objectStore(storeName);
            var request = objectStore.get(key);
            
            request.onerror = function(event) {
                alert("Unable to retrieve data from database!");
                return "error";
            };
            
            request.onsuccess = function(event) {
               // Do something with the request.result!
               if(request.result) {
                  return request.result;
               }
               else {
                    alert("Could not find key");
                   return "error";
               }
            };
        } 
       
        this.readAll = function(storeName) {
            var deffered = $q.defer();
            
            var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            var records = [];
            
            if (!indexedDB) {
                window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
            }

            var db;
            var request = indexedDB.open("cumminsDB", 1);

            request.onerror = function(event) {
                console.log("error: ");
            };
            
            request.onsuccess = function(event) {
                db = request.result;
                var objectStore = db.transaction(storeName).objectStore(storeName);
                
                objectStore.openCursor().onsuccess = function(event) {
                    var cursor = event.target.result;
                    
                    if (cursor) {
                        records.push(cursor.value);
                        cursor.continue();
                    }
                    
                    else {
                        deffered.resolve(records);
                    }
                }
            }
            
            return deffered.promise;
        }
       
        this.add = function(storeName, records) {

            var deferred = $q.defer();
            var addCalls = [];
            
            var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

            if (!indexedDB) {
                window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
            }

            var db;
            var request = indexedDB.open("cumminsDB", 1);

            request.onerror = function(event) {
                console.log("error: ");
            };

            request.onsuccess = function(event) {
                db = request.result;
                angular.forEach(records, function(record) {
                   addCalls.push(
                        db.transaction([storeName], "readwrite")
                            .objectStore(storeName)
                            .add(record)
                   ); 
                });
                
                $q.all(addCalls).then(function(results) {
                    results.forEach(function(res) {
                        res.onsuccess = function(event) {
                            console.log(event);
                        };
                        
                        res.onerror = function(event) {
                            console.log(event);
                        };
                    });
                    
                    deferred.resolve(true);
                });
            }; 
            
            return deferred.promise;
        }      
                        
        
       
        this.delete = function() {
           
        }
       
        this.objectStoreHasData = function() {
           
        }
    };
})();
//
//        function read() {
//            var transaction = db.transaction(["employee"]);
//            var objectStore = transaction.objectStore("employee");
//            var request = objectStore.get("00-03");
//            
//            request.onerror = function(event) {
//               alert("Unable to retrieve daa from database!");
//            };
//            
//            request.onsuccess = function(event) {
//               // Do something with the request.result!
//               if(request.result) {
//                  alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
//               }
//               
//               else {
//                  alert("Kenny couldn't be found in your database!");
//               }
//            };
//         }
//         
//         function readAll() {
//            var objectStore = db.transaction("employee").objectStore("employee");
//            
//            objectStore.openCursor().onsuccess = function(event) {
//               var cursor = event.target.result;
//               
//               if (cursor) {
//                  alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Email: " + cursor.value.email);
//                  cursor.continue();
//               }
//               
//               else {
//                  alert("No more entries!");
//               }
//            };
//         }
//         
//         function add() {
//            var request = db.transaction(["employee"], "readwrite")
//            .objectStore("employee")
//            .add({ id: "00-03", name: "Kenny", age: 19, email: "kenny@planet.org" });
//            
//            request.onsuccess = function(event) {
//               alert("Kenny has been added to your database.");
//            };
//            
//            request.onerror = function(event) {
//               alert("Unable to add data\r\nKenny is aready exist in your database! ");
//            }
//         }
//         
//         function remove() {
//            var request = db.transaction(["employee"], "readwrite")
//            .objectStore("employee")
//            .delete("00-03");
//            
//            request.onsuccess = function(event) {
//               alert("Kenny's entry has been removed from your database.");
//            };
//         }