const filterProducts = (products, category) => {
    let filtered = products.filter((product) => product.category === category)
    return filtered
}

let products = []
const addToCart = (id, name, price) => {
    let qty = 1
    if (products.some(product => product.product === id)) {
        let chosen = products.find(product => product.product == id)
        chosen.qty += 1
        document.getElementById(id).innerText = chosen.qty
    } else {
        products.push({ product: id, qty, price })
        let father = document.getElementById('shoopingCart')
        let block = document.createElement('div')
        block.className = "singleProduct"
        // block.id = id
        block.innerHTML = `<p><i class="far fa-trash-alt"></i>${name}</p>
        <p>
            <i class="fas fa-chevron-circle-down"></i>
            <span id="${id}">${qty}</span>
            <i class="fas fa-chevron-circle-up"></i>
        </p>
        <p>$${price}</p>`
        father.appendChild(block)
    }
    let totalUnits = products.reduce((total, product) => {
        total += product.qty
        return total
    }, 0)
    document.getElementById('totalUnits').innerText = totalUnits

    let totalPrice = products.reduce((total, product) => {
        total += product.price * product.qty
        return total
    }, 0)
    // Create our number formatter.
    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    });
    document.getElementById('totalPrice').innerText = formatter.format(totalPrice)
    document.getElementById('productsInput').value = JSON.stringify(products)
    console.log(products)
}

const changeMethod = (method, id) => {
    document.getElementById('paymentInput').value = method
    let buttons = Array.from(document.getElementsByClassName('paymentButton'))
    buttons.forEach((button) => button.classList.remove('selected'))
    document.getElementById(id).classList.add("selected")

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

const closeAlert = () => {
    document.getElementById('errorContainer').remove()
}