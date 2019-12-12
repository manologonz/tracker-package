""" Client Catalogue serializers """

# Django REST Framework
from rest_framework import serializers

# Models
from catalogues.models import ClientCatalogue

# Serializers
from users.serializers import UserModelSerializer


class ClientCatalogueModelSerializer(serializers.ModelSerializer):
	""" Client Catalogue model serializer """
	clients = UserModelSerializer(many=True,read_only=True)
	catalogue_owner = serializers.ReadOnlyField(source='catalogue_owner.username')
	class Meta:
		model = ClientCatalogue
		fields = ('name', 'slug_name', 'catalogue_owner', 'clients')
