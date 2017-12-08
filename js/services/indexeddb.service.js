(function(){
    'use strict';
    
    var app = angular.module('cumminsFinalProject');
    
    app.service('indexedDB', function() {
                
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
       
        this.readAll = function() {
           
        }
       
        this.add = function(storeName, record) {
            return new Promise((resolve, reject) => {
                var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

                if (!indexedDB) {
                    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
                }

                var db;
                var request = indexedDB.open("cumminsDB", 1);

                var addCallBack = function() {
                    return new Promise((resolve, reject) => {
                        console.log('storeName')
                        var add = db.transaction([storeName], "readwrite")
                            .objectStore(storeName)
                            .add(record);  
                        add.onsuccess = function(event) {
                            alert('record added');
                            resolve(true);
                        }
                        add.onerror = function(event) {
                            alert('record not added');
                            reject(false);
                        }
                    });
                }

                request.onerror = function(event) {
                    console.log("error: ");
                };

                request.onsuccess = function(event) {
                    db = request.result;
                    addCallBack().then(function() {resolve(true)});
                };

                request.onupgradeneeded = function(event) {
                    var db = event.target.result;
                    addCallBack();
                };                       
            })       
                        
        }
       
        this.delete = function() {
           
        }
       
        this.objectStoreHasData = function() {
           
        }
    });
})();

        function read() {
            var transaction = db.transaction(["employee"]);
            var objectStore = transaction.objectStore("employee");
            var request = objectStore.get("00-03");
            
            request.onerror = function(event) {
               alert("Unable to retrieve daa from database!");
            };
            
            request.onsuccess = function(event) {
               // Do something with the request.result!
               if(request.result) {
                  alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
               }
               
               else {
                  alert("Kenny couldn't be found in your database!");
               }
            };
         }
         
         function readAll() {
            var objectStore = db.transaction("employee").objectStore("employee");
            
            objectStore.openCursor().onsuccess = function(event) {
               var cursor = event.target.result;
               
               if (cursor) {
                  alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Email: " + cursor.value.email);
                  cursor.continue();
               }
               
               else {
                  alert("No more entries!");
               }
            };
         }
         
         function add() {
            var request = db.transaction(["employee"], "readwrite")
            .objectStore("employee")
            .add({ id: "00-03", name: "Kenny", age: 19, email: "kenny@planet.org" });
            
            request.onsuccess = function(event) {
               alert("Kenny has been added to your database.");
            };
            
            request.onerror = function(event) {
               alert("Unable to add data\r\nKenny is aready exist in your database! ");
            }
         }
         
         function remove() {
            var request = db.transaction(["employee"], "readwrite")
            .objectStore("employee")
            .delete("00-03");
            
            request.onsuccess = function(event) {
               alert("Kenny's entry has been removed from your database.");
            };
         }