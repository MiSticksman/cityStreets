from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Street
from .serializers import *
from django.shortcuts import render

from rest_framework import viewsets

from .serializers import StreetSerializer

from .models import Street, House, Route, RouteComponents




class StreetView(viewsets.ModelViewSet):
    serializer_class = StreetSerializer
    queryset = Street.objects.all().order_by('street_name')


class HouseView(viewsets.ModelViewSet):
    serializer_class = HouseSerializer
    queryset = House.objects.all().order_by('street')


    # def get_serializer_context(self):
    #     return {
    #         'street_id': self.request.street.street_id
    #     }

class RouteView(viewsets.ModelViewSet):
    serializer_class = RouteSerializer
    queryset = Route.objects.all().order_by('route_name')


class RouteComponentsView(viewsets.ModelViewSet):
    serializer_class = RouteComponentsSerializer
    queryset = RouteComponents.objects.all().order_by('follow_up_number')
