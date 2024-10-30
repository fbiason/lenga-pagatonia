from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views
import os

urlpatterns = [
    path('generar-reporte/', views.generar_reporte, name='generar_reporte'),
    path('dinamico/', views.dinamico, name='dinamico'),
]

if settings.DEBUG:
    urlpatterns += static('/data/', document_root=os.path.join(settings.BASE_DIR, 'data'))
