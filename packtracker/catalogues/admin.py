""" Client Cataloge admin site """

# Django
from django.contrib import admin

# Models
from .models import ClientCatalogue


@admin.register(ClientCatalogue)
class ClientCatalogueAdmin(admin.ModelAdmin):
	list_display = ('name', 'slug_name', 'catalogue_owner')