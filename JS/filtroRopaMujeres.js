let cajaProductos = document.getElementById('boxProductos')
let buttonPlayeras = document.getElementById('btnPlayeras')
let buttonCamisas = document.getElementById('btnCamisas')
let buttonPantalones = document.getElementById('btnPantalones')
let buttonSueteres = document.getElementById('btnSueteres')
let buttonTennis = document.getElementById('btnTennis')
let buttonAccesorios = document.getElementById('btnAccesorios')

//Libreria Ajax
const request = petition => {
    return new Promise((resolve,reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(petition.method, petition.url,true)
        xhr.addEventListener('load', e => {
            resolve(e.target.responseText)
        })
        xhr.send()
    })
}
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
            let idKey = key + i
            const contenedor = document.createElement('div')
            const precio = document.createElement('p')   
            const img = document.createElement('img')
            const nombre = document.createElement('a')

            contenedor.classList.add('elementos_item')
            precio.innerHTML = data[key][i].Precio
            img.src = data[key][i].LinkImg
            nombre.innerHTML = data[key][i].Nombre
            nombre.href = "#"
            nombre.id = idKey
            nombre.className = "buttonElementItem"
            contenedor.appendChild(precio)
            contenedor.appendChild(img)
            contenedor.appendChild(nombre)
            
            aux.appendChild(contenedor)
            //console.log(idKey)
        }
    }

    cajaProductos.appendChild(aux)
    
}

const cargaContenidoPrincipal = async a => {
    let data = await (request({method : 'GET', url : '../JSON/mujeresProductos.json'}))
    imprimirTodosLosElementos(JSON.parse(data))
    loadButtonsOfBuy()
}

const filtrarElementos = (data,filtro) => {
    cajaProductos.innerHTML = ''
    let aux = document.createDocumentFragment()
    let i = 0
    data[filtro].forEach(el => {
        const contenedor = document.createElement('div')
        const precio = document.createElement('p')
        const img = document.createElement('img')
        const nombre = document.createElement('a')
        let key = filtro + i
        contenedor.classList.add('elementos_item')
        precio.innerHTML = el.Precio
        img.src = el.LinkImg
        nombre.innerHTML = el.Nombre
        nombre.href = "#"
        nombre.id = key
        nombre.className = "buttonElementItem"
        contenedor.appendChild(precio)
        contenedor.appendChild(img)
        contenedor.appendChild(nombre)
        aux.appendChild(contenedor)
        i += 1
    })
    cajaProductos.appendChild(aux)
}

buttonPlayeras.addEventListener('click', async () => {
    let data = await request({method : 'GET', url : '../JSON/mujeresProductos.json'})
    filtrarElementos(JSON.parse(data),"Playeras")
    buttonPlayeras.classList.add('popTitle')
    loadButtonsOfBuy()
})

buttonCamisas.addEventListener('click', async () => {
    eliminarClasePop()
    cambiarTituloBanner("Camisas")
    let data = await request({method : 'GET', url : '../JSON/mujeresProductos.json'})
    filtrarElementos(JSON.parse(data),"Camisas")
    //Eliminamos el botton de la lista
    buttonCamisas.classList.add('popTitle')
    loadButtonsOfBuy()
})

buttonPantalones.addEventListener('click', async () => {
    eliminarClasePop()
    cambiarTituloBanner("Pantalones")
    let data = await request({method : 'GET', url : '../JSON/mujeresProductos.json'})
    filtrarElementos(JSON.parse(data),"Pantalones")
    //Eliminamos el botton de la lista
    buttonPantalones.classList.add('popTitle')
    loadButtonsOfBuy()
})

buttonSueteres.addEventListener('click', async () => {
    eliminarClasePop()
    cambiarTituloBanner("Sueteres")
    let data = await request({method : 'GET', url : '../JSON/mujeresProductos.json'})
    filtrarElementos(JSON.parse(data),"Sueteres")
    //Eliminamos el botton de la lista
    buttonSueteres.classList.add('popTitle')
    loadButtonsOfBuy()
})

buttonTennis.addEventListener('click', async () => {
    eliminarClasePop()
    cambiarTituloBanner("Tennis")
    let data = await request({method : 'GET', url : '../JSON/mujeresProductos.json'})
    filtrarElementos(JSON.parse(data),"Tennis")
    //Eliminamos el botton de la lista
    buttonTennis.classList.add('popTitle')
    loadButtonsOfBuy()
})

