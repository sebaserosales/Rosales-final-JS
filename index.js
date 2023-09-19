const contenedor = document.querySelector("#contenedor-productos");

window.addEventListener("load",()=>{
    Swal.fire({
        title: 'Que edad tienes?',
        icon: 'question',
        input: 'range',
        inputLabel: 'Your age',
        inputAttributes: {
          min: 8,
          max: 120,
          step: 1
        },
        inputValue: 25
      }).then((result)=>{
        
        if(parseInt(result.value) <18){
            Swal.fire({
            icon:'error',
            text:'No tenes la edad suficiente para beber alcohol',
            allowOutsideClick: false,
            showConfirmButton: false,
            allowEscapeKey: false
        });
        }        
      })
});
//Armado lista productos
fetch('./ddbb.json')
    .then((res) => res.json())
    .then( (ddbb)=> { 
        ddbb.forEach( p =>{
        const div = document.createElement("div");
        div.classList.add("tarjeta");
        
        div.innerHTML = `
        <img src="${p.img}" alt="Cerveza ${p.nombre}">
        <h3>${p.nombre}</h3>
            <label for="" id="price" class="precio">$${p.precio}</label>
            <div class="cantidad">
            <label for="" class="cant">Cant: </label>
            <input type="number" id="cant" value="1" min="0">
        </div>
        `
        const btnAgregar = document.createElement("button");
        btnAgregar.classList.add("button-42","btn-agregar");
        btnAgregar.innerText = "Agregar";
        contenedor.appendChild(div);
        div.appendChild(btnAgregar);
        })
    })

//Llenado carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


contenedor.addEventListener("click", e=>{
    if(e.target.classList.contains("btn-agregar")){
        const producto = e.target.parentElement;

        const infoProducto ={
            cantidad: parseInt(producto.querySelector("#cant").value),
            nombre: producto.querySelector('h3').textContent,
            precio: producto.querySelector("#price").textContent,
        };

        //Verificacion si ya fue agregado

        const existe = carrito.some(p => p.nombre === infoProducto.nombre)
        if(existe){
            const product = carrito.map(p => {
                if(p.nombre === infoProducto.nombre){
                    p.cantidad += parseInt(infoProducto.cantidad);
                    return p;
                }
                else{
                    return p;
                }
            })
            carrito=[...product];
            localStorage.setItem("carrito",JSON.stringify(carrito));
        }
        else{
            carrito = [...carrito,infoProducto];
            localStorage.setItem("carrito",JSON.stringify(carrito));
        }
        //Mostrar confirmacion de agregado
        Toastify({
            text: "Producto agregado :)",
            duration: 2000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            
          }).showToast();
          let totalProductos=0;
          carrito.forEach((e)=>{
            totalProductos += e.cantidad;
          })
          abrirCarrito.setAttribute("value",totalProductos);
        
    }
    
})

//mostrar carrito
const carritoCompras=document.getElementById("carritoCompras");
const abrirCarrito = document.getElementById("carritoIcon");
const span = document.getElementsByClassName("cerrar")[0];
const contenidoCarritoProductos = document.querySelector(".contenidoCarritoProductos");
abrirCarrito.addEventListener("click",()=>{
    showHTML();
    carritoCompras.style.display="block";
});

span.addEventListener("click",()=>{
    carritoCompras.style.display ="none";
});

window.addEventListener("click",(e)=>{
    if (e.tarjet == carritoCompras){
        carritoCompras.style.display="none";
    }
});

function showHTML() {
    contenidoCarritoProductos.innerHTML=``;
    if(!carrito.length){
         const vacio=document.createElement("h3");
         vacio.textContent = "El carrito esta vacío";
         contenidoCarritoProductos.appendChild(vacio);
        }
        let total=0;
        let cantTotal=0;
    carrito.forEach(p=>{
    
        const anadirProducto = document.createElement("div");
        anadirProducto.classList.add("contenidoCarritoProductosLista");
        anadirProducto.innerHTML=`
        <span>${p.cantidad}</span> <span class="nombre">${p.nombre}</span> <span>${p.precio}</span> <span class="eliminarProducto">&times;</span> <br>`;
        contenidoCarritoProductos.appendChild(anadirProducto);
        //Calculo totales
        total = total + (parseInt(p.precio.slice(1)) * parseInt(p.cantidad));
        cantTotal = cantTotal + parseInt(p.cantidad);
        
        
    });
    abrirCarrito.setAttribute("value",cantTotal);
    const divTotalPagar = document.createElement("div");
    divTotalPagar.classList.add("totalPagar");
    divTotalPagar.innerHTML = `<br> <p> Total $${total}`;
    contenidoCarritoProductos.appendChild(divTotalPagar);
};

//Eliminar Producto del carrito
contenidoCarritoProductos.addEventListener("click",(e)=>{
    if(e.target.classList.contains("eliminarProducto")){
        const product=e.target.parentElement;
        const nombre= product.querySelector(".nombre").textContent;

        carrito = carrito.filter(p => p.nombre !== nombre);
        contenidoCarritoProductos.innerHTML=``;
        localStorage.setItem("carrito",JSON.stringify(carrito));
        showHTML();
    }
})



    
    

    
    

