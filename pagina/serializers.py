from rest_framework import serializers
from .models import Producto, Categoria, Marca

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer()
    marca = MarcaSerializer()
    imagen = serializers.ImageField(use_url=True)

    class Meta:
        model = Producto
        fields = '__all__'
