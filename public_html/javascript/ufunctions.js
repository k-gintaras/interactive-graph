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
 var mouse = {x: "", y: "", w: 4, h: 4, isMovingTimer: "", clickTimer: "", isMoving: "", moved: "", down: "", up: "", clicks: 0, clicks2: 0, precision: 100};
var drawArea = {name: "", canvas: "", context: "", x: 0, y: 0, w: 0, h: 0};
var canvasObjects = [];
var keyboardLetter = "";
var keyboardKeyCode = "";
var itiColors = {blue: "rgb(0,179,214)", red: "rgb(255,41,4)", yellow: "rgb(255,201,0)", green: "rgb(151,215,45)"};
var itiColors2 = {blue: "rgba(0,179,214,0.5)", red: "rgba(255,41,4,0.5)", yellow: "rgba(255,201,0,0.5)", green: "rgba(151,215,45,0.5)"};

function logo() {
    return itiColors;
}

function logo2() {
    return itiColors2;
}

function displayLogo(where) {
    var el = H.el, id = "itiSmall", iti = ["itiBlack", "itiBlueH", "itiGreen", "itiRed", "itiBlueV", "itiYellow", "itiWhite"];
    (where === undefined) ? el.div(id) : el.div(id, where);
    for (var i = 0; i < iti.length; i++) {
        el.div(iti[i], id);
    }
    el.st(id, "cursor", "pointer");
    var url = "http://ideatheimage.com";
    el.click(id, "click", function () {
        var w = window.open(url, '_blank');
        w.focus();
    });
}

/*CHECK*/
function checkObject(myObjectIn) {
    for (var key in myObjectIn) {
        if (myObjectIn.hasOwnProperty(key)) {
            checkAll(key + ': ' + myObjectIn[key]);
        }
    }
}

function checkAll(message) {
    if (!document.getElementById("check2")) {
        divH("check2");
        styleH("check2", "position", "absolute");
        styleH("check2", "top", "0px");
        styleH("check2", "left", "0px");
        styleH("check2", "backgroundColor", "white");
        styleH("check2", "zIndex", "100");
    }
    document.getElementById("check2").innerHTML += message + "</br>";
}

function check(message) {
    if (!document.getElementById("check")) {
        divH("check");
        styleH("check", "position", "absolute");
        styleH("check", "top", "0px");
        styleH("check", "left", "0px");
        styleH("check", "backgroundColor", "white");
        styleH("check", "zIndex", "100");
    }
    document.getElementById("check").innerHTML = message;
}

function checkNice(message) {
    check(message);
    classH("check", "container border shadow");
    styleH("check", "position", "absolute");
    setTimeout(function () {
        check("");
        newRemove("check");
    }, 3000);
}

function checkNearMouse(text, inner) {
    if (text !== "") {
        var mouse = getMouse();
        var screen = getScreen();
        var left = mouse.x + document.body.scrollLeft + "px";
        var top = mouse.y + document.body.scrollTop + "px";

//        var halfWidth = getPercentageH(screen.w, 55);
//        var halfHeight = getPercentageH(screen.h, 55);

        var id = "checkNearMouse", tid = "checkTextArea";
        if (divExistH(id)) {
            var input = document.getElementById(tid).innerHTML;
            var data = input + "<hr>" + text;
            divInnerH(tid, data);
            styleH(id, "backgroundColor", "white");
            styleH(tid, "backgroundColor", "white");
            reposition(id);
        } else {
            removableContainerH(id);
            divH(tid, id);
            divInnerH(tid, text);
            closeH(id);
            styleH(id, "backgroundColor", "white");
            styleH(tid, "backgroundColor", "white");
            reposition(id);
        }
        styleH(id, "zIndex", "1000");
        styleH(tid, "zIndex", "1000");
        styleH(id, "minWidth", getScreen().w / 3 + "px");
        styleH(tid, "minWidth", getScreen().w / 3 + "px");
    }

    function reposition(id) {
        var halfWidth = getElementH(id).offsetWidth;
        var halfHeight = getElementH(id).offsetHeight;

        if (mouse.x > halfWidth) {
            left = mouse.x - halfWidth + document.body.scrollLeft + "px";
        }
        if (mouse.y > halfHeight) {
            top = mouse.y - halfHeight + document.body.scrollTop + "px";
        }
        styleH(id, "left", left);
        styleH(id, "top", top);
    }
}


/*TIME*/
function timeLeftH(finish) {
    return finish - getTime();
}
function millisecondsH() {
    var time = new Date();
    var milliseconds = time.getTime();
    return milliseconds;
}

function timeFromMsH(deadline) {
    var time = {ms: deadline, timeString: "", days: "", hours: "", minutes: "", seconds: ""};
    var timeLeft = deadline;
    var inSeconds = timeLeft / 1000;
    time.days = Math.round(timeLeft / 1000 / 60 / 60 / 24);
    time.hours = Math.round(timeLeft / 1000 / 60 / 60);
    time.minutes = Math.round(timeLeft / 1000 / 60);
    time.seconds = Math.round(timeLeft / 1000);
    var sec = 60;
    var min = 60;
    var hr = 24;
    var days = parseInt(inSeconds / (sec * min * hr));
    var hours = parseInt(inSeconds / (sec * min)) % hr;
    var minutes = parseInt(inSeconds / sec) % min;
    var seconds = parseInt(inSeconds % sec, 10);

    time.timeString = time.days + "d." + time.hours + "h." + time.minutes + "m." + time.seconds + "s";
    time.timeTotal = days + "d." + hours + "h." + minutes + "m." + seconds + "s";
    return time;
}

function timeLeftInfoH(deadline) {
    var time = {ms: deadline, timeString: "", days: "", hours: "", minutes: "", seconds: ""};
    var timeLeft = deadline - getTime();
    var inSeconds = timeLeft / 1000;
    time.days = Math.round(timeLeft / 1000 / 60 / 60 / 24);
    time.hours = Math.round(timeLeft / 1000 / 60 / 60);
    time.minutes = Math.round(timeLeft / 1000 / 60);
    time.seconds = Math.round(timeLeft / 1000);
    var sec = 60;
    var min = 60;
    var hr = 24;
    var days = parseInt(inSeconds / (sec * min * hr));
    var hours = parseInt(inSeconds / (sec * min)) % hr;
    var minutes = parseInt(inSeconds / sec) % min;
    var seconds = parseInt(inSeconds % sec, 10);

    time.timeString = time.days + "d." + time.hours + "h." + time.minutes + "m." + time.seconds + "s";
    time.timeTotal = days + "d." + hours + "h." + minutes + "m." + seconds + "s";
    return time;
}

function msToDateH(ms) {
    var date = new Date(parseInt(ms));
    date = date.toString();
    var dateDetails = date.split(" ");
    var time = dateDetails[4].split(":");
    var seconds = time[2];
    var minutes = time[1];
    var hours = time[0];
    var month = dateDetails[1];
    var day = dateDetails[2];
    var year = dateDetails[3];
    var week = dateDetails[0];
    date = year + "." + month + "." + day + "." + week + "." + hours + "." + minutes + "." + seconds;
    var dateObject = {ms: ms, dateString: date, year: year, month: month, day: day, week: week, hours: hours, minutes: minutes, seconds: seconds};
    return dateObject;
}

function customDateToMsH(dateString) {
//date string
//Mon
//Jul
//20
//2015
//16:42:28
//GMT+0100
//(GMT
//Daylight
//Time)
    var splittedDate = dateString.split(".");
    var year = parseInt(splittedDate[0]);
    var month = splittedDate[1];
    var day = parseInt(splittedDate[2]);
    //var week = splittedDate[3];
    var hours = parseInt(splittedDate[4]);
    var minutes = parseInt(splittedDate[5]);
    var seconds = parseInt(splittedDate[6]);

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (var i = 0; i < months.length; i++) {
        if (month === months[i]) {
            month = i;
        }
    }

    var rebuiltDate = new Date(year, month, day, hours, minutes, seconds);
    var rebuiltDateMS = new Date(rebuiltDate).getTime();
    return rebuiltDateMS;
    //var backToTime = new Date(rebuiltDateMS).toString();
}

function validCustomDateH(dateIn) {
    var dateString = "" + dateIn;
    //2016.Jul.10.Sun.18.13.58
    var split = dateString.split(".");
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (var i = 0; i < months.length; i++) {
        if (split[1] === months[i]) {
            split[1] = i;
        }
    }

    var correctCounter = 0;
    if (split.length === 7) {
        for (var i = 0; i < split.length; i++) {
            if (i !== 3 && !isNaN(split[i])) {
                correctCounter++;
            }
        }
    }
    if (correctCounter === 6) {
        return true;
    }
    else {
        checkNice("please use date format: 2016.Jul.10.Sun.18.13.58");
        return false;
    }
}

