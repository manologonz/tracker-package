""" Packages urls """

# Django
from django.urls import path, include

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from .views import packages as package_views


router = DefaultRouter()

router.register(r'packages', package_views.PackageViewSet, basename="packages")

urlpatterns = [
	path('', include(router.urls))
]