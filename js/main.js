//VARIABLES
let carrito = [];
const tbody = document.querySelector('.tbody'); //GUARDA EN 'tbody' EL CONTENIDO DE LA CLASE '.tbody'
const clickButton = document.querySelectorAll('.button'); //GUARDA TODOS LOS ELEMENTOS CON LA CLASE ".BUTTON"

/* ============== lectura de opciones ============ */

let radioVal;
const radios = document.querySelectorAll('input[name="radioOpcion"]');

radios.forEach(radio => {
    radio.addEventListener('click',function(){
        radioVal = radio.value;
 if(radioVal === 'enviar'){
            document.querySelector('#inputAddress').disabled=false;
            document.querySelector('#mzna').disabled=false;
            document.querySelector('#num').disabled=false;
            document.querySelector('#inputZip').disabled=false;
            document.querySelector('#inputState').disabled=false;
            /* let direccion = document.querySelector('input[id="inputAddres"]'); */
            /* console.log(direccion);       */
 }else{

    document.querySelector('#inputAddress').disabled=true;
    document.querySelector('#mzna').disabled=true;
    document.querySelector('#num').disabled=true;
    document.querySelector('#inputZip').disabled=true;
    document.querySelector('#inputState').disabled=true;

 }

})
})

/* =================================================== */

// FUNCION PARA AGREGAR EVENTO A LAS CATEGORIAS
// FRUTOS SECOS
function fs(){
    var someTabTriggerEl = document.querySelector('#pills-fs-tab')
    var tab = new bootstrap.Tab(someTabTriggerEl)
  
    tab.show()
}

// DULCES MIELES
function dm(){
    var someTabTriggerEl = document.querySelector('#pills-dm-tab')
    var tab = new bootstrap.Tab(someTabTriggerEl)
  
    tab.show()
}

// KETO
function k(){
    var someTabTriggerEl = document.querySelector('#pills-k-tab')
    var tab = new bootstrap.Tab(someTabTriggerEl)
  
    tab.show()
}

// BEBIDAS SALUDABLES
function bs(){
    var someTabTriggerEl = document.querySelector('#pills-bs-tab')
    var tab = new bootstrap.Tab(someTabTriggerEl)
  
    tab.show()
}

// BEBIDAS ACEITES
function a(){
    var someTabTriggerEl = document.querySelector('#pills-a-tab')
    var tab = new bootstrap.Tab(someTabTriggerEl)
  
    tab.show()
}

// FINALIZAR COMPRA
function finalizarCompra(){
    var someTabTriggerEl = document.querySelector('#pills-pago-tab')
    var tab = new bootstrap.Tab(someTabTriggerEl)
  
    tab.show()
}

// FOREACH PARA ESCUCHAR 'click' Y EJECUTAR "addItemCarrito"
clickButton.forEach(btn => {
    btn.addEventListener('click',addToCarritoItem);
})

// OBTENEMOS EL EVENTO QUE DISPARÓ EL 'click'
// Y CAPTURAMOS LOS ELEMENTOS PARA RENDERIZAR EL CARRITO
function addToCarritoItem(e){
    const button = e.target;
    const item = button.closest('.card');
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.item-valor').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    // GENERAMOS UN OBJETO LITERAL CON LOS ELEMENTOS OBTENIDOS
    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    // EJECUTAMOS LA FUNCION Y PASAMOS 'newItem' COMO PARAMETRO
    addItemCarrito(newItem);

}

// DEFINIMOS LA FUNCION
function addItemCarrito(newItem){
    

    // DEFINICION DE ALERT
    const alert = document.querySelector('.alert');
    setTimeout(function(){
        alert.classList.add('hide');
    }, 900)
    alert.classList.remove('hide');


    // ES UN ARRAY DE LOS ITEM AGREGADOS 
    const inputElement = tbody.getElementsByClassName('input__element');
    // 'for' QUE RECORRE 'carrito'
    for(let i = 0; i < carrito.length; i++){
        // COMPARA LOS 'title' Y SI SON IGUALES AGREGA 1 (UNA) UNIDAD A 'cantidad'
        if(carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad++;
            // GUARDA EL VALOR DE 'value'
            const inputValue = inputElement[i];
            inputValue.value++;
            carritoTotal()
            // ESTE 'null' EVITA QUE SE SIGA EJECUTANDO 'carrito.push' Y 'renderCarrito()' PORQUE NO SE DEBE RENDDERIZAR UN NUEVO ELEMENTO
            return null;
        }
    }
    // AGREGAMOS 'newItem' AL ARRAY 'carrito'
    carrito.push(newItem);
    
    // LLAMAMOS A LA FUNCION
    renderCarrito();
}

// DEFINIMOS LA FUNCION
function renderCarrito(){
    // HACEMOS QUE 'tbody' ESTÉ VACIO
    tbody.innerHTML = '';

    // CREA UN NUEVO ARRAY CON LOS VALORES MODIFICADOS
    carrito.map(item => {
        // CREA UN ELEMENTO 'tr'
        const tr = document.createElement('tr');
        // ASIGNA LA CLASE '.itemCarrito' AL ELEMENTO 'tr'
        tr.classList.add('itemCarrito');
        const content = `
            <tr>
            <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img} alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p>              
            </td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__element">
              <button class="delete btn btn-danger">x</button>
            </td>
          </tr>`
        // AGREGAR EL 'content' AL 'tr'
        tr.innerHTML = content;
        // AGREGAR EL 'tr' AL 'tbody'
        tbody.append(tr);
        // BUSCA EN 'tr' LA CLASE '.delete' Y ESCUCHA EL EVENTO 'click'. EJECUTA LA FUNCION
        tr.querySelector('.delete').addEventListener('click',removeItemCarrito);
        // BUSCA EN 'tr' LA CLASE 'input__element' Y ESCUCHA EL EVENTO 'change'. EJECUTA LA FUNCION
        tr.querySelector('.input__element').addEventListener('change',sumaCantidad);
    })
    carritoTotal();
}

