""" Package model """

# Django
from django.db import models


class Package(models.Model):
	""" Package model """
	name = models.CharField(max_length=40)

	state = models.CharField(max_length=10)

	transit_place = models.CharField(
		max_length=20, 
		null=True, 
		blank=True
	)

	package_client = models.ForeignKey(
		'users.User',
		related_name='packages',
		on_delete=models.CASCADE
	)

	def __str__(self):
		return self.name