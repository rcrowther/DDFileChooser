from django.forms.widgets import FileInput
from django.forms.widgets import Media
 


class DDFileChooser(FileInput):
    '''
    Adds a drap and drop area to a file input, styled for Django Admin.
    Only works on browsers with relevant APIs, which are usually spec
    HTML5. if detection fails, falls back to a standard FileChooser.
    NB: to make multiple, add {multiple : True} to the attributes
    '''
    # type name value and attrs printer
    template_name = 'ddfilechooser/widgets/ddfilechooser.html'

    @property
    def media(self):
        return Media(
                js=('ddfilechooser/js/ddfilechooser.js',),
                css={'screen': ('ddfilechooser/css/ddfilechooser.css',),}
            )
