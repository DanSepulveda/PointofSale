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