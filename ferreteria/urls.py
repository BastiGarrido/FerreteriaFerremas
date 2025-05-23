from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('pagina.api_urls')),
    path('', include('pagina.urls')),
]

# ✅ Servir archivos multimedia en desarrollo (imágenes subidas)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)