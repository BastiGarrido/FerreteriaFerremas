from django.shortcuts import render, get_object_or_404, redirect
from .models import Producto

from transbank.webpay.webpay_plus.transaction import Transaction
from transbank.common.integration_type import IntegrationType
import uuid

# CONFIGURACIÓN GLOBAL (reemplaza esto por tus credenciales en producción)
commerce_code = '597055555532'
api_key = 'X'
integration_type = IntegrationType.TEST

# INSTANCIA GLOBAL del objeto Transaction
transaction = Transaction(commerce_code, api_key, integration_type)

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

def catalogo(request):
    return render(request, 'catalogo.html')

def producto_detalle(request, producto_id):
    producto = get_object_or_404(Producto, id=producto_id)
    return render(request, 'producto_detalle.html', {'producto': producto})

def carrito(request):
    return render(request, 'carrito.html')

def iniciar_pago(request):
    total = 9900  # Puedes conectarlo al carrito real

    buy_order = str(uuid.uuid4())
    session_id = str(uuid.uuid4())
    return_url = request.build_absolute_uri('/pago/exito/')

    response = transaction.create(
        buy_order=buy_order,
        session_id=session_id,
        amount=total,
        return_url=return_url
    )

    return redirect(response['url'] + '?token_ws=' + response['token'])

def pago_exito(request):
    token = request.GET.get("token_ws")
    result = transaction.commit(token)

    if result['status'] != 'AUTHORIZED':
        return redirect('pago_fallo')

    return render(request, 'pago_exito.html', {'resultado': result})

def pago_fallo(request):
    return render(request, 'pago_fallo.html')
