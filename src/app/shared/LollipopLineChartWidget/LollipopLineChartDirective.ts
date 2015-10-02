/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

'use strict';
import Constants        = require("./Constants");
import ChartInterfaces  = require("./ILollipopLineChartInterfaces");
import _                = require('lodash');

export var DirectiveName = "lolliLineChart";

export function Directive(): ng.IDirective {

    return {
        restrict: 'EA',
        scope: {
            data: '=',
            options: '=',
            width: '@',
            height: '@'
        },
        template: function (elem, attrs) {

            // default width/height
            var width = attrs.width || 960;
            var height = attrs.height || 450;

            return '<svg class="lolli-line-chart" viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="xMidYMid meet"></svg>';
        },
        link: link
    };
}

function link(scope: ng.IScope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes): void {

    // grab scope values
    var options: ChartInterfaces.IOptions, data: ChartInterfaces.IData;

    // create object to hold svg element
    var svg;

    // data and options may be fetched asynchronously
    // and therefore we don't want to draw the chart until they
    // are both valid objects. this watch allows us to wait until they are ready
    (<any>scope).$watchGroup(['data', 'options'], function (newVal: any, oldVal: any, scope: ng.IScope): void {

        // update data and options if changed
        data = <ChartInterfaces.IData>(newVal[0]) || <ChartInterfaces.IData>(oldVal[0]);
        options = <ChartInterfaces.IOptions>(newVal[1]) || <ChartInterfaces.IOptions>(oldVal[0]);

        // wait for options and data to be ready
        if (!_.isEmpty(options) && !_.isEmpty(data)) {

            svg = d3.select(elem.find('svg')[0]);

            // remove all children elements (fresh redraw)
            svg.selectAll("*").remove();

            // configure default options value
            options = <ChartInterfaces.IOptions>(_.defaults(options,
                    {
                        height: 450,
                        width: 960,
                        margin: {
                            top: 20,
                            bottom: 40,
                            right: 60,
                            left: 60
                        },
                        lollipop: {
                            radius: 34
                        },
                        legend: {
                            width: 60
                        }
                    })
            );

            // sort lollipops so the transition is in correct order
            data.lollipops.sort(function (a:any, b:any) {
                return a.date - b.date;
            });

            // begin drawing chart
            drawChart();
        }

    }, true);


    function drawChart() {

        // validate options
        if (!options) {
            throw new Error('chart options not defined');
        }

        if (!options.height) {
            throw new Error('height not defined');
        }

        if (!options.width) {
            throw new Error('width not defined');
        }

        if (!options.margin) {
            throw new Error('margin not defined');
        }

        // legend sits to the right off the chart so we need to bump
        // the right margin to automatically include legend width
        options.margin.right += options.legend.width;

        var xMin, xMax, yMax;

        // loop through each series and get the
        // maximum and minimum values for x/y
        data.lines.forEach(function (line: ChartInterfaces.ILine) {

            // loop through each point within line
            line.data.forEach(function (point: ChartInterfaces.IPoint) {

                // get minimum x-axis val
                xMin = _.min([xMin, point.date]);
                xMax = _.max([xMax, point.date]);

                // get max y-axis val
                // give 40% of the vertical height for lollipops
                var ppu = point.ppu * 1.4;
                yMax = _.max([yMax, ppu]);
            });
        });

        data.lollipops.forEach(function(lolli:ChartInterfaces.ILollipop){

            var tXMin = _.clone(_.min([xMin, lolli.date]));
            if (tXMin < xMin){
                tXMin.setFullYear(tXMin.getFullYear() -2);
                xMin = tXMin;
            }

            xMax = _.max([xMax, lolli.date]);
        });

        // pad the y-axis label so that it can fit without
        // overlapping with the y-axis ticks lab
        var maxHeightDigits = Math.ceil(yMax).toString().length * 3;
        options.margin.left += maxHeightDigits;

        // calculate chart width/height
        var chartWidth = options.width - options.margin.left - options.margin.right,
            chartHeight = options.height - options.margin.top - options.margin.bottom;


        // x-axis is a time scale.
        // input domain is min(date) and max(date)
        // output range is 0 and chartWidth
        var x = d3.time
            .scale()
            .range([0, chartWidth])
            .domain([xMin, xMax]);


        // y-axis is a linear scale
        // input domain is chartHeight and 0
        // output range is 0 to max(ppu)
        var y = d3.scale
            .linear()
            .range([chartHeight, 0])
            .domain([0, yMax]);

        // create axis lines (innerTickSize)
        // padding between axis and label (tickPadding)
        var xAxis = d3.svg
            .axis()
            .scale(x)
            .orient('bottom')
            .innerTickSize(-chartHeight)
            .outerTickSize(0)
            .tickPadding(10);

        var yAxis = d3.svg
            .axis()
            .scale(y)
            .orient('left')
            .innerTickSize(-chartWidth)
            .outerTickSize(0)
            .tickPadding(10);


        // append group with margins
        svg = svg.append('g')
            .attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')');

        // clipping to start chart hidden and slide it in later
        var rectClip = svg.append('clipPath')
            .attr('id', 'rect-clip')
            .append('rect')
            .attr('width', 0)
            .attr('height', chartHeight);

        // now we are ready to begin adding objects to chart
        // since the svg is built and and clipping mask is setup
        addAxes(svg, xAxis, yAxis, chartWidth, chartHeight);
        addLegend(svg, chartWidth);
        drawPaths(svg, x, y);
        beginTransition(svg, chartWidth, chartHeight, rectClip, x);

    }

    /**
     * Adds the x and y axis lines and labels
     * @param svg
     * @param xAxis
     * @param yAxis
     * @param chartWidth
     * @param chartHeight
     */
    function addAxes(svg, xAxis, yAxis, chartWidth, chartHeight) {

        // validate axes options
        if (!options.axes) {
            throw new Error('axes options not defined');
        }

        // group all axes elements together
        var axes = svg.append('g');

        // create x axis
        axes.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + chartHeight + ')')
            .call(xAxis);

        // create y axis
        axes.append('g')
            .attr('class', 'y axis')
            .call(yAxis);

        // append x-axis label
        svg.append("text")
            .attr("x", chartWidth / 2)
            .attr("y", chartHeight + options.margin.bottom)
            .style("text-anchor", "middle")
            .text(options.axes.xLabel);

        // append y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - options.margin.left)
            .attr("x", 0 - (chartHeight / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(options.axes.yLabel);
    }

    /**
     * Add the legend to the right of the graph
     * @param svg
     * @param chartWidth
     */
    function addLegend(svg, chartWidth) {

        // validate legend options
        if (!options.legend) {
            throw new Error('legend options not defined');
        }

        // append legend box
        var legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', 'translate(' + chartWidth + ', 0)');

        // add each series
        data.lines.forEach(function (series, idx) {

            // configure y position for line and height
            var yPath = 22 * (1 + idx);
            var yText = 25 * (1 + idx);

            // add horizontal line for the legend
            legend.append('path')
                .attr('class', 'line-series')
                .style('stroke', colors(idx))
                .attr('d', 'M10,' + yPath + 'L55,' + yPath);

            // add text next to line
            legend.append('text')
                .attr('x', 65)
                .attr('y', yText)
                .text(series.name);
        });


    }


    /**
     * Draw the series on the chart
     * @param svg
     * @param x
     * @param y
     * */
    function drawPaths(svg, x, y) {

        // create line function
        var line = d3.svg.line<ChartInterfaces.IPoint>()
            .interpolate('basis')
            .x(function (d: ChartInterfaces.IPoint, i: number): number {
                return x(d.date);
            })
            .y(function (d: ChartInterfaces.IPoint, i: number): number {
                return y(d.ppu);
            });

        // draw each series line
        // mask with the rect-clip
        var seriesIdx = 0;
        svg.selectAll(".line")
            .data(_.pluck(data.lines, 'data'))
            .enter()
            .append("path")
            .attr('class', 'line-series')
            .style("stroke", function (series: ChartInterfaces.ILine[]) {
                var color = colors(seriesIdx);
                seriesIdx++;
                return color;
            })
            .attr("d", line)
            .attr('clip-path', 'url(#rect-clip)');
    }

    /**
     * Begin showing the chart and adding the lollipops on screen
     * @param svg
     * @param chartWidth
     * @param chartHeight
     * @param rectClip
     * @param x
     * */
    function beginTransition(svg, chartWidth, chartHeight, rectClip, x) {

        // transition clipping path (based upon number of lollipops)
        rectClip.transition()
            .duration(1000 * data.lollipops.length)
            .attr('width', chartWidth);

        // add each lollipop at interval
        data.lollipops.forEach(function (lollipop, i) {
            setTimeout(function () {
                addLollipop(lollipop, svg, chartHeight, x);
            }, 1000 + 500 * i);
        });

    }

    /**
     * Places lollipop on chart in corresponding x/y location
     * @param lollipop
     * @param svg
     * @param chartHeight
     * @param x
     */
    function addLollipop(lollipop, svg, chartHeight, x) {

        // validate the lollipop options
        if (!options.lollipop) {
            throw new Error('lollipop options not defined');
        }

        // configure lollipop x and y positions
        var radius = options.lollipop.radius;
        var xPos = x(lollipop.date) - radius - 3,
            yPosStart = chartHeight - radius - 3,
            yPosEnd = radius;

        // create lollipop object
        var markerG = svg.append('g')
            .attr('class', 'lollipop ' + lollipop.type.toLowerCase())
            .attr('transform', 'translate(' + xPos + ', ' + yPosStart + ')')
            .attr('opacity', 0);

        // transition lollipop slide up
        markerG.transition()
            .duration(1000)
            .attr('transform', 'translate(' + xPos + ', ' + yPosEnd + ')')
            .attr('opacity', 1);

        // attach circle shape
        markerG.append('circle')
            .attr('class', 'lollipop-bg')
            .attr('cx', radius)
            .attr('cy', radius)
            .attr('r', radius);

        // draw vertical line to circle
        markerG.append('path')
            .attr('d', 'M' + radius + ',' + (chartHeight - yPosStart) + 'L' + radius + ',' + (chartHeight - yPosStart))
            .transition()
            .duration(1000)
            .attr('d', 'M' + radius + ',' + (chartHeight - yPosEnd) + 'L' + radius + ',' + (radius * 2));

        // add marker title
        markerG.append('text')
            .attr('x', radius)
            .attr('y', radius * 1.1)
            .text(lollipop.type);

        // add marker subtitle
        //markerG.append('text')
        //    .attr('x', options.radius)
        //    .attr('y', options.radius * 1.5)
        //    .text(marker.price);
    }

    /**
     * Returns a color from array in position n
     * @param n
     * @returns {string}
     */
    function colors(n) {
        var colors = ["#dc3912", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
        return colors[n % colors.length];
    }

}
