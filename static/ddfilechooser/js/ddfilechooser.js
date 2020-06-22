$(function($) {

function isSafari5() {
    return !!navigator.userAgent.match(' Safari/') && !navigator.userAgent.match(' Chrom') && !!navigator.userAgent.match(' Version/5.');
};

function isFileAPIEnabled () {
    return !!window.FileReader;
};

    function isFileDragAndDropSupported() {
        var isiOS = !!navigator.userAgent.match('iPhone OS') || !!navigator.userAgent.match('iPad');
        return (Modernizr.draganddrop && !isiOS && (isFileAPIEnabled() || isSafari5()));
    };

    'use strict';
    
    var fInput = $('form').find('input[type="file"]');
    var dd = $('.filedrop');

    var filedropPairs = function() {
        var ds = $('.filedrop');
        pairs = []
        ds.each(function(idx, drop) {
        //for (drop in ds) {
            fi = $(drop).next('input[type="file"]')
            fi.css( "background-color", "red" )
            if (fi) {
                pairs.push([drop, fi]) }
        }); 
        //console.log(pairs);
        return pairs
    };    
    // Starting with a detection test.
    // This is not guarenteed. Modern
    // https://github.com/Modernizr/Modernizr/issues/57
    var canDDTransfer = function() {
        var div = document.createElement('div');
        return (
                ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)
            ) 
            // common
            && 'FormData' in window 
            // XMLHttpRequest not on ie9 
            && 'FileReader' in window;
        };

    //canDDTransfer = false;
    // auto-runs if capable
    if (canDDTransfer) {
        // setup drag and drop transfer from an area to the HTML input
        pairs = filedropPairs();
            console.log(pairs);

        for (let i = 0; i < pairs.length; i++) {
            var pair = pairs[i]
            console.log(pair);

            var dd = $(pair[0])
            var fi = pair[1]
            console.log(dd);
            
            dd.addClass("enabled");
            
            dd.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
            })
            .on('dragover dragenter', function() {
                dd.addClass('in_dragover');
            })
            .on('dragleave dragend drop', function() {
                dd.removeClass('in_dragover');
            })
            .on('drop', function(e) {
                var files = e.originalEvent.dataTransfer.files;
                console.log(files);
                fi.prop('drop' + files.length);
                if (files.length > 0) {
                    fi.prop('files', files);
                    //fInput.triggerHandler( 'changed' );
                    fi.trigger( 'changed' );
                }
            });
        };
    };
});

