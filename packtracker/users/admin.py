""" User admin site """

# Django
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Models
from users.models import User

class CustomUserAdmin(UserAdmin):
	list_display = ('username', 'email', 'first_name', 'last_name', 'is_admin', 'is_client')


admin.site.register(User, CustomUserAdmin)