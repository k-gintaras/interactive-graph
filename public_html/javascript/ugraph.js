/**
 * The MIT License (MIT) Copyright (c)
 * 
 * <2016><Gintaras Koncevicius>(@author Ubaby)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
//_________________________________________________
/*
 //GRAPH GUIDE AND EXAMPLES
 //STEP 1. setup your data
 var data = {
 dataTitle: "Speed",
 xTitle: "Time",
 yTitle: "Distance",
 //even if you give data you can disable showing it, data is needed to build scale
 //data can also be just a range of values to display i.e.   x:[0,100] y:[0,100]
 x: [0, 1, 2, 3, 4, 5],
 y: [0, 1, 3, 2, 5, 4]
 };
 //
 //STEP 2.a. setup your simplest settings
 var verySimpleSettings = {
 canvas: cn, //mandatory
 data: data //or scale, mandatory
 };
 
 //STEP 2.b. setup your simple settings           
 var simpleSettings = {
 canvas: cn, //mandatory
 data: data, //or scale, mandatory
 //THE REST SETTINGS ARE OPTIONAL
 //                setGraphSizeByPieces: true, //by pixels if false
 //                w: 41, //uneven
 //                h: 41, //uneven
 offsetX: 0.001, //non zero
 offsetY: 0.001, //non zero
 precision: 7, //uneven
 userCanDraw: true,
 displayDataPoints: true,
 //when displaying less numbers, it may skip a lot, need to modify graph height
 //                displayLessNumbers:false,
 //                bigGridWidth:20,
 //                bigGridHeight:20,
 displayDataSplines: true,
 drawSplineMarkers: true,
 infoNearAxis: "",
 infoNearMouse: "",
 showLastClickedCoordinate: false,
 pause:false
 };
 
 //STEP 2.c setup full settings
 var fullGraphSettings = {
 canvas: cn, // mandatory
 data: data, //data or a scale for axis numbers, mandatory
 //THE REST SETTINGS ARE OPTIONAL
 showFps: true,
 stop: false, //stop animating if true
 setGraphSizeByPieces: true,
 w: 41, //non ending with 0
 h: 41, //non ending with 0
 x: 100, //from canvas top how many pixels off
 y: 100, //from canvas top how many pixels off
 offsetX: 0.001, //non zero
 offsetY: 0.001, //non zero
 precision: 10, //size of one grid piece, other values also depend on it
 infoNearAxis: "Near Y Axis",
 infoNearMouse: "Graph Info Near Mouse",
 showLastClickedCoordinate: false,
 pause:false,
 //how precise are shown numbers, (graph stays same precision, just shows less numbers)
 displayLessNumbers: true,
 roundByDigitCount: 1, //how many digits to round the numbers
 displayNumbersEach: 0.5, //how precise are the numbers i.e. 1,2 or 0.5,1,1.5,2
 
 //when displaying less numbers you can use these to align them
 displayXEach : 0.5,
 displayYEach : 0.5,
 roundXDigits : 1,
 roundYDigits : 1,
 
 //do you want that data to be displayed or just draw ?
 userCanDraw: true, //can disable user ability to draw at custom times
 mouseoverDrawing: true, //on mouseover can draw, mouseout cant, prevents lines being drawn far away from canvas
 displayDataPoints: true, //
 displayDataSplines: true,
 drawSplineMarkers: true,
 displayWhatIsDrawing: true, //when you draw lines or splines it shows near mouse the info
 //COLOR SETTINGS
 splineMarkerFill: false,
 gridPieceColor: "rgb(230,230,230)",
 smallGridColor: "rgb(180,200,200)",
 bigGridColor: color.blue,
 axisArrowColor: "rgb(1,1,1)",
 axisTextColor: "rgb(1,1,1)",
 axisNumberColor: "rgb(1,1,1)",
 pointColor: color.red,
 splineColor: color.red,
 splineMarkerColor: color.blue,
 croshairColor: "rgb(1,1,1)",
 lineDrawingColor: color.red,
 //ELEMENT THICKNESS
 smallGridThickness: 1,
 bigGridThickness: 0.5,
 coordinateArrowThickness: 1,
 axisArrowThickness: 2,
 lineDrawingThickness: 2,
 splineMarkerThickness: 1,
 splineThickness: 2,
 croshairThickness: 0.5,
 //FONTS
 axisFont: "Roboto",
 axisNumberFont: "Roboto",
 axisFontSize: 20,
 axisNumberFontSize: 15
 };
 
 //STEP 3. load data and settings to the graph
 //ONCE you have data, you can call it
 var graph = new ugraph(startingSettings);
 var graphLiveSettings = graph.getGraphSettings();
 fixLag(graph, graphLiveSettings, startingSettings, 20, 10);
 //STEP 4. draw something or not            
 graph.drawSplines(4);
 */

