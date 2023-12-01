$(document).ready(function(){
    $('#postComment').click(function(){
        let comment = $("#textArea").val()
        let id = $('#destino').data('id')
        $.ajax({
            url: 'postComment',
            type: 'POST',
            data: {comment,id},
            success: function(response) {
                // -------------------------
                var nuevoComentario = $('<div class="card my-2"></div>');

                nuevoComentario.append(`
                    <div class="card-header">
                        <div class="justify-content-between d-flex">
                            <h3>${response.nombre}</h3>
                            <h3>${response.fecha}</h3>
                        </div>
                        <div class="d-flex">
                            <a id="likes" data-id="${response.id}" href="/"><img style="max-height: 1em;" src="images/nothumbup.png"></a>
                            <p> A ${response.likes} personas les ha resultado útil </p>
                        </div>
                    </div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <p>${response.comentario}</p>
                            <footer class="blockquote-footer">${response.hora}</footer>
                        </blockquote>
                    </div>
                `);
    
                $('#comentariosContainer').prepend(nuevoComentario);
                // -------------------------
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        })   
    })
  })