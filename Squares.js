var maxWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
var maxHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);

window.onload = function() {
    for (var i = 0; i <= 300; i++) {
        addBox();
    }
}


function randColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}


function randPos(max) {
    var numb = Math.round(Math.random() * max);

    if (numb > (max - 50)) {
        numb -= 50;
    }
    return numb;
}


function addBox(x) {

    var box = document.createElement("div");
    box.setAttribute("id", "box");
    box.style.backgroundColor = randColor();
    box.style.left = randPos(maxWidth) + "px";
    box.style.top = randPos(maxHeight) + "px";
    box.style.width = "50px";
    box.style.height = "50px";
    box.style.position = "absolute";
    box.style.zIndex = x;
    addEvent(box, "mousedown", grabDiv, false);
    var body = document.getElementsByTagName("body");
    body[0].appendChild(box);
}

function grabDiv(e) {
    var evt = e || window.event;
    div = evt.target || evt.srcElement;
    var mousex = evt.clientX;
    var mousey = evt.clientY;
    diffx = parseInt(div.style.left) - mousex;
    diffy = parseInt(div.style.top) - mousey;
    addEvent(document, "mousemove", moveDiv, false);
    addEvent(document, "mouseup", dropDiv, false);
}


function moveDiv(e) {
    var evt = e || window.event;
    var mousex = evt.clientX;
    var mousey = evt.clientY;
    div.style.left = mousex + diffx + "px";
    div.style.top = mousey + diffy + "px";
}


function dropDiv(e) {
    removeEvent(document, "mousemove", moveDiv, false);
    removeEvent(document, "mouseup", dropDiv, false);
}


function addEvent(object, evName, fnName, cap) {
    if (object.attachEvent) {
        object.attachEvent("on" + evName, fnName);
    } else {
        object.addEventListener(evName, fnName, cap);
    }
}


function removeEvent(object, evName, fnName, cap) {
    if (object.attachEvent) {
        object.detachEvent("on" + evName, fnName);
    } else {
        object.removeEventListener(evName, fnName, cap);
    }
}


function getStyle(object, styleName) {
    if (window.getComputedStyle) {
        return document.defaultView.getComputedStyle(object, null).getPropertyValue(styleName);
    } else if (object.currentStyle) {
        return object.currentStyle[styleName];
    }
}