function timePassedH(start, duration) {
    if (new Date().getTime() - start >= duration) {
        return true;
    }
    return false;
}


/*KEYS*/
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

function listenLetterKeys() {
    document.onkeypress = function (e) {
        e = e || window.event;
        var charCode = (typeof e.which === "number") ? e.which : e.keyCode;
        if (charCode) {
            keyboardLetter = String.fromCharCode(charCode);
        }
    };
}

function listenAllKeys() {
    document.onkeydown = function (e) {
        keyboardKeyCode = e.keyCode;
    };
}

function getAllKeyCode() {
    return keyboardKeyCode;
}

function resetAllKeyCode() {
    keyboardKeyCode = "";
}

function getLetterKey() {
    return keyboardLetter;
}

function resetLetterKey() {
    keyboardLetter = "";
}

function getMouse() {
    return mouse;
}


/*SCREEN*/
function isVerticalScreen() {
    var scr = getScreen();
    return scr.w < scr.h;
}

function getScreen() {
    var scr = {w: "", h: ""};
    if (typeof window.innerWidth !== 'undefined') {
        scr.w = window.innerWidth;
        scr.h = window.innerHeight;
    }
    return scr;
}

function inIframeH() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

/*RANDOM*/
function ranStrH(arr) {
    return arr[Math.floor(Math.random() * (arr.length))];
}

function ranIntH(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function ranRGBAH(from, to, useAlpha) {
    var alpha = 1;
    if (useAlpha === true) {
        alpha = Math.random();
    }
    return  color = "rgba(" + ranIntH(from, to) + "," + ranIntH(from, to) + "," + ranIntH(from, to) + "," + alpha + ")";
}

function ranRGBH(fromIn, toIn) {
    var from = 0;
    var to = 255;
    if (fromIn !== undefined && toIn !== undefined) {
        from = fromIn;
        to = toIn;
    }
    return "rgb(" + ranIntH(from, to) + "," + ranIntH(from, to) + "," + ranIntH(from, to) + ")";
}

function ranHexMapH(colorAmount) {
    var colMap = new Array(colorAmount);
    var hexaMap = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    for (var i = 0; i < colorAmount; i++) {
        colMap[i] = "#" + ranStrH(hexaMap) + ranStrH(hexaMap) + ranStrH(hexaMap) + ranStrH(hexaMap) + ranStrH(hexaMap) + ranStrH(hexaMap);
    }
    return colMap;
}

function ranBoolH() {
    return Math.random() < 0.5;
}

/*ELEMENTS*/
var growingInputs = 0;
var growingListener = "";

function divH(idIn, targetId) {
    //not exists, create it
    if (!document.getElementById(idIn)) {
        var div = document.createElement("div");
        div.id = idIn;
        document.getElementsByTagName("body")[0].appendChild(div);
    }
    //target defined, append it
    if (targetId !== undefined) {
        document.getElementById(targetId).appendChild(document.getElementById(idIn));
    }
}
function createTagH(id, type, where) {
    var output = document.createElement(type);
    (where) ? document.getElementById(where).appendChild(output) : document.getElementsByTagName("body")[0].appendChild(output);
    output.setAttribute("id", id);
}
function appendH(what, where) {
    document.getElementById(where).appendChild(document.getElementById(what));
}
function getElementH(id) {
    return document.getElementById(id);
}

function divExistH(id) {
    return document.getElementById(id) !== null;
}

function classH(idIn, classNameIn) {
    var cls = document.getElementById(idIn);
    cls.className = classNameIn;
}

function styleH(idIn, styleToEdit, value) {
    var st = document.getElementById(idIn).style;
    st[styleToEdit] = value;
}

function removeFromParentH(id) {
    var element = document.getElementById(id);
    var parent = null;
    if (element !== null) {
        parent = element.parentNode;
        if (parent !== null && parent !== undefined) {
            element.parentNode.removeChild(element);
            element = null;
        } else {
            document.getElementsByTagName("body")[0].removeChild(element);
        }
    }
}

function insertBeforeH(id, idBefore) {
    var el1 = document.getElementById(id);
    var el2 = document.getElementById(idBefore);
    var el2Parent = el2.parentNode;
    el2Parent.insertBefore(el1, el2);
}

function divTextH(idIn, text) {
    document.getElementById(idIn).textContent = text;
}

function divInnerH(idIn, text) {
    document.getElementById(idIn).innerHTML = text;
}

function positionDivH(idIn, x, y) {
    document.getElementById(idIn).style.left = x + "px";
    document.getElementById(idIn).style.top = y + "px";
}

function rotateDivH(idToRotate, angle) {
    // transform rotate for all browsers woohoo
    document.getElementById(idToRotate).style.WebkitTransform = "rotate(" + angle + "deg)";
    document.getElementById(idToRotate).style.msTransform = "rotate(" + angle + "deg)";
    document.getElementById(idToRotate).style.transform = "rotate(" + angle + "deg)";
}

function toInputH(id, txt) {
    document.getElementById(id).value = txt;
}

function fromInputH(id) {
    return document.getElementById(id).value;
}

function inputH(name, where, title) {
    var containerId = "container" + name;
    divH(containerId, where);
    classH(containerId, "inline but butLight");
    if (title !== undefined) {
        divInnerH(containerId, title + "</br>");
    }
    var input = document.createElement("input");
    input.setAttribute("id", "input" + name);
    input.setAttribute("type", "text");
    input.setAttribute("name", name);
    input.setAttribute("placeholder", name);
    input.setAttribute("width", "10");
    document.getElementById(containerId).appendChild(input);
}

function anywhereH(txt, where, inner) {
    var id = Math.round(Math.random() * 1000000);
    divH(id, where);
    if (inner) {
        divInnerH(id, txt);
    } else {
        divTextH(id, txt);
    }
}

function onEnterH(functionIn) {
    var interval = setInterval(function () {
        if (getAllKeyCode() === 13) {
            resetAllKeyCode();
            functionIn();
            clearInterval(interval);
        }
    }, 300);
}

function onEscapeH(functionIn) {
    var interval = setInterval(function () {
        if (getAllKeyCode() === 27) {
            resetAllKeyCode();
            functionIn();
            clearInterval(interval);
        }
    }, 300);
}

function breakH(where) {
    var breakline = document.createElement("br");
    document.getElementById(where).appendChild(breakline);
}

function closeButtonH(name, where) {
    buttonH(name, where);
    var el = document.getElementById(name);
    el.addEventListener("click", function () {
        removeFromParentH(where);
    });
}

function closeH(where) {
    var id = "id" + ranIntH(1000000, 1000000000);
    divH(id, where);
    classH(id, "inline but click");
    divTextH(id, "X");
    styleH(id, "borderRadius", "50%");
    styleH(id, "float", "right");
    styleH(id, "top", "100%");
    styleH(id, "minWidth", "20px");
    styleH(id, "minHeight", "20px");
    styleH(id, "maxWidth", "20px");
    styleH(id, "maxHeight", "20px");
    var el = document.getElementById(id);
    el.addEventListener("click", function () {
        removeFromParentH(where);
    });
}

function clickH(id, listenTo, functionVariable) {
    var listen = "click";
    var el = document.getElementById(id);
    if (listenTo !== undefined) {
        listen = listenTo;
    }
    el.addEventListener(listen, functionVariable);
}

function buttonH(name, where) {
    var id = name;
    divH(id, where);
    classH(id, "inline butLight click");
    divTextH(id, name);
}

function linkH(name, where, src) {
    var cleanedId = name;
    cleanedId.replace(" ", "");
    divH(cleanedId, where);
    classH(cleanedId, "link click");
    var link = '<a href="' + src + '">' + name + '</a>';
    divInnerH(cleanedId, link);
}

function removableContainerH(name, where) {
    var id = name;
    if (where === undefined) {
        divH(id);
    }
    else {
        divH(id, where);
    }
    classH(id, "border shadow");
    styleH(id, "position", "absolute");
    styleH(id, "zIndex", "10");
    styleH(id, "display", "table");
    styleH(id, "padding", "10px");
    var interval = setInterval(function () {
        if (getAllKeyCode() === 27) {
            if (divExistH(id)) {
                removeFromParentH(id);
            }
            resetAllKeyCode();
            clearInterval(interval);
        }
    }, 500);
}

function correctMouseContainerH(id) {
    var mouse = getMouse();
    var screen = getScreen();
    var halfWidth = getPercentageH(screen.w, 55);
    var halfHeight = getPercentageH(screen.h, 55);

    if (mouse.x > halfWidth) {
        var left = mouse.x - halfWidth + "px";
        styleH(id, "left", left);
    }
    if (mouse.y > halfHeight) {
        var top = mouse.y - halfHeight + "px";
        styleH(id, "left", top);
    }
}

function iframeH(id, idTo, src) {
    var frame = document.createElement("IFRAME");
    frame.id = id;
    frame.src = src;
    frame.style.resize = "both";
    frame.style.overflow = "auto";
    document.getElementsByTagName("body")[0].appendChild(frame);
    document.getElementById(idTo).appendChild(frame);
}

function styleSheetH(src) {
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('link');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.href = src;
    head.appendChild(style);
}

function changeStyleH(id, href) {
    document.getElementById(id).setAttribute("href", href);
}

function fadeBehindH(idIn) {
    var elZ = document.getElementById(idIn).style.zIndex;
    var id = "fade";
    divH(id);
    styleH(id, "position", "fixed");
    styleH(id, "zIndex", elZ - 1);
    styleH(id, "width", "100%");
    styleH(id, "height", "100%");
    styleH(id, "top", "0px");
    styleH(id, "left", "0px");
    styleH(id, "backgroundColor", "rgba(1,1,1,0.3)");
}

function removeFadeH() {
    if (document.getElementById("fade") !== null) {
        removeFromParentH("fade");
    }
}

function growingInputsH(name, where) {
    var input = '<div class="but click" style="background-color: ' + colors.blue + ';">' + name + " Split " + growingInputs + '<hr><input style="color:black;" id="' + "growingInputs" + name + growingInputs + '" type="text" maxlength="30" name="' + "edit" + name + growingInputs + '"  placeholder="' + name + '" value="' + "" + '"></div>';
    var id = "inputsContainer" + name + growingInputs;
    divH(id, where);
    divInnerH(id, input);

    var getId = document.getElementById("growingInputs" + name + growingInputs);
    var previousInput = "growingInputs" + name + (growingInputs - 1);
    var nextInput = "growingInputs" + name + (growingInputs + 1);
    removeListenerH(previousInput, growingListener);
    growingListener = getId.addEventListener("click", function () {
        if (growingInputs >= 1) {
            //var interv = setInterval(function () {
            if (prevInputNotEmptyH(previousInput) && nextInputIsNotEmptyH(nextInput)) {
                growingInputs++;
                growingInputsH(name, where);
                //clearInterval(interv);
            }
            //  }, 900);
        } else {
            growingInputs++;
            growingInputsH(name, where);
        }
    });
}

function removeListenerH(id, listener) {
    if (divExists()) {
        var el = document.getElementById(id);
        el.removeEventListener("click", listener);
    }
}

function prevInputNotEmptyH(id) {
    if (divExistH(id)) {
        var val = document.getElementById(id).value;
        if (val !== undefined) {
            if (val.length >= 1) {
                return true;
            }
        }
    }
    return false;
}

function nextInputIsNotEmptyH(id) {
    if (divExistH(id)) {
        var val = document.getElementById(id).value;
        if (val !== undefined) {
            if (val.length >= 1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return true;
    }
}

function getGrowingInputsH(name) {
    var allInputs = new Array(growingInputs + 1);
    for (var i = 0; i < allInputs.length; i++) {
        var id = "growingInputs" + name + i;
        allInputs[i] = document.getElementById(id).value;
    }
    return allInputs;
}

function elementAndScreenH(id, pct, property) {
    var scr = getScreen();
    var whatToDo = {
        width: (function () {
            var container = getPercentageH(scr.w, pct) + "px";
            styleH(id, "width", container);
        }),
        height: (function () {
            var container = getPercentageH(scr.h, pct) + "px";
            styleH(id, "height", container);
        }),
        top: (function () {
            var container = getPercentageH(scr.h, pct) + document.body.scrollTop + "px";
            styleH(id, "top", container);
        }),
        left: (function () {
            var container = getPercentageH(scr.w, pct) + document.body.scrollLeft + "px";
            styleH(id, "left", container);
        })
    };
    whatToDo[property]();
}

function createSelectH(idIn,where,name,data) {
    var input = document.createElement("select");
    var id = name;
    input.setAttribute("type", "text");
    input.setAttribute("name", name);
    if (idIn !== undefined) {
        id = idIn;
    }
    input.setAttribute("id", id);
    data.unshift(name);
    input.setAttribute("size", "1");
    document.getElementById(where).appendChild(input);
    for (var i = 0; i < data.length; i++) {
        var cur = data[i];
        var option = document.createElement("option");
        option.setAttribute("value", cur);
        var txt = document.createTextNode(cur);
        option.appendChild(txt);
        input.appendChild(option);
    }
}

function breakTextH(txt, where, vertical) {
    var el = H.el, st = el.st;
    txt = txt.split(" ");
    for (var i = 0; i < txt.length; i++) {
        var cur = txt[i], id = i + cur;
        el.div(id, where);
        el.cls(id, "inline");
        st(id, "padding", "0px");
        st(id, "margin", "0px");
        el.inn(id, cur + "&nbsp");
        if (vertical) {
            el.break(where);
        }
    }
}

/*STRINGS*/
function stringsInBetweenH(str, start, end) {
    var strings = [];
    var stringInBetween = "";
    if (str.length > 3) {
        var begin = false;
        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) === start) {
                begin = true;
                i++;
                while (begin) {
                    if (i < str.length) {
                        if (str.charAt(i) === end) {
                            begin = false;
                            i++;
                        } else {
                            stringInBetween += str.charAt(i);
                        }
                    } else {
                        begin = false;
                    }
                    i++;
                }
                strings.push(stringInBetween);
                stringInBetween = "";
            }
        }
    }
    return strings;
}
function noSymbolsH(strIn) {
    var data = H.str.replRgx(strIn, /[A-Za-z0-9\s]/g, ""), clean = data.data;
    return clean.join("");
}