//GRAPH LIBRARY
function ugraph(s, bgr) {
    var color = {blue: "rgb(0,179,214)", red: "rgb(255,41,4)", yellow: "rgb(255,201,0)", green: "rgb(151,215,45)"};
    var g = new GraphObject();
    g.stop = false;
    g.fps = 0;
    (s.canvas) ? g.canvas = s.canvas : console.log("Need to pass canvas object. I.e. var canvas = document.getElementById(canvasId); ugraph({canvas:canvas})");
    g.context = g.canvas.getContext("2d");
    var mouse = {x: "", y: "", w: 4, h: 4, isMovingTimer: "", clickTimer: "", isMoving: "", moved: "", down: "", up: "", clicks: 0, clicks2: 0, precision: 100};

    g.axisNumberSettings = {};//don't
    g.axisSettings = {};//don't
    g.drawingEnabled = false;
    g.splineCounter = 1;
    g.splineData = [];
    g.splines = [];
    g.splineMarkers = [];
    g.lines = [];
    g.lineData = [];
    g.lineCounter = 1;
    g.gridPieces = [];
    g.userCanDraw = false;

    this.drawPoints = function () {
        startDrawingPoints();
    };
    this.drawLines = function () {
        setTimeout(function () {
            startDrawingLines();
        }, 500);
    };
    this.drawSplines = function (pts) {
        setTimeout(function () {
            (pts) ? startDrawingSplines(pts) : startDrawingSplines(5);
        }, 500);
    };
    this.stopDrawing = function () {
        stopDrawing();
    };
    this.getGraphSettings = function () {
        return g;
    };
    this.setDrawingColor = function (c) {
        g.pointColor = c;
        g.splineColor = c;
        g.lineDrawingColor = c;
        g.splineMarkerColor = c;
    };
    this.deleteLastPoint = function () {
        if (g.gridPieces.length) {
            var coords = g.gridPieces.pop().split(",");
            g.matrix[coords[0]][coords[1]].color = g.gridPieceColor;
        }
    };
    this.deleteLastLine = function () {
        if (g.lines.length) {
            g.lines.pop();
        }
    };
    this.deleteLastSpline = function () {
        if (g.splines.length) {
            g.splines.pop();
            g.splineMarkers = [];
        }
    };
    this.noExtraInfo = function () {
        g.infoNearMouse = "";
        g.infoNearAxis = "";
    };
    function startDrawingPoints() {
        g.userCanDraw = true;
        g.drawingStatus = [true, false, false];
    }

    function startDrawingLines() {
        g.userCanDraw = true;
        g.drawingStatus = [false, true, false];
    }

    function startDrawingSplines(points) {
        g.userCanDraw = true;
        g.drawingStatus = [false, false, true];
        g.splinePointLimit = points;
    }

    function stopDrawing() {
        g.userCanDraw = false;
        g.drawingStatus = [false, false, false];
    }
//_______________________________________________________________________________
//SETUP DATA
    (s.data.dataTitle) ? g.title = s.data.dataTitle : g.title = "No Title";
    (s.data.xTitle) ? g.xData.title = s.data.xTitle : g.xData.title = "xValues";
    (s.data.yTitle) ? g.yData.title = s.data.yTitle : g.yData.title = "yValues";
    (s.data.x) ? g.xData.data = s.data.x : g.xData.data = [1, 2, 3, 4, 5];
    (s.data.y) ? g.yData.data = s.data.y : g.yData.data = [1, 2, 3, 4, 5];

//SETUP
    (s.precision) ? g.precision = s.precision : g.precision = 10;
    (s.showFps !== undefined) ? g.showFps = s.showFps : g.showFps = false;
    (s.stop !== undefined) ? g.stop = s.stop : g.stop = false;
    (s.mouseoverDrawing !== undefined) ? g.mouseoverDrawing = s.mouseoverDrawing : g.mouseoverDrawing = true;
    (s.pause !== undefined) ? g.pause = s.pause : g.pause = false;
    (s.displayDataPoints !== undefined) ? g.displayDataPoints = s.displayDataPoints : g.displayDataPoints = true;
    (s.displayDataSplines !== undefined) ? g.displayDataSplines = s.displayDataSplines : g.displayDataSplines = true;
    (s.drawSplineMarkers !== undefined) ? g.drawSplineMarkers = s.drawSplineMarkers : g.drawSplineMarkers = true;
    (s.displayWhatIsDrawing !== undefined) ? g.displayWhatIsDrawing = s.displayWhatIsDrawing : g.displayWhatIsDrawing = true;
    //when displaying less numbers, it may skip a lot, need to modify graph height
    (s.displayLessNumbers !== undefined) ? g.displayLessNumbers = s.displayLessNumbers : g.displayLessNumbers = true;
    (s.displayNumbersEach) ? g.displayNumbersEach = s.displayNumbersEach : g.displayNumbersEach = 0.5;
    (s.roundByDigitCount) ? g.roundByDigitCount = s.roundByDigitCount : g.roundByDigitCount = 1;
    //when displaying less numbers you can use these to align them
    (s.displayXEach !== undefined) ? g.displayXEach = s.displayXEach : g.displayXEach = g.roundByDigitCount;
    (s.displayYEach !== undefined) ? g.displayYEach = s.displayYEach : g.displayYEach = g.roundByDigitCount;
    (s.roundXDigits !== undefined) ? g.roundXDigits = s.roundXDigits : g.roundXDigits = g.roundByDigitCount;
    (s.roundYDigits !== undefined) ? g.roundYDigits = s.roundYDigits : g.roundYDigits = g.roundByDigitCount;

    (s.bigGridWidth) ? g.bigGridWidth = s.bigGridWidth : g.bigGridWidth = g.precision * 0.5;
    (s.bigGridHeight) ? g.bigGridHeight = s.bigGridHeight : g.bigGridHeight = g.precision * 0.5;
    (s.infoNearMouse !== undefined) ? g.infoNearMouse = s.infoNearMouse : g.infoNearMouse = "Graph Info Near Mouse";
    (s.infoNearAxis !== undefined) ? g.infoNearAxis = s.infoNearAxis : g.infoNearAxis = "Graph Info Near Axis";
    (s.showLastClickedCoordinate !== undefined) ? g.showLastClickedCoordinate = s.showLastClickedCoordinate : g.showLastClickedCoordinate = false;

//SETUP POSITION  
    (s.x && s.y) ? setGraphLocation(g, s.x, s.y) : setGraphLocation(g, 100, 100);
    if (bgr) {
        setGraphLocation(g, 0, 0);
    }
//                g.offset.x = findOffset(s.data.x, g.size.w); //Can't remember why did I do it and why it worked, but is not needed anymore it seems
//                g.offset.y = findOffset(s.data.y, g.size.h);
    (s.offsetX) ? g.offset.x = s.offsetX : g.offset.x = g.precision;
    (s.offsetY) ? g.offset.y = s.offsetY : g.offset.y = g.precision;

//SETUP LOCATION  
    if (s.w && s.h) {
        (s.setGraphSizeByPieces) ? setGraphSizeByPieces(g, s.w, s.h) : setGraphSizeByPixels(g, s.w, s.h);
    } else {
        setGraphSizeByPixels(g, g.context.canvas.clientWidth, g.context.canvas.clientHeight);
    }
//enable disable drawing only on mouse over canvas  
    if (g.mouseoverDrawing) {
        g.canvas.addEventListener("mouseout", function () {
            g.drawingEnabled = false;
        });
        g.canvas.addEventListener("mouseover", function () {
            setTimeout(function () {
                g.drawingEnabled = true;
            }, 500);
        });
    }
//COLOR SETTINGS
    g.splineMarkerFill = false;
    g.gridPieceColor = "rgb(230,230,230)";
    if (bgr) {
        g.gridPieceColor = "transparent";
    }
    g.smallGridColor = "rgb(180,200,200)";
    g.bigGridColor = color.blue;
    g.axisArrowColor = "rgb(1,1,1)";
    g.axisTextColor = "rgb(1,1,1)";
    g.axisNumberColor = "rgb(1,1,1)";
    g.pointColor = color.red;
    g.splineColor = color.red;
    g.lineDrawingColor = color.red;
    g.splineMarkerColor = "rgb(150,180,180)";
    g.croshairColor = "rgb(1,1,1)";

//ELEMENT THICKNESS
    g.smallGridThickness = 1;
    g.bigGridThickness = 0.5;
    g.coordinateArrowThickness = 1;
    g.axisArrowThickness = 2;
    g.lineDrawingThickness = 2;
    g.splineMarkerThickness = 1;
    g.splineThickness = 2;
    g.croshairThickness = 0.5;

//FONTS
    g.axisFont = "Roboto";
    g.axisNumberFont = "Roboto";
    g.axisFontSize = 20;
    g.axisNumberFontSize = 15;

//create graph pieces as objects    
    setMatrix(g);
    if (g.displayDataPoints) {
        loadDataToGraph(g);
    }

    setGraphDataProperties(g);
    setGraphNumberRepresentations(g);
    setNumbersToGraph(g);
    setAxisSettings(g);
    setAxisNumberSettings(g);

    startDrawing(g);

    function setGraphLocation(g, x, y) {
        var p = g.precision;
        var stepsFromX = x / p;
        var stepsFromY = y / p;
        g.location.x = stepsFromX * p;
        g.location.y = stepsFromY * p;
    }

    function setGraphSizeByPieces(g, w, h) {
        g.size.w = Math.round(w);
        g.size.h = Math.round(h);
    }

    function setGraphSizeByPixels(g, w, h) {
        var p = g.precision, offX = g.location.x / p, offY = g.location.y / p;
        w = (w / (p) - (offX * 2));
        h = (h / (p) - (offY * 2));
        g.size.w = Math.round(w);
        g.size.h = Math.round(h);
    }

    function findOffset(array, pieces) {
        var sorted = sortAscending(array);
        var min = sorted[0];
        var max = sorted[sorted.length - 1];
        var widthInPieces = pieces;
        var tenPct = getPercentage(max, 50);
        var newMax = max + tenPct;
        var onePieceWidth = newMax / widthInPieces;
        var offsetInPieces = Math.round(min / onePieceWidth, 1);
        return offsetInPieces;
    }

    function setMatrix(g) {
        var x = g.location.x;
        var y = g.location.y;
        var sizeY = g.size.w;
        var sizeX = g.size.h;
        var precision = g.precision;
        var x1, y1, gridObjects, gridPiece = {};
        g.matrix = new Array(sizeY);
        for (var i = 0; i < sizeY; i++) {
            gridObjects = new Array(sizeX);
            x1 = x + i * precision;
            for (var j = 0; j < sizeX; j++) {
                y1 = y + j * precision;
                gridPiece.color = g.gridPieceColor;
                gridPiece.x = x1;
                gridPiece.y = y1;
                gridPiece.w = precision;
                gridPiece.h = precision;
                gridPiece.size = precision;
                gridObjects[j] = new GridObject(gridPiece);
            }
            g.matrix[i] = copyArray(gridObjects);
        }
    }

    function loadDataToGraph(g) {
        var matrix = g.matrix;
        var graphLimitY = matrix[0].length;
        var graphLimitX = matrix.length;

        var xResults = g.xData.data;
        var yResults = g.yData.data;

        var minMaxXResults = copyArray(sortAscending(xResults));
        var minMaxYResults = copyArray(sortAscending(yResults));

        var newMinX = g.offset.x;
        var newMinY = g.offset.y;

        var newMaxX = graphLimitX - newMinX - 1;
        var newMaxY = graphLimitY - newMinY - 1;

        var minX = minMaxXResults[0];
        var minY = minMaxYResults[0];

        var maxX = minMaxXResults[minMaxXResults.length - 1];
        var maxY = minMaxYResults[minMaxYResults.length - 1];

        if (xResults.length === yResults.length) {
            var points = [];
            for (var i = 0; i < xResults.length; i++) {
                var x = xResults[i];
                var y = yResults[i];
                var normalizedX = Math.round(normalize(x, minX, maxX, newMinX, newMaxX));
                var normalizedY = Math.round(normalize(y, minY, maxY, newMinY, newMaxY));
                var m = normalizedX;
                var n = matrix[0].length - normalizedY - 1;
                var itemToMark = matrix[m][n];
                itemToMark.color = g.pointColor;

                if (g.displayDataSplines) {
                    var p = g.precision, x = g.location.x, y = g.location.y, w = g.w * p, h = g.h * p;
                    var nx = m;
                    var ny = n;
                    nx *= p;
                    ny *= p;
                    nx += x + p / 2;
                    ny += y + p / 2;
                    points.push(new Point(nx, ny));
                }
            }
            if (g.displayDataSplines) {
                g.splines.push(new Spline(points, g.splineColor));
            }
        }
    }

    function setGraphDataProperties(graph) {
        var skip = graph.precision;
        //x
        var x = graph.location.x;
        var offsetX = graph.offset.x;
        var columns = graph.size.w;
        var dataX = graph.xData.data;
        //y
        var y = graph.location.y;
        var offsetY = graph.offset.y;
        var rows = graph.size.h;
        var dataY = graph.yData.data;

        //min max calculation variables
        var dX = dataFromVector(x, offsetX, columns, dataX, skip);
        var dY = dataFromVector(y, offsetY, rows, dataY, skip);

        dataToGraph(graph.xData, dX);
        dataToGraph(graph.yData, dY);

        function dataFromVector(xy, offset, items, vector, skip) {
            var innerWidthInPieces = items - (offset * 2);
            var sorted = sortAscending(vector);
            var min1 = sorted[0];
            var max1 = sorted[sorted.length - 1];
            var InnerWidthInValues = max1 - min1;
            var onePieceWidth = InnerWidthInValues / innerWidthInPieces;
            var offsetXinValues = onePieceWidth * offset;
            var min2 = min1 - offsetXinValues;
            var max2 = max1 + offsetXinValues;
            var size = (items * skip) + xy;
            var skip2 = xy + (skip / 2);
            return  {min1: min1, max1: max1, min2: min2, max2: max2, size: size, skip: skip2};
        }

        function dataToGraph(graph, data) {
            graph.min = data.min1;
            graph.max = data.max1;
            graph.graphMin = data.min2;
            graph.graphMax = data.max2;
            graph.gridSize = data.size;
            graph.skip = data.skip;
        }
    }

    function setGraphNumberRepresentations(graph) {
        var xNumbers = buildNumbersForVector(graph.size.w, graph.xData, graph.precision);
        var yNumbers = buildNumbersForVector(graph.size.h, graph.yData, graph.precision);
        graph.xData.dataNumbers = xNumbers;
        graph.yData.dataNumbers = yNumbers;

        function buildNumbersForVector(size, vector) {
            var numbers = new Array(size);
            for (var i = 1; i <= size; i++) {
                var normalized = normalize(i, 1, size, vector.graphMin, vector.graphMax);
                normalized = round(normalized, 3);
                numbers[i - 1] = normalized;
            }
            return numbers;
        }
    }

    function setNumbersToGraph(g) {
        var matrix = g.matrix;
        var xNumbers = g.xData.dataNumbers;
        var yNumbers = g.yData.dataNumbers;
        for (var i = matrix.length - 1; i >= 0; i--) {
            for (var j = 0; j < matrix[i].length; j++) {
                matrix[i][j].xValue = xNumbers[i];
                matrix[i][j].yValue = yNumbers[yNumbers.length - 1 - j];
            }
        }
    }

    function setAxisSettings(g) {
        var x = g.location.x, y = g.location.y, w = g.size.w, h = g.size.h, p = g.precision;
        y += 1;
        var lineWidth = (w * p);
        var lineHeight = (h * p);
        var startX = x;
        var startY = y + lineHeight;
        var endXV = x; //extend for it to look like arrow
        var endYV = y - (y / 2);
        var endXH = x + lineWidth + (x / 2);//extend for it to look like arrow
        var endYH = y + lineHeight;
//text
        var titleX = x / 4;
        var titleY = y / 4;
        var xTextX = lineWidth + x + g.axisFontSize;
        //this might be problem with different font sizes
        var xTextY = lineHeight + y - ((g.axisFontSize / 4) * (g.xData.title.length + 2));
        var xTextAngle = -Math.PI / 2;
        var yTextX = x + g.axisFontSize;
        var yTextY = y - g.axisFontSize * 0.5;
        var infoTextX = x + g.axisFontSize + (g.axisFontSize / 2) * (g.yData.title.length + 2);
        var infoTextY = y - g.axisFontSize * 0.5;

        var axettings = {
            startX: startX,
            startY: startY,
            endXV: endXV,
            endYV: endYV,
            endXH: endXH,
            endYH: endYH,
            titleX: titleX,
            titleY: titleY,
            xTextX: xTextX,
            xTextY: xTextY,
            xTextAngle: xTextAngle,
            yTextX: yTextX,
            yTextY: yTextY,
            infoTextX: infoTextX,
            infoTextY: infoTextY
        };
        g.axisSettings = axettings;
    }

    function setAxisNumberSettings(g) {
        var skip = g.precision;
        var x = g.location.x, y = g.location.y, columns = g.size.w, rows = g.size.h;

        var displayLessNumbers = g.displayLessNumbers;
        var roundDigits = g.roundByDigitCount;
        var gridWidth = g.bigGridWidth;
        var gridHeight = g.bigGridHeight;

//    graph, x, y, columns, rows, skip
        var graphMinX = g.xData.graphMin;
        var graphMinY = g.yData.graphMin;
        var graphMaxX = g.xData.graphMax;
        var graphMaxY = g.yData.graphMax;

        var xSkip = g.xData.skip + 0.5;
        var ySkip = g.yData.skip - 0.5;
        var lineWidth = g.xData.gridSize;
        var lineHeight = g.yData.gridSize;
        var angle = -Math.PI / 2;

        var sorted1 = g.xData.data.sort();
        var largest1 = sorted1[sorted1.length - 1];
        var digits1 = ("" + largest1).length + roundDigits;
        var tw1 = (digits1 * (g.axisNumberFontSize / 2));

        var textDistanceV = lineHeight + tw1;
        var lineDistanceV = textDistanceV;

        var sorted2 = g.yData.data.sort();
        var largest2 = sorted2[sorted2.length - 1];
        var digits2 = ("" + largest2).length + roundDigits;
        var tw2 = (digits2 * (g.axisNumberFontSize / 2)) / 2;

        var textDistanceH = tw2;
        var lineDistanceH = textDistanceH * 2;

        var ly = lineHeight + y;
        var prevV = -999;
        var prevH = -999;

        var displayXEach = g.displayXEach;
        var displayYEach = g.displayYEach;
        var roundXDigits = g.roundXDigits;
        var roundYDigits = g.roundYDigits;

        var verticals = [];
        var horizontals = [];

        function OBJ(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

//CALCULATE VERTICAL
        for (var i = 1; i <= columns; i++) {
            if (i % Math.round(gridWidth / skip) === 0) {/*|| g.displayLessNumbers) {*/
                var normalized = normalize(i, 1, columns, graphMinX, graphMaxX);
                normalized = round(normalized, roundXDigits);
                var tyy = textDistanceV + xSkip;
                if (displayLessNumbers) {
                    if (normalized % displayXEach === 0 && normalized !== prevV) {
                        verticals.push(new OBJ(normalized, tyy, xSkip));
                    }
                } else {
                    verticals.push(new OBJ(normalized, tyy, xSkip));
                }
                prevV = normalized;
            }
            xSkip += skip;
        }

//CALCULATE HORIZONTAL
        for (var i = 1; i <= rows; i++) {
            if (i % Math.round(gridHeight / skip) === 0) {/*|| g.displayLessNumbers) {*/
                var normalized = normalize(i, 1, rows, graphMinY, graphMaxY);
                normalized = round(normalized, roundYDigits);
                var lyy = ly - ySkip;
                if (g.displayLessNumbers) {
                    if (normalized % displayYEach === 0 && normalized !== prevH) {
                        horizontals.push(new OBJ(normalized, lyy, 0));
                    }
                } else {
                    horizontals.push(new OBJ(normalized, lyy, 0));
                }
                prevH = normalized;
            }
            ySkip += skip;
        }

        g.axisNumberSettings = {
            verticals: verticals,
            horizontals: horizontals,
            y: y,
            angle: angle,
            lineDistanceV: lineDistanceV,
            lineDistanceH: lineDistanceH,
            lineWidth: lineWidth,
            textDistanceH: textDistanceH
        };
    }

    function GridObject(p) {
        this.x = p.x;
        this.y = p.y;
        this.w = p.w;
        this.h = p.h;
        this.size = p.size;
        this.color = p.color;
        this.xValue = p.xValue;
        this.yValue = p.yValue;
    }

    function GraphObject() {
        this.title = 0;
        this.matrix = [];
        this.precision = 0;
        this.offset = new Location(0, 0);
        this.location = new Location(0, 0);
        this.size = new Size(0, 0);
        this.xData = new DirectionData();
        this.yData = new DirectionData();
    }

    function Location(x, y) {
        this.x = x;
        this.y = y;
    }

    function Size(w, h) {
        this.w = w;
        this.h = h;
    }

    function DirectionData() {
        this.title;
        this.data;
        this.min;
        this.max;
        this.graphMin;
        this.graphMax;
        this.gridSize;
        this.dataNumbers;
    }

//DRAWING ZONE

    function startDrawing(g) {
//http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        var animationFrame = window.requestAnimFrame = (function () {
            return  window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (/* function */ callback, /* DOMElement */ element) {
                        window.setTimeout(callback, 1000 / 60);
                    };
        })();

        animate();
        listenMouse();
        var time = new Date().getTime();
        var fpsCounter = 0;
        function animate() {
            if (!g.stop) {
                requestAnimFrame(animate);
                if (!g.pause) {
                    draw(g);
                    if (new Date().getTime() >= time + 500) {
                        g.fps = fpsCounter * 2;
                        fpsCounter = 0;
                        time = new Date().getTime();
                    }
                    fpsCounter++;
                }
            } else {
                window.cancelAnimationFrame(animationFrame);
            }
        }

        function draw(g) {
            clearScreen(g);

            if (bgr) {
                var ctx = g.canvas.getContext("2d");
                ctx.drawImage(bgr, 0, 0);
            }

            drawGridObjects(g);
            if (!bgr) {
                drawGrid(g);
                drawAxis(g);
                drawAxisNumbers(g);
            }


            drawLines(g);
            drawSplines(g);
            if (g.drawSplineMarkers) {
                drawSplineMarkers(g);
            }
            if (g.drawingEnabled && g.userCanDraw) {
                drawCroshair(g);
                pointDrawing(g);
                lineDrawing(g);
                splineDrawing(g);
            }
            if (!bgr) {
                drawInfoNearMouse(g);
            }
        }

        function clearScreen(g) {
            var ctx = g.canvas.getContext("2d");
            ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientWidth);
        }

        function drawGridObjects(g) {
            var ctx = g.canvas.getContext("2d");
            var matrix = g.matrix;
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length; j++) {
                    var gridObject = matrix[i][j];
                    ctx.save();
                    ctx.fillStyle = gridObject.color;
                    drawSquare(ctx, gridObject.x, gridObject.y, gridObject.size);
                    ctx.restore();
                }
            }
        }

        function drawGrid(g) {
            var ctx = g.canvas.getContext("2d");
            var x = g.location.x, y = g.location.y, columns = g.size.w, rows = g.size.h, skip = g.precision;

            var lineWidth = (columns * skip) + x;
            var lineHeight = (rows * skip) + y;
            var xSkip = x + 0.5, ySkip = y + 0.5;

            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = g.smallGridColor;
            ctx.lineWidth = g.smallGridThickness;

            for (var i = 0; i < columns + 1; i++) {
                drawCurveLine(ctx, xSkip, y, xSkip, lineHeight);
                xSkip += skip;
            }

            for (var i = 0; i < rows + 1; i++) {
                drawCurveLine(ctx, x, ySkip, lineWidth, ySkip);
                ySkip += skip;
            }
            ctx.stroke();
            ctx.restore();
        }

        function drawAxis(g) {
            var ctx = g.canvas.getContext("2d");
            var axettings = g.axisSettings;
            var txt = g.title, txtX = g.xData.title, txtY = g.yData.title, p = g.precision;

            ctx.save();
            ctx.fillStyle = g.axisTextColor;
            ctx.font = g.axisFontSize + "px " + g.axisFont;
            drawText(ctx, axettings.titleX, axettings.titleY, txt);
            drawRotatedText2(ctx, axettings.xTextX, axettings.xTextY, g.axisFontSize, txtX, axettings.xTextAngle);
            drawText(ctx, axettings.yTextX, axettings.yTextY, txtY);
            drawText(ctx, axettings.infoTextX, axettings.infoTextY, g.infoNearAxis);
            ctx.restore();
//lines
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = g.axisArrowColor;
            ctx.lineWidth = g.axisArrowThickness;
//vertical
            drawSingleLine(ctx, axettings.startX, axettings.startY, axettings.endXV, axettings.endYV);
            drawSingleLine(ctx, axettings.endXV, axettings.endYV, axettings.endXV - p, axettings.endYV + p);
            drawSingleLine(ctx, axettings.endXV, axettings.endYV, axettings.endXV + p, axettings.endYV + p);
//horizontal
            drawSingleLine(ctx, axettings.startX, axettings.startY, axettings.endXH, axettings.endYH);
            drawSingleLine(ctx, axettings.endXH, axettings.endYH, axettings.endXH - p, axettings.endYH - p);
            drawSingleLine(ctx, axettings.endXH, axettings.endYH, axettings.endXH - p, axettings.endYH + p);
            ctx.restore();
        }

        function drawCroshair(g) {
            var cv = g.canvas;
            var ctx = cv.getContext("2d");
            var m = getMouse(), x = m.x, y = m.y;
            var rect = cv.getBoundingClientRect();
            x -= rect.left;
            y -= rect.top;

            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = g.croshairColor;
            ctx.lineWidth = g.croshairThickness;
            //vertical
            var startX = x - 0.5;
            var startY = y - 3000.5;
            var endXV = x - 0.5;
            var endYV = y + 3000.5;
            drawCurveLine(ctx, startX, startY, endXV, endYV);

            //horizontal
            startY = y - 0.5;
            startX = x - 3000.5;
            var endYH = y - 0.5;
            var endXH = x + 3000.5;
            drawCurveLine(ctx, startX, startY, endXH, endYH);
            ctx.stroke();
            ctx.restore();
        }

        function drawAxisNumbers(g) {
            var ctx = g.canvas.getContext("2d");
            var axisNumberSettings = g.axisNumberSettings;
            var verticals = axisNumberSettings.verticals;
            var horizontals = axisNumberSettings.horizontals;
            var y = axisNumberSettings.y;
            var lineDistanceV = axisNumberSettings.lineDistanceV;
            var angle = axisNumberSettings.angle;
            var lineDistanceH = axisNumberSettings.lineDistanceH;
            var lineWidth = axisNumberSettings.lineWidth;
            var textDistanceH = axisNumberSettings.textDistanceH;

            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = g.bigGridColor;
            ctx.lineWidth = g.bigGridThickness;
            ctx.fillStyle = g.axisNumberColor;
            ctx.font = g.axisNumberFontSize + "px " + g.axisNumberFont;

//DRAW VERTICAL                  
            for (var i = 0; i < verticals.length; i++) {
                var v = verticals[i], normalized = v.x, tyy = v.y, xSkip = v.z,
                        lx1 = xSkip, ly1 = y,
                        lx2 = xSkip, ly2 = lineDistanceV,
                        tx = xSkip, ty = tyy;
                drawCurveLine(ctx, lx1, ly1, lx2, ly2);
                drawRotatedText(ctx, tx, ty, g.axisNumberFontSize, normalized, angle);
            }

//DRAW HORIZONTAL
            for (var i = 0; i < horizontals.length; i++) {
                var hr = horizontals[i], normalized = hr.x, lyy = hr.y,
                        lx1 = lineDistanceH, ly1 = lyy,
                        lx2 = lineWidth, ly2 = lyy,
                        tx = textDistanceH, ty = lyy;
                drawCurveLine(ctx, lx1, ly1, lx2, ly2);
                drawText(ctx, tx, ty, normalized);
            }

            ctx.stroke();
            ctx.restore();
        }

        function drawInfoNearMouse(g) {
            var cv = g.canvas;
            var ctx = cv.getContext("2d");

            var m = getCanvasMouse(cv), x = m.x, y = m.y, w = g.size.w, h = g.size.h, p = g.precision;
            var txt = g.infoNearMouse;
            var lineWidth = (w * p);
            var lineHeight = (h * p);
            y += 1;
            x -= g.location.x;
            y = lineHeight + g.location.y - y;

            var hf = p / 2;
            var graphMinX = g.xData.graphMin;
            var graphMinY = g.yData.graphMin;
            var graphMaxX = g.xData.graphMax;
            var graphMaxY = g.yData.graphMax;

            lineWidth = g.xData.gridSize;
            lineHeight = g.yData.gridSize;

            var normalizedX = normalize(x, hf, lineWidth - g.location.x - hf, graphMinX, graphMaxX);
            normalizedX = round(normalizedX, g.roundByDigitCount);

            var normalizedY = normalize(y, hf, lineHeight - g.location.y - hf, graphMinY, graphMaxY);
            normalizedY = round(normalizedY, g.roundByDigitCount);

            ctx.save();
            ctx.fillStyle = g.axisTextColor;
            ctx.font = 15 + "px " + g.axisFont;
            drawText(ctx, m.x + 10, m.y + 15, txt);
            var extraInfo = "(" + normalizedX + ", " + normalizedY + ")";
            if (g.showFps) {
                extraInfo += " (" + g.fps + "fps)";
            }
            drawText(ctx, m.x + 10, m.y + 30, extraInfo);
            ctx.restore();
        }