buttonAccesorios.addEventListener('click', async () => {
    eliminarClasePop()
    cambiarTituloBanner("Accesorios")
    let data = await request({method : 'GET', url : '../JSON/mujeresProductos.json'})
    filtrarElementos(JSON.parse(data),"Accesorios")
    //Eliminamos el botton de la lista
    buttonAccesorios.classList.add('popTitle')
    loadButtonsOfBuy()
})

//Ese metodo se activa siempre que cargue la pàgina
cargaContenidoPrincipal(21)

// ----------------------- Carrito de compras -------------
let modalCompra = document.getElementById('modalCompra')
let buttonCloseModalCompra = document.getElementById('close-modal-compra')
let buttonOpenModalCompra = document.getElementById('openCart-open')
let arregloDeProductosEnCarrito = []

buttonOpenModalCompra.addEventListener('click', () => {
    modalCompra.classList.add('close-modal-compra')
    buttonOpenModalCompra.style.transform = 'scale(0)'
    
})

buttonCloseModalCompra.addEventListener('click', () => {
    modalCompra.classList.remove('close-modal-compra')
    buttonOpenModalCompra.style.transform = 'scale(1)'
})

const loadButtonsOfBuy = () => {
    const buttonsItems = [...document.getElementsByClassName('buttonElementItem')]
    
    buttonsItems.forEach(el => {
        let idButtonItems = el.id
        let aux = document.getElementById(idButtonItems)
        aux.addEventListener('click', () => {
            let price = el.parentElement.getElementsByTagName("p")[0].innerText
            let nameOfProduct = el.innerText
            let img = el.parentElement.getElementsByTagName("img")[0].src
            if(arregloDeProductosEnCarrito.includes(nameOfProduct)){
                console.log("Producto Listo en carrito")
            }
            else{
                //Aumentar el numemero de elementos arriba del carrito
                buttonOpenModalCompra.style.setProperty('--count-elements',`"${arregloDeProductosEnCarrito.length + 1}"`)
                //Imprimir el elementos en el carrito
                let box = document.createElement('div')
                box.classList.add('modalCompra-item')
                let boxItems = document.createElement('div')
                boxItems.classList.add('modalCompra-item-data')
                let boxBuy = document.createElement('div')
                boxBuy.classList.add('modalCompra-item-buy')

                let nombreProducto = document.createElement('h3')
                nombreProducto.textContent = nameOfProduct
                let imagen = document.createElement('img')
                imagen.src = img
                boxItems.appendChild(nombreProducto)
                boxItems.appendChild(imagen)

                let cantElementos = document.createElement('p')
                let iconMas = document.createElement('span')
                iconMas.classList.add('icon')
                iconMas.classList.add('icon-plus')
                let iconMenos = document.createElement('span')
                iconMenos.classList.add('icon')
                iconMenos.classList.add('icon-minus')
                cantElementos.appendChild(iconMas)
                let ele = document.createElement('span')
                ele.textContent = 'Cantidad de elementos: '
                let spanOfNoElements = document.createElement('span')
                spanOfNoElements.textContent = '1'
                ele.appendChild(spanOfNoElements)
                cantElementos.appendChild(ele)
                cantElementos.appendChild(iconMenos)

                let precio = document.createElement('p')
                precio.textContent = `Precio : ${price}`
                boxBuy.appendChild(cantElementos)
                boxBuy.appendChild(precio)

                box.appendChild(boxItems)
                box.appendChild(boxBuy)

                console.log(box)
                modalCompra.appendChild(box)
                arregloDeProductosEnCarrito.push(nameOfProduct)

            }
        })
    })
    
}

const moreAndless = () => {
    let buttonsMore = [... document.getElementsByClassName('icon-plus')]
    
    console.log(buttonsMore)
    buttonsMore.forEach(buttonMore => {
        buttonMore.addEventListener('click', () => {
            let countOfBuys = parseInt(buttonMore.nextElementSibling.lastChild.innerHTML)
            console.log(countOfBuys)
            countOfBuys += 1
            let parentButtonmore = buttonMore.nextSibling
            parentButtonmore.lastChild.innerHTML = `${countOfBuys}`
        })
    })
}