""" User serializers """

# Django
from django.contrib.auth import authenticate, password_validation

# Django REST Framework
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.models import Token

# Models
from users.models import User

# Permissions
from rest_framework.permissions import AllowAny


class UserModelSerializer(serializers.ModelSerializer):
	""" User model serializer """

	class Meta:
		model = User
		fields = ('username', 'email', 'first_name', 'last_name', 'is_client', 'is_admin')


class UserSignUpSerializer(serializers.Serializer):
	""" User signup serializer """

	username = serializers.CharField(
		min_length=4, 
		max_length=35,
		validators=[UniqueValidator(queryset=User.objects.all())]
	)

	email = serializers.EmailField(
		validators=[UniqueValidator(queryset=User.objects.all())]
	)

	first_name = serializers.CharField(min_length=4, max_length=35)

	last_name = serializers.CharField(min_length=4, max_length=35)

	password = serializers.CharField(min_length=8)

	password_confirmation = serializers.CharField(min_length=8)

	is_admin = serializers.BooleanField(default=False)

	def validate(self, data):
		""" Validate password """
		passwd = data['password']
		passwd_conf = data['password_confirmation']

		if passwd != passwd_conf:
			raise serializers.ValidationError("Passwords don't match.")
		password_validation.validate_password(passwd)
		return data

	def create(self, data):
		""" User creation """
		data.pop('password_confirmation')
		user = User.objects.create_user(**data, is_client=True)
		return user


class UserLoginSerializer(serializers.Serializer):
	""" User login serializer """

	username = serializers.CharField()
	password = serializers.CharField(min_length=8)

	def validate(self, data):
		user = authenticate(username=data['username'], password=data['password'])
		if not user:
			raise serializers.ValidationError('Invalid Credentials')
		self.context['user'] = user
		return data

	def create(self, data):
		token, created = Token.objects.get_or_create(user=self.context['user'])
		return self.context['user'], token.key