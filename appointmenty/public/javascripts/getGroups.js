const facInput = document.getElementById("facultad")

$(document).on('change', '#facultad', function() {
    const id = $(this).data('id');
    $.ajax({
        url: 'groups/',
        type: 'GET',
        success: function(response) {
            console.log(response.resultado);

            var o = new Option(response.resultado[0].nombre, 1);
            /// jquerify the DOM object 'o' so we can use the html method
            $(o).html(response.resultado[0].nombre);
            $("#prueba").append(o);

            $('#prueba').append($('<option>', {
                value: 1,
                text: response.resultado[0].nombre
            },'</option>'));
            $('#prueba').append($('<option>', {
                value: 1,
                text: response.resultado[1].nombre
            }));
            $('#prueba').append($('<option>', {
                value: 1,
                text: response.resultado[2].nombre
            }));

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    })
    document.getElementById("prueba").style.display = null;
    // document.getElementById("prueba").visible = "true"
})
