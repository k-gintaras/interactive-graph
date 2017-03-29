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

var semilogSettings1 = {
    type: 'line',
    data: {
//        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
            {
                label: "One Compartmental Model Graph",
                data: []
            }
        ]
    },
    options: {
//                    scaleOverride: true,
//        scaleSteps:0.5,
//        scaleStepWidth: 0.5,
//        scaleStartValue: 0,   
        scales: {

            //comment out axis if you want to use labels
            xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                         stepSize : 1,
                        min: 0, max: 12
                    },
                    gridLines: {
                        color: "rgba(150, 150, 150, 1)"
                    }
                }],
            yAxes: [{
                    type: 'logarithmic',
                    position: 'left',
                    ticks: {
                        stepSize : 0.001,
                        min: 1,
                        max: 1000,
//                       16/09/2016 QUICK fix from http://stackoverflow.com/questions/20371867/chart-js-formatting-y-axis/28700578#28700578
                        callback: function (label, index, labels) {
                            return (label + "").split("0").join(""); //if you don't like zeros
//                            return label;
                        }
                    },
                    //                    16/09/2016 QUICK fix from http://stackoverflow.com/questions/36676263/chart-js-v2-hiding-grid-lines
                    gridLines: {
                        color: "rgba(150, 150, 150, 1)"
                    }
                }]
        }
    }
};

var semilogSettings2 = {
    type: 'line',
    data: {
//        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
            {
                label: "Two Compartmental Model Graph",
                data: []
            }
        ]
    },
    options: {
        scales: {
            //comment out axis if you want to use labels
            xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                        stepSize : 1,
                        min: 0, max: 8
                    },
                    gridLines: {
                        color: "rgba(150, 150, 150, 1)"
                    }
                }],
            yAxes: [{
                    type: 'logarithmic',
                    position: 'left',
                    ticks: {
                        min: 1,
                        max: 1000,
//                       16/09/2016 QUICK fix from http://stackoverflow.com/questions/20371867/chart-js-formatting-y-axis/28700578#28700578
                        callback: function (label, index, labels) {
                            return (label + "").split("0").join(""); //if you don't like zeros
//                            return label;
                        }
                    },
                    //                    16/09/2016 QUICK fix from http://stackoverflow.com/questions/36676263/chart-js-v2-hiding-grid-lines
                    gridLines: {
                        color: "rgba(150, 150, 150, 1)"
                    }
                }]
        }
    }
};

var exercise = {
    story: "A patient was given a 363mg dose of Drug A by bolus intravenous injection and plasma concentration determined as displayed in the table below.",
    howManyLogVolumesToCalculate: 10,
    tableTitle: " ", // concentrations listed below",
    dataOne: {
        dataTitle: "One Compartmental Model ",
        xTitle: "x",
        yTitle: "y",
        x: [0, 12], //or a RANGE
        y: [0, 150]
    },
    dataTwo: {
        dataTitle: "Two Compartmental Model",
        xTitle: "x",
        yTitle: "y",
        x: [0, 8], //or a RANGE
        y: [0, 150]
    }
};





var task1 = [
    ["One Compartmental Model", null],
    ["A patient was given a 363mg dose of Drug A by bolus intravenous injection and plasma concentration determined as displayed in the table below. ", null],
    ["Time (h)", "Drug plasma concentration (mg/L)"],
    [0.5, 40],
    [1, 34],
    [2, 23],
    [4, 11],
    [6, 8.5],
    [8, 6.4],
    [10, 3.8],
    [12, 2.1],
    ["Find", null],
    ["CP<sub>0</sub>", -1],
    ["Kel", -1],
    ["t<sub>1/2</sub>", -1],
    ["Vd", -1],
    ["AUC", -1],
    ["CL<sub>tot</sub>", -1]
];
var task2 = [
    ["Two Compartmental Model", null],
    ["A Patient was given a 300mg dose of drug by bolus intravenous injection and plasma concentration determined as displayed in the table below. ", null],
    ["Time (h)", "Drug plasma concentration (mg/L)"],
    [0.5, 34],
    [1, 29],
    [1.5, 22],
    [2, 18],
    [2.5, 15],
    [3, 12.5],
    [3.5, 11],
    [4, 10],
    [4.5, 9.5],
    [5, 9],
    [5.5, 8.5],
    [6, 8],
    [6.5, 7.8],
    [7, 7.5],
    [7.5, 7.2],
    [8, 7],
    ["Find", null],
    ["CP<sub>0</sub>", -1],
    ["Kelα", -1],
    ["Kelβ", -1],
    ["t<sub>1/2α</sub>", -1],
    ["t<sub>1/2β</sub>", -1],
    ["Vd", -1],
    ["AUC", -1],
    ["CL<sub>tot</sub>", -1]
];


