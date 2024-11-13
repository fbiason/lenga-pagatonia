// Ocultar el contenido de las secciones de análisis exploratorio al cargar la página
$(document).ready(function () {
  $(".toggle-content").css({
    maxHeight: "0",
    overflow: "hidden",
    opacity: "0",
    transition: "max-height 0.5s ease, opacity 0.5s ease",
  }); // Ocultar el contenido inicialmente

  $(".toggle-header").click(function () {
    const content = $(this).next(".toggle-content");

    if (content.css("maxHeight") === "0px") {
      content.css({
        maxHeight: content.prop("scrollHeight") + "px",
        opacity: "1",
      });
    } else {
      content.css({
        maxHeight: "0",
        opacity: "0",
      });
    }

    $(this).toggleClass("active"); // Añadir clase activa para cambiar el ícono de despliegue
  });

  // VIDEO SLIDER - Establecer velocidad de reproducción a 2x
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

// SCROLL TO TOP
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

// ORGANIZACION
// ORGANIZACION
document.addEventListener("DOMContentLoaded", () => {
  // Variables generales
  const modals = document.querySelectorAll(".modal");
  const openModalBtns = document.querySelectorAll(".open-modal-btn");
  const closeModalBtns = document.querySelectorAll(".close-modal-btn");

  // Abrir modal
  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal");
      const modal = document.getElementById(modalId);

      if (modalId === "modal-carousel") {
        // Cargar imágenes para el carrusel dinámicamente
        const images = btn.getAttribute("data-images").split(",");
        const carouselTrack = modal.querySelector(".carousel-track");
        const carouselImages = carouselTrack.querySelectorAll(".carousel-image");

        carouselImages.forEach((img, index) => {
          img.src = images[index];
        });

        // Iniciar carrusel
        startCarousel(modal);
      }

      // Mostrar el modal
      modal.classList.add("show");
    });
  });

  // Cerrar modal
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal");
      modal.classList.remove("show");

      if (modal.id === "modal-carousel") {
        stopCarousel(modal); // Detener el carrusel si es necesario
      }
    });
  });

  // Cerrar modal al hacer clic fuera del contenido
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");

        if (modal.id === "modal-carousel") {
          stopCarousel(modal); // Detener el carrusel si es necesario
        }
      }
    });
  });

  // Carrusel
  const carouselIntervals = {}; // Para almacenar intervalos de cada carrusel

  function startCarousel(modal) {
    const carouselTrack = modal.querySelector(".carousel-track");
    let currentIndex = 0;

    function showNextImage() {
      currentIndex = (currentIndex + 1) % carouselTrack.children.length;
      const offset = -currentIndex * 100;
      carouselTrack.style.transform = `translateX(${offset}%)`;
    }

    // Iniciar el carrusel con intervalo
    const intervalId = setInterval(showNextImage, 3000); // Cambiar a 3 segundos (3000 ms)
    carouselIntervals[modal.id] = intervalId;
  }

  function stopCarousel(modal) {
    const intervalId = carouselIntervals[modal.id];
    if (intervalId) {
      clearInterval(intervalId);
      delete carouselIntervals[modal.id];
    }

    // Reiniciar el carrusel al primer índice
    const carouselTrack = modal.querySelector(".carousel-track");
    if (carouselTrack) {
      carouselTrack.style.transform = "translateX(0)";
    }
  }
});

// ORGANIZACION
document.addEventListener("DOMContentLoaded", () => {
  // Variables generales
  const modals = document.querySelectorAll(".modal");
  const openModalBtns = document.querySelectorAll(".open-modal-btn");
  const closeModalBtns = document.querySelectorAll(".close-modal-btn");

  // Abrir modal
  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal");
      const modal = document.getElementById(modalId);

      if (modalId === "modal-carousel") {
        // Cargar imágenes para el carrusel dinámicamente
        const images = btn.getAttribute("data-images").split(",");
        const carouselTrack = modal.querySelector(".carousel-track");
        const carouselImages = carouselTrack.querySelectorAll(".carousel-image");

        carouselImages.forEach((img, index) => {
          img.src = images[index];
        });

        // Iniciar carrusel
        startCarousel(modal);
      }

      // Mostrar el modal
      modal.classList.add("show");
    });
  });

  // Cerrar modal
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal");
      modal.classList.remove("show");

      if (modal.id === "modal-carousel") {
        stopCarousel(modal); // Detener el carrusel si es necesario
      }
    });
  });

  // Cerrar modal al hacer clic fuera del contenido
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");

        if (modal.id === "modal-carousel") {
          stopCarousel(modal); // Detener el carrusel si es necesario
        }
      }
    });
  });

  // Carrusel
  const carouselIntervals = {}; // Para almacenar intervalos de cada carrusel

  function startCarousel(modal) {
    const carouselTrack = modal.querySelector(".carousel-track");
    let currentIndex = 0;

    function showNextImage() {
      currentIndex = (currentIndex + 1) % carouselTrack.children.length;
      const offset = -currentIndex * 100;
      carouselTrack.style.transform = `translateX(${offset}%)`;
    }

    // Iniciar el carrusel con intervalo
    const intervalId = setInterval(showNextImage, 3000); // Cambiar a 3 segundos (3000 ms)
    carouselIntervals[modal.id] = intervalId;
  }

  function stopCarousel(modal) {
    const intervalId = carouselIntervals[modal.id];
    if (intervalId) {
      clearInterval(intervalId);
      delete carouselIntervals[modal.id];
    }

    // Reiniciar el carrusel al primer índice
    const carouselTrack = modal.querySelector(".carousel-track");
    if (carouselTrack) {
      carouselTrack.style.transform = "translateX(0)";
    }
  }
});


