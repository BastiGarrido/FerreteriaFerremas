from rest_framework.routers import DefaultRouter
from .api_views import ProductoViewSet, CategoriaViewSet, MarcaViewSet

router = DefaultRouter()
router.register(r'productos', ProductoViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'marcas', MarcaViewSet)

urlpatterns = router.urls