//POINT DRAWING
        function pointDrawing(g) {
            var m = getMouse();
            if (g.drawingStatus[0] === true && m.clicks === 1) {
                m.clicks = 0;
                if (g.displayWhatIsDrawing) {
                    g.infoNearMouse = "Drawing Points: ";
                }
                modifyGridPiece(g);
            }
        }

        function modifyGridPiece(g) {
            var pieceClicked = whichPieceClicked(g);
            if (pieceClicked) {
                if (g.showLastClickedCoordinate) {
                    g.infoNearMouse = "(" + round(pieceClicked.xValue, g.roundByDigitCount) + ", " + round(pieceClicked.yValue, g.roundByDigitCount) + ")";
                }
                (pieceClicked.color === g.gridPieceColor) ? pieceClicked.color = g.pointColor : pieceClicked.color = g.gridPieceColor;
            }
        }

        function whichPieceClicked(g) {
            var correctedMouseObject = getCanvasMouse(g.canvas);
            var matrix = g.matrix;
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length; j++) {
                    var gridObject = matrix[i][j];
                    var collision = boxColission(correctedMouseObject, gridObject);
                    if (collision) {
                        g.gridPieces.push(i + "," + j);
                        return gridObject;
                    }
                }
            }
        }

        function boxColission(source, target) {
            if (source.x < target.x + target.w &&
                    source.x + source.w > target.x &&
                    source.y < target.y + target.h &&
                    source.h + source.y > target.y) {
                return true;
            }
            return false;
        }

