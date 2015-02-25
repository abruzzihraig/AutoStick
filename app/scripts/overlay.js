window._kakku = window._kakku || {};

// ================= set location/destination of resources
// window._kakku.assets = "http://jp-kiss-dev.s3-website-ap-northeast-1.amazonaws.com/default/assets/";
window_kakku.assets = "img/shopping-bag"
window._kakku.destination = "http://www.softbankhawks.co.jp/index.php";
// window._kakku.image = "Hawk_8bit";
window._kakku.image = "/bag";

window._kakku.overlayJS = "kakkuoverlayv2.js";
window._kakku.overlayCSS = "kakkuoverlayv2.css";
window._kakku.overlayInnerJS = "kakkuoverlayinnerv1.js";
window._kakku.overlayInnerCSS = "kakkuoverlayinnerv2.css";
window._kakku.template = "<div id=\"_KA_closer\"></div><div class=\"_KA_cirle\"></div><div id=\"character-container\"><a href=\"#\"  id=\"_KA_link\"><div><!-- --></div></a></div><a href=\"http://test1.kakkuteam.co/stadiumapp/exit.html\" class=\"_KA_link1\" target=\"_blank\"><span></span> Map</a><a href=\"http://test1.kakkuteam.co/stadiumapp/nearby.html\" class=\"_KA_link2\" target=\"_blank\"><span></span> Shops</a><a href=\"http://test1.kakkuteam.co/stadiumapp/\" class=\"_KA_link3\" target=\"_blank\"><span></span> Home</a>";

// target=\"_blank\" "+window._kakku.destination+" <div id=\"closer\"><a href=\"#\">X</a></div><div


(function(namespace, undefined) {
    "use strict";

    // The Global
    var ka = namespace._kakku = namespace._kakku || {};

    // Load the html
    ka.load = function() {
        var head = document.getElementsByTagName('head')[0];
        var body = document.getElementsByTagName('body')[0];
        if (body == null) {
            window.setTimeout(ka.load, 25);
            return;
        }

        // Create iframe and attach stylesheet
        if (window == window.top && !document.getElementById('_KA_frame')) {
            // Inject CSS to oringinal page
            var c = document.createElement('link');
            c.type = "text/css";
            c.rel = "stylesheet";
            c.href = ka.assets + ka.overlayCSS;
            head.appendChild(c);

            // Inject JS to oringinal page
            var j = document.createElement('script');
            j.type = "text/javascript";
            j.src = ka.assets + ka.overlayJS;
            head.appendChild(j);

            // Create iframe and append to body
            var iframe = document.createElement('iframe');

            iframe.setAttribute("style", "display:block!important;" + "position:fixed!important;" + "right:0px!important;" + "bottom:0px!important;" + "width:100px;" + "height:213px;" + "border:0!important;" + "overflow:hidden!important;" + "background-color:transparent;");
            iframe.setAttribute('frameBorder', '0');
            iframe.setAttribute('border', '0');
            iframe.setAttribute('allowTransparency', 'true');
            iframe.setAttribute('id', '_KA_frame');
            iframe.setAttribute('name', '_KA_frame');
            iframe.setAttribute('scrolling', 'no');
            document.body.appendChild(iframe);

            // Apply content to iframe
            ka.iframe = iframe;
            ka.win = iframe.contentWindow;
            ka.doc = ka.win.document;
            ka.doc.open().write('<!DOCTYPE html>' + '<html><head><title>Kakku Overlay</title><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1,minimal-ui"/><link href="http://fonts.googleapis.com/css?family=Open+Sans:800" rel="stylesheet" type="text/css"></head><body onload="parent.window._kakku.loaded()">' + ka.template + '</body></html>');
            ka.doc.close();
            // Avoid webkit bug which scrolls infinite to the top margin of the iframe
            ka.win.scroll(0, 0);
        } else {
            //
        }
    };

    // Loaded
    ka.loaded = function() {
        // Check
        if (ka.loadingComplete) {
            return;
        }
        ka.loadingComplete = true;

        // Inject script to iframe
        var script = ka.doc.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', ka.assets + ka.overlayInnerJS);
        ka.doc.body.appendChild(script);

        // Inject stylesheet to iframe
        var style = ka.doc.createElement('link');
        style.setAttribute('href', ka.assets + ka.overlayInnerCSS);
        style.setAttribute('type', 'text/css');
        style.setAttribute('rel', 'stylesheet');
        ka.doc.body.appendChild(style);

        // Inject resonspive img styles to iframe head
        var css = '#character-container a div{background-image:url("' + ka.assets + ka.image + '_1x.gif");} @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 144dpi){#character-container a div{background-image:url("' + ka.assets + ka.image + '_2x.gif");}} @media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 216dpi){#character-container a div{background-image:url("' + ka.assets + ka.image + '_3x.gif");}}';
        style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        ka.doc.body.appendChild(style);
    };

    ka.load();

})(window);