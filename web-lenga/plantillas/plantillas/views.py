import os
from django.shortcuts import render
from django.http import HttpResponse
import pandas as pd
import matplotlib.pyplot as plt
from django.conf import settings

def etl(request):
    return render(request, 'etl.html')  # Renderiza el archivo HTML

def generar_reporte(request):
    # Ruta completa al archivo Excel dentro de la carpeta "data"
    ruta_archivo = os.path.join(settings.BASE_DIR, 'data', 'ETL_SPRINT_2.xlsx')

    try:
        # Cargar ambas hojas
        archivo_excel_muestra = pd.read_excel(ruta_archivo, sheet_name='Muestra')
        archivo_excel_volumetria = pd.read_excel(ruta_archivo, sheet_name='Volumetría de canchones')

        # Unir las dos tablas utilizando los identificadores
        archivo_combinado = pd.merge(archivo_excel_muestra, archivo_excel_volumetria, left_on='_submission__id', right_on='_id', how='inner')

        # Convertir la columna "Fecha" al formato de trimestre/año
        archivo_combinado['Fecha'] = pd.to_datetime(archivo_combinado['Fecha'], errors='coerce').dt.to_period('Q')

        # Eliminar filas con NaT en la columna de "Fecha"
        archivo_combinado = archivo_combinado.dropna(subset=['Fecha'])

        # Excluir la categoría "Sin Datos" para concentrarse en las calidades relevantes
        archivo_combinado = archivo_combinado[archivo_combinado['Calidad de Troza'] != 'Sin Datos']

        # Agrupar los datos por trimestre/año y calidad de troza, y contar las apariciones
        reporte_calidad_trimestral = archivo_combinado.groupby(['Fecha', 'Calidad de Troza']).size().unstack(fill_value=0)

        # Guardar el resultado en un archivo Excel dentro de la carpeta "data"
        reporte_excel_path = os.path.join(settings.BASE_DIR, 'data', 'reporte_resumen_trimestral.xlsx')
        reporte_calidad_trimestral.to_excel(reporte_excel_path)

        # Crear el gráfico de líneas para los trimestres
        reporte_calidad_trimestral.plot(kind='line', marker='o', figsize=(10, 6))

        # Etiquetas del gráfico
        plt.title('Variación Trimestral en la Calidad de Trozas (No incluye celdas "Sin Datos")')
        plt.xlabel('Periodo (Trimestre-Año)')
        plt.ylabel('Cantidad de Trozas')
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()

        # Guardar el gráfico como imagen dentro de la carpeta "data"
        grafico_path = os.path.join(settings.BASE_DIR, 'data', 'grafico_calidad_trimestral.png')
        plt.savefig(grafico_path)
        plt.close()  # Cierra el gráfico para liberar memoria

        # Pasar la ruta del gráfico a la plantilla para mostrarlo
        return render(request, 'etl.html', {'grafico_url': '/data/grafico_calidad_trimestral.png'})

    except Exception as e:
        # Si ocurre un error, devolver un mensaje de error
        return HttpResponse(f"Error al generar el reporte: {e}")
