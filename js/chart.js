anychart.onDocumentReady(function () {
    var dataTable = anychart.data.table();
    // data comes from the function in https://cdn.anychart.com/csv-data/dji-daily-short.js
    dataTable.addData(get_dji_daily_short_data());

    var firstMapping = dataTable.mapAs({value: 1});
    var secondMapping = dataTable.mapAs({value: 5});

    var chart = anychart.stock();
    chart.padding(10, 10, 10, 50);

    var firstPlot = chart.plot(0);
    firstPlot.legend().titleFormat(function() {return "Compare With SERIES_START"});
    firstPlot.line(firstMapping);
    firstPlot.line(secondMapping);

    var firstPlotYScale = firstPlot.yScale();
    firstPlotYScale.comparisonMode("percent");

    // Set date for the changes zero of the series.
    firstPlotYScale.compareWith("series-start");

    var secondPlot = chart.plot(1);
    secondPlot.legend().titleFormat(function() {return "Compare With FIRST_VISIBLE"});    
    secondPlot.line(firstMapping);
    secondPlot.line(secondMapping);

    var secondPlotYScale = secondPlot.yScale();
    secondPlotYScale.comparisonMode("percent");

    // Set date for first visible point.
    secondPlotYScale.compareWith("first-visible");

    var thirdPlot = chart.plot(2);
    thirdPlot.legend().titleFormat(function() {return "Compare With 24 of April 2008"});        
    thirdPlot.line(firstMapping);
    thirdPlot.line(secondMapping);

    var thirdPlotYScale = thirdPlot.yScale();
    thirdPlotYScale.comparisonMode("percent");

    // Set custom date.
    // Date is 24 of April 2008, set as a JavaScript Timestamp 
    thirdPlotYScale.compareWith(1209081600000);
    // the following line gives the same result
    // thirdPlotYScale.compareWith(Date.UTC(2008, 3, 25));

    chart.title("Different Comparison Bases in Percent mode");
    chart.container("chart");
    chart.draw();

    chart.selectRange("2004-01-02", "2006-01-10");    
});