function capitalizeFirstH(str) {
    var first = str.substring(0, 1);
    var chopped = str.substring(1, str.length);
    var caps = first.toUpperCase();
    return caps + chopped;
}
function bracketsOkH(input, open, close) {
    var n = symbolCountH(input, open);
    var m = symbolCountH(input, close);
    if (n === m) {
        return true;
    } else {
        return false;
    }
}
function replaceCharH(str, i, re) {
    return str.substring(0, i - 1) + re + str.substring(i, str.length);
}

function strInBetweenH(str, start, end) {
    var first = str.indexOf(start);
    var next = str.indexOf(end, first + 1);
    return str.substring(first + 1, next);
}

function insideQuotesH(str, part) {
    var strCut = strInBetweenH(str, "'", "'");
    var strCut2 = strInBetweenH(str, '"', '"');
    if (strCut === part || strCut2 === part) {
        return true;
    }
    return false;
}

function symbolCountH(str, what) {
    return str.split(what).length - 1;
}
function splitNoReplaceH(str, spl, left) {
    var broken = "";
    var hidden = "{}---{}";
    if (left) {
        broken = replaceSymbolsH(str, spl, spl + hidden);
    } else {
        broken = replaceSymbolsH(str, spl, hidden + spl);
    }
    return broken.split(hidden);
}

function forInnerH(txt) {
    var clean = "";
    clean = cureTheEvil(clean);
    clean = replaceSymbolsH(txt, "\n", "</br>");
    clean = replaceSymbolsH(clean, "\r", "</br>");
    clean = replaceSymbolsH(clean, "\t", "&nbsp&nbsp&nbsp&nbsp");

    var spaces = " ";
    var space = "&nbsp";
    for (var i = 0; i < 10; i++) {
        clean = replaceSymbolsH(clean, spaces, space);
        spaces += " ";
        space += "&nbsp";
    }
    return clean;
}

