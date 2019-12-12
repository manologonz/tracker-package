""" Package Model Serializer """

# Django REST Framework
from rest_framework import serializers

# Models
from packages.models import Package

# States
from packages.models import states as package_states

class PackageModelSerializer(serializers.ModelSerializer):
	""" Package model serializer """
	state = serializers.ReadOnlyField()
	package_client = serializers.ReadOnlyField(source='package_client.username')
	class Meta:
		model = Package
		fields = ['id', 'name', 'package_client', 'state', 'transit_place']

class SetPlaceSerializer(serializers.Serializer):
	""" Update package transit place """
	place = serializers.CharField()

	def validate(self, data):
		package = self.context['package']
		if package.state != package_states.TRANSIT:
			raise serializers.ValidationError('The package in not in transit.')
		return data

	def create(self, data):
		package = self.context['package']
		package.transit_place = data['place']
		package.save()
		return package