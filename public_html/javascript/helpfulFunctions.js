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
//HELPERS
//utility
function arrToNumericArr(a1) {
    var a2 = new Array(a1.length);
    for (var i = 0; i < a1.length; i++) {
        a2[i] = parseFloat(a1[i]);
    }
    return a2;
}

//utility
//http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
function hashString(str, asString, seed) {
    var counter, limit,
            hashValue = (seed === undefined) ? 0x811c9dc5 : seed;

    for (counter = 0, limit = str.length; counter < limit; counter++) {
        hashValue ^= str.charCodeAt(counter);
        hashValue += (hashValue << 1) + (hashValue << 4) + (hashValue << 7) + (hashValue << 8) + (hashValue << 24);
    }
    if (asString) {
        return ("0000000" + (hashValue >>> 0).toString(16)).substr(-8);
    }
    return hashValue >>> 0;
}

//utility
function isGoodNumber(n) {
    return n && isNum(n) && isClean(n);
}

//utility
function isClean(w) {
    w = w.toLowerCase();
    if (w === clean(w)) {
        return true;
    }
    var bad = ["script", "<", ">", "'", "\"", "\\", "/"];
    if (!el.is("checkNearMouse")) {
        error("These symbols are not accepted: " + bad.join(", "));
    }
    return false;
}

//utility
function isNum(n) {
    return !isNaN(n);
}

//utility
//screenspace needed to simulate relative elements based on percentage, but avoid empty gaps
var scrSpc = {h: "", w: "", marginSides: "", borderSides: "", marginBorder: "", top: "", left: "", temporarySwap: ""};
function getScreenSpace() {
    return scrSpc;
}
function initScreenSpace(w, h) {
    scrSpc.w = w;
    scrSpc.h = h;
    scrSpc.top = 0;
    scrSpc.left = 0;
    scrSpc.marginSides = 2 * 3;
    scrSpc.borderSides = 2 * 3;
    scrSpc.marginBorder = scrSpc.marginSides + scrSpc.borderSides;
}

//utility
function updateScreenSpace(w, h) {
    var borderMargin = scrSpc.marginBorder;
    if (w !== 0) {
        scrSpc.w -= (w + borderMargin);
        scrSpc.left += (w + borderMargin);
    }
    if (h !== 0) {
        scrSpc.h -= (h + borderMargin);
        scrSpc.top += (h + borderMargin);
    }
}

//utility
function listenMovingElements() {
    setInterval(function () {
        var id = movableElement;
        if (canMove && id !== "") {
            moveElement(id);
        }
    }, 100);
}

//utility
function getCanvasMouse(cv) {
    var c = cv.canvas.getBoundingClientRect();
    var m = getMouse();
    return {x: m.x - c.left, y: m.y - c.top, w: m.w, h: m.h};
}

//utility
function clean(inp) {
    var dirty = ["script", "<", ">", "'", "\"", "\\", "/"];
    for (var i = 0, max = dirty.length; i < max; i++) {
        var cur = dirty[i];
        inp = str.replSym(inp, cur, "");
    }
    return inp;
}

//utility
function round(num, how) {
    var power = Math.pow(10, how);
    return Math.round(num * power) / power;
}

//utility
function input(id, where, size) {
    var input = document.createElement("textarea");
    input.setAttribute("id", id);
    input.setAttribute("type", "text");
    input.setAttribute("name", id);
    document.getElementById(where).appendChild(input);
    st(id, "resize", "none");
    st(id, "width", "50px");
    st(id, "height", "15px");
    st(id, "float", "left");
    if (size) {
        st(id, "width", size * 3.14 + "px");
        st(id, "height", size + "px");
    }
}

//utility
function multipleChoice(id, where, question, choices) {
    createContainer(id, where, "transparent");
    createText(question + ", select best answer in selection box.", id, "black");
    var m = "multiChoicesContainer";
    var s = "select1";
    createContainer(m, id);
    el.tag(s, "select", m);
    var e = el.get(s);
    e.setAttribute("size", 1);

    for (var i = 0; i < choices.length; i++) {
        createText((i + 1) + ". " + choices[i], id, "black");
    }
    for (var i = 0; i < choices.length; i++) {
        var id2 = s + i;
        createOption(id2, s, (i + 1));
    }
}

//utility
function createOption(id, where, value) {
    el.tag(id, "option", where);
    el.txt(id, value);
    var container = el.get(where);
    var w = container.offsetWidth;
    st(id, "width", w + "px");
}

