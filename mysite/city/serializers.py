from rest_framework import serializers
from .models import Street, House, Route, RouteComponents


class StreetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Street
        fields = ('street_id', 'street_name')
        
class HouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = House
        fields = ('house_id', 'street_id', 'house_number')


class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ('route_id', 'route_name')

class RouteComponentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RouteComponents
        fields = ('route_id', 'follow_up_number', 'house_id')