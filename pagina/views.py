from django.shortcuts import render

from django.http import HttpResponse

def inicio(request):
    return render(request, 'inicio.html')

def login(request):
    return render(request, 'login.html')

def register(request):
    return render(request, 'register.html')

def nosotros(request):
    return render(request, 'nosotros.html')

def contacto(request):
    return render(request, 'contacto.html')