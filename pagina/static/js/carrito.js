function mostrarCarrito() {
  const contenedor = document.getElementById("contenedor-carrito");
  const totalSpan = document.getElementById("totalCarrito");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach(producto => {
    total += producto.precio * producto.cantidad;

    const item = document.createElement("div");
    item.className = "producto-item";

    item.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="producto-info">
        <h5>${producto.nombre}</h5>
        <p>$${producto.precio.toLocaleString()} x ${producto.cantidad}</p>
        <div class="selector-cantidad">
          <button onclick="cambiarCantidad(${producto.id}, -1)">-</button>
          <span>${producto.cantidad}</span>
          <button onclick="cambiarCantidad(${producto.id}, 1)">+</button>
        </div>
      </div>
      <button onclick="eliminarProducto(${producto.id})" class="btn btn-outline-danger position-absolute top-0 end-0 m-2">X</button>
    `;

    contenedor.appendChild(item);
  });

  totalSpan.textContent = `$${total.toLocaleString()}`;
}

function cambiarCantidad(id, delta) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = carrito.find(p => p.id === id);
  if (!producto) return;

  producto.cantidad += delta;
  if (producto.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function eliminarProducto(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carrito.filter(p => p.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);