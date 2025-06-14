from django.contrib import admin
from .models import Producto, Categoria, Marca

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio', 'categoria', 'marca', 'destacado', 'creado')
    list_filter = ('categoria', 'marca', 'destacado')
    search_fields = ('nombre', 'descripcion')

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre',)
    search_fields = ('nombre',)

@admin.register(Marca)
class MarcaAdmin(admin.ModelAdmin):
    list_display = ('nombre',)
    search_fields = ('nombre',)
