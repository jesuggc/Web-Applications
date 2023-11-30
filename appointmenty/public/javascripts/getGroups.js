const facInput = document.getElementById("facultad")

$(document).on('change', '#facultad', function() {
    let value = $(this).val();
    
    $.ajax({
        url: 'group/' + value,
        type: 'GET',
        success: function(response) {
            $('#grado').empty();
            $('#grado').append("<option hidden selected>Selecciona una opción</option>");
            response.resultado.forEach(ele => {
            $('#grado').append($('<option>', {
                value: ele.dobleGrado + "#" + ele.nombre,
                text: ele.nombre
            },'</option>'));
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
    $('#grado').append("<option hidden selected>Selecciona una opción</option>");
    for(let i = 1; i <= 4 + 2*value; i++) {
        $('#curso').append($('<option>', {
            value: i,
            text: `Curso ${i}`
        },'</option>'));
    }
    $('#cursoDiv').removeClass('d-none');
})