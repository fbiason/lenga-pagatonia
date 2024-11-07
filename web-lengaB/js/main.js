// Ocultar el contenido de las secciones de análisis exploratorio al cargar la página
$(document).ready(function () {
  $(".toggle-content").hide(); // Ocultar el contenido inicialmente

  $(".toggle-header").click(function () {
    $(this).next(".toggle-content").slideToggle(300); // Alternar visibilidad del contenido
    $(this).toggleClass("active"); // Añadir clase activa para cambiar el ícono de despliegue
  });

  // Video Slider - Establecer velocidad de reproducción a 2x
  const video = document.getElementById("videoPolitecnico");
  if (video) {
    video.playbackRate = 2.0;
  }

  // Efecto hover en íconos sociales
  $(".social li a").hover(
    function () {
      $(this).stop().animate({ opacity: 0.6 }, 400, "easeOutExpo");
    },
    function () {
      $(this).stop().animate({ opacity: 1 }, 400, "easeOutExpo");
    }
  );

  // Inicialización de sliders de cada acordeón
  $("#camera_wrap1, #camera_wrap2, #camera_wrap3, #camera_wrap4").each(
    function () {
      $(this).camera({
        height: "270",
        hover: false,
        loader: "none",
        navigation: true,
        pagination: false,
        navigationHover: false,
        mobileNavHover: false,
        playPause: false,
        pauseOnClick: false,
        time: 100,
        transPeriod: 1000,
      });
    }
  );
});

// Scroll to top
window.onscroll = function () {
  var scrollTopButton = document.getElementById("scroll-to-top");
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    scrollTopButton.style.display = "block"; // Mostrar el botón
  } else {
    scrollTopButton.style.display = "none"; // Ocultar el botón
  }
};

// Funcionalidad del botón de scroll to top
document
  .getElementById("scroll-to-top")
  .addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Efecto de desplazamiento suave
    });
  });

// Empresa acordeón con transición suave
document.querySelectorAll(".accordion-button").forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;

    button.classList.toggle("active");
    content.classList.toggle("open"); // Agrega o quita la clase 'open' para la transición

    // Ajusta la altura del contenido para activar la animación de transición
    if (content.classList.contains("open")) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = null;
    }
  });
});

// Visaulización img etl
function generateReport() {
  const reportImage = document.getElementById("report-image");
  reportImage.src = "images/grafico_calidad_trimestral.png"; // Cambia el src de la imagen
  reportImage.style.display = "block"; // Muestra la imagen inicialmente como bloque

  // Usa setTimeout para que la transición de opacidad tenga efecto
  setTimeout(() => {
    reportImage.style.opacity = "1"; // Cambia la opacidad a 1 para que aparezca suavemente
  }, 10); // Pequeña demora para que se aplique la transición
}

// Hallazgos
document.querySelectorAll(".hallazgo-card").forEach((card) => {
  card.addEventListener("click", function () {
    card.classList.toggle("flip");
  });
});
