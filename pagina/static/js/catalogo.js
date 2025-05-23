const API_BASE = "/api";

let productos = [];
let categorias = [];
let marcas = [];

const contenedor = document.getElementById("contenedorProductos");
const searchInput = document.getElementById("searchInput");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroMarca = document.getElementById("filtroMarca");
const filtroPrecio = document.getElementById("filtroPrecio");

async function cargarDatos() {
  const [prodRes, catRes, marcaRes] = await Promise.all([
    fetch(`${API_BASE}/productos/`),
    fetch(`${API_BASE}/categorias/`),
    fetch(`${API_BASE}/marcas/`)
  ]);

  productos = await prodRes.json();
  categorias = await catRes.json();
  marcas = await marcaRes.json();

  llenarFiltros();
  mostrarProductos(productos);
}

function llenarFiltros() {
  filtroCategoria.innerHTML = '<option value="">Todas</option>';
  filtroMarca.innerHTML = '<option value="">Todas</option>';

  categorias.forEach(c => {
    filtroCategoria.innerHTML += `<option value="${c.nombre}">${c.nombre}</option>`;
  });

  marcas.forEach(m => {
    filtroMarca.innerHTML += `<option value="${m.nombre}">${m.nombre}</option>`;
  });
}

function mostrarProductos(lista) {
  contenedor.innerHTML = "";
  if (lista.length === 0) {
    contenedor.innerHTML = '<p class="text-center">No se encontraron productos.</p>';
    return;
  }

  lista.forEach(p => {
    console.log("imagen:", p.imagen); // 👈 Verifica qué contiene exactamente

    contenedor.innerHTML += `
      <div class="col-md-4 mb-4" data-aos="fade-up">
        <div class="card h-100 shadow">
          <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
          <div class="card-body">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text">${p.descripcion?.slice(0, 100)}...</p>
            <span class="badge bg-success">$${p.precio}</span>
          </div>
        </div>
      </div>
    `;
  });
}

function aplicarFiltros() {
  let lista = [...productos];

  const categoria = filtroCategoria.value;
  const marca = filtroMarca.value;
  const maxPrecio = parseFloat(filtroPrecio.value);

  if (categoria) {
    lista = lista.filter(p => p.categoria.nombre === categoria);
  }
  if (marca) {
    lista = lista.filter(p => p.marca.nombre === marca);
  }
  if (!isNaN(maxPrecio)) {
    lista = lista.filter(p => p.precio <= maxPrecio);
  }

  mostrarProductos(lista);
}

function buscarProductos() {
  const termino = searchInput.value.toLowerCase();
  const resultados = productos.filter(p =>
    p.nombre.toLowerCase().includes(termino) ||
    p.descripcion.toLowerCase().includes(termino)
  );
  mostrarProductos(resultados);
}

cargarDatos();