function uniquesH(notUniqueItems) {
    var notUnique = 0;
    var uniqueItemsCopy = copyArrayH(notUniqueItems);
    var notUniquesLength = notUniqueItems.length;
    var uniqueItems = new Array(notUniquesLength);
    var uniqueCount = new Array(notUniquesLength);
    uniqueCount = fillArrayH(uniqueCount, 0);
    uniqueItems = fillArrayH(uniqueItems, "");
    for (var i = 0; i < notUniquesLength; i++) {
        if (notUniqueItems[i] !== "") {
            var currentValue = notUniqueItems[i];
            for (var j = 0; j < notUniquesLength; j++) {
                if (currentValue !== notUniqueItems[j]) {
                    // not equal means unique
                    uniqueItems[i] = currentValue;
                } else {
                    //it is equal to previous, therefore clean it out
                    notUniqueItems[j] = "";
                    //counts how many times this value happenned
                    uniqueCount[i] += 1;
                    //to calculate new array size which had only these values
                    notUnique++;
                }
            }
        }
    }

//this is from java practice...dont mind all the manual work instead of using ...slice...push...
//count how many not null values for new array size
    var nulltester = 0;
    for (var i = 0; i < notUniquesLength; i++) {
        if (uniqueItems[i] !== "") {
            nulltester++;
        }
    }

// when all items are the same, meaning there is no unique item, unique array will return null, therefore this  sets the size at least to 1
    var whichCounter = 0;
    if (nulltester <= 1) {
        whichCounter = 1;
        nulltester = 1;
    }

    var uniqueItemsResized = new Array(nulltester);
    var uniqueCountResized = new Array(nulltester);
    var probabilitiesOfUniques = new Array(nulltester);
//this is needed in case there is only one unique item to find
    if (notUniqueItems[0] === "") {
        uniqueItemsResized[0] = uniqueItemsCopy[0];
        uniqueCountResized[0] = notUnique;
    }

//put all data to resized arrays
    for (var i = 0; i < notUniquesLength; i++) {
        //previously we marked same values as "", now I ignore them to find uniques
        if (uniqueItems[i] !== "") {
            uniqueItemsResized[whichCounter] = uniqueItems[i];
            uniqueCountResized[whichCounter] = uniqueCount[i];
            whichCounter++;
        }
    }

//probabilities
    for (var i = 0; i < probabilitiesOfUniques.length; i++) {
        var probability = uniqueCountResized[i] / notUniquesLength;
        var smoothed = smoothNumberH(probability, 0.000001);
        var chopped = chopNumberH(smoothed, 7);
        probabilitiesOfUniques[i] = chopped;
    }

    var uniqueData = {uniques: uniqueItemsResized, counts: uniqueCountResized, probabilities: probabilitiesOfUniques};
    return uniqueData;
}

function similarH(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    var reg = /[a-z]*?/g;
    var ra = matchH(a, reg).join("");
    var rb = matchH(b, reg).join("");
    if (strExistsH(ra, rb) || strExistsH(rb, ra)) {
        return true;
    }
    return false;
}

function matchH(str, reg) {
    return str.match(reg);
}

function replaceRegexH(string, regex, replacement) {
    var i = 0;
    var cleanCopy = string;
    var replaced = [];
    var reg = new RegExp(regex);
    var result = reg.exec(cleanCopy);
    while (result !== null) {
        var inBtw = result.toString();
        inBtw = inBtw.substring(0, inBtw.length);
        replaced.push(inBtw);
        (replacement) ? string = string.replace(inBtw, replacement + i + "-") : string = string.replace(inBtw, "");
        result = reg.exec(cleanCopy);
        i++;
    }
    var data = {result: string, data: replaced};
    return data;
}

function numberFromElementH(numIn) {
    var whatIsIt = numIn.slice(-1);
    if (whatIsIt === "%") {
        return numIn.substring(0, numIn.length - 1);
    }
    if (whatIsIt === "x") {
        return numIn.substring(0, numIn.length - 2);
    }
    return 0;
}

function percentageOrPxH(numIn) {
    var whatIsIt = numIn.slice(-1);
    if (whatIsIt === "%") {
        return "%";
    }
    if (whatIsIt === "x") {
        return "px";
    }
    return 0;
}

function replaceSymbolsH(str, sym, re) {
    return str.split(sym).join(re);
}

function strExistsH(str, part) {
    return str.indexOf(part) !== -1;
}

function capitalizeFirstH(str) {
    var first = str.substring(0, 1);
    var chopped = str.substring(1, str.length);
    var caps = first.toUpperCase();
    return caps + chopped;
}

function cleanEmptyH(strToClean) {
    var clean = strToClean;
    clean = clean.replace(/\t+/g, '');
    clean = clean.replace(/\n+/g, '');
    clean = clean.replace(/\r+/g, '');
    return clean;
}


/*ARRAYS*/

function arrayToMapH(arr, key) {
    var map = {};
    for (var i = 0; i < arr.length; i++) {
        var cur = arr[i];
        var head = cur[key];
        var tail = cur;
        map[head] = tail;
    }
    return map;
}

function sortByObjectH(arr, val) {
    var copy = copyArrayH(arr);
    copy.sort(function (a, b) {
        a = parseFloat(a[val]);
        b = parseFloat(b[val]);
        return a - b;
    });
    return copy;
}

function sortAscendingH(arr) {
    var copy = copyArrayH(arr);
    copy.sort(function (a, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        return a - b;
    });
    return copy;
}

function sortDescendingH(arr) {
    var copy = copyArrayH(arr);
    copy.sort(function (a, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        return b - a;
    });
    return copy;
}

function fillArrayH(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] = val;
    }
    return arr;
}

function findH(what, where) {
    for (var i = 0; i < where.length; i++) {
        if (where[i] === what) {
            return where[i];
        }
    }
}

function isArrayH(arr) {
    //needed for matrices to determine if arr[0] is also array
    if (typeof arr === 'string') {
        arr = [arr];
        return arr;
    }
    return arr;
}

function copyArrayH(array) {
    var copy = new Array(array.length);
    for (var i = 0; i < array.length; i++) {
        copy[i] = array[i];
    }
    return copy;
}

function discretizeH(toDiscretize, binAmount) {
    var discretized = [];
    var amountOfItems = toDiscretize.length;
    var remainder = amountOfItems % binAmount;
    var otherChunks = (amountOfItems - remainder) / binAmount;
    var position1 = 0;
    var position2 = otherChunks;

    for (var i = 0; i < binAmount; i++) {
        // last chunk must include remainder length
        if (i < binAmount - 1) {
            discretized.push(copyRangeH(toDiscretize, position1, position2));
            position1 += otherChunks;
            position2 += otherChunks;
        } else {
            discretized.push(copyRangeH(toDiscretize, position1, position2 + remainder));
        }
    }
    return discretized;
}

function copyRangeH(arr, a, b) {
    var copy = [];
    for (var i = a; i < b; i++) {
        copy.push(arr[i]);
    }
    return copy;
}

/*SERVER*/
var serverResponse = "";
function serverClient(page, post) {
    this.xmlhttp = "";
    this.page = page;
    this.post = post;
    this.connect = function () {
        var xmlhttp = this.xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", this.page, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(this.post);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                serverResponse = xmlhttp.responseText;
            }
        };
    };
}

function getResponse() {
    var response = serverResponse;
    serverResponse = "";
    return response;
}

function submitForm(dataArr, page) {
    var id = "submitForm";
    if (!divExistH(id)) {
        divH(id);
        styleH(id, "display", "none");
    } else {
        divInnerH(id, "");
    }
    var f = document.createElement("form");
    document.getElementById(id).appendChild(f);
    f.setAttribute("method", "post");
    f.setAttribute("action", page);
    f.setAttribute("style", "display:none;");

    for (var i = 0; i < dataArr.length; i++) {
        input("input" + i, dataArr[i]);
    }
    f.submit();

    function input(name, data) {
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", name);
        input.setAttribute("value", data);
        f.appendChild(input);
    }
}

/*CAPTCHA*/
var onloadCallback = "";
function getCaptchaResponse() {
    return grecaptcha.getResponse();
}

function createCaptchaContainer(where) {
    //$tuscript.='<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer>//ubabyscript google script(all other scripts will be deleted)';
    // $tuscript.='\n</script>';

    var body = document.getElementsByTagName("body")[0];
    var code = document.createElement("script");
    code.id = "recaptcha";
    code.src = "https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit";
    body.appendChild(code);
    H.el.inn(code.id, "//ubabyscript google script (all other will be deleted)");

    var id = "captchaContainer";
    divH(id, where);
    classH(id, "container border shadow");
    styleH(id, "padding", "10px");
    onloadCallback = function () {
        grecaptcha.render('captchaContainer', {
            'sitekey': '6Lfa9gETAAAAAHyuet0zXdegFPbwg4cYaAtQtMpA',
            'data-size': 'compact'
        });
    };
}

/*LIKE*/
function prepareLike(appId) {
    divH("fb-root");
    var appId = appId;
    executeLikeScript(appId);
}

function executeLikeScript(appId) {
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id))
            return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.3&appId=" + appId;
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

