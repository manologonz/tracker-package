""" Client Catalogue urls """

# Django
from django.urls import path, include

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from .views import catalogues as cat_views

router = DefaultRouter()

router.register(r'catalogues', cat_views.ClientCatalogueViewSet, basename='catalogues')
router.register(r'client/(?P<username>[-a-zA-Z0-9_]+)', cat_views.ClientCatalogueViewSet, basename='client')

urlpatterns = [
	path('', include(router.urls))
]