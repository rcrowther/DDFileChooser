# DDFileChooser
DDFilechooser is a Django widget for Drag and Drop handling of file uploading.

One app, one widget. Pure, eh? Compartmentalized.

## Oh, one of those!
Yeah, you know, D&D uploaders, everyone has a go. Some screwy JS thing because it has to be done using AJAX, and scrape the page too. Bunch of complex interactions with some fancy CSS to make it look right. Then fallbacks.

Not this one. 

There always seemed to be a covert whisper that D&D implementation in a browser was some kind of security hazard. I've people say things to that effect. But (times they are changing)[https://www.w3.org/TR/html52/editing.html#drag-and-drop]. And there's a possibility in this. That the old gear will catch up with the new. Actually it's true, it has, though not in the Spec, and erattically supported. Try it. Yes, you can. You can drop a file on a file input element, and in many modern browsers, data will be registered.

No AJAX. No JS.

## What you get
A boc that extends a file input element to make it clear it is droppable. And styling to match Django Admin.

It looks like this,

![DDFileChooser Screenshot](/images/ddfilechooser.png)


filereader
filesystem
transferables
https://www.html5rocks.com/en/tutorials/dnd/basics/

## Setup
No dependecies.

Drop the code into your site. 

It's an app so it can use templates. Add to the site settings,

    INSTALLED_APPS = [
        # added
        'ddfilechooser.apps.DDFileChooserConfig',
        ....
        }

## Usage
Anywhere you have a file upload form field, replace the widget. In admin do a formfield_override,

    from ddfilechooser.widgets import DDFileChooser


    class ImageCoreAdmin(admin.ModelAdmin):
        ...

        formfield_overrides = {
            ImageField: {'widget': DDFileChooser},
        }  

## Detection
The trickiest part of this small code is feature detection. [Modernizr](https://modernizr.com)  regards File drag and drop as an [undetectable](https://github.com/Modernizr/Modernizr/wiki/Undetectables). So we have no chance detecting an ad-hoc backwards implementation. The following methods are a loose collation that should at least avoid crashes. They may often allow the drop interface to build when it will not function.
    
## The end
Done
