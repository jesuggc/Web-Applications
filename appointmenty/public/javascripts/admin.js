$("#solicitudes").on("click", function(){
    $.ajax({
        url: "/users/solicitudes",
        method: "GET",
        success: function(response){
            $("#panel").empty()

            $("#panel").append(`<div id="listPanel" class="container"></div>`)
            response.forEach(ele => {      
                $("#listPanel").append(`
                    <div class="row">
                        <div style="background-image: url('/images/prueba1.jpg');" class="prueba card my-2 col-2">
                            
                        </div>
                        <div class="card my-2 col-7">
                            <div class="card-header">
                                <div class="justify-content-between d-flex">
                                    <h3>${ele.nombre} ${ele.apellido1} ${ele.apellido2}</h3>
                                    <h3>${ele.correo}</h3>
                                </div>
                            </div>
                            <div class="card-body">
                                <blockquote class="blockquote">
                                    <p> Estudiante de la facultad de ${ele.facultad} el grado de ${ele.grado} y actualmente cursa ${ele.curso} grado
                                    <!-- <footer class="blockquote-footer"><p>hora</p></footer> -->
                                </blockquote>
                            </div>
                        </div>
                        <div class="card my-2 col-2">
                            <h2>Solicitud:</h2>
                            <button data-id=${ele.id} type="button" class="botonAceptar btn btn-success mb-1">Aceptar</button>
                            <button data-id=${ele.id} type="button" class="botonEliminar btn btn-danger">Eliminar</button>
                            <p style="color:red">Esta accion no es reversible</p> 
                        </div>
                    </div>
                `)
            });
        }
    })
})

$("#panel").on("click", ".botonAceptar", function(){
    let id = $(this).attr('data-id');
    $.ajax({
        url: "/users/acceptRequest",
        method: "POST",
        data: {id}
    })
    $(this).closest(".row").remove();   

});

$("#panel").on("click", ".botonEliminar", function(){
    let id = $(this).attr('data-id');
    $.ajax({
        url: "/users/dropRequest",
        method: "POST",
        data: {id}
    })
    $(this).closest(".row").remove();   

});




// <div class="form-check form-switch">
//                                 <input class="ms-1 form-check-input" type="checkbox" id="flexSwitchCheckDefault"> <!-- O checked -->
//                                 <p>&emsp;Aceptar solicitud</p>
//                             </div>