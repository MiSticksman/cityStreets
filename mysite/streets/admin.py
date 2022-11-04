from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Street)
admin.site.register(House)
admin.site.register(Route)
admin.site.register(RouteComponents)
