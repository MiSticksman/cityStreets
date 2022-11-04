from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
# Create your views here.


def index(request):
    # print(request)
    return HttpResponse('Hello world')