function carritoTotal(){
    let total = 0;
    // GUARDA EN UNA VARIABLE EL ELEMENTO DONDE SE IMPRIME EL VALOR TOTAL DEL CARRITO
    const itemCarTotal = document.querySelector('.itemCarTotal');
    // GUARDA EN UNA VARIABLE EL ELEMENTO DONDE SE IMPRIMIRA EL VALOR EN EL CARRITO DE LA PAGINA PRINCIPAL
    const itemCarTotalCarrito = document.querySelector('.precioCarrito');
    // GUARDA EN UNA VARIABLE EL ELEMENTO DONDE SE IMPRIMIRA EL VALOR EN LA PESTAÑA DE PAGOS
    const itemCarTotalPago = document.querySelector('#cantPrevia');

    // RECORRE 'carrito', TOMA EL PRECIO, LO CONVIERTE A NUMERO Y LO SUMA
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$",''));
        total = total + precio*item.cantidad;
    })
    // RENDERIZA EL VALOR EN EL 'carrito'
    itemCarTotal.innerHTML = `Total $${total}`;
    itemCarTotalCarrito.innerHTML = `$${total}`;
    itemCarTotalPago.innerHTML = `$${total}`;
    addLocalStorage();
}
// REMUEVE EL ITEM SELECCIONADO, LO ELIMINA COMPLETAMENTE
function removeItemCarrito(e){
    // CAPTURA EL OBJETO QUE LANZO EL EVENTO
    const buttonDelete = e.target;
    // GUARDAMOS LA CLASE PADRE ('.itemCarrito') DEL BOTON
    const tr = buttonDelete.closest('.itemCarrito');
    // OBTENEMOS EL TITLE
    const title = tr.querySelector('.title').textContent;
    // RECORREMOS EL ARRAY
    for(let i=0; i < carrito.length; i++){
        // COMPARAMOS EL 'title' DE 'carrito' CON EL 'title' OBTENIDO DEL ELEMENTO AL QUE SE HIZO 'click' 
        if(carrito[i].title.trim() === title.trim()){
            // INDICAMOS LA POSICION EN EL ARRAY CARRITO [i] Y LA CANTIDAD (1) A BORRAR
            carrito.splice(i, 1)
        }
        
    }

    // DEFINICION DE ALERT
    const alert = document.querySelector('.remove');
    setTimeout(function(){
        alert.classList.add('remove');
    }, 900)
    alert.classList.remove('remove');

    // CON ESTO LO ELIMINAMOS DEL RENDERIZADO, PERO TAMBIEN SE DEBE ELIMINAR DEL ARRAY 'carrito', DEL TOTAL
    tr.remove();
    carritoTotal();
}

function sumaCantidad(e){
    // CAPTURA EL OBJETO
    const sumaInput = e.target;
    // BUSCA LA CLASE PADRE 'itemCarrito'
    const tr = sumaInput.closest('.itemCarrito');
    // OBTENEMOS EL CONTENIDO DEL TITLE
    const title = tr.querySelector('.title').textContent;

    // RECORREMOS CARRITO
    carrito.forEach(item => {
        // COMPARAMOS LOS TITLE
        if(item.title.trim() === title){
            // VALIDAMOS QUE NO SE PUEDA UTILIZAR UN VALOR MENOR A 1
            // SI 'sumaInput.value' < 1 HACEMOS QUE VALGA 1, CASO CONTRARIO SE ACEPTA EL VALOR
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;

            carritoTotal();
        }
})
}



/***************
* local storage *
****************/

// GUARDA DENTRO DE LOCAL STORAGE 
function addLocalStorage(){
    /* SETITEM ALMACENA LA LLAVE 'carrito' (nombre con que se identificara la variable que se quiere
    guardar en localStorage) Y (carrito) ES LA VARIABLE A ALMACENAR, QUE CON EL METODO 'stringify'
    CONVERTIMOS A JSON */
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// SE EJECUTA CUANDO SE REFRESCA LA PANTALLA
window.onload = function(){
    // 'getItem' DEVUELVE EL VALOR 'carrito' SI EXISTE EN LOCALSTORAGE, LO PARSEA PARA CONVERTIRLO A OBJETO JS.
    const storage = JSON.parse(localStorage.getItem('carrito'));
    // SI 'storage' EXISTE, HACEMOS QUE EL ARRAY PRINCIPAL 'carrito' TOME SU VALOR, Y LLAMA A LA FUNCION 'renderCarrito'
    if(storage){
        carrito = storage;
        renderCarrito()
    }
}

 /**************
  *    AJAX POST   *
  **************/

  /* var articulos = [];
  $.ajax({
    url: "./datos.json",
    dataType: "json",
    success: (response) => {
      cargarDatos(response, articulos);
    },
  }); */





