/* Kakku Insertion Overlay JS - Inserted into original page */

window._kakkuoverlay = window._kakkuoverlay || {};
(function(namespace, undefined) {
    "use strict";

    // one more global for the overlay
    var kao = namespace._kakkuoverlay = namespace._kakkuoverlay || {};

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
        document.getElementById('_KA_frame').style.zIndex = kao.maxZ() + 1;
    }

    setZ();

    kao.hasClass = function(e, c) {
        return (' ' + e.className + ' ').indexOf(' ' + c + ' ') > -1;
    }

    kao.clickfunc = function() {
        var iframe = document.getElementById('_KA_frame');
        var e = iframe.contentWindow.document.getElementById('_KA_link');
        e.onclick = function(e) {
            if (kao.hasClass(iframe, 'active')) {
                iframe.className = '';
                iframe.contentWindow.document.getElementsByTagName('body')[0].className = '';
            } else {
                iframe.className += ' active';
                iframe.contentWindow.document.getElementsByTagName('body')[0].className += ' active';
            }
            e.preventDefault();
        };
    }

    kao.clickfunc();

    kao.polling = setInterval(function() {
        setZ();
    }, 3000);

})(window);
