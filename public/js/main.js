const filterProducts = (products, category) => {
    let filtered = products.filter((product) => product.category === category)
    return filtered
}

const hola = 'hola'

const addToCart = (id, name, price) => {
    let qty = 1
    let father = document.getElementById('shoopingCart')
    console.log(Array.from(father.childNodes))
    // father.childNodes
    // father.children

    let block = document.createElement('div')
    block.className = "singleProduct"
    block.innerHTML = `<p><i class="far fa-trash-alt"></i>${name}</p>
    <p>
        <i class="fas fa-chevron-circle-down"></i>
        ${qty}
        <i class="fas fa-chevron-circle-up"></i>
    </p>
    <p>$${price}</p>`
    father.appendChild(block)




    // < div class="singleProduct" >
    //                 <p><i class="far fa-trash-alt"></i>Harina 1kg.</p>
    //                 <p>
    //                     <i class="fas fa-chevron-circle-down"></i>
    //                     3
    //                     <i class="fas fa-chevron-circle-up"></i>
    //                 </p>
    //                 <p>$1.890</p>
    //             </div >
}

const confirmation = (id) => {
    alertify.confirm("¿Seguro que desea borrar este producto?",
        function () {
            fetch('/borrar-producto/' + id, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(response => {
                    if (response.success) {
                        document.getElementById(id).remove()
                        alertify.success('Producto borrado exitosamente.');
                    } else {
                        throw new Error()
                    }
                })
                .catch(err => alertify.error('Se presentó un problema. Intente más tarde'))
        },
        function () {
            alertify.error('Operación Cancelada');
        });
}