//utility
function purifyElement(id) {
    st(id, "top", "0px");
    st(id, "left", "0px");
    st(id, "padding", "0px");
    st(id, "margin", "0px");
}

//utility
function createText(txt, where, color, w, margin, h) {
    var id = H.ran.int(1000000, 2000000);
    createContainer(id, where);
    el.txt(id, txt);
    if (color) {
        st(id, "color", color);
    }
    if (w) {
        st(id, "minWidth", w + "px");
    }
    if (margin) {
        st(id, "margin", margin + "px");
    }
    if (h) {
        st(id, "minHeight", h + "px");
    }
}

//utility
function createContainer(id, where, color) {
    if (where) {
        el.div(id, where);
    } else {
        el.div(id);
    }
    el.cls(id, "container border shadow");
    if (color) {
        st(id, "backgroundColor", color);
    } else {
        st(id, "backgroundColor", "white");
    }
    st(id, "margin", "3px");
}

function createLink(name, where, src) {
    H.el.link(name, where, src);
}

//utility
function createButton(id, where, color, doWhat) {
    el.but(id, where);
    el.click(id, "click", doWhat);
    st(id, "backgroundColor", color);
}

//utility
function createMenu(id, where) {
    if (!el.is(id)) {
        createContainer(id, where);
        el.closeable(id);
    } else {
        el.rem(id);
    }
}

//utility
function toCorner(id, left, top, x, y, z) {
    var height = el.get(id).offsetHeight, width = el.get(id).offsetWidth;
    if (x && y) {
        height -= y;
        width -= x;
    }
    st(id, "position", "absolute");
    st(id, "margin", "0px");
    if (z) {
        st(id, "zIndex", z);
    }
    if (left !== undefined || top !== undefined) {
        if (!top) {
            st(id, "top", scr.h - height + "px");
        }
        if (left) {
            st(id, "left", 0 + "px");
        } else {
            st(id, "left", scr.w - width + "px");
        }
    } else {
        st(id, "top", (scr.h - height) / 2 + "px");
        st(id, "left", (scr.w - width) / 2 + "px");
    }
}

//utility
function importantContainer(id, importance) {
    var el = H.el;
    var st = el.st;
    el.div(id);
    el.cls(id, "border shadow");
    st(id, "backgroundColor", "grey");
    st(id, "position", "absolute");
    st(id, "zIndex", "2");
    var w = H.num.pct(scr.w, importance);
    var h = H.num.pct(scr.h, importance);
    st(id, "width", w + "px");
    st(id, "height", h + "px");
}

//utility
function canBeMoved(id) {
    st(id, "zIndex", "0");
    st(id, "top", "110px");
    st(id, "left", "110px");
    st(id, "width", "310px");
    st(id, "height", "3m10px");
    st(id, "position", "absolute");
    cls(id, "resizable border shadow");

    el.click(id, "click", function () {
        movableElement = this.id;
        if (canMove) {
            canMove = false;
            resetLetterKey();
        }
        if (!canMove && getLetterKey() === "m") {
            canMove = true;
            var z = el.get(id).style.zIndex + 1;
            st(id, "zIndex", z);
            if (z > 100) {
                st(id, "zIndex", 0);
            }
            resetLetterKey();
        }
    });
}

//utility
function moveElement(id) {
    var mouse = getMouse();
    var w = el.get(id).offsetWidth;
    var h = el.get(id).offsetHeight;
    var x = mouse.x - w / 2;
    var y = mouse.y - h / 2;
    x = H.num.smooth(x, 3);
    y = H.num.smooth(y, 3);
    st(id, "left", x + "px");
    st(id, "top", y + "px");
}

//utility
function createInput(id, where, title, val) {
    el.inp(id, where, title);
    st("container" + id, "color", "white");
    el.to("input" + id, val);
    st("container" + id, "backgroundColor", "grey");
    st("container" + id, "padding", "3px");
}

function clean(inp) {
    var dirty = ["script", "<", ">", "'", "\"", "\\", "/"];
    for (var i = 0, max = dirty.length; i < max; i++) {
        var cur = dirty[i];
        inp = str.replSym(inp, cur, "");
    }
    return inp;
}

//function getData() {
//    //connect to server and get data or load it from this php page which loads once logged in blablabla
//    //title;story;units;stockConcentration;title,xName,yName,a£b£c,1£2£3;q1£q2£q3;extra
//    var id = "login";
//    var pw = "1234567";
//    if (el.is(id)) {
//        pw = el.from("inputpassword");
//        if (isClean(pw)) {
//            el.rem("login");
//        }
//    }
//    submVal("data", pw);
//}