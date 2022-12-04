from rest_framework import serializers
from .models import Street, House, Route, RouteComponents


class StreetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Street
        fields = ('street_id', 'street_name')


class HouseSerializer(serializers.ModelSerializer):
    # street = StreetSerializer(read_only=True)
    street_name = serializers.CharField(source='street.street_name', read_only=True)
    class Meta:
        model = House
        fields = ('house_id', 'street', 'house_number', 'street_name')

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ('route_id', 'route_name')


class RouteComponentsSerializer(serializers.ModelSerializer):
    # route = RouteSerializer()
    route_name = serializers.CharField(source='route.route_name', read_only=True)

    class Meta:
        model = RouteComponents
        fields = ('route', 'follow_up_number', 'house', 'route_name')
