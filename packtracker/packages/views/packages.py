""" Package model views """

# From REST Framework
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

# Serializers
from packages.serializers import PackageModelSerializer, SetPlaceSerializer

# Models
from packages.models import Package

# States
from packages.models import states as package_state

# Permissions
from rest_framework.permissions import IsAuthenticated
from packages.permissions import (
	IsClientUser, 
	IsAdminOrOwner, 
	IsAdminUser,
	IsInTransit,
)


class PackageViewSet(viewsets.ModelViewSet):
	""" Package model viewset """

	queryset = Package.objects.all()
	serializer_class = PackageModelSerializer

	def get_permissions(self):
		if self.action in ['list', 'create']:
			permissions = [IsAuthenticated]
		elif self.action in ['transit', 'storage', 'delivered']:
			permissions = [IsAuthenticated, IsAdminUser]
		elif self.action == 'place':
			permissions = [IsAuthenticated, IsAdminUser]
		elif self.action == 'destroy':
			permissions = [IsAuthenticated, IsInTransit, IsAdminOrOwner]
		else:
			permissions = [IsAuthenticated, IsClientUser, IsAdminOrOwner]
		return [permission() for permission in permissions]

	def perform_create(self, serializer):
		user = self.request.user
		state = package_state.STORAGE
		serializer.save(package_client=user, state=state, transit_place="not in transit")

	def list(self, request, *args, **kwargs):
		user = request.user
		if user.is_admin:
			all_packages = Package.objects.all()
			transit_packages_count = Package.objects.filter(
				state=package_state.TRANSIT).count()
			delivered_packages_count = Package.objects.filter(
				state=package_state.DELIVERED).count()
			storage_packages_count = Package.objects.filter(
				state=package_state.STORAGE).count()
			data = {
				"in_storage": storage_packages_count,
				"in_transit": transit_packages_count,
				"delivered": delivered_packages_count,
				"packages": PackageModelSerializer(all_packages, many=True).data
			}
		else:
			user_packages = Package.objects.filter(package_client=user)
			data = PackageModelSerializer(user_packages, many=True).data
		return Response(data, status=status.HTTP_200_OK)

	@action(detail=True, methods=['post'])
	def transit(self, request, *args, **kwargs):
		package = self.get_object()
		package.state = package_state.TRANSIT
		package.transit_place = 'Quetzaltenango'
		package.save()
		data = PackageModelSerializer(package).data
		return Response(data, status=status.HTTP_200_OK)

	@action(detail=True, methods=['post'])
	def storage(self, request, *args, **kwargs):
		package = self.get_object()
		package.state = package_state.STORAGE
		package.transit_place = 'No en transito'
		package.save()
		data = PackageModelSerializer(package).data
		return Response(data, status=status.HTTP_200_OK)

	@action(detail=True, methods=['post'])
	def delivered(self, request, *args, **kwargs):
		package = self.get_object()
		package.state = package_state.DELIVERED
		package.transit_place = 'Destino'
		package.save()
		data = PackageModelSerializer(package).data
		return Response(data, status=status.HTTP_200_OK)

	@action(detail=True, methods=['post'])
	def place(self, request, *args, **kwargs):
		package = self.get_object()
		serializer = SetPlaceSerializer(
			data=request.data,
			context={
				'package':package
			}
		)
		serializer.is_valid(raise_exception=True)
		package = serializer.save()
		data = PackageModelSerializer(package).data
		return Response(data, status=status.HTTP_200_OK)



