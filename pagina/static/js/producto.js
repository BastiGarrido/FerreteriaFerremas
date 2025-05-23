function cambiarCantidad(delta) {
  const cantidadInput = document.getElementById("cantidad");
  let cantidad = parseInt(cantidadInput.value);
  cantidad = isNaN(cantidad) ? 1 : cantidad + delta;
  cantidad = Math.max(1, cantidad);
  cantidadInput.value = cantidad;
  actualizarPrecioTotal();
}

function actualizarPrecioTotal() {
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const precioBase = parseFloat(document.getElementById("precioBase").value);
  const total = precioBase * cantidad;

  const formatoCLP = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP"
  }).format(total);

  document.getElementById("precioTotal").textContent = formatoCLP;
}

function agregarAlCarritoDesdeDetalle() {
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const nombre = document.querySelector("h2.fw-bold").textContent;
  const precio = parseFloat(document.getElementById("precioBase").value);
  const imagen = document.querySelector(".img-detalle").src;
  const id = parseInt(document.querySelector("[data-producto-id]").dataset.productoId);

  const producto = { id, nombre, precio, imagen, cantidad };

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const existente = carrito.find(p => p.id === producto.id);

  if (existente) {
    existente.cantidad += producto.cantidad;
  } else {
    carrito.push(producto);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito");
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarPrecioTotal();

  const boton = document.querySelector(".btn-warning");
  if (boton) {
    boton.addEventListener("click", agregarAlCarritoDesdeDetalle);
  }
});