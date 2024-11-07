import pandas as pd
import matplotlib.pyplot as plt

# Cargar ambas hojas
archivo_excel_muestra = pd.read_excel('ETL_SPRINT_2.xlsx', sheet_name='Muestra')
archivo_excel_volumetria = pd.read_excel('ETL_SPRINT_2.xlsx', sheet_name='Volumetría de canchones')

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

# Guardar el resultado en un archivo Excel
reporte_calidad_trimestral.to_excel('reporte_resumen_trimestral.xlsx')

# Crear el gráfico de líneas para los trimestres
reporte_calidad_trimestral.plot(kind='line', marker='o', figsize=(10, 6))

# Etiquetas del gráfico
plt.title('Variación Trimestral en la Calidad de Trozas (No incluye celdas "Sin Datos")')
plt.xlabel('Periodo (Trimestre-Año)')
plt.ylabel('Cantidad de Trozas')
plt.xticks(rotation=45, ha='right')  # Rotar etiquetas en el eje X para mejor legibilidad
plt.tight_layout()  # Ajustar el layout para evitar el recorte de etiquetas

# Guardar el gráfico como imagen
plt.savefig('grafico_calidad_trimestral.png')

# Mostrar el gráfico en pantalla
plt.show()

# Imprimir mensaje de éxito
print("Reporte guardado en 'reporte_resumen_trimestral.xlsx' y gráfico guardado en 'grafico_calidad_trimestral.png'.")
