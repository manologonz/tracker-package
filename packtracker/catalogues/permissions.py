""" Catalogue permissions """

# Django REST Framework
from rest_framework import permissions
from rest_framework.permissions import BasePermission


class IsOwnerOrReadOnly(BasePermission):

	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True

		return obj.catalogue_owner == request.user


class IsAdminUser(BasePermission):
	def has_permission(sef, request, view):
		return request.user.is_admin
