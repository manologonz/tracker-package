""" User views permissions """

# Django REST Framework
from rest_framework import permissions
from rest_framework.permissions import BasePermission


class IsAccountOwner(BasePermission):

	def has_object_permission(self, request, view, obj):
		return request.user == obj

class IsAdminUser(BasePermission):

	def has_permission(self, request, view):
		return request.user.isAdmin