// ORGANIZACIÓN - TRELLO CAROUSEL
document.addEventListener("DOMContentLoaded", () => {
  const trelloModal = document.getElementById("modal-trello");
  const carouselImage = document.getElementById("carousel-image");

  const images = ["images/trello-organization.png", "images/gantt-organization.png"];
  let currentIndex = 0;

  let carouselInterval;

  // Function to start the carousel with a smooth fade effect
  const startCarousel = () => {
    carouselInterval = setInterval(() => {
      // Add fade-out effect
      carouselImage.classList.add("fade-out");

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        carouselImage.src = images[currentIndex];
        // Add fade-in effect after changing the image
        carouselImage.classList.remove("fade-out");
        carouselImage.classList.add("fade-in");

        setTimeout(() => {
          carouselImage.classList.remove("fade-in");
        }, 500); // Remove fade-in effect after transition
      }, 500); // Time for fade-out effect
    }, 3000); // Change every 3 seconds
  };

  // Open modal and start carousel
  document.querySelector(`[data-modal="modal-trello"]`).addEventListener("click", () => {
    trelloModal.classList.add("show");
    startCarousel();
  });

  // Close modal and stop carousel
  trelloModal.querySelector(".close-modal-btn").addEventListener("click", () => {
    trelloModal.classList.remove("show");
    clearInterval(carouselInterval);
  });
});

// ORGANIZACIÓN - VIDEOCONFERENCIAS CAROUSEL
document.addEventListener("DOMContentLoaded", () => {
  const modalVideoconferencias = document.getElementById("modal-videoconferencias");
  const carouselTrack = modalVideoconferencias.querySelector(".carousel-track");
  const images = carouselTrack.querySelectorAll(".carousel-image");

  let currentIndex = 0;
  let carouselInterval;

  // Function to start the carousel
  const startCarousel = () => {
    carouselInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      const offset = -currentIndex * 100; // Calculate offset for the transform
      carouselTrack.style.transform = `translateX(${offset}%)`;
    }, 3000); // 3-second interval
  };

  // Open modal and start carousel
  document.querySelector(`[data-modal="modal-videoconferencias"]`).addEventListener("click", () => {
    modalVideoconferencias.classList.add("show");
    startCarousel();
  });

  // Close modal and stop carousel
  modalVideoconferencias.querySelector(".close-modal-btn").addEventListener("click", () => {
    modalVideoconferencias.classList.remove("show");
    clearInterval(carouselInterval);
    carouselTrack.style.transform = "translateX(0)"; // Reset carousel to the first image
    currentIndex = 0; // Reset the index
  });
});

// SPRINT 1 HERRAMIENTAS
document.addEventListener("DOMContentLoaded", () => {
  const clickableImages = document.querySelectorAll(".tool-click");

  clickableImages.forEach((image) => {
    image.addEventListener("click", () => {
      const targetId = image.dataset.target; // Obtén el ID del objetivo
      const targetImage = document.getElementById(targetId);

      if (targetImage.classList.contains("hidden")) {
        // Mostrar la imagen con una transición suave
        targetImage.classList.remove("hidden");
        targetImage.classList.add("visible");
      } else {
        // Ocultar la imagen con una transición suave
        targetImage.classList.remove("visible");
        targetImage.classList.add("hidden");
      }
    });
  });
});


// SPRINT 2 ETL
document.addEventListener("DOMContentLoaded", () => {
  const reportButton = document.getElementById("report-button");

  if (reportButton) {
    reportButton.addEventListener("click", generateReport);
  }
});

function generateReport() {
  // Elementos a mostrar/ocultar
  const reportImage = document.getElementById("report-image");
  const etlTools = document.querySelector(".etl-tools");

  // Alternar visibilidad del gráfico principal
  if (reportImage.style.display === "block") {
    reportImage.style.opacity = "0";
    setTimeout(() => {
      reportImage.style.display = "none";
    }, 300);
  } else {
    reportImage.src = "images/grafico_calidad_trimestral.png";
    reportImage.style.display = "block";
    setTimeout(() => {
      reportImage.style.opacity = "1";
    }, 10);
  }

  // Alternar visibilidad de las herramientas ETL
  if (etlTools.classList.contains("hidden")) {
    etlTools.classList.remove("hidden");
    etlTools.style.opacity = "0";
    setTimeout(() => {
      etlTools.style.opacity = "1";
    }, 10);
  } else {
    etlTools.style.opacity = "0";
    setTimeout(() => {
      etlTools.classList.add("hidden");
    }, 300);
  }

  // Configurar las imágenes de las herramientas ETL
  const images = [
    { id: "report-image1", src: "images/pandas.png" },
    { id: "report-image2", src: "images/openpyxl.png" },
    { id: "report-image3", src: "images/matplotlib.png" },
  ];

  images.forEach((imageObj) => {
    const imageElement = document.getElementById(imageObj.id);
    if (imageElement && !etlTools.classList.contains("hidden")) {
      imageElement.src = imageObj.src;
    }
  });
}

// Hallazgos
document.querySelectorAll(".hallazgo-card").forEach((card) => {
  card.addEventListener("click", function () {
    card.classList.toggle("flip");
  });
});

// Selecciona el botón y el modal
const openPopupBtn = document.querySelector(".open-popup-btn");
const popupModal = document.getElementById("popup-modal");
const closePopup = document.querySelector(".close-popup");

// Abre el modal cuando se hace clic en el botón
openPopupBtn.addEventListener("click", () => {
  popupModal.style.display = "flex";
});

// Cierra el modal cuando se hace clic en la 'x'
closePopup.addEventListener("click", () => {
  popupModal.style.display = "none";
});

// Cierra el modal al hacer clic fuera del contenido
window.addEventListener("click", (e) => {
  if (e.target === popupModal) {
    popupModal.style.display = "none";
  }
});
