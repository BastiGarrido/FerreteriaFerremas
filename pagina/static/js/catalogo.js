const API_BASE = "/api";

let productos = [];
let categorias = [];
let marcas = [];

const contenedor = document.getElementById("contenedorProductos");
const searchInput = document.getElementById("searchInput");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroMarca = document.getElementById("filtroMarca");
const filtroPrecio = document.getElementById("filtroPrecio");
const filtroDestacado = document.getElementById("filtroDestacado");
const productosPorPagina = 6;
let paginaActual = 1;

async function cargarDatos() {
  try {
    const [prodRes, catRes, marcaRes] = await Promise.all([
      fetch(`${API_BASE}/productos/`),
      fetch(`${API_BASE}/categorias/`),
      fetch(`${API_BASE}/marcas/`)
    ]);

    productos = await prodRes.json();
    categorias = await catRes.json();
    marcas = await marcaRes.json();

    llenarFiltros();
    aplicarFiltrosDesdeURL();
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
}

function llenarFiltros() {
  filtroCategoria.innerHTML = '<option value="">Todas</option>';
  filtroMarca.innerHTML = '<option value="">Todas</option>';
  filtroDestacado.innerHTML = '<option value="">Todos</option><option value="true">Solo destacados</option><option value="false">No destacados</option>';

  categorias.forEach(c => {
    filtroCategoria.innerHTML += `<option value="${c.nombre}">${c.nombre}</option>`;
  });

  marcas.forEach(m => {
    filtroMarca.innerHTML += `<option value="${m.nombre}">${m.nombre}</option>`;
  });
}

function aplicarFiltrosDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("categoria") || "";
  const marca = params.get("marca") || "";
  const precio = params.get("precio") || "";
  const destacado = params.get("destacado") || "";

  filtroCategoria.value = categoria;
  filtroMarca.value = marca;
  filtroPrecio.value = precio;
  filtroDestacado.value = destacado;

  aplicarFiltros(false);
}

function mostrarProductos(lista) {
  contenedor.innerHTML = "";
  if (lista.length === 0) {
    contenedor.innerHTML = '<p class="text-center">No se encontraron productos.</p>';
    return;
  }

  lista.sort((a, b) => b.destacado - a.destacado);

  const inicio = (paginaActual - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const paginaProductos = lista.slice(inicio, fin);

  paginaProductos.forEach(p => {
    const precioCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(p.precio);
    const destacadoEtiqueta = p.destacado ? '<span class="badge bg-warning text-dark position-absolute top-0 end-0 m-2">Destacado</span>' : '';

    contenedor.innerHTML += `
      <div class="col-md-4 mb-4" data-aos="fade-up">
        <div class="card h-100 shadow position-relative">
          ${destacadoEtiqueta}
          <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
          <div class="card-body">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text">${p.descripcion?.slice(0, 100)}...</p>
            <span class="badge bg-success">${precioCLP}</span>
          </div>
        </div>
      </div>
    `;
  });

  renderizarPaginacion(lista.length);
}

function renderizarPaginacion(total) {
  const paginacion = document.getElementById("paginacion") || document.createElement("div");
  paginacion.id = "paginacion";
  paginacion.className = "text-center mt-4";
  paginacion.innerHTML = "";

  const totalPaginas = Math.ceil(total / productosPorPagina);

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `btn btn-sm mx-1 ${i === paginaActual ? 'btn-primary' : 'btn-outline-primary'}`;
    btn.onclick = () => {
      paginaActual = i;
      aplicarFiltros(false);
    };
    paginacion.appendChild(btn);
  }

  contenedor.parentNode.appendChild(paginacion);
}

function aplicarFiltros(recargar = true) {
  const categoria = filtroCategoria.value;
  const marca = filtroMarca.value;
  const precio = filtroPrecio.value;
  const destacado = filtroDestacado.value;

  const params = new URLSearchParams();
  if (categoria) params.append("categoria", categoria);
  if (marca) params.append("marca", marca);
  if (precio) params.append("precio", precio);
  if (destacado) params.append("destacado", destacado);

  if (recargar) {
    window.location.href = `${window.location.pathname}?${params.toString()}`;
  } else {
    let lista = [...productos];

    if (categoria) lista = lista.filter(p => p.categoria.nombre === categoria);
    if (marca) lista = lista.filter(p => p.marca.nombre === marca);
    if (precio) lista = lista.filter(p => p.precio <= parseFloat(precio));
    if (destacado) lista = lista.filter(p => String(p.destacado) === destacado);

    mostrarProductos(lista);
  }
}

function buscarProductos() {
  const termino = searchInput.value.toLowerCase();
  let lista = productos.filter(p =>
    p.nombre.toLowerCase().includes(termino) ||
    p.descripcion.toLowerCase().includes(termino)
  );

  mostrarProductos(lista);
}

cargarDatos();