function addLike(where, page, appId) {
    //1020078524684690
    prepareLike(appId);
    var id = "likeArea";
    divH(id, where);
    var fbLike = "";
    fbLike += '<div class="fb-like" data-href="' + page + '" data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div>';
    divInnerH(id, fbLike);
}

/*CANVAS*/
function canvasH(name) {
    var layer = document.createElement("canvas");
    layer.id = name;
    document.getElementsByTagName("body")[0].appendChild(layer);
    var el = document.getElementById(name);
    var st = el.style;
    st.zIndex = 1;
    st.position = "absolute";
    initDrawAreaH(name);
    canvasObjects.push(new canvasObjectH(drawArea));
}

function canvasSizeH(name, w, h) {
    document.getElementById(name).width = w;
    document.getElementById(name).height = h;
    findCanvasH(name).w = w;
    findCanvasH(name).h = h;
}

function canvasPositionH(name, x, y, z) {
    var el = document.getElementById(name);
    var st = el.style;
    st.left = x + "px";
    st.top = y + "px";
    st.zIndex = z;
    findCanvasH(name).x = x;
    findCanvasH(name).y = y;
}

function findCanvasH(name) {
    for (var i = 0; i < canvasObjects.length; i++) {
        if (canvasObjects[i].name === name) {
            return canvasObjects[i];
        }
    }
}

function initDrawAreaH(name) {
    //canvas
    var name = name;
    var cn = document.getElementById(name);
    var ctx = cn.getContext("2d");
    drawArea.name = name;
    drawArea.canvas = cn;
    drawArea.context = ctx;
}

function getCanvasObjectsH() {
    return canvasObjects;
}

/**
 * @constructor
 * @param canvasIn drawArea{name,canvas,context,x,y,w,h} singleton
 */
/**/
function canvasObjectH(canvasIn) {
    this.name = canvasIn.name;
    this.canvas = canvasIn.canvas;
    this.context = canvasIn.context;
    this.x = canvasIn.x;
    this.y = canvasIn.y;
    this.w = canvasIn.w;
    this.h = canvasIn.h;
}

//drawing tools
//----------------------------------------------------------------------------------------
function drawCanvasLineH(canvasIn, x, y, x1, y1, color, w) {
    canvasIn.context.beginPath();
    canvasIn.context.lineWidth = w;
    canvasIn.context.moveTo(x, y);
    canvasIn.context.lineTo(x1, y1);
    canvasIn.context.strokeStyle = color;
    canvasIn.context.stroke();
}

function triangleH(canvasIn, x1, y1, x2, y2, x3, y3, color, fill) {
    var ctx = canvasIn.context;
    ctx.beginPath();
    if (fill) {
        ctx.fillStyle = color;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.fill();
    } else {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.moveTo(x3, y3);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = color;
        ctx.closePath();
        ctx.stroke();
    }
}

function drawTextH(canvasIn, x, y, size, text, color, shadow) {
    canvasIn.context.save();
    if (shadow) {
        canvasIn.context.font = size + "px Verdana";
        canvasIn.context.shadowColor = "black";
        canvasIn.context.shadowBlur = 5;
        canvasIn.context.lineWidth = 3;
        canvasIn.context.strokeText(text, x, y);
        canvasIn.context.shadowBlur = 0;
        canvasIn.context.lineWidth = 0;
    }
    canvasIn.context.fillStyle = color;
    canvasIn.context.font = size + "px Verdana";
    canvasIn.context.fillText(text, x, y);
    canvasIn.context.restore();
}

function drawCanvasCircleH(canvasIn, x, y, size, rad1, rad2, color, thickness, clockwise, fill) {
    canvasIn.context.beginPath();
    if (size > 0)
    {
        if (fill === true) {
            canvasIn.context.fillStyle = color;
            canvasIn.context.arc(x, y, size, rad1, rad2, clockwise);
            canvasIn.context.fill();
            canvasIn.context.closePath();
        }
        if (fill === false) {
            canvasIn.context.lineWidth = thickness; //add parameter line width !!!
            canvasIn.context.strokeStyle = color;
            canvasIn.context.arc(x, y, size, rad1, rad2, clockwise);
            canvasIn.context.stroke();
            canvasIn.context.closePath();
        }
    }
}

function drawCanvasRectangleH(canvasIn, x, y, w, h, color, thickness, fill) {
    canvasIn.context.beginPath();
    if (w > 0 && h > 0)
    {
        if (fill === true) {
            canvasIn.context.fillStyle = color;
            canvasIn.context.rect(x, y, w, h);
            canvasIn.context.fill();
            canvasIn.context.closePath();
        }
        if (fill === false) {
            canvasIn.context.lineWidth = thickness; //add parameter line width !!!
            canvasIn.context.strokeStyle = color;
            canvasIn.context.rect(x, y, w, h);
            canvasIn.context.stroke();
            canvasIn.context.closePath();
        }
    }
}

/*2d objects*/
//shape objects
function rectangleCenterH(rectangle) {
    rectangle.x = (rectangle.w + rectangle.x) - (rectangle.w / 2);
    rectangle.y = (rectangle.h + rectangle.y) - (rectangle.h / 2);
}

function rotateAroundH(source, target, speed, clockWise) {
    (clockWise) ? clockWise = 1 : clockWise = -1;
    var x1 = target.x,
            y1 = target.y,
            x2 = source.x,
            y2 = source.y,
            sin = Math.sin,
            cos = Math.cos, phi = 0,
            phi = clockWise * speed;
    target.x = (cos(phi) * (x1 - x2)) - (sin(phi) * (y1 - y2)) + x2;
    target.y = (sin(phi) * (x1 - x2)) + (cos(phi) * (y1 - y2)) + y2;
}

function rotateImageH(image, canvas, x, y, angle)
{
    //uses whole canvas to quickly modify it and then 
    //restores it to original position without touching image
    canvas.context.save();
    canvas.context.translate(x, y);
    canvas.context.rotate(angle);
    //position using center of image not edge
    canvas.context.drawImage(image, -(image.width / 2), -(image.height / 2));
    canvas.context.restore();
}

function moveInLineH(item, angle, howFar) {
    var xAngle = Math.cos(angle);
    var yAngle = Math.sin(angle);
    item.x = item.x + xAngle * howFar;
    item.y = item.y + yAngle * howFar;
}

function distanceH(source, target) {
    var distance = getDistanceH(source.x, source.y, target.x, target.y);
    return distance;
}

function angleH(source, target) {
    var radians = getAngleH(source.x, source.y, target.x, target.y);
    return radians;
}

function boxColissionH(source, target) {
    if (source.x < target.x + target.w &&
            source.x + source.w > target.x &&
            source.y < target.y + target.h &&
            source.h + source.y > target.y) {
        return true;
    }
    return false;
}

function circleCollisionH(source, target) {
    var dx = source.x - target.x;
    var dy = source.y - target.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < source.r + target.r) {
        return true;
    }
    return false;
}


/*MATH*/
function chopNumberH(num, howMuch) {
    var strVer = num.toString();
    var choppedUp = strVer.substring(0, howMuch);
    return parseFloat(choppedUp);
}

function evenH(num) {
    return num % 2 === 0;
}
function distanceTravelledH(initialSpeed, time, acceleration) {
    var distance = (initialSpeed * time) + 1 / 2 * (acceleration * (time * time));
    return distance;
}

function normalizeH(number, min, max, newMin, newMax) {
    var normalized = 0;
    normalized = ((((number - min) / (max - min)) * (newMax - newMin)) + newMin);
    return normalized;
}

function getPercentageH(value, percent) {
    return (value / 100) * percent;
}

function smoothNumberH(number, howMuch) {
    number /= howMuch;
    number = Math.round(number);
    return number *= howMuch;
}

function radianToDegreeH(radian) {
    var degree = radian * 180 / Math.PI;
    return degree;
}

function getAngleH(sourceX, sourceY, targetX, targetY) {
    var x = targetX - sourceX;
    var y = targetY - sourceY;
    var radians = Math.atan2(y, x);
    if (radians <= 0) {
        radians = radians + (Math.PI * 2);
    }//when it is negative, means on the opposite side, therefore add radian
    return radians;
}

function getDistanceH(sourceX, sourceY, targetX, targetY) {
    var x = targetX - sourceX;
    var y = targetY - sourceY;
    var distance = Math.sqrt((x * x) + (y * y));
    return distance;
}

function moveInLineXYH(x, y, angle, howFar) {
    var xAngle = Math.cos(angle);
    var yAngle = Math.sin(angle);
    var item = {x: "", y: ""};
    item.x = item.x + xAngle * howFar;
    item.y = item.y + yAngle * howFar;
    return item;
}

