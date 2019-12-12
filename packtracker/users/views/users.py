""" User model views """

# Django REST Framework
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

# Serializers
from users.serializers import (
	UserModelSerializer,
	UserSignUpSerializer,
	UserLoginSerializer,
)

# Models
from users.models import User

# Permissions
from rest_framework.permissions import AllowAny, IsAuthenticated
from users.permissions import IsAccountOwner, IsAdminUser

class UserViewSet(viewsets.ModelViewSet):
	""" User viewset """

	queryset = User.objects.all()
	serializer_class = UserModelSerializer
	lookup_field = 'username'

	def get_permissions(self):
		if self.action in ['login', 'signup']:
			permissions = [AllowAny]
		elif self.action in ['update','add', 'destroy', 'logout']:
			permissions =[IsAuthenticated, IsAccountOwner]
		elif self.action == 'list': 
			permissions = [IsAuthenticated]
		else:
			permissions = [IsAuthenticated]
		return [permission() for permission in permissions]

	@action(detail=False, methods=['post'])
	def signup(self, request):
		""" User signup """
		serializer = UserSignUpSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		data = UserModelSerializer(user).data
		return Response(data, status=status.HTTP_201_CREATED)

	@action(detail=False, methods=['post'])
	def login(self, request):
		""" User login """
		serializer = UserLoginSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user, token = serializer.save()
		data = {
			'user': UserModelSerializer(user).data,
			'token': token
		}
		return Response(data, status=status.HTTP_201_CREATED)

	@action(detail=False, methods=['post'])
	def logout(self, request, *args, **kwargs):
		""" User Logout """
		user = request.user
		user.auth_token.delete()
		user.save()
		data = {"logout": "user logged out"}
		return Response(data, status=status.HTTP_200_OK)

	def list(self, request, *args, **kwargs):
		""" method for authentication porpuses only.

			return the authenticated user's info
		"""
		user = UserModelSerializer(self.request.user).data
		return Response(user, status=status.HTTP_200_OK)
		