//CURVE or SPLINE DRAWING
        function splineDrawing(g) {
            var m = getMouse();
            if (g.userCanDraw) {
                if (g.drawingStatus[2] === true && m.clicks === 1) {
                    m.clicks = 0;
                    manageSpline(g);
                }
            }
        }

        function resetSplines(g) {
            g.splineCounter = 1;
            g.splineData = [];
            g.splines = [];
            g.splineMarkers = [];
        }

        function manageSpline(g) {
            var m = getCanvasMouse(g.canvas), x = m.x, y = m.y;
            var pt = new Point(x, y);
            g.splineData.push(pt);
            g.splineMarkers.push(pt);
            if (g.displayWhatIsDrawing) {
                g.infoNearMouse = "Drawing Spline: " + g.splineData.length + "/" + g.splinePointLimit;
            }
            if (g.splineCounter >= g.splinePointLimit) {
                g.splines.push(new Spline(g.splineData, g.splineColor));
                g.splineCounter = 1;
                g.splineData = [];
                if (g.displayWhatIsDrawing) {
                    g.infoNearMouse = "Drawing Spline: ";
                }
            } else {
                g.splineCounter++;
            }
        }

        function drawSplines(g) {
            var s = g.splines;
            if (s) {
                for (var i = 0; i < s.length; i++) {
                    drawSpline(s[i], g);
                }
            }
        }

        function drawSpline(s, g) {
            var points = s.arr;
            var ct = g.context;
            ct.save();
            ct.beginPath();
            ct.strokeStyle = s.color;
            ct.lineWidth = g.splineThickness;
            var points2 = [];
            for (i = 0; i < points.length; i++) {
                var x = points[i].x;
                var y = points[i].y;
                points2.push(x);
                points2.push(y);
            }
            calculateAndSpline(ct, points2);
            ct.stroke();
            ct.restore();
        }
        ///simplified and modified http://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas       
        function calculateAndSpline(ctx, pts1) {
            var pts2 = getCurvePoints(pts1);
            ctx.beginPath();
            ctx.moveTo(pts2[0], pts2[1]);

            for (i = 2; i < pts2.length - 1; i += 2) {
                ctx.lineTo(pts2[i], pts2[i + 1]);
            }
        }
        //simplified and modified http://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas    
        function getCurvePoints(pts) {
            var tension = 0.5;
            var numOfSegments = 16;//how many lines used to build curve
            var pts2 = [], res = [], x, y, t1x, t2x, t1y, t2y, c1, c2, c3, c4, st, t, i;
            pts2 = pts.slice(0);
            pts2.unshift(pts[1]);
            pts2.unshift(pts[0]);
            pts2.push(pts[pts.length - 2]);
            pts2.push(pts[pts.length - 1]);
            for (i = 2; i < (pts2.length - 4); i += 2) {
                for (t = 0; t <= numOfSegments; t++) {
                    t1x = (pts2[i + 2] - pts2[i - 2]) * tension;
                    t2x = (pts2[i + 4] - pts2[i]) * tension;
                    t1y = (pts2[i + 3] - pts2[i - 1]) * tension;
                    t2y = (pts2[i + 5] - pts2[i + 1]) * tension;
                    st = t / numOfSegments;
                    c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
                    c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
                    c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
                    c4 = Math.pow(st, 3) - Math.pow(st, 2);
                    x = c1 * pts2[i] + c2 * pts2[i + 2] + c3 * t1x + c4 * t2x;
                    y = c1 * pts2[i + 1] + c2 * pts2[i + 3] + c3 * t1y + c4 * t2y;
                    res.push(x);
                    res.push(y);
                }
            }
            return res;
        }

        function drawSplineMarkers(g) {
            var m = g.splineMarkers;
            if (m) {
                for (var i = 0; i < m.length; i++) {
                    drawMarker(g, m[i]);
                }
            }
        }

        function drawMarker(g, p) {
            var x = p.x, y = p.y;
            drawCircle(g.context, x, y, g.precision, 0, 2 * Math.PI, g.splineMarkerColor, g.splineMarkerThickness, false, g.splineMarkerFill);
        }

        //LINE DRAWING
        function lineDrawing(g) {
            var m = getMouse();
            if (g.drawingStatus[1] === true && m.clicks === 1) {
                m.clicks = 0;
                manageLine(g);
            }
        }

        function resetLines() {
            g.lineCounter = 1;
            g.lineData = [];
            g.lines = [];
        }

        function manageLine(g) {
            var m = getCanvasMouse(g.canvas), x = m.x, y = m.y;
            g.lineData.push(new Point(x, y));
            if (g.displayWhatIsDrawing) {
                g.infoNearMouse = "Drawing Line: " + g.lineData.length + "/" + 2;
            }
            if (g.lineCounter >= 2) {
                g.lines.push(new Line(g.lineData[0], g.lineData[1], g.lineDrawingColor));
                g.lineCounter = 1;
                g.lineData = [];
                if (g.displayWhatIsDrawing) {
                    g.infoNearMouse = "Drawing Line: ";
                }
            } else {
                g.lineCounter++;
            }
        }

        function drawLines(g) {
            var l = g.lines;
            if (l) {
                for (var i = 0; i < l.length; i++) {
                    drawLine(g, l[i]);
                }
            }
        }