function multiplyMatrixAndVectorH(matrix, horizontalVector) {
    var column = horizontalVector;
    var newMatrix = [];
    var row = [];
    var sum = 0;
    for (var j = 0; j < matrix.length; j++) {
        row = getRowH(matrix, j);
        sum = multiplyArraysH(row, column);
        newMatrix[j] = sum;
    }
    return newMatrix;
}

function multiplyVectorAndMatrixH(horizontalVector, matrix) {
    var row = horizontalVector;
    var newMatrix = [];
    var column = [];
    var sum = 0;
    for (var j = 0; j < matrix[0].length; j++) {
        column = getColumnH(matrix, j);
        sum = multiplyArraysH(row, column);
        newMatrix[j] = sum;
    }
    return newMatrix;
}

function multiplyMatricesH(matrix1, matrix2) {
    var sum = 0;
    var row = [];
    var col = [];
    var newMatrix = [];

    for (var i = 0; i < matrix1.length; i++) {
        newMatrix[i] = [];
        row = getRowH(matrix1, i);
        for (var j = 0; j < matrix2[0].length; j++) {
            col = getColumnH(matrix2, j);
            sum = multiplyArraysH(isArrayH(row), isArrayH(col));
            newMatrix[i][j] = sum;
        }
    }
    return newMatrix;
}

function getRowH(matrix, whichRow) {
    //  isArrayH(matrix[0])
    var row = isArrayH(matrix[0]); //if matrix is vector then array is the row
    if (row.length > 1) {
        row = matrix[whichRow];
    }
    return row;
}

function getColumnH(matrix, whichColumn) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(matrix[i][whichColumn]);
    }
    return column;
}

function multiplyArraysH(arr1, arr2) {
    var multiplicationSum = 0;
    for (var i = 0; i < arr1.length; i++) {
        multiplicationSum += (arr1[i] * arr2[i]);
    }
    return multiplicationSum;
}

/*RGB*/
function isRGBH(color) {
    var counter = 0;
    if (color !== "") {
        var rgbNums = color.split(",");
        if (rgbNums.length === 3) {
            for (var i = 0; i < rgbNums.length; i++) {
                if (!isNaN(rgbNums[i]) || rgbNums[i] === "0" || rgbNums[i] === 0) {
                    counter++;
                }
            }
        }
    }
    return counter === 3;
}

function rgbToNumberH(rgbIn) {
    var clean = rgbIn.substring(4, rgbIn.length - 1);
    var split = clean.split(",");
    return split;
}

function numberToRGBH(numIn) {
    var rgb = "rgb(" + numIn.substring(0, 2) + "," + numIn.substring(3, 5) + "," + numIn.substring(6, 8) + ")";
    return rgb;
}

function calculateRGBdifferenceH(color1, color2) {
    var colorA = rgbToNumber(color1);
    var colorB = rgbToNumber(color2);

    var diffR = parseInt(colorA[0]) - parseInt(colorB[0]);
    var diffG = parseInt(colorA[1]) - parseInt(colorB[1]);
    var diffB = parseInt(colorA[2]) - parseInt(colorB[2]);

    var euclideanDistance = Math.sqrt((diffR * diffR) + (diffG * diffG) + (diffB * diffB));
    return euclideanDistance;
}

function addColorH(color, r, g, b) {
    var clean = color.substring(4, color.length - 1);
    var split = clean.split(",");

    split[0] = parseInt(split[0]) + parseInt(r);
    split[1] = parseInt(split[1]) + parseInt(g);
    split[2] = parseInt(split[2]) + parseInt(b);

    if (split[0] < 0 || split[0] > 255) {
        split[0] = 0;
    }
    if (split[1] < 0 || split[1] > 255) {
        split[1] = 0;
    }
    if (split[2] < 0 || split[2] > 255) {
        split[2] = 0;
    }

    var rgb = "rgb(" + split[0] + "," + split[1] + "," + split[2] + ")";
    return rgb;
}

function addColorAlphaH(color, r, g, b, alpha) {
    var clean = color.substring(5, color.length - 1);
    var split = clean.split(",");

    split[0] = parseInt(split[0]) + parseInt(r);
    split[1] = parseInt(split[1]) + parseInt(g);
    split[2] = parseInt(split[2]) + parseInt(b);
    split[3] = parseInt(split[3]) + parseInt(alpha);

    if (split[0] < 0 || split[0] > 255) {
        split[0] = 0;
    }
    if (split[1] < 0 || split[1] > 255) {
        split[1] = 0;
    }
    if (split[2] < 0 || split[2] > 255) {
        split[2] = 0;
    }
    if (split[3] < 0 || split[2] > 1) {
        split[3] = 1;
    }

    var rgba = "rgba(" + split[0] + "," + split[1] + "," + split[2] + "," + split[3] + ")";
    return rgba;
}

function rgbBrightnessH(color) {
    //max =170, min=0, grey =66,  lgrey 100, brightgrey 133
    var parts = color.replace("rgb(", "");
    parts = parts.replace(")");
    parts = parts.split(",");
    var r = parseInt(parts[0]);
    var g = parseInt(parts[1]);
    var b = parseInt(parts[2]);
    return brightness(r, g, b);
}

function brightness(r, g, b) {
    var mR = (0.299 * r) * (0.299 * r);
    var mG = (0.587 * g) * (0.587 * g);
    var mB = (0.114 * b) * (0.114 * b);
    return Math.sqrt(mR + mG + mB);
}

/*SCRIPTS*/
function yahooTrackerCleaner() {
    setTimeout(testBadScripts, 1500);
    //testBadScripts();
}

function testBadScripts() {
    if (badScriptsExist()) {
        cleanScripts();
    }
}

function cleanScripts() {
    //yahoo launches self installing script interval, in that case clear all intervals
    for (var i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }
    var scriptList = document.getElementsByTagName("script");
    for (var i = 0; i < scriptList.length; i++) {
        var removedsrc = scriptList[i].src;
        var removed = scriptList[i].innerHTML;
        if (removed.substring(0, 13) !== "//ubabyscript") {
            scriptList[i].innerHTML = "//Removed: " + removedsrc + " \n" + "/\*\"" + removed + "\"*\/";
            scriptList[i].src = "";
        }
        else {
            if (removedsrc !== "")
            {
                scriptList[i].src = removedsrc;
            }
            scriptList[i].innerHTML = "//ubabyscript was not removed, reloaded instead" + "\n" + removed;
        }
    }
}

function badScriptsExist() {
    var scriptList = document.getElementsByTagName("script");

    for (var i = 0; i < scriptList.length; i++) {
        var removed = scriptList[i].innerHTML;
        if (removed.substring(0, 13) !== "//ubabyscript") {
            return true;
        }
    }
}

