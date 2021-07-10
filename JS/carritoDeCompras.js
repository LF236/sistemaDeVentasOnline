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
                ele.textContent = 'Cantidad de elementos: 1'
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
