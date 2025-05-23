from rest_framework import viewsets, permissions
from .models import Producto, Categoria, Marca
from .serializers import ProductoSerializer, CategoriaSerializer, MarcaSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all().order_by('-creado')
    serializer_class = ProductoSerializer
    permission_classes = [permissions.AllowAny]

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.AllowAny]

class MarcaViewSet(viewsets.ModelViewSet):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer
    permission_classes = [permissions.AllowAny]