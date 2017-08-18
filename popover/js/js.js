function showPic(whichPic) {
    if (!document.getElementById("placeholder")) return false;
    //修改图片
    var source = whichPic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
    //修改描述
    if (document.getElementById("description")) {
        var text = whichPic.getAttribute("title") ? whichPic.getAttribute("title") : "";
        var description = document.getElementById("description");
        description.firstChild.nodeValue = text;
    }
    return true;
}

function prepareGallery() {
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById("image-gallery")) return false;
    var gallery = document.getElementById("image-gallery");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            return !showPic(this);
        }
    }
}

function preparePlaceholder() {
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/gamersky5.jpg");
    placeholder.setAttribute("alt", "my image gallery");
    var description = document.createElement("P");
    description.setAttribute("id", "description");
    var desctext = document.createTextNode("Choose An Images");
    description.appendChild(desctext);
    var gallery = document.getElementById("image-gallery");
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);