var help = {
    check: {
        once: (function (txt) {
            check(txt);
        }),
        nice: (function (txt) {
            checkNice(txt);
        }),
        all: (function (txt) {
            checkAll(txt);
        }),
        nearMouse: (function (txt) {
            checkNearMouse(txt);
        }),
        object: (function (txt) {
            checkObject(txt);
        })
    },
    random: {
        string: (function (a) {
            return ranStrH(a);
        }),
        int: (function (a, b) {
            return ranIntH(a, b);
        }),
        bool: (function () {
            return ranBoolH();
        }),
        rgb: (function (a, b) {
            return ranRGBH(a, b);
        }),
        rgba: (function (a, b, c) {
            return ranRGBAH(a, to, c);
        }),
        hex: (function (a) {
            return ranHexMapH(a);
        })
    },
    number: {
        normalize: (function (a, b, c, d, e) {
            return normalizeH(a, b, c, d, e);
        }),
        percentage: (function (a, b) {
            return getPercentageH(a, b);
        }),
        smooth: (function (a, b) {
            return smoothNumberH(a, b);
        }),
        chop: (function (num, much) {
            return chopNumberH(num, much);
        }),
        even: (function (num) {
            return evenH(num);
        }),
        radianToDegree: (function (a) {
            return radianToDegreeH(a);
        }),
        angle: (function (a, b, c, d) {
            return getAngleH(a, b, c, d);
        }),
        distance: (function (a, b, c, d) {
            return getDistanceH(a, b, c, d);
        }),
        matrixAndVector: (function (a, b) {
            return multiplyMatrixAndVectorH(a, b);
        }),
        vectorAndMatrix: (function (a, b) {
            return multiplyVectorAndMatrixH(a, b);
        }),
        vectorAndVector: (function (a, b) {
            return multiplyArraysH(a, b);
        })
    },
    string: {
        exists: (function (a, b) {
            return strExistsH(a, b);
        }),
        capsFirst: (function (a) {
            return capitalizeFirstH(a);
        }),
        cleanEmpty: (function (a) {
            return cleanEmptyH(a);
        }),
        countSymbols: (function (a, b) {
            return symbolCountH(a, b);
        }),
        splitNoReplace: (function (a, b, c) {
            return splitNoReplaceH(a, b, c);
        }),
        forInner: (function (a) {
            return forInnerH(a);
        }),
        between: (function (a, b, c) {
            return stringsInBetweenH(a, b, c);
        }),
        bracketsOk: (function (a, b, c) {
            return bracketsOkH(a, b, c);
        }),
        replaceChar: (function (a, b, c) {
            return replaceCharH(a, b, c);
        }),
        quoted: (function (a, b) {
            return insideQuotesH(a, b);
        }),
        similar: (function (a, b) {
            return similarH(a, b);
        }),
        replaceRegex: (function (a, b, c) {
            return replaceRegexH(a, b, c);
        }),
        replaceSymbols: (function (a, b, c) {
            return replaceSymbolsH(a, b, c);
        }),
        noSymbols: (function (a) {
            return noSymbolsH(a);
        })
    },
    element: {
        div: (function (a, b) {
            divH(a, b);
        }),
        tag: (function (a, b, c) {
            createTagH(a, b, c);
        }),
        append: (function (a, b) {
            appendH(a, b);
        }),
        element: (function (a) {
            return getElementH(a);
        }),
        exist: (function (a) {
            divExistH(a);
        }),
        class: (function (a, b) {
            classH(a, b);
        }),
        style: (function (a, b, c) {
            styleH(a, b, c);
        }),
        remove: (function (a) {
            removeFromParentH(a);
        }),
        before: (function (a, b) {
            insertBeforeH(a, b);
        }),
        text: (function (a, b) {
            divTextH(a, b);
        }),
        inner: (function (a, b) {
            divInnerH(a, b);
        }),
        position: (function (a, x, y) {
            positionDivH(a, x, y);
        }),
        rotate: (function (a, b) {
            rotateDivH(a, b);
        }),
        toInput: (function (a, b) {
            toInputH(a, b);
        }),
        fromInput: (function (a) {
            return fromInputH(a);
        }),
        input: (function (a, b, c) {
            inputH(a, b, c);
        }),
        anywhere: (function (a, b, c) {
            anywhereH(a, b, c);
        }),
        onEnter: (function (a) {
            onEnterH(a);
        }),
        onEscape: (function (a) {
            onEscapeH(a);
        }),
        break: (function (a) {
            breakH(a);
        }),
        closeable: (function (a) {
            closeH(a);
        }),
        closeButton: (function (a, b) {
            closeButtonH(a, b);
        }),
        click: (function (a, b, c) {
            clickH(a, b, c);
        }),
        button: (function (a, b) {
            buttonH(a, b);
        }),
        link: (function (a, b, c) {
            linkH(a, b, c);
        }),
        removable: (function (a, b) {
            removableContainerH(a, b);
        }),
        correctMouse: (function (a) {
            correctMouseContainerH(a);
        }),
        iframe: (function (a, b, c) {
            iframeH(a, b, c);
        }),
        styleSheet: (function (a) {
            styleSheetH(a);
        }),
        styleSheetChange: (function (a, b) {
            changeStyleH(a, b);
        }),
        fadeBehind: (function (a) {
            fadeBehindH(a);
        }),
        removeFade: (function () {
            removeFadeH();
        }),
        growingInput: (function (a, b) {
            growingInputsH(a, b);
        }),
        getGrowingInput: (function (a) {
            return getGrowingInputsH(a);
        }),
        elementScreen: (function (a, b, c) {
            elementAndScreenH(a, b, c);
        }),
        breakText: (function (a, b, c) {
            breakTextH(a, b, c);
        }),
        select: (function (a, b, c, d, e) {
            createSelectH(a, b, c, d, e);
        })
    },
    time: {
        ms: (function () {
            return millisecondsH();
        }),
        left: (function (f) {
            return timeLeftH(f);
        }),
        leftFromToday: (function (d) {
            return timeLeftInfoH(d);
        }),
        leftFromMs: (function (a) {
            return  timeFromMsH(a);
        }),
        passed: (function (start, dur) {
            return timePassedH(start, dur);
        }),
        validCustomDate: (function (d) {
            return validCustomDateH(d);
        }),
        dateObject: (function (a) {
            return msToDateH(a);
        }),
        customDateToMs: (function (d) {
            return customDateToMsH(d);
        })
    },
    canvas: {
        layer: (function (a) {
            canvasH(a);
        }),
        size: (function (a, b, c) {
            canvasSizeH(a, b, c);
        }),
        position: (function (a, b, c, d) {
            canvasPositionH(a, b, c, d);
        }),
        getAll: (function () {
            return getCanvasObjectsH();
        }),
        line: (function (a, b, c, d, e, f) {
            drawCanvasLineH(a, b, c, d, e, f);
        }),
        text: (function (a, b, c, d, e, f, g) {
            drawTextH(a, b, c, d, e, f, g);
        }),
        circle: (function (a, b, c, d, e, f, g, h, i, j) {
            drawCanvasCircleH(a, b, c, d, e, f, g, h, i, j);
        }),
        rectangle: (function (a, b, c, d, e, f, g, h) {
            drawCanvasRectangleH(a, b, c, d, e, f, g, h);
        }),
        triangle: (function (a, b, c, d, e, f, g, h, i) {
            triangleH(a, b, c, d, e, f, g, h, i);
        })
    },
    object: {
        center: (function (a) {
            rectangleCenterH(a);
        }),
        rotateAround: (function (a, b, c, d) {
            rotateAroundH(a, b, c, d);
        }),
        moveStraight: (function (a, b, c) {
            moveInLineH(a, b, c);
        }),
        rotateImage: (function (a, b, c, d, e) {
            rotateImageH(a, b, c, d, e);
        }),
        distance: (function (a, b) {
            return distanceH(a, b);
        }),
        angle: (function (a, b) {
            return angleH(a, b);
        }),
        collisionC: (function (a, b) {
            return circleCollisionH(a, b);
        }),
        collisionB: (function (a, b) {
            return boxColissionH(a, b);
        })
    },
    array: {
        fill: (function (a, b) {
            return fillArrayH(a, b);
        }),
        find: (function (a, b) {
            return findH(a, b);
        }),
        copy: (function (a) {
            return copyArrayH(a);
        }),
        isArray: (function (a) {
            return  isArrayH(a);
        }),
        range: (function (a, b, c) {
            return copyRangeH(a, b, c);
        }),
        discretize: (function (a, b) {
            return  discretizeH(a, b);
        }),
        uniques: (function (a) {
            return uniquesH(a);
        }),
        arrToMap: (function (a, b) {
            return arrayToMapH(a, b);
        }),
        sort: {
            objectKey: (function (a, b) {
                return sortByObjectH(a, b);
            }),
            ascending: (function (a) {
                return sortAscendingH(a);
            }),
            descending: (function (a) {
                return sortDescendingH(a);
            })
        }
    },
    rgb: {
        isRgb: (function (a) {
            return isRGBH(a);
        }),
        difference: (function (a, b) {
            return calculateRGBdifferenceH(a, b);
        }),
        brightness: (function (a) {
            return rgbBrightnessH(a);
        }),
        addRgb: (function (a, b, c, d) {
            return addColorH(a, b, c, d);
        }),
        addRgba: (function (a, b, c, d, e) {
            return addColorAlphaH(a, b, c, d, e);
        })
    }
};

