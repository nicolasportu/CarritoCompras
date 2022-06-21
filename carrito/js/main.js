let carrito = [];

class ProductoCarrito {
  constructor(nombre, precio, imagen, id, subtotal) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.cantidad = 1;
    this.id = id;
    this.subtotal = precio;
  }
}

let divContainer = document.getElementById("row");

function rellenarPaginas(arrayProductos) {
  for (let producto of arrayProductos) {
    let div = document.createElement("div");
    div.classList = "col-4 mt-3";

    div.innerHTML = `   <section class="m-5">
                            <div class="card p-5 text-center cardNeche" style="width: 20rem; height: 30rem">
                            <img src="${producto.imagen}" class="card-img-top imgNeche" alt="${producto.id}" >
                            <div clas="card-body">
                            <h5 class="card-title"> ${producto.nombre}</h5>
                             <p class="card-text">$ <strong>${producto.precio}</strong></p>
                            <button class="btn btn-success anadirCarrito">Añadir al carrito</button>
                            </div>
                            </div>
                            </section>`;

    divContainer.appendChild(div);
  }
  let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
  if (carritoLocalStorage) {
    carritoNav(carritoLocalStorage);
  }
}

rellenarPaginas(productos);

let botones = document.querySelectorAll(".anadirCarrito");

botones.forEach((elemento) => {
  elemento.addEventListener("click", anadirCarrito);
});

function anadirCarrito(e) {
  let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));

  if (carritoLocalStorage) {
    carrito = carritoLocalStorage;
  }

  let index = carrito.findIndex(
    (producto) => producto.id == e.target.parentNode.parentNode.children[0].alt
  );

  let nombre = e.target.parentNode.children[0].textContent;
  let precio = e.target.parentNode.children[1].children[0].textContent;
  let imagen = e.target.parentNode.parentNode.children[0].src;
  let id = e.target.parentNode.parentNode.children[0].alt;

  if (index == -1) {
    const producto = new ProductoCarrito(nombre, precio, imagen, id);
    carrito.push(producto);
  } else {
    carrito[index].cantidad++;
    carrito[index].subtotal = carrito[index].precio * carrito[index].cantidad;
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  carritoNav(carrito);
}

function carritoNav(arrayCarrito) {
  let textoCarrito = document.getElementById("anchor_carrito");

  let totalProductos = 0;

  for (let producto of arrayCarrito) {
    totalProductos += producto.cantidad;
  }

  textoCarrito.innerHTML = "";
  textoCarrito.innerHTML = `<p>Carrito (${totalProductos})</p>`;
}
