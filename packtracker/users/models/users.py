""" Users model """

# Django
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

	email = models.EmailField(
		'email address',
		unique=True,
		error_messages={'unique': 'This email address is already in use'}
	)

	is_client = models.BooleanField(
		'client',
		default=False,
		help_text='client is the main type of users.'
	)

	is_admin = models.BooleanField(
		'admin',
		default=False,
		help_text='user with high privileges.'	
	)

	catalogue = models.ForeignKey(
		'catalogues.ClientCatalogue', 
		on_delete=models.SET_NULL, 
		null=True,
		related_name='clients')

	USERNAME_FIELD = 'username'
	REQUIRED_FIELDS = ['email', 'first_name', 'last_name']
	
	def __str__(self):
		return self.username