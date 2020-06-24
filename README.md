# DDFileChooser
DDFilechooser is a Django widget for Drag and Drop handling of file uploading.

It looks like this,

![DDFileChooser Screenshot](/images/ddfilechooser.png)


## Oh, one of those!
Yeah, you know, D&D uploaders, everyone has a go. Some screwy JS thing because it has to be done using AJAX, and scrape the page too. Bunch of complex interactions with some fancy CSS to make it look right. Then fallbacks.

Not this one. 

There always seemed to be a covert whisper that D&D implementation in a browser was some kind of security hazard. I've heard people say things to that effect. But [times are changing](https://www.w3.org/TR/html52/editing.html#drag-and-drop). And there's a possibility in this. That the old gear will catch up with the new. Actually it's true, it has, though not in the Spec, and erratically supported. Try it. Yes, you can. You can drop a file on a file input element, and in many modern browsers, data will be registered.

No AJAX. No JS.

## What you get
A box to extend a file input element to make it clear it is droppable, and extend the drop area. With styling to match Django Admin.

One app, one widget. Pure, eh? Compartmentalized. Couldn't find anywhere else to put it.

## Setup
No dependencies. Drop the code into your site. It's an app so it can use templates. Add to site settings,

    INSTALLED_APPS = [
        # added
        'ddfilechooser.apps.DDFileChooserConfig',
        ....
        }

## Implement
Anywhere you have a file upload form field, replace the widget. In admin do a formfield override,

    from ddfilechooser.widgets import DDFileChooser


    class ImageCoreAdmin(admin.ModelAdmin):
        ...

        formfield_overrides = {
            ImageField: {'widget': DDFileChooser},
        }  

## Notes

### Multiple file upload
The drop area can handle multiple inputs.  But see Known issues

### Detection
The trickiest part of this code is feature detection. [Modernizr](https://modernizr.com)  regards file drag and drop as an [undetectable](https://github.com/Modernizr/Modernizr/wiki/Undetectables). So we have no chance detecting an ad-hoc backwards implementation of input[file] for D&D. When I say ad-hoc, [drag and drop is partially implemented in several browsers](https://caniuse.com/#search=drag%20and%20drop). The detection methods are a loose collation that should at least avoid crashes. They may allow the drop interface to build when it will not function.

Please note that a Safari implementation may be possible, but is not included as it involves non-standard-compliant code I am not equipped to write.

#### Works on...
Firefox 77
Chrome 83

### Known issues
- May build a drop area that is not functional
: I've made the detection very general. The alternative is that, perhaps in the future, some robust code will appear that selects compatible browsers, disregarding capable but older browsers.
- Safari not supported 
: Due to non-standard API
- Drop data does not respect Input[file] attributes 
: So 'multiple' or 'accept' attributes will not affect a drop e.g. multiple files can be dropped to a single file selector. However, on submit, the input will respect the attributes. The reason for no visual fix is that I can't find a reliable FileList constructor/mutation mechanism.

## The end
Done