var H = {
    check: {
        once: (function (txt) {
            check(txt);
        }),
        nice: (function (txt) {
            checkNice(txt);
        }),
        all: (function (txt) {
            checkAll(txt);
        }),
        nearMouse: (function (txt) {
            checkNearMouse(txt);
        }),
        object: (function (txt) {
            checkObject(txt);
        })
    },
    ran: {
        str: (function (a) {
            return ranStrH(a);
        }),
        int: (function (a, b) {
            return ranIntH(a, b);
        }),
        bool: (function () {
            return ranBoolH();
        }),
        rgb: (function (a, b) {
            return ranRGBH(a, b);
        }),
        rgba: (function (a, b, c) {
            return ranRGBAH(a, b, c);
        }),
        hex: (function (a) {
            return ranHexMapH(a);
        })
    },
    num: {
        norm: (function (a, b, c, d, e) {
            return normalizeH(a, b, c, d, e);
        }),
        pct: (function (a, b) {
            return getPercentageH(a, b);
        }),
        smooth: (function (a, b) {
            return smoothNumberH(a, b);
        }),
        chop: (function (num, much) {
            return chopNumberH(num, much);
        }),
        even: (function (num) {
            return evenH(num);
        }),
        radToDeg: (function (a) {
            return radianToDegreeH(a);
        }),
        ang: (function (a, b, c, d) {
            return getAngleH(a, b, c, d);
        }),
        dist: (function (a, b, c, d) {
            return getDistanceH(a, b, c, d);
        }),
        matrixAndVector: (function (a, b) {
            return multiplyMatrixAndVectorH(a, b);
        }),
        vectorAndMatrix: (function (a, b) {
            return multiplyVectorAndMatrixH(a, b);
        }),
        vectorAndVector: (function (a, b) {
            return multiplyArraysH(a, b);
        })
    },
    str: {
        is: (function (a, b) {
            return strExistsH(a, b);
        }),
        capsFirst: (function (a) {
            return capitalizeFirstH(a);
        }),
        noEmpty: (function (a) {
            return cleanEmptyH(a);
        }),
        countSym: (function (a, b) {
            return symbolCountH(a, b);
        }),
        splitNoRepl: (function (a, b, c) {
            return splitNoReplaceH(a, b, c);
        }),
        toInner: (function (a) {
            return forInnerH(a);
        }),
        uniques: (function (a) {
            return uniquesH(a);
        }),
        between: (function (a, b, c) {
            return stringsInBetweenH(a, b, c);
        }),
        bracketsOk: (function (a, b, c) {
            return bracketsOkH(a, b, c);
        }),
        replaceChar: (function (a, b, c) {
            return replaceCharH(a, b, c);
        }),
        quoted: (function (a, b) {
            return insideQuotesH(a, b);
        }),
        similar: (function (a, b) {
            return similarH(a, b);
        }),
        replRgx: (function (a, b, c) {
            return replaceRegexH(a, b, c);
        }),
        replSym: (function (a, b, c) {
            return replaceSymbolsH(a, b, c);
        }),
        noSym: (function (a) {
            return noSymbolsH(a);
        })
    },
    el: {
        div: (function (a, b) {
            divH(a, b);
        }),
        tag: (function (a, b, c) {
            createTagH(a, b, c);
        }),
        add: (function (a, b) {
            appendH(a, b);
        }),
        get: (function (a) {
            return getElementH(a);
        }),
        is: (function (a) {
            return divExistH(a);
        }),
        cls: (function (a, b) {
            classH(a, b);
        }),
        st: (function (a, b, c) {
            styleH(a, b, c);
        }),
        rem: (function (a) {
            removeFromParentH(a);
        }),
        before: (function (a, b) {
            insertBeforeH(a, b);
        }),
        txt: (function (a, b) {
            divTextH(a, b);
        }),
        inn: (function (a, b) {
            divInnerH(a, b);
        }),
        pos: (function (a, x, y) {
            positionDivH(a, x, y);
        }),
        rot: (function (a, b) {
            rotateDivH(a, b);
        }),
        to: (function (a, b) {
            toInputH(a, b);
        }),
        from: (function (a) {
            return fromInputH(a);
        }),
        inp: (function (a, b, c) {
            inputH(a, b, c);
        }),
        anywhere: (function (a, b, c) {
            anywhereH(a, b, c);
        }),
        onEnt: (function (a) {
            onEnterH(a);
        }),
        onEsc: (function (a) {
            onEscapeH(a);
        }),
        break: (function (a) {
            breakH(a);
        }),
        closeable: (function (a) {
            closeH(a);
        }),
        closeButton: (function (a, b) {
            closeButtonH(a, b);
        }),
        click: (function (a, b, c) {
            clickH(a, b, c);
        }),
        but: (function (a, b) {
            buttonH(a, b);
        }),
        link: (function (a, b, c) {
            linkH(a, b, c);
        }),
        removable: (function (a, b) {
            removableContainerH(a, b);
        }),
        correctMouse: (function (a) {
            correctMouseContainerH(a);
        }),
        iframe: (function (a, b, c) {
            iframeH(a, b, c);
        }),
        styleSheet: (function (a) {
            styleSheetH(a);
        }),
        styleSheetChange: (function (a, b) {
            changeStyleH(a, b);
        }),
        fadeBehind: (function (a) {
            fadeBehindH(a);
        }),
        removeFade: (function () {
            removeFadeH();
        }),
        growingInput: (function (a, b) {
            growingInputsH(a, b);
        }),
        getGrowingInput: (function (a) {
            return getGrowingInputsH(a);
        }),
        elScr: (function (a, b, c) {
            elementAndScreenH(a, b, c);
        }),
        breakTxt: (function (a, b, c) {
            breakTextH(a, b, c);
        }),
        sel: (function (a, b, c, d, e) {
            createSelectH(a, b, c, d, e);
        })
    },
    t: {
        ms: (function () {
            return millisecondsH();
        }),
        left: (function (f) {
            return timeLeftH(f);
        }),
        fromToday: (function (d) {
            return timeLeftInfoH(d);
        }),
        fromMs: (function (a) {
            return  timeFromMsH(a);
        }),
        pass: (function (start, dur) {
            return timePassedH(start, dur);
        }),
        valid: (function (d) {
            return validCustomDateH(d);
        }),
        dateObj: (function (a) {
            return msToDateH(a);
        }),
        dateToMs: (function (d) {
            return customDateToMsH(d);
        })
    },
    cnv: {
        layer: (function (a) {
            canvasH(a);
        }),
        size: (function (a, b, c) {
            canvasSizeH(a, b, c);
        }),
        pos: (function (a, b, c, d) {
            canvasPositionH(a, b, c, d);
        }),
        all: (function () {
            return getCanvasObjectsH();
        }),
        ln: (function (a, b, c, d, e, f) {
            drawCanvasLineH(a, b, c, d, e, f);
        }),
        txt: (function (a, b, c, d, e, f, g) {
            drawTextH(a, b, c, d, e, f, g);
        }),
        cir: (function (a, b, c, d, e, f, g, h, i, j) {
            drawCanvasCircleH(a, b, c, d, e, f, g, h, i, j);
        }),
        rec: (function (a, b, c, d, e, f, g, h) {
            drawCanvasRectangleH(a, b, c, d, e, f, g, h);
        }),
        tri: (function (a, b, c, d, e, f, g, h, i) {
            triangleH(a, b, c, d, e, f, g, h, i);
        })
    },
    obj: {
        center: (function (a) {
            rectangleCenterH(a);
        }),
        rot: (function (a, b, c, d) {
            rotateAroundH(a, b, c, d);
        }),
        mov: (function (a, b, c) {
            moveInLineH(a, b, c);
        }),
        rotImg: (function (a, b, c, d, e) {
            rotateImageH(a, b, c, d, e);
        }),
        dist: (function (a, b) {
            return distanceH(a, b);
        }),
        ang: (function (a, b) {
            return angleH(a, b);
        }),
        colC: (function (a, b) {
            return circleCollisionH(a, b);
        }),
        colB: (function (a, b) {
            return boxColissionH(a, b);
        })
    },
    arr: {
        arrToMap: (function (a, b) {
            return arrayToMapH(a, b);
        }),
        fill: (function (a, b) {
            return fillArrayH(a, b);
        }),
        find: (function (a, b) {
            return findH(a, b);
        }),
        copy: (function (a) {
            return copyArrayH(a);
        }),
        is: (function (a) {
            return  isArrayH(a);
        }),
        range: (function (a, b, c) {
            return copyRangeH(a, b, c);
        }),
        discretize: (function (a, b) {
            return  discretizeH(a, b);
        }),
        uniq: (function (a) {
            return uniquesH(a);
        }),
        sort: {
            objKey: (function (a, b) {
                return sortByObjectH(a, b);
            }),
            asc: (function (a) {
                return sortAscendingH(a);
            }),
            desc: (function (a) {
                return sortAscendingH(a);
            })
        }
    },
    rgb: {
        is: (function (a) {
            isRGBH(a);
        }),
        diff: (function (a, b) {
            calculateRGBdifferenceH(a, b);
        }),
        bright: (function (a) {
            return rgbBrightnessH(a);
        }),
        addR: (function (a, b, c, d) {
            addColorH(a, b, c, d);
        }),
        addA: (function (a, b, c, d, e) {
            addColorAlphaH(a, b, c, d, e);
        })
    }
};