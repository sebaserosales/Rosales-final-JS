const productos=[
    {
    id:1,
    nombre: "honey",
    categoria: "cerveza",
    precio: 450,
    color:"rubia",
    img:'img/honey.jpeg' ,
    descripcion:"Perfecta armonía entre la rica calidez de la miel fresca y el carácter refrescante de una cerveza artesanal, cada sorbo es un viaje sensorial único. Sumérgete en la suavidad dorada y déjate cautivar por el delicado dulzor de la miel que se entrelaza con notas sutiles de malta y lúpulo" ,
    },
    {
    id:2,
    nombre:"strobel",
    categoria: "cerveza",
    precio:520,
    color:"rojizo",
    img:'img/strobel.jpeg',
    descripcion: "Aromas tostados y las notas de café se fusionan en un baile intrigante. Un viaje hacia lo desconocido, con matices profundos de chocolate negro y un toque sutil de ahumado que despiertan tus sentidos",
    },
    {
    id:3,
    nombre:"englandIpa",
    categoria:"cerveza",
    precio:450,
    color:"rubia",
    img:'img/ipa.jpg',
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
    nombre:"scotish",
    categoria:"cerveza",
    precio:650,
    color:"rojizo",
    img:'img/scotish.jpeg',
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

const carrito = [];

const contenedor = document.querySelector("#contenedor-productos");
console.log(contenedor);
 
productos.forEach( p =>{
   const div = document.createElement("div");
   div.classList.add("tarjeta");
   
   div.innerHTML = `
   <img src="${p.img}" alt="Cerveza ${p.nombre}">
   <h3>${p.nombre}</h3>
   <p>${p.descripcion}</p>
       
   <div class="precioCantidad">
       <label for="">$${p.precio} &nbsp;  </label>
       <label for="">Cant: &nbsp; </label>
       <input type="number" value="1" min="0">
   </div>
   `
const btnAgregar = document.createElement("button");
btnAgregar.classList.add("button-42");
btnAgregar.innerText = "Agregar al Carrito";
btnAgregar.addEventListener("click",()=>{
    carrito.push(p);
})


contenedor.appendChild(div);
div.appendChild(btnAgregar); 
})
console.log(carrito);


