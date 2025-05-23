from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('nosotros/', views.nosotros, name='nosotros'),
    path('contacto/', views.contacto, name='contacto'),
    path('catalogo/', views.catalogo, name='catalogo'),
    path('producto/<int:producto_id>/', views.producto_detalle, name='producto_detalle'),
    path('carrito/', views.carrito, name='carrito'),

    # Webpay (modo test)
    path('pago/', views.iniciar_pago, name='iniciar_pago'),
    path('pago/exito/', views.pago_exito, name='pago_exito'),
    path('pago/fallo/', views.pago_fallo, name='pago_fallo'),
]