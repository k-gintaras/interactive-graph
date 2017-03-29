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
var exercise = {
    story: "Binding Assay Exercise: ",
    howManyLogVolumesToCalculate: 10,
    tableTitle: " ", // concentrations listed below",
    dataOne: {
        dataTitle: "Saturation Plot",
        xTitle: "Free (F) nM",
        yTitle: "Bound (B) (fmol/mg protein)",
        x: [0, 80], //or a RANGE
        y: [0, 110]
    },
    dataTwo: {
        dataTitle: "Scatchard Plot",
        xTitle: "B (fmol/mg)",
        yTitle: "B/F",
        x: [0, 50], //or a RANGE
        y: [0, 3]
    },
    dataThree: {
        dataTitle: "Double Reciprocal Plot",
        xTitle: "1/F (1/fmol/mg)",
        yTitle: "1/B (1/fmol/mg)",
        x: [0.0, 0.5], //or a RANGE
        y: [0.000, 0.175]
    },
    dataFour: {
        dataTitle:"Haynes Plot",
        xTitle: "F (nM)",
        yTitle: "F/B",
        x: [0, 80], //or a RANGE
        y: [0.0, 2.0]
    },
    dataFive: {
        dataTitle: "Competitive Binding assay",
        xTitle: "L2 (log Molar)",
        yTitle: "L1 % Bound",
        x: [-12, -5], //or a RANGE
        y: [-10,160]
    }
};


var task1 = [
    ["Task 1.", null, null, null],
    ["Saturation binding curves", null, null, null],
    ["Concentration 3H-Compound (nM) L (or F)", "Total Binding (fmol/mg protein)", "Nonspecific binding (fmol/mg protein)", "Specific Binding (nM) [LR] (or [B])"],
    [2.4, 8.49, 2.01,-1],
    [4.8, 13.8, 3.39,-1],
    [7.2, 19.38, 4.5,-1],
    [9.6, 24.45, 6.51,-1],
    [14.4, 33.12, 9.54,-1],
    [36, 62.34, 27.27,-1],
    [72, 99.12, 57.3,-1]
];

var task2 = [
    ["Task 2.", null,null],
    ["Sub-Task", "Kd", "Bmax"],
    ["1) Saturation binding curve, [B] vs. [F]", -1, -1],
    ["2) Scatchard Plot, [B] / [F]  vs. [B]", -1, -1],
    ["3) Double Reciprocal Plot, 1 / [B] vs. 1 / [F]", -1, -1],
    ["4) Hanes plot, [F] / [B] vs. [F]", -1, -1]
];

var task3 = [
    ["Task 3.",null,null,null,null,null,null,null],
    ["By using 3H-drug (Kd= 1.4nM, concentration used 0.6nM) binding to a particular receptor, the binding capacity for test compound 1, 2 and 3 ( 10-6 – 10-11M) was determined. Using the specific binding for 3H-drug (86 fmol/mg) found in this study, calculate the percentage of drug bound using the formula below: % bound = ( B, bound drug] / Bmax) *100",null,null,null,null,null,null,null],
    ["Competition binding assay",null,null,null,null,null,null,null],
    /*need spaces so that numbers are wider than text and text area won't reduce it to scroll size*/
    ["Concentration (Molar)", "Log&nbsp;&nbsp;&nbsp;&nbsp;", "Test compound 1 (fmol/mg)", "% bound", "Test compound 2 (fmol/mg)", "% bound", "Test compound 3 (fmol/mg)", "% bound",null,null,null,null,null,null,null],
    ["1x10<sup>-6</sup>", -6, 0, -1, 0, -1, 0, -1],
    ["0.3x10<sup>-6</sup>", -6.5, 6, -1, 0, -1, 2, -1],
    ["1x10<sup>-7</sup>", -7, 1, -1, 0, -1, 2, -1],
    ["0.3x10<sup>-7</sup>", -7.5, 3, -1, 2, -1, 6, -1],
    ["1x10<sup>-8</sup>", -8, 61, -1, 9, -1, 20, -1],
    ["0.3x10<sup>-8</sup>", -8.5, 88, -1, 33, -1, 45, -1],
    ["1x10<sup>-9</sup>", -9, 93, -1, 61, -1, 74, -1],
    ["0.3x10<sup>-9</sup>", -9.5, 114, -1, 99, -1, 104, -1],
    ["1x10<sup>-10</sup>", -10, 116, -1, 118, -1, 120, -1],
    ["0.3x10<sup>-10</sup>", -10.5, 125, -1, 125, -1, 129, -1],
    ["1x10<sup>-11</sup>", -11, 128, -1, 126, -1, 128, -1]
];

var task4 = [
    ["Task 4.", null],
    ["Plot % specific binding (L1) versus competitor drug (L2) concentration and estimate the IC50 value for each drug.", null],
    ["Using the Cheng Prussof equation, Calculate the Ki for:", null],
    ["Compound", "Ki"],
    ["Test compound 1", -1],
    ["Test compound 2", -1],
    ["Test compound 3", -1]
];


