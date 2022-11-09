from rest_framework import serializers
from .models import Street


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Street
        fields = ('street_id', 'street_name')
