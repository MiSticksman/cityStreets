from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework import generics
# Create your views here.


def index(request):
    return HttpResponse('Hello world')

