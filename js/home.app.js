(function(){
    'use strict';
    
    var engineData = [{'engineSerialNumber': '1', 'dataCollectedDate': '1/1/2016', 'kpi': 'output', 'value': 150.7367606}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/2/2016', 'kpi': 'output', 'value': 152.6760616}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/3/2016', 'kpi': 'output', 'value': 150.4278469}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/4/2016', 'kpi': 'output', 'value': 153.4809962}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/5/2016', 'kpi': 'output', 'value': 154.3750662}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/6/2016', 'kpi': 'output', 'value': 151.3605199}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/7/2016', 'kpi': 'output', 'value': 153.202661}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/8/2016', 'kpi': 'output', 'value': 153.467859}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/9/2016', 'kpi': 'output', 'value': 153.2596364}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/10/2016', 'kpi': 'output', 'value': 152.9448937}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/11/2016', 'kpi': 'output', 'value': 152.3531414}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/12/2016', 'kpi': 'output', 'value': 154.4594486}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/13/2016', 'kpi': 'output', 'value': 152.1036376}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/14/2016', 'kpi': 'output', 'value': 153.9375043}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/15/2016', 'kpi': 'output', 'value': 152.6318241}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/16/2016', 'kpi': 'output', 'value': 150.2716374}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/17/2016', 'kpi': 'output', 'value': 153.9261464}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/18/2016', 'kpi': 'output', 'value': 152.3813726}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/19/2016', 'kpi': 'output', 'value': 153.2686596}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/20/2016', 'kpi': 'output', 'value': 153.3755628}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/21/2016', 'kpi': 'output', 'value': 151.9051897}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/22/2016', 'kpi': 'output', 'value': 150.6401961}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/23/2016', 'kpi': 'output', 'value': 151.0485706}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/24/2016', 'kpi': 'output', 'value': 151.2022116}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/25/2016', 'kpi': 'output', 'value': 153.9494753}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/26/2016', 'kpi': 'output', 'value': 152.0833683}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/27/2016', 'kpi': 'output', 'value': 150.0848599}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/28/2016', 'kpi': 'output', 'value': 153.1116113}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/29/2016', 'kpi': 'output', 'value': 153.8232656}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/30/2016', 'kpi': 'output', 'value': 151.366331}, {'engineSerialNumber': '1', 'dataCollectedDate': '1/31/2016', 'kpi': 'output', 'value': 150.9125337}, {'engineSerialNumber': '1', 'dataCollectedDate': '2/1/2016', 'kpi': 'output', 'value': 154.5208355}, {'engineSerialNumber': '1', 'dataCollectedDate': '2/2/2016', 'kpi': 'output', 'value': 153.3981748}, {'engineSerialNumber': '1', 'dataCollectedDate': '2/3/2016', 'kpi': 'output', 'value': 150.2321395}, {'engineSerialNumber': '1', 'dataCollectedDate': '2/4/2016', 'kpi': 'output', 'value': 150.9827218}, {'engineSerialNumber': '1', 'dataCollectedDate': '2/5/2016', 'kpi': 'output', 'value': 154.0540979}, {'engineSerialNumber': '1', 'dataCollectedDate': '2/6/2016', 'kpi': 'output', 'value': 153.9498249}, {'engineSerialNumber': '1', 'dataCollectedDate': '2/7/2016', 'kpi': 'output', 'value': 152.7077612}, {'engineSerialNumber': '1', 'dataCollectedDate': '2/8/2016', 'kpi': 'output', 'value': 152.6061069}, {'engineSerialNumber': '1', 'dataCollectedDate': '2/9/2016', 'kpi': 'output', 'value': 153.8414018}, {'engineSerialNumber': '1', 'dataCollectedDate': '2/10/2016', 'kpi': 'output', 'value': 153.2931161}];
    
    var app = angular.module('cumminsFinalProject'); //array has dependency; this create a module called app
                                        //angular.module('app'); will look up a module called app

    app.controller('homeCtrl', function($scope, hasServiceEvent, hasFaultCodes, engineServiceHistory, $timeout){
        $scope.hasServiceEvent = hasServiceEvent;
        $scope.hasFaultCodes = hasFaultCodes;
        
        $scope.engineServiceHistory = engineServiceHistory;
        console.log($scope.engineServiceHistory);
        
        $scope.pairEngine = function() {
            $scope.pairInProgress = true;
            $timeout(function() {}, 3000)
            .then(function(){
                $scope.pairInProgress = false;
                $scope.hasFaultCodes = true;
            })
        }
        
        var series = [{name: 'output', data: []}]
        engineData.forEach(function(row) {
            series[0].data.push([row.dataCollectedDate, row.value]);
        });
        
        $scope.loadChart = function () { 
                var field = 'ouput';
                var chart = Highcharts.chart('chart', {
                    chart: {
                        type: 'line',
                        zoomType: 'x'
                    },
                    title: {
                        text: 'output'
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
                            text: 'output'
                        }
                    },
                    tooltip: {
                        headerFormat: '{point.x:%b-%e-%Y}  <b>{series.name}</b><br>',
                        pointFormat: 'output'
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