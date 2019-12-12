""" ClientCatalogue model """

# Django
from django.db import models


class ClientCatalogue(models.Model):
	""" Client Catalogue model """
	catalogue_owner = models.ForeignKey(
		'users.User',
		related_name='catalogue_owner',
		on_delete=models.CASCADE
	)

	slug_name = models.CharField(
		max_length=40,
		unique=True,
		error_messages={
			'unique':"There is a catalogue whith the same 'slug_name'"
		}
	)

	name = models.CharField(max_length=60)

	def __str__(self):
		return self.name