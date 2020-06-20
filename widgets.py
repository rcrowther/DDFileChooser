from django.forms.widgets import FileInput
from django.forms.widgets import Media
 


class DDFileChooser(FileInput):
    # type name value and attrs printer
    template_name = 'ddfilechooser/widgets/ddfilechooser.html'

    @property
    def media(self):
        return Media(
                js=('ddfilechooser/js/ddfilechooser.js',),
                css={'screen': ('ddfilechooser/css/ddfilechooser.css',),}
            )
