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
    story: "In the experiment below concentration-response data were generated for an agonist drug (MW = 111.15) in the presence of an antagonist (MW = 291.82). Calculate the pA2 value for the antagonist.",
    howManyLogVolumesToCalculate: 10,
    tableTitle: "Agonist responses in the presence of antagonist", // concentrations listed below",
    dataOne: {
        dataTitle: "Agonist and Antagonists",
        xTitle: "Log Concenctration",
        yTitle: "Response",
        x: [1.3, 3], //or a RANGE
        y: [0, 150]
    },
    dataTwo: {
        dataTitle: "Schild-Gaddum plot",
        xTitle: "-log of molar antagonist concentration",
        yTitle: "log (DR-1)",
        x: [7, 8], //or a RANGE
        y: [0, 0.7]
    }
};

function getExcerciseMatrix() {
    var table = [
        ["[Agonist](ng/ml)", "Log [Agonist](ng/ml)", "0 ng/ml", "3.8 ng/ml", "6.0 ng/ml", "17.3 ng/ml"],
        [20, -1, 8, null, null, null],
        [40, -1, 34, null, null, null],
        [50, -1, 61, 8, null, null],
        [80, -1, 90, 21, 7, null],
        [100, -1, 125, 43, 8, 4],
        [200, -1, 131, 105, 58, 18],
        [400, -1, 129, 129, 120, 91],
        [600, -1, null, 130, null, 120],
        [800, -1, null, null, null, 141],
        [1000, -1, null, null, null, 140],
        //make sure to edit excercise.howManyLogVolumesToCalculate: 10,
//        [-1, 1200, null, null, null, null],
//        [-1, 2000, null, null, null, null],
//        [-1, 4000, null, null, null, null],
//        ["EC50.", null, null, null, null, null],
//        ["EC50 data for each response", null, null, null,null,null],
        [null, "Log EC50 ", -1, -1, -1, -1],
        [null, "EC50 (ng/ml)", -1, -1, -1, -1],
        [null, "Molar EC50", null, -1, -1, -1],
//        ["DR.", null, null, null, null, null],
//    ["DR data for each response with antagonist", null, null, null,null,null],
        [null, "Dose-shift ratio (DR)", null, -1, -1, -1],
        [null, "DR-1", null, -1, -1, -1],
        [null, "Log of DR-1", null, -1, -1, -1],
//        ["Molar.", null, null, null, null, null],
//      ["Molar data for each response with antagonist", null, null, null,null,null],
        [null, "MOLAR antagonist concentration", null, -1, -1, -1],
        [null, "Log molar antagonist concentration", null, -1, -1, -1],
        [null, "-log of molar antagonist concentration", null, -1, -1, -1],
//       ["Final step, find pA2", null, null, null,null,null],
//        ["pA2.", null, null, null, null, null],
        [null, "pA2", -1, null, null, null]];
    return table;
}


