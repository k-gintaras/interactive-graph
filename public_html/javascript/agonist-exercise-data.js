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
//EXCERCISE DATA
//these should be accepted from database once user logs in, but
//client did not want it database based, therefore going to do it here as static
var inTitles = {response: "Response g", volume: "Volume μ", organBath: "Concentration In Organbath ng/ml", log: "Concentration log10", efficacy: "Efficacy", potency: "Potency", pd: "pdtwo"};
var exercise = {
    title: "The Organ Bath Experiment",
    story: "A 2cm strip of GPI was suspended inside a 15ml organ bath." +
            " Four cholinester drugs, acetylcholine (MW = 181.7), methacholine (MW = 195.7), carbachol (MW = 182.7) and butrylcholine (MW = 209.71)," +
            " were added to the organ bath at different volumes." +
            " The responses generated are listed in the table below:",
    organBathVolume: 15,
    compound: "",
    compounds: "",
    questions: [
//        "List the Efficacy and potency values for: Acetylcholine, Methacholine, Carbachol, Butrylcholine",
//        "List the pD2 value for: Acetylcholine, Methacholine, Carbachol, Butrylcholine",
        "List these drugs in order of increasing molar potency: Acetylcholine, Methacholine, Carbachol, Butrylcholine"
    ],
    multiChoice: {
        question: "The definition of full and partial agonists is as follows",
        choices: [
            "Full agonist is a drug that produces the maximum possible effect (100% efficacy), while a partial agonist is a drug that is unable to produce 100% efficacy even when all the receptors are occupied.",
            "Partial agonist is a drug that produces the maximum possible effect (100% efficacy), while a full agonist is a drug that is unable to produce 100% efficacy even when all the receptors are occupied.",
            "A full agonist produces a maximum response that is significantly lower in comparison to partial agonists.",
            "A full agonist is a drug that produces the maximum possible effect (100% efficacy), while a partial agonist produces a response in the opposite direction."
        ]
    },
    extra: [1, 2]
};

var ecolor = {blue: "rgb(0,179,214)", red: "rgb(255,41,4)", yellow: "rgb(255,201,0)", green: "rgb(151,215,45)"};
//concentration is concentration multiplier to get ng/ml
var compound1 = {
    title: "Acetylcholine",
    color: ecolor.red,
    concentration: 10,
    xName: "Volume",
    yName: "Response",
    xValues: [10, 20, 40, 80, 160, 320],
    yValues: [0.4992, 1.2465, 1.5839, 2.3355, 2.6538, 2.5814]
};

var compound2 = {
    title: "Methacholine",
    color: ecolor.blue,
    concentration: 10,
    xName: "Volume",
    yName: "Response",
    xValues: [10, 20, 40, 80, 160, 320, 640],
    yValues: [0.595, 0.9293, 1.5286, 2.1513, 2.8379, 1.6042, 2.7219]
};

var compound3 = {
    title: "Carbachol",
    color: ecolor.green,
    concentration: 10,
    xName: "Volume",
    yName: "Response",
    xValues: [10, 20, 40, 80, 160, 320, 640],
    yValues: [0.1959, 0.6823, 0.7366, 1.3327, 1.9299, 2.6229, 2.8794]
            //                yValues: [0.0692, 0.3768, 1.552, 1.6223, 2.4526, 4.6784]
};

var compound4 = {
    title: "Butrylcholine",
    color: ecolor.yellow,
    concentration: 1000,
    xName: "Volume",
    yName: "Response",
    xValues: [80, 160, 320, 640, 1280, 2560, 5000],
    yValues: [0.1959, 0.6823, 0.7366, 1.3327, 1.9299, 2.6229, 2.8794]
};