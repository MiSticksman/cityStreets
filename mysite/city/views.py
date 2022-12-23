from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework import generics, permissions, filters
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Street
from .serializers import *
from django.shortcuts import render
from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import StreetSerializer

from .models import Street, House, Route, RouteComponents


class StreetViewPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def paginate_queryset(self, queryset, request, view=None):
        if 'page' not in request.query_params:
            return None
        return super().paginate_queryset(queryset, request, view)

class StreetView(viewsets.ModelViewSet):
    serializer_class = StreetSerializer
    queryset = Street.objects.all().order_by('street_name')

    pagination_class = StreetViewPagination

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, 
                       filters.OrderingFilter]
    
    filterset_fields = ['street_id', 'street_name']
    search_fields = ['street_id', 'street_name']
    ordering_fields = ['street_id', 'street_name']


class HouseViewPagination(PageNumberPagination):
    page_size = 15
    page_size_query_param = 'page_size'
    max_page_size = 100

    def paginate_queryset(self, queryset, request, view=None):
        if 'page' not in request.query_params:
            return None
        return super().paginate_queryset(queryset, request, view)

class HouseView(viewsets.ModelViewSet):
    serializer_class = HouseSerializer
    # queryStreetSet = Street.objects.all().order_by('street_name')
    queryset = House.objects.all().order_by('house_number')
    pagination_class = HouseViewPagination

    

    # def get_serializer_context(self):
    #     return {
    #         'street_id': self.request.street.street_id
    #     }


class RouteViewPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 100

    def paginate_queryset(self, queryset, request, view=None):
        if 'page' not in request.query_params:
            return None
        return super().paginate_queryset(queryset, request, view)

class RouteView(viewsets.ModelViewSet):
    serializer_class = RouteSerializer
    queryset = Route.objects.all().order_by('route_name')
    pagination_class = RouteViewPagination


class RouteComponentsView(viewsets.ModelViewSet):
    serializer_class = RouteComponentsSerializer
    queryset = RouteComponents.objects.all().order_by('follow_up_number')
