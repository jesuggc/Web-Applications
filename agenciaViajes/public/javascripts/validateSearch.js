$(document).ready(function(){
    
    $('#btnSearch').click(function(e){
        e.preventDefault(); // Evita la recarga de la página
        let destino = $("#search").val()
        $.ajax({
            url: '/checkDestino',
            type: 'GET',
            data: {destino},
            success: function(response) {
                console.log(response)
                if(!response.existe)
                {
                    $("#formSearch").prepend(`<h3 id="mensaje-error">No existe el destino buscado</h3>`)
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        })
    })
    $('#search').focus(function() {
        // Oculta o elimina el mensaje de error cuando el usuario hace clic en el campo de búsqueda
        $('#mensaje-error').hide(); // o $('#mensajeError').remove(); para eliminarlo del DOM
    });

})