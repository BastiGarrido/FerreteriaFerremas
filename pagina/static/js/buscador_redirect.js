function redirigirBusqueda() {
  const termino = document.getElementById("searchInput").value.trim();
  if (termino !== "") {
    const url = new URL(window.location.origin + "/catalogo/");
    url.searchParams.set("buscar", termino);
    window.location.href = url.toString();
  }
  return false;
}