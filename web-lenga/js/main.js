// Ocultar el contenido de las secciones de análisis exploratorio al cargar la página
$(document).ready(function () {
  $(".toggle-content").hide(); // Ocultar el contenido inicialmente

  $(".toggle-header").click(function () {
    $(this).next(".toggle-content").slideToggle(300); // Alternar visibilidad del contenido
    $(this).toggleClass("active"); // Añadir clase activa para cambiar el ícono de despliegue
  });

  // Activar reporte Python al hacer clic en el botón
  $("#report-button").click(function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón

    $.ajax({
      url: "/run-script",
      type: "POST",
      success: function (response) {
        alert(response.message); // Muestra un mensaje de éxito
      },
      error: function (xhr, status, error) {
        alert("Error al ejecutar el script: " + xhr.responseText);
      },
    });
  });
});
