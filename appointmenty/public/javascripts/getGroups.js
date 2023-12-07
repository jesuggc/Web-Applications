const facInput = document.getElementById("facultad")

$(document).on('change', '#facultad', function() {
    let value = $(this).val();
    $.ajax({
        url: '/group/' + value,
        type: 'GET',
        success: function(response) {
            $('#grado').empty(); //Si cambia de un grado a otro que no se queden los anteriores
            $('#grado').append("<option hidden selected>Selecciona una opción</option>");
            response.resultado.forEach(ele => {
                $('#grado').append(`<option value="${ele.dobleGrado}#${ele.nombre}#${ele.id}"> ${ele.nombre} </option>`)
            });
            $('#gradoDiv').removeClass('d-none');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    })
})


$(document).on('change', '#grado', function() {
    let value = $(this).val().split("#")[0];
    $('#curso').empty();
    $('#curso').append("<option hidden selected>Selecciona una opción</option>");
    for(let i = 1; i <= 4 + 2*value; i++) {
        $('#curso').append(`<option value="${i}"> Curso ${i} </option>`)
    }
    $('#cursoDiv').removeClass('d-none');
})