//Lista de productos

const productos=[
    {
    id:1,
    nombre: "Honey",
    categoria: "cerveza",
    precio: 450,
    color:"rubia",
    img:'img/Lata-Honey.gif' ,
    descripcion:"Perfecta armonía entre la rica calidez de la miel fresca y el carácter refrescante de una cerveza artesanal, cada sorbo es un viaje sensorial único. Sumérgete en la suavidad dorada y déjate cautivar por el delicado dulzor de la miel que se entrelaza con notas sutiles de malta y lúpulo" ,
    },
    {
    id:2,
    nombre:"Session Ipa",
    categoria: "cerveza",
    precio:520,
    color:"rojizo",
    img:'img/Lata-session-ipa.gif',
    descripcion: "Aromas tostados y las notas de café se fusionan en un baile intrigante. Un viaje hacia lo desconocido, con matices profundos de chocolate negro y un toque sutil de ahumado que despiertan tus sentidos",
    },
    {
    id:3,
    nombre:"England Ipa",
    categoria:"cerveza",
    precio:450,
    color:"rubia",
    img:'img/Lata-England-Ipa.gif',
    descripcion:"Lúpulos ingleses cuidadosamente seleccionados que dan vida a esta cerveza única. Notas florales y terrosas que te transportarán a los campos de lúpulo del Reino Unido. Nuestra England IPA equilibra magistralmente el amargor característico con toques suaves de malta, creando una experiencia de sabor equilibrada y distintiva",
    },
    {
    id:4,
    nombre:"dubbel",
    categoria:"cerveza",
    precio:430,
    color:"rubia",
    img: 'img/Dubbel.jpeg',
    descripcion:"Con notas cálidas de caramelo y frutas oscuras que bailan en tu paladar. Nuestra Belgian Dubbel equilibra magistralmente la dulzura con un toque especiado y un sutil regusto a levadura belga, creando una sinfonía de sabores complejos",
    },
    {
    id:5,
    nombre:"Scotish",
    categoria:"cerveza",
    precio:650,
    color:"rojizo",
    img:'img/Lata-scotish.gif',
    descripcion:"Nuestra Scottish Ale cautiva tus sentidos con notas cálidas de caramelo y toffee, y un suave matiz de turba que evoca los elementos naturales de Escocia. Ya sea que estés disfrutando de una tarde tranquila o celebrando momentos especiales, esta cerveza te brinda un vistazo a la autenticidad de Escocia en cada deleite",
    },
    {
    id:6,
    nombre:"porter",
    categoria:"ceverza",
    precio:500,
    color:"negro",
    img:'img/porter.jpg',
    descripcion:"Nuestra Porter te transporta a ambientes acogedores, con notas de café recién hecho y un toque sutil de vainilla que añade un matiz suave a la intensidad oscura. Cada trago es una experiencia de texturas aterciopeladas y complejidad, creando un equilibrio perfecto entre el amargor y el dulzor",
    },
    {
    id:7,
    nombre:"neipa",
    categoria:"cerveza",
    precio:470,
    color:"rubia",
    img:'img/neipa.png',
    descripcion:"Jugosas notas tropicales y turbidez seductora. Cada sorbo es como un sorprendente paseo por un huerto de frutas tropicales, con explosiones de mango, maracuyá y cítricos que bailan en tu paladar. Nuestra NEIPA equilibra hábilmente la suavidad sedosa con un amargor suave, creando una experiencia de sabor que desafía las expectativas",
    }
];



const contenedor = document.querySelector("#contenedor-productos");
//console.log(contenedor);

//Armado lista productos
productos.forEach( p =>{
   const div = document.createElement("div");
   div.classList.add("tarjeta");
   
   div.innerHTML = `
   <img src="${p.img}" alt="Cerveza ${p.nombre}">
   <h3>${p.nombre}</h3>
   <p>${p.descripcion}</p>
       
   
       <label for="" id="price">$${p.precio}</label>
    <div class="cantidad">
       <label for="">Cant: </label>
       <input type="number" id="cant" value="1" min="0">
   </div>
   `
const btnAgregar = document.createElement("button");
btnAgregar.classList.add("button-42","btn-agregar");
btnAgregar.innerText = "Agregar al Carrito";
contenedor.appendChild(div);
div.appendChild(btnAgregar);
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



    
    

    
    