//SIMPLE DRAWING
        function drawLine(g, l) {
            var p1 = l.p1, p2 = l.p2;
            var ct = g.context;
            ct.save();
            ct.beginPath();
            ct.strokeStyle = l.color;
            ct.lineWidth = g.lineDrawingThickness;
            ct.moveTo(p1.x, p1.y);
            ct.lineTo(p2.x, p2.y);
            ct.stroke();
            ct.restore();
        }

        function drawSquare(ctx, x, y, precision) {
            ctx.fillRect(x, y, precision, precision);
        }

        function drawCurveLine(ctx, x1, y1, x2, y2) {
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
        }

        function drawSingleLine(ctx, x1, y1, x2, y2) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.restore();
        }

        function drawText(ctx, x, y, text) {
            ctx.textBaseline = "alphabetic";
            ctx.fillText(text, x, y);
        }

        function drawRotatedText(ctx, x, y, size, txt, angle) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.textAlign = 'center';
            ctx.fillText(txt, x, 0);
            ctx.restore();
        }

        function drawRotatedText2(ctx, x, y, size, txt, angle) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.textAlign = 'center';
            ctx.fillText(txt, 0, 0);
            ctx.restore();
        }

        function getCanvasMouse(cv) {
            var c = cv.getBoundingClientRect();
            var m = getMouse();
            return {x: m.x - c.left, y: m.y - c.top, w: m.w, h: m.h};
        }

        function drawImage(image, ctx, x, y, angle) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.drawImage(image, -(image.width / 2), -(image.height / 2));
            ctx.restore();
        }

        function drawCircle(ctx, x, y, size, rad1, rad2, color, thickness, clockwise, fill) {
            if (size > 0) {
                ctx.save();
                ctx.beginPath();
                if (fill === true) {
                    ctx.fillStyle = color;
                    ctx.arc(x, y, size, rad1, rad2, clockwise);
                    ctx.fill();
                }
                if (fill === false) {
                    ctx.lineWidth = thickness;
                    ctx.strokeStyle = color;
                    ctx.arc(x, y, size, rad1, rad2, clockwise);
                    ctx.stroke();
                }
                ctx.closePath();
            }
        }

    }

    //DRAWING OBJECTS (needed globally)
    function  Spline(arr, color) {
        this.arr = arr;
        this.color = color;
    }

    function Curve(p1, p2, p3, color) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.color = color;
    }

    function  Spline(arr, color) {
        this.arr = arr;
        this.color = color;
    }

    function  Line(p1, p2, color) {
        this.p1 = p1;
        this.p2 = p2;
        this.color = color;
    }

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

