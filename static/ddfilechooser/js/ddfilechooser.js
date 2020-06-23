$(function($) {

    // The trickiest part of this small code is feature detection.
    // Modernizr  regards File drag and drop as undetectable,
    // https://github.com/Modernizr/Modernizr/wiki/Undetectables
    // So we have no chance detecting an ad-hoc backwards 
    // implementation of input[file] for D&D.
    // The following three methods are a loose collation that should at 
    // least avoid crashes. But they may allow the drop interface to 
    // build when it will not function.
    var canDDTransfer = function() {
        // Test HTML5 dragDrop API is present.
        // Tests by looking for a set of properties. Test taken from
        // Modernizr
        var div = document.createElement('div');
        return (
                ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)
            ) 
        };

    var dataTransferHasFilesProperty = function() {
        // Test a DataTransfer object has a 'files' property
        // Not all implementations include a files property e.g. 
        // IE 9--11
        // Should be run after checkinf for dragdroppable API, to ensure
        // a DataTransfer can be built.
        var dt = new DataTransfer()
        return ('files' in dt);
    };
    
    var fileInputIsWritable = function() {
        // The usual test is for window.FileReader, but that will not 
        // work for us. We need to know if the 'files' property exists
        // on an input[file] (yes, window.FileReader assures it exists, 
        // but may fail when the property is available). Also if the 
        // property is writable (no, window.FileReader tells us nothing).
        // Also JQuery.prop() returns the element, so is uninformative.        
        var e = document.createElement('input');
        e.type = 'file'
        if ('files' in e) {
            // Write it's own contents back. Not disruptive, and
            // no construction. Hopefully, not optimized away.
            var x = e.files
            try {
                e.files = x
                e.remove()
                return true;
            } catch (error) {}
        }
        e.remove()
        return false;
    };


    var filedropPairs = function() {
        var ds = $('.filedrop');
        pairs = []
        ds.each(function(idx, drop) {
            fi = $(drop).next('input[type="file"]')
            fi.css( "background-color", "red" )
            if (fi) {
                pairs.push([drop, fi]) }
        }); 
        return pairs
    };        
    
    'use strict';
    
    // auto-runs if capable
    if (canDDTransfer && dataTransferHasFilesProperty && fileInputIsWritable) {
        // collect [drop_area, HTMLinput] pairs
        pairs = filedropPairs();
        for (let i = 0; i < pairs.length; i++) {
            var pair = pairs[i]
            var dd = $(pair[0])
            var fi = pair[1]            
            dd.addClass("enabled");
            
            // now set up D&D
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
                console.log('files transfer');
                console.log(files);
                if (files.length > 0) {
                    // weird, no?
                    fi.prop('drop' + files.length);
                    fi.prop('files', files);
                }
            });
        };
    };
});

