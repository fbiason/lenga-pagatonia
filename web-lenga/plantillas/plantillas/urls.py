from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views
import os

urlpatterns = [
    path('generar-reporte/', views.generar_reporte, name='generar_reporte'),
    path('index/', views.index, name='index'),
    path('team/', views.team, name='team'),
    path('goals/', views.goals, name='goals'),
    path('tools/', views.tools, name='tools'),
    path('dictionary/', views.dictionary, name='dictionary'),
    path('etl/', views.etl, name='etl'),
    path('datawork/', views.datawork, name='datawork'),
    path('findings/', views.findings, name='findings'),
    path('conclusion/', views.conclusion, name='conclusion'),
]

if settings.DEBUG:
    urlpatterns += static('/data/', document_root=os.path.join(settings.BASE_DIR, 'data'))
