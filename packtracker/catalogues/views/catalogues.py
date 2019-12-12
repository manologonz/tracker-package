""" Client Catalogue views """

# Django REST Framework
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404

# Models
from catalogues.models import ClientCatalogue
from users.models import User

# Serializers
from catalogues.serializers import ClientCatalogueModelSerializer
from users.serializers import UserModelSerializer

# Permissions
from rest_framework.permissions import IsAuthenticated
from catalogues.permissions import IsOwnerOrReadOnly, IsAdminUser


class ClientCatalogueViewSet(viewsets.ModelViewSet):
	""" Client Catalogue viewset """
	queryset = ClientCatalogue.objects.all()
	serializer_class = ClientCatalogueModelSerializer
	
	lookup_field='slug_name'

	def get_permissions(self):
		if self.action == 'create':
			permissions = [IsAuthenticated, IsAdminUser]
		elif self.action == 'list':
			permissions = [IsAuthenticated, IsAdminUser]
		else:
			permissions = [IsAuthenticated, IsOwnerOrReadOnly]
		return [permission() for permission in permissions]

	def perform_create(self, serializer):
		user = self.request.user
		serializer.save(catalogue_owner=user)

	def list(self, request, *args, **kwargs):
		user_catalogues = ClientCatalogue.objects.filter(
			catalogue_owner=self.request.user
		)
		data = ClientCatalogueModelSerializer(
			user_catalogues, 
			many=True
		).data
		return Response(data, status=status.HTTP_200_OK)

	@action(detail=True, methods=['post'])
	def add(self, request, *args, **kwargs):
		catalogue = self.get_object()
		user = get_object_or_404(
			User,
			username=kwargs['username'],
			is_client=True,
			is_admin=False
		)
		user.catalogue=catalogue
		user.save()
		data = {
			"Catalogue": ClientCatalogueModelSerializer(catalogue).data,
		}

		return Response(data, status=status.HTTP_200_OK)