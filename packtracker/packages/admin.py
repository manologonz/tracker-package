""" Packages admin site """

# Django
from django.contrib import admin

# Models
from packages.models import Package

@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
	display_list = ('name', 'state', 'transit_place', 'package_client',)
