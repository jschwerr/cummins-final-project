(function(){
    'use strict';
    
    var app = angular.module('cumminsFinalProject'); //array has dependency; this create a module called app
                                        //angular.module('app'); will look up a module called app

    app.controller('diagnoseCtrl', function($scope, $location, $state, $http, $filter, $timeout, indexedDB, engineData, hasFaultCodes, engineFaultCodes){
        $scope.engineData = engineData;
        $scope.hasFaultCodes = hasFaultCodes;
        $scope.engineFaultCodes = engineFaultCodes.sort(function(a,b){return a.priority - b.priority});
        $scope.kpis = ['output', 'heatRate', 'compressorEfficiency', 'availability'];
        $scope.selectedKPI = '';
        $scope.pairing = false;
        var decamelize = $filter('decamelize');
        
        $scope.pairWithEngine = function() {
            $scope.pairing = true;
            $timeout(function() {
                $http.get('../after/data/engineFaultCodes.json')
                .then(
                    function(res) {
                        indexedDB.add('engineFaultCode', res.data)
                            .then(function(){
                                $state.go($state.current, {}, {reload: true});
                            });
                    }
                )
            }, 3000);
        };
                   
        $scope.loadChart = function () { 
            var series;
            
            if ($scope.selectedKPI != '') {
                var filteredDate = $scope.engineData.filter(
                    function(e) {return e.kpi == $scope.selectedKPI}
                );

                series = [{name: decamelize($scope.selectedKPI), data: [], color: '#B50E00'}];
                filteredDate.forEach(function(row) {
                    series[0].data.push([new Date(row.dataCollectedDate).getTime(), row.value]);
                });    
            }
            
            var chart = Highcharts.chart('diagnose-chart', {
                chart: {
                    type: 'line',
                    zoomType: 'x',
                    borderColor: '#484848',
                    borderWidth: 2
                },
                title: {
                    text: decamelize($scope.selectedKPI)
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        day: '%b-%e-%Y',
                        //http://api.highcharts.com/highcharts/xAxis.dateTimeLabelFormats
                        week: '%b-%e-%Y'//ex- 01 Jan 2016
                    },
                    title: {
                        text: 'Date'
                    }
                },
                yAxis: {
                    title: {
                        text: decamelize($scope.selectedKPI)
                    }
                },
                tooltip: {
                    headerFormat: '{point.x:%b-%e-%Y}  <b>{series.name}</b><br>',
                    pointFormat: decamelize($scope.selectedKPI)
                },
                //https://stackoverflow.com/questions/30707403/how-to-display-no-data-found-in-highcharts
                //http://api.highcharts.com/highcharts/lang.noData.html
                lang: {
                    noData: 'Select a KPI'
                },
                series: series
            });
        }
        
        $scope.loadChart();
    });
})();