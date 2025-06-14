# FerreteriaFerremas

Proyecto en Django para gestionar el catálogo y ventas de la ferretería Ferremas.

## Instalación

1. Crea y activa un entorno virtual de Python.
2. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
3. Define las variables de entorno necesarias:
   - `SECRET_KEY`: clave secreta de Django.
   - `DEBUG`: `True` o `False` según el entorno.
   - Credenciales de Firebase mediante el archivo `firebase_cred.json` ubicado en la raíz del proyecto.
4. Ejecuta las migraciones y levanta el servidor:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```
5. Si no cuentas con `firebase_cred.json`, el proyecto arrancará de todas formas,
   aunque la sincronización con Firebase estará deshabilitada.

Se requiere el archivo `firebase_cred.json` para la integración con Firebase. Ob
ténlo desde tu proyecto de Firebase y colócalo en la raíz del repositorio (está
excluido del control de versiones).
