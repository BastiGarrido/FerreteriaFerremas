import firebase_admin
from firebase_admin import credentials, db
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Producto
import os

# Ruta al archivo de credenciales
cred_path = os.path.join(os.path.dirname(__file__), '..', 'firebase_cred.json')

if not firebase_admin._apps:
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://ferremas-1d1cb-default-rtdb.firebaseio.com/'
    })

@receiver(post_save, sender=Producto)
def guardar_producto_en_firebase(sender, instance, **kwargs):
    ref = db.reference(f"productos/{instance.id}")
    ref.set({
        'nombre': instance.nombre,
        'descripcion': instance.descripcion,
        'precio': float(instance.precio),
        'categoria': instance.categoria.nombre if instance.categoria else "",
        'marca': instance.marca.nombre if instance.marca else "",
        'destacado': instance.destacado,
        'imagen': instance.imagen.url if instance.imagen else ""
    })

@receiver(post_delete, sender=Producto)
def eliminar_producto_de_firebase(sender, instance, **kwargs):
    ref = db.reference(f"productos/{instance.id}")
    ref.delete()