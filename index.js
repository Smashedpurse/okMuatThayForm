let idCheckRules = document.getElementById("checkRulesForm");
let envioInfo = document.getElementById("envioInfo");

function removeDisabledButton() {
  if (idCheckRules.checked) {
    envioInfo.classList.remove("disabled");
  } else {
    envioInfo.classList.add("disabled");
  }
}

function mostrarModal() {
  const modalElement = document.getElementById("exampleModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

function cerrarModal() {
  document.getElementById("miModal").classList.remove("activo");
}

function validarFormulario() {
  const nombre = document.getElementById("inputNombre").value.trim();
  const apellidos = document.getElementById("inputApellidos").value.trim();
  const numero = document.getElementById("inputNumero").value.trim();
  const correo = document.getElementById("inputCorreo").value.trim();

  const errorNombre = document.getElementById("errorMessageNombre");
  const errorApellidos = document.getElementById("errorMessageApellidos");
  const errorNumero = document.getElementById("errorMessageNumero");
  const errorCorreo = document.getElementById("errorMessageCorreo");

  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
  const regexNumero = /^\d{7,10}$/;
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let esValido = true;

  if (!regexNombre.test(nombre)) {
    errorNombre.innerHTML = "Por favor, ingresa un nombre válido.";
    esValido = false;
  } else {
    errorNombre.innerHTML = "";
  }

  if (!regexNombre.test(apellidos)) {
    errorApellidos.innerHTML = "Por favor, ingresa apellidos válidos.";
    esValido = false;
  } else {
    errorApellidos.innerHTML = "";
  }

  if (!regexNumero.test(numero)) {
    errorNumero.innerHTML = "El número debe tener entre 7 y 10 dígitos.";
    esValido = false;
  } else {
    errorNumero.innerHTML = "";
  }

  if (!regexCorreo.test(correo)) {
    errorCorreo.innerHTML = "Ingresa un correo electrónico válido.";
    esValido = false;
  } else {
    errorCorreo.innerHTML = "";
  }

  document
    .getElementById("formRegister")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("inputNombre").value.trim();
      const apellidos = document.getElementById("inputApellidos").value.trim();
      const numero = document.getElementById("inputNumero").value.trim();
      const correo = document.getElementById("inputCorreo").value.trim();

      const spinner = document.getElementById("spinnerForm");
      spinner.classList.remove("d-none");

      const candidato = {
        nombre: nombre,
        apellidos: apellidos,
        numero: numero,
        correo: correo,
        to_email: "smashedpurse@gmail.com",
      };

      emailjs.send("service_1gf2saa", "template_djrcgwh", candidato).then(
        (response) => {
          console.log(response.status);
          if (response.status === 200) {
            spinner.classList.add("d-none");
            envioInfo.classList.add("d-none");
          }

          document.getElementById("mensajeRegistro").innerHTML =
            "✅ Registro exitoso. Revisa tu correo (incluidas las carpetas de spam).";
          mostrarModal();
        },
        (error) => {
          document.getElementById("mensajeRegistro").innerHTML =
            "❌ Algo salió mal. Intenta enviar tu registro nuevamente.";
          mostrarModal();
        }
      );
    });

  return esValido;
}
