const filterProducts = (category) => {
    let allProducts = Array.from(document.getElementById('productsToFilter').children)
    allProducts.forEach((product) => {
        if (product.className.includes(category) || category == "Todos") {
            product.classList.remove('hidden')
        } else {
            product.classList.add('hidden')
        }
    })
}

let products = []
const updateTotal = () => {
    let totalUnits = products.reduce((total, product) => {
        total += product.qty
        return total
    }, 0)
    document.getElementById('totalUnits').innerText = totalUnits

    let totalPrice = products.reduce((total, product) => {
        total += product.price * product.qty
        return total
    }, 0)
    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    });
    document.getElementById('totalPrice').innerText = formatter.format(totalPrice)
    document.getElementById('productsInput').value = JSON.stringify(products)
}

const addToCart = (id, name, price, stock, rest = false) => {
    let qty = 1
    if (products.some(product => product.product === id)) {
        let chosen = products.find(product => product.product == id)
        if (rest) {
            if (chosen.qty > 1) {
                chosen.qty -= 1
            }
        } else {
            if (chosen.qty < stock) {
                chosen.qty += 1
            }
        }
        document.getElementById(id).innerText = chosen.qty
    } else {
        products.push({ product: id, qty, price })
        let father = document.getElementById('shoopingCart')
        let block = document.createElement('div')
        block.className = "singleProduct"
        block.id = name
        block.innerHTML = `<p><i onclick="deleteProduct('${name}', '${id}')" class="far fa-trash-alt"></i>${name}</p>
        <p>
            <i class="fas fa-chevron-circle-down" onclick="addToCart('${id}', '${name}', '${price}','${stock}', true)"></i>
            <span id="${id}">${qty}</span>
            <i class="fas fa-chevron-circle-up" onclick="addToCart('${id}', '${name}', '${price}', '${stock}')"></i>
        </p>
        <p>$${price}</p>`
        father.appendChild(block)
    }
    updateTotal()
}

const deleteProduct = (name, id) => {
    products = products.filter((product) => product.product !== id)
    document.getElementById(name).remove()
    updateTotal()
}

const changeMethod = (method, id) => {
    document.getElementById('paymentInput').value = method
    let buttons = Array.from(document.getElementsByClassName('paymentButton'))
    buttons.forEach((button) => button.classList.remove('selected'))
    document.getElementById(id).classList.add("selected")
}

const clearCart = () => {
    products = []
    document.getElementById('shoopingCart').innerHTML = ''
}

const confirmation = (id) => {
    alertify.confirm("??Seguro que desea borrar este producto?",
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
                .catch(err => alertify.error('Se present?? un problema. Intente m??s tarde'))
        },
        function () {
            alertify.error('Operaci??n Cancelada');
        });
}

const closeAlert = () => {
    document.getElementById('errorContainer').remove()
}