//HELPER FUNCTIONS
    function listenMouse() {
        document.addEventListener('mousemove', function (e) {
            mouse.x = e.clientX || e.pageX;
            mouse.y = e.clientY || e.pageY;
            mouse.moved = true;
            clearTimeout(mouse.isMovingTimer);
            mouse.isMoving = true;
            mouse.isMovingTimer = setTimeout(function () {
                mouse.isMoving = false;
                mouse.moved = false;
            }, mouse.precision);
        }, false);
        document.addEventListener('mousedown', function (e) {
            mouse.x = e.clientX || e.pageX;
            mouse.y = e.clientY || e.pageY;
            mouse.down = true;
            mouse.up = false;
        }, false);
        document.addEventListener('mouseup', function (e) {
            mouse.x = e.clientX || e.pageX;
            mouse.y = e.clientY || e.pageY;
            mouse.up = true;
            mouse.down = false;
        }, false);
        if (mouse.down === false) {
            mouse.up = true;
        }
        document.addEventListener('click', function () {
            mouse.clicks++;
            if (mouse.clicks === 1) {
                mouse.clickTimer = setTimeout(function () {
                    mouse.clicks = 0;
                    mouse.clicks2 = 1;
                }, 400);
            } else if (mouse.clicks === 2) {
                clearTimeout(mouse.clickTimer);
                mouse.clicks = 0;
                mouse.clicks2 = 2;
            }
        }, false);
    }

    function getMouse() {
        return mouse;
    }

    function sortAscending(arr) {
        var copy = copyArrayH(arr);
        copy.sort(function (a, b) {
            a = parseFloat(a);
            b = parseFloat(b);
            return a - b;
        });
        return copy;
    }

    function copyArray(array) {
        var copy = new Array(array.length);
        for (var i = 0; i < array.length; i++) {
            copy[i] = array[i];
        }
        return copy;
    }

    function getPercentage(value, percent) {
        return (value / 100) * percent;
    }

    function normalize(number, min, max, newMin, newMax) {
        var normalized = 0;
        normalized = ((((number - min) / (max - min)) * (newMax - newMin)) + newMin);
        return normalized;
    }

    function round(num, how) {
        if (how === 0) {
            return Math.round(num);
        }
        var power = Math.pow(10, how);
        return Math.round(num * power) / power;
    }

    function isInteger(n) {
        return n % 1 === 0;
    }
    return this;
    //returns the graph library itself with some of the enabled functions
    //use this result to get graph settings to modify them
}