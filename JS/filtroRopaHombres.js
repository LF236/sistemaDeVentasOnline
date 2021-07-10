let cajaProductos = document.getElementById('boxProductos')
let buttonPlayeras = document.getElementById('btnPlayeras')
let buttonCamisas = document.getElementById('btnCamisas')
let buttonPantalones = document.getElementById('btnPantalones')
let buttonSueteres = document.getElementById('btnSueteres')
let buttonTennis = document.getElementById('btnTennis')
let buttonAccesorios = document.getElementById('btnAccesorios')

//---------------Cambio del titulo en el banner-----------------
const cambiarTituloBanner = (name) => {
    //Obtenemos el elementos en el cual cambiaremos de nombre
    let bannerTituloProducto = document.getElementById('titulo_producto')
    bannerTituloProducto.innerHTML = name
}

//Esta funcion es usada para poder eliminar la clase y que el elemento reaparezca en el menú
const eliminarClasePop = () => {
    let button = document.getElementsByClassName('listaElementos_item')
    for(let buttons of button){
        buttons.classList.remove('popTitle')
    }

}

//----------Filtro de elementos-----------------------------------
const imprimirTodosLosElementos = data => {
    cajaProductos.innerHTML = ''
    let aux = document.createDocumentFragment()
    for(let i = 0; i < 10; i++) {
        for(let key in data){
            const contenedor = document.createElement('div')
            const precio = document.createElement('p')   
            const img = document.createElement('img')
            const nombre = document.createElement('a')

            contenedor.classList.add('elementos_item')
            precio.innerHTML = data[key][i].Precio
            img.src = data[key][i].LinkImg
            nombre.innerHTML = data[key][i].Nombre
            nombre.href = "#"
            
            contenedor.appendChild(precio)
            contenedor.appendChild(img)
            contenedor.appendChild(nombre)
            
            aux.appendChild(contenedor)
        }
    }

    cajaProductos.appendChild(aux)
    
}

const cargaContenidoPrincipal = a => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', '../JSON/hombresProductos.json',true)
    xhr.addEventListener('load',e => {
        //console.log(e.target)
        let data = JSON.parse(e.target.responseText)
        imprimirTodosLosElementos(data)
    })

    xhr.send()
}

const filtrarElementos = (data,filtro) => {
    cajaProductos.innerHTML = ''
    let aux = document.createDocumentFragment()
    data[filtro].forEach(el => {
        const contenedor = document.createElement('div')
        const precio = document.createElement('p')
        const img = document.createElement('img')
        const nombre = document.createElement('a')

        contenedor.classList.add('elementos_item')
        precio.innerHTML = el.Precio
        img.src = el.LinkImg
        nombre.innerHTML = el.Nombre
        nombre.href = "#"

        contenedor.appendChild(precio)
        contenedor.appendChild(img)
        contenedor.appendChild(nombre)
        aux.appendChild(contenedor)
    })
    cajaProductos.appendChild(aux)
}

buttonPlayeras.addEventListener('click', () => {
    

    let xhr = new XMLHttpRequest()
    xhr.open('GET',"../JSON/hombresProductos.json",true)
    xhr.addEventListener('load', e => {
        let data = JSON.parse(e.target.responseText)
        filtrarElementos(data,"Playeras")
    })
    xhr.send()
    //Eliminamos el botton de la lista
    buttonPlayeras.classList.add('popTitle')
})

buttonCamisas.addEventListener('click', () => {
    eliminarClasePop()
    cambiarTituloBanner("Camisas")

    let xhr = new XMLHttpRequest()
    xhr.open('GET','../JSON/hombresProductos.json',true)
    xhr.addEventListener('load', e => {
        let data = JSON.parse(e.target.responseText)
        filtrarElementos(data,"Camisas")
    })
    xhr.send()
    //Eliminamos el botton de la lista
    buttonCamisas.classList.add('popTitle')
})

buttonPantalones.addEventListener('click', () => {
    eliminarClasePop()
    cambiarTituloBanner("Pantalones")

    let xhr = new XMLHttpRequest()
    xhr.open('GET','../JSON/hombresProductos.json')
    xhr.addEventListener('load', e => {
        let data = JSON.parse(e.target.responseText)
        filtrarElementos(data,"Pantalones")
    })
    xhr.send()
    //Eliminamos el botton de la lista
    buttonPantalones.classList.add('popTitle')
})

buttonSueteres.addEventListener('click', () => {
    eliminarClasePop()
    cambiarTituloBanner("Sueteres")

    let xhr = new XMLHttpRequest()
    xhr.open('GET','../JSON/hombresProductos.json',true)
    xhr.addEventListener('load', e => {
        let data = JSON.parse(e.target.responseText)
        filtrarElementos(data,"Sueteres")
    })
    xhr.send()
    //Eliminamos el botton de la lista
    buttonSueteres.classList.add('popTitle')
})

buttonTennis.addEventListener('click', () => {
    eliminarClasePop()
    cambiarTituloBanner("Tennis")

    let xhr = new XMLHttpRequest()
    xhr.open('GET','../JSON/hombresProductos.json',true)
    xhr.addEventListener('load', e => {
        let data = JSON.parse(e.target.responseText)
        filtrarElementos(data,"Tennis")
    })
    xhr.send()
    //Eliminamos el botton de la lista
    buttonTennis.classList.add('popTitle')
})

buttonAccesorios.addEventListener('click', () => {
    eliminarClasePop()
    cambiarTituloBanner("Accesorios")

    let xhr = new XMLHttpRequest()
    xhr.open('GET','../JSON/hombresProductos.json',true)
    xhr.addEventListener('load', e => {
        let data = JSON.parse(e.target.responseText)
        filtrarElementos(data,"Accesorios")
    })
    xhr.send()
    //Eliminamos el botton de la lista
    buttonAccesorios.classList.add('popTitle')
})

//Ese metodo se activa siempre que cargue la pàgina
cargaContenidoPrincipal(21)