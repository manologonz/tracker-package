""" Packages view permissions """

# Django REST Framework
from rest_framework.permissions import BasePermission

# States
from packages.models import states as package_states

class IsClientUser(BasePermission):

	def has_permission(self, request, view):
		return request.user.is_client

class IsAdminOrOwner(BasePermission):

	def has_object_permission(self, request, view, obj):
		return (request.user == obj.package_client or request.user.is_admin)


class IsAdminUser(BasePermission):

	def has_object_permission(self, request, view, obj):
		return request.user.is_admin

class IsInTransit(BasePermission):

	def has_object_permission(self, request, view, obj):
		return obj.state != package_states.TRANSIT