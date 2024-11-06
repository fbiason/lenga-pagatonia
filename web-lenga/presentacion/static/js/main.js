// Ocultar el contenido de las secciones de análisis exploratorio al cargar la página
$(document).ready(function () {
  $(".toggle-content").hide(); // Ocultar el contenido inicialmente

  $(".toggle-header").click(function () {
    $(this).next(".toggle-content").slideToggle(300); // Alternar visibilidad del contenido
    $(this).toggleClass("active"); // Añadir clase activa para cambiar el ícono de despliegue
  });
});
