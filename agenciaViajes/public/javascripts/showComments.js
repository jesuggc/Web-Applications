$(document).ready(function(){
    $('#show_more').click(function(){

        let id = $('#destino').data('id')
        
        $.ajax({
            url: 'getAllComments',
            type: 'GET',
            data: {id},
            success: function(response) {
                $("#moreDiv").hide()
                // -------------------------
                response.slice(3).forEach(function(comentario) {
                    var nuevoComentario = $('<div class="card my-2"></div>');
        
                    nuevoComentario.append(`
                        <div class="card-header">
                            <div class="justify-content-between d-flex">
                                <h3>${comentario.nombre}</h3>
                                <h3>${comentario.fecha}</h3>
                            </div>
                            <div class="d-flex">
                                <a id="likes" data-id="${comentario.id}" href="/"><img style="max-height: 1em;" src="images/nothumbup.png"></a>
                                <p> A ${comentario.likes} personas les ha resultado útil </p>
                            </div>
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>${comentario.comentario}</p>
                                <footer class="blockquote-footer">${comentario.hora}</footer>
                            </blockquote>
                        </div>
                    `);
        
                    // Agrega el nuevo comentario al contenedor
                    $('#comentariosContainer').append(nuevoComentario);
                });
                // -------------------------
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        })   
    })
  })