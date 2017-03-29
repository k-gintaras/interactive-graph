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
 //GRAPH MANAGEMENT
            function drawCroshair() {
                var m = getMouse(), x = m.x, y = m.y;
                var rect = document.getElementById("graph").getBoundingClientRect();
                x -= rect.left;
                y -= rect.top;
                //vertical
                var startX = x - 0.5;
                var startY = y - 3000.5;
                var endXV = x - 0.5;
                var endYV = y + 3000.5;
                cv.ln(cvobj, startX, startY, endXV, endYV, "rgb(100,100,100)", 1);
                //horizintal
                startY = y - 0.5;
                startX = x - 3000.5;
                var endYH = y - 0.5;
                var endXH = x + 3000.5;
                cv.ln(cvobj, startX, startY, endXH, endYH, "rgb(100,100,100)", 1);
            }

            function modifyGridPiece(matrix, currentMouse) {
                var pieceClicked = whichPieceClicked(matrix, currentMouse);
                if (pieceClicked) {
                    //check("(" + pieceClicked.xValue + ", " + pieceClicked.yValue + ")");
                    (pieceClicked.color === userColor) ? pieceClicked.color = "rgb(230,230,230)" : pieceClicked.color = userColor;
                }
            }

            function clearCanvas() {
                cvobj.context.clearRect(0, 0, cvobj.w, cvobj.h);
            }

            function drawValueNumbers(graph, x, y, columns, rows, skip) {
                var graphMinX = graph.xData.graphMin;
                var graphMinY = graph.yData.graphMin;
                var graphMaxX = graph.xData.graphMax;
                var graphMaxY = graph.yData.graphMax;

                var xSkip = graph.xData.skip;
                var ySkip = graph.yData.skip;
                var lineWidth = graph.xData.gridSize;
                var lineHeight = graph.yData.gridSize;

                for (var i = 1; i <= columns; i++) {
                    if (i % Math.round(20 / skip) === 0) {
                        var normalized = num.norm(i, 1, columns, graphMinX, graphMaxX);
                        normalized = round(normalized, 3);
                        cv.ln(cvobj, xSkip, x - 0.5, xSkip, lineHeight + skip - 0.5, "rgb(20,200,200)", 5);
                        drawRotatedText(xSkip - 6, lineHeight + xSkip + skip + 10, 10, normalized);
                    }
                    xSkip += skip;
                }

                for (var i = 1; i <= rows; i++) {
                    if (i % Math.round(20 / skip) === 0) {
                        var normalized = num.norm(i, 1, rows, graphMinY, graphMaxY);
                        normalized = round(normalized, 3);
                        cv.ln(cvobj, y - skip, lineHeight + y - ySkip, lineWidth, lineHeight + y - ySkip, "rgb(20,200,200)", 5);
                        cv.txt(cvobj, y - skip - 40, lineHeight + y - ySkip, 10, normalized, "black", 0);
                    }
                    ySkip += skip;
                }
            }

            function drawRotatedText(x, y, size, txt) {
                var c = cvobj.context;
                c.save();
                c.translate(x, y);
                c.rotate(-Math.PI / 2);
                c.shadowBlur = 0;
                c.textAlign = 'center';
                c.font = size + "px Verdana";
                c.fillStyle = "black";
                c.fillText(txt, x - 10, 10);
                c.restore();
            }

            function drawCoordinates(x, y, w, h, txt, txtX, txtY) {
                var p = plot.precision;
                var lineWidth = (w * p);
                var lineHeight = (h * p);
                y += 1;
                var startX = x;
                var startY = y + lineHeight;

                var endXV = x; //extend for it to look like arrow
                var endYV = y - (y / 2);

                var endXH = x + lineWidth + (x / 2);//extend for it to look like arrow
                var endYH = y + lineHeight;

                cv.txt(cvobj, 0 + 25, 0 + 30, 30, txt, userColor, false);

                //vertical
                cv.ln(cvobj, startX, startY, endXV, endYV, "rgb(10,10,10)", 1);
                //arrow
                cv.ln(cvobj, endXV, endYV, endXV - p, endYV + p, "rgb(10,10,10)", 1);
                cv.ln(cvobj, endXV, endYV, endXV + p, endYV + p, "rgb(10,10,10)", 1);
                //textX
                cv.txt(cvobj, endXV + 20, endYV + 30, 20, txtY, "black", false);

                //horizontal
                cv.ln(cvobj, startX, startY, endXH, endYH, "rgb(10,10,10)", 1);
                //arrow
                cv.ln(cvobj, endXH, endYH, endXH - p, endYH - p, "rgb(10,10,10)", 1);
                cv.ln(cvobj, endXH, endYH, endXH - p, endYH + p, "rgb(10,10,10)", 1);
                //textY
                cv.txt(cvobj, endXH - 200, endYH + 70, 20, txtX, "black", false);
            }

            function drawGrid(x, y, columns, rows, skip) {
                var lineWidth = (columns * skip) + x;
                var lineHeight = (rows * skip) + y;

                var xSkip = x + 0.5, ySkip = y + 0.5;
                for (var i = 0; i < columns + 1; i++) {
                    cv.ln(cvobj, xSkip, y, xSkip, lineHeight, "rgb(200,200,200)", 1);
                    xSkip += skip;
                }

                for (var i = 0; i < rows + 1; i++) {
                    cv.ln(cvobj, x, ySkip, lineWidth, ySkip, "rgb(200,200,200)", 1);
                    ySkip += skip;
                }
            }

            function whichPieceClicked(matrix, mouse) {
                var c = canvasObjects[0].canvas.getBoundingClientRect();
                var correctedMouseObject = {x: mouse.x - c.left, y: mouse.y - c.top, w: mouse.w, h: mouse.h};
                for (var i = 0; i < matrix.length; i++) {
                    for (var j = 0; j < matrix[i].length; j++) {
                        var gridObject = matrix[i][j];
                        var collision = help.object.collisionB(correctedMouseObject, gridObject);
                        if (collision === true) {
                            return gridObject;
                        }
                    }
                }
            }
            //utility
            function transposeMatrix(matrix, clockWise) {
                var rows = matrix.length, cols = matrix[0].length;
                var transposed = createMatrix(cols, rows);
                var rowLen = rows - 1;
                if (clockWise) {
                    for (var i = 0; i < rows; i++) {
                        for (var j = 0; j < cols; j++) {
                            transposed[i][j] = matrix[j][(rowLen) - i];
                        }
                    }
                } else {
                    for (var i = 0; i < rows; i++) {
                        for (var j = 0; j < cols; j++) {
                            transposed[j][i] = matrix[(rowLen) - i][j];
                        }
                    }
                }
                return transposed;
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
                this.setLocation = function (graph, x, y) {
                    GraphLocationSetter(graph, x, y);
                };
                this.setSize = function (graph, w, h) {
                    graph.size.w = w;
                    graph.size.h = h;
                };
                this.setSizeByScreen = function (graph, screen, pct) {
                    GraphSizeSetter(graph, screen, pct);
                };
                this.setSizeByPixels = function (graph, w, h) {
                    GraphSizeSetter2(graph, w, h);
                };
                this.setMatrix = function (graph) {
                    GraphMatrixSetter(graph);
                };
                this.setDataToPlot = function (graph, compound) {
                    graph.title = compound.title;
                    graph.xData.title = compound.xName;
                    graph.yData.title = compound.yName;
                    graph.xData.data = compound.xValues;
                    graph.yData.data = compound.yValues;
                };
                this.setDataToMatrix = function (graph) {
                    MatrixDataSetter(graph);
                };
                this.setGraphProperties = function (graph) {
                    GraphPropertiesSetter(graph);
                };
                this.setGraphNumberRepresentations = function (graph) {
                    NumberBuilder(graph);
                };
                this.setNumbersToGraph = function (graph) {
                    NumberToGraphSetter(graph);
                };
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

            function GraphLocationSetter(graph, x, y) {
                var p = graph.precision;
                var stepsFromX = x / p;
                var stepsFromY = y / p;
                graph.location.x = stepsFromX * p;
                graph.location.y = stepsFromY * p;
            }

            function GraphSizeSetter(graph, screen, percentage) {
                var p = graph.precision;
                var offX = graph.location.x / p;
                var offY = graph.location.y / p;
                var w = (screen.w / (p) - (offX * 2)) * (percentage / 100);
                var h = (screen.h / (p) - (offY * 2)) * (percentage / 100);
                graph.size.w = Math.round(w);
                graph.size.h = Math.round(h);
            }

            function GraphSizeSetter2(graph, w2, h2) {
                var p = graph.precision;
                var offX = graph.location.x / p;
                var offY = graph.location.y / p;
                var w = (w2 / (p) - (offX * 2));
                var h = (h2 / (p) - (offY * 2));
                graph.size.w = Math.round(w);
                graph.size.h = Math.round(h);
            }

            function GraphMatrixSetter(graph) {
                var x = graph.location.x;
                var y = graph.location.y;
                var sizeY = graph.size.w;
                var sizeX = graph.size.h;
                var precision = graph.precision;
                var x1, y1, gridObjects, gridPiece = {};
                graph.matrix = new Array(sizeY);
                for (var i = 0; i < sizeY; i++) {
                    gridObjects = new Array(sizeX);
                    x1 = x + i * precision;
                    for (var j = 0; j < sizeX; j++) {
                        y1 = y + j * precision;
                        gridPiece.color = "rgb(230,230,230)";
                        gridPiece.x = x1;
                        gridPiece.y = y1;
                        gridPiece.w = precision;
                        gridPiece.h = precision;
                        gridPiece.size = precision;
                        gridObjects[j] = new GridObject(gridPiece);
                    }
                    graph.matrix[i] = arr.copy(gridObjects);
                }
            }

            function GridObject(piece) {
                this.x = piece.x;
                this.y = piece.y;
                this.w = piece.w;
                this.h = piece.h;
                this.size = piece.size;
                this.color = piece.color;
                this.xValue = piece.xValue;
                this.yValue = piece.yValue;
            }

            function MatrixDataSetter(graph) {
                var matrix = graph.matrix;
                var graphLimitY = matrix[0].length;
                var graphLimitX = matrix.length;

                var xResults = graph.xData.data;
                var yResults = graph.yData.data;

                var minMaxXResults = arr.copy(arr.sort.asc(xResults));
                var minMaxYResults = arr.copy(arr.sort.asc(yResults));

                var newMinX = graph.offset.x;
                var newMinY = graph.offset.y;

                var newMaxX = graphLimitX - newMinX - 1;
                var newMaxY = graphLimitY - newMinY - 1;

                var minX = minMaxXResults[0];
                var minY = minMaxYResults[0];

                var maxX = minMaxXResults[minMaxXResults.length - 1];
                var maxY = minMaxYResults[minMaxYResults.length - 1];

                if (xResults.length === yResults.length) {
                    for (var i = 0; i < xResults.length; i++) {
                        var x = xResults[i];
                        var y = yResults[i];
                        var normalizedX = Math.round(num.norm(x, minX, maxX, newMinX, newMaxX));
                        var normalizedY = Math.round(num.norm(y, minY, maxY, newMinY, newMaxY));
                        var itemToMark = matrix[normalizedX][matrix[0].length - normalizedY - 1];
                        itemToMark.color = color.red;
                    }
                } else {
                    error("x and y should have same amount of values");
                }
            }

            function GraphPropertiesSetter(graph) {
                //graph data variables
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
                    var sorted = arr.sort.asc(vector);
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

            function NumberBuilder(graph) {
                var xNumbers = buildNumbersForVector(graph.size.w, graph.xData, graph.precision);
                var yNumbers = buildNumbersForVector(graph.size.h, graph.yData, graph.precision);
                graph.xData.dataNumbers = xNumbers;
                graph.yData.dataNumbers = yNumbers;

                function buildNumbersForVector(size, vector) {
                    var numbers = new Array(size);
                    for (var i = 1; i <= size; i++) {
                        var normalized = num.norm(i, 1, size, vector.graphMin, vector.graphMax);
                        normalized = round(normalized, 3);
                        numbers[i - 1] = normalized;
                    }
                    return numbers;
                }
            }

            function NumberToGraphSetter(graph) {
                var matrix = graph.matrix;
                var xNumbers = graph.xData.dataNumbers;
                var yNumbers = graph.yData.dataNumbers;
                for (var i = matrix.length - 1; i >= 0; i--) {
                    for (var j = 0; j < matrix[i].length; j++) {
                        matrix[i][j].xValue = xNumbers[i];
                        matrix[i][j].yValue = yNumbers[yNumbers.length - 1 - j];
                    }
                }
            }

            function createDrawableArea(id, where, x, y, w, h) {
                cv.layer(id);
                purifyElement(id);
                el.add(id, where);
                cv.size(id, w, h);
                cv.pos(id, x, y, 1);
                canvasObjects = H.cnv.all();
                var cvobj = canvasObjects[0];
                cv.rec(cvobj, x, y, w, h, "white", false, true);
            }

            function drawGridObjects(matrix) {
                for (var i = 0; i < matrix.length; i++) {
                    for (var j = 0; j < matrix[i].length; j++) {
                        var gridObject = matrix[i][j];
                        drawSquare(gridObject.x, gridObject.y, gridObject.color, gridObject.size);
                    }
                }
            }

            function createMatrix(rows, cols) {
                var matrix = new Array(rows);
                for (var i = 0; i < matrix.length; i++) {
                    var row = new Array(cols);
                    matrix[i] = row;
                    for (var j = 0; j < cols; j++) {
                        matrix[i][j] = 0;
                    }
                }
                return matrix;
            }

            function drawSquare(x, y, col, precision) {
                cvobj.context.fillStyle = col;
                cvobj.context.fillRect(x, y, precision, precision);
            }