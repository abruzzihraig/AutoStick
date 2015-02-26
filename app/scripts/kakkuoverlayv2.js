/* Kakku Insertion Overlay JS - Inserted into original page */

window._kakkuoverlay = window._kakkuoverlay || {};
(function(namespace, undefined) {
    "use strict";

    // one more global for the overlay
    var kao = namespace._kakkuoverlay = namespace._kakkuoverlay || {};
    kao.transparentDelay = window._kakku.transparentDelay;
    kao.destination = window._kakku.destination;

    var iframe = document.getElementById('_KA_frame');
    var body = iframe.contentWindow.document.getElementsByTagName('body')[0];
    var link = iframe.contentWindow.document.getElementById('_KA_link');
    var transparentTimer = null;

    function getStyle(el, cssprop) {
        if (el.currentStyle) //IE
        return el.currentStyle[cssprop]
        else if (document.defaultView && document.defaultView.getComputedStyle) //Firefox
        return document.defaultView.getComputedStyle(el, "")[cssprop]
        else //try and get inline style
        return el.style[cssprop]
    }

    kao.maxZ = function(selector) {
        if (!selector) {
            selector = '*'
        };
        var elements = document.querySelectorAll(selector),
            i = 0,
            e, s,
            max = elements.length,
            found = [];
        for (; i < max; i += 1) {
            e = getStyle(elements[i], 'zIndex'); //.currentStyle.zIndex || window.getComputedStyle(elements[i], null).zIndex;
            s = getStyle(elements[i], 'position'); //.currentStyle.position || window.getComputedStyle(elements[i], null).position;
            // Statically positioned elements are not affected by zIndex
            if (e && s !== 'static' && e !== 'auto' && elements[i].id !== '_KA_frame') {
                found.push(parseInt(e, 10));
            }
        }
        return found.length ? Math.max.apply(null, found) : 0;
    }

    function setZ() {
        iframe.style.zIndex = kao.maxZ() + 1;
    }

    setZ();

    kao.hasClass = (typeof document.documentElement.classList == "undefined") ?
        function(el, clss) {
            return el.className && new RegExp("(^|\\s)" +
                   clss + "(\\s|$)").test(el.className);
        } :
        function(el, clss) {
            return el.classList.contains(clss);
        };

    kao.addListener = function() {
        link.onclick = function(e) {
            clearTimeout(transparentTimer);
            kao.transparent();
            if (kao.hasClass(link, 'transparent')) {
                link.className = '';
            } else if (kao.hasClass(body, 'active')) {
                window.location = kao.destination;
            } else {
                body.className = 'active';
            }
            e.preventDefault();
        };
        link.onmouseenter = function(e) {
            clearTimeout(transparentTimer);
            if (kao.hasClass(link, 'transparent')) {
                link.className = '';
            }
            e.preventDefault();
        };
        link.onmouseleave = function(e) {
            kao.transparent();
        };
    }

    kao.transparent = function() {
        transparentTimer = setTimeout(function() {
            body.className = '';
            link.className = 'transparent';
        }, kao.transparentDelay);
    };

    kao.polling = setInterval(function() {
        setZ();
    }, 3000);

    kao.calInsertionSize = function() {
        var deviceWidth = Math.min(window.screen.width, window.screen.availWidth, window.innerWidth)
        var deviceHeight = Math.min(window.screen.height, window.screen.availHeight, window.innerHeight);
        var pageWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var pageHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var expectImgWidth = 70;
        var expectImgHeight = 165;
        var finalWidth = pageWidth * expectImgWidth / deviceWidth || expectImgWidth;
        var finalHeight = pageHeight * expectImgHeight / deviceHeight || expectImgHeight;

        iframe.style.width = finalWidth + 'px';
        iframe.style.height = finalHeight + 'px';
    }

    kao.transparent();
    kao.addListener();
    kao.calInsertionSize();
})(window);
