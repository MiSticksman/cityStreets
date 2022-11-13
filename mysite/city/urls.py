from . import views
from rest_framework import routers
from django.urls import path, include

router_street = routers.DefaultRouter()
router_street.register(r'streets', views.StreetView, 'street')

router_house = routers.DefaultRouter()
router_house.register(r'houses', views.HouseView, 'house')

router_route = routers.DefaultRouter()
router_route.register(r'routes', views.RouteView, 'route')

router_route_comp = routers.DefaultRouter()
router_route_comp.register(r'routes_components', views.RouteComponentsView, 'route_components')

urlpatterns = [
    path('', include(router_street.urls)),
    path('', include(router_house.urls)),
    path('', include(router_route.urls)),
    # path('', include(router_route_comp.urls)),
]

