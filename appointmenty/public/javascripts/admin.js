

$(function() {
    $("#inicio").trigger("click")
});

// INICIO
$("#inicio").on("click", () => {
    removeAllStrongs()
    $("#inicio").addClass("negrita")
})

// SOLICITUDES
$("#solicitudes").on("click", function(){
    removeAllStrongs()
    $("#solicitudes").addClass("negrita")
    $.ajax({
        url: "/admin/solicitudes",
        method: "GET",
        success: function(response){
            $("#panel").empty()
            if(!response) $("#panel").append(`<div class="row text-center"><h3>No hay usuarios registrados aún</h3></div>`)
            else{
                $("#panel").append(`<div id="listPanel" class="container"></div>`)
                response.forEach(ele => {
                    let anio = calcularCurso(ele.curso)
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
                                        <p> Estudiante de la Facultad de <strong>${ele.facultad}</strong> el <strong>Grado de ${ele.grado}</strong> y actualmente cursa el <strong>${anio} año</strong></p>
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
        }
    })
})

$("#panel").on("click", ".botonAceptar", function(){
    let id = $(this).attr('data-id');
    $.ajax({
        url: "/admin/acceptRequest",
        method: "POST",
        data: {id}
    })
    $(this).closest(".row").remove();   

});

$("#panel").on("click", ".botonEliminar", function(){
    let id = $(this).attr('data-id');
    $.ajax({
        url: "/admin/dropRequest",
        method: "POST",
        data: {id}
    })
    $(this).closest(".row").remove();   

});

// ROLES
$("#roles").on("click", function(){
    removeAllStrongs()
    $("#roles").addClass("negrita")
    $.ajax({
        url: "/admin/changeRols",
        method: "GET",
        success: function(response){
            $("#panel").empty()

            if(!response) $("#panel").append(`<div class="row text-center"><h3>No hay usuarios verificados aún</h3></div>`)
            else{
                $("#panel").append(`<div id="listPanel" class="container"></div>`)
                response.forEach(ele => {
                    let anio = calcularCurso(ele.curso) 
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
                                    <p> Estudiante de la Facultad de <strong>${ele.facultad}</strong> el <strong>Grado de ${ele.grado}</strong> y actualmente cursa el <strong>${anio} año</strong></p>
                                    <!-- <footer class="blockquote-footer"><p>hora</p></footer> -->
                                </blockquote>
                            </div>
                        </div>
                            <div class="card my-2 col-2">
                                <h2>Solicitud:</h2>
                                <div class="form-check form-switch">
                                    <input data-id=${ele.id} class=" form-check-input" type="checkbox" id="adminSwitch"> <!-- O checked -->
                                    <p>Convertir en admin</p>
                                </div>
                                <p style="color:red">Esta accion no es reversible</p> 
                            </div>
                        </div>
                    `)
                
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    })
})
$("#panel").on("change", "#adminSwitch", function(){
    let id= $(this).attr('data-id');

    $.ajax({
        url: "/admin/changeRols",
        method: "POST",
        data: {id},
        success: function(response){

            $(this).closest(".row").remove();
        }
    })
})

//ESTADISTICAS
$("#estadisticas").on("click", ()=>{
    removeAllStrongs()
    $("#estadisticas").addClass("negrita")
    $.ajax({
        url: "/admin/stats",
        method: "GET",
        success: function(response){
            // Construir las opciones del select en una cadena
            var optionsHtml = '<option hidden selected>Selecciona una opción</option>';
            response.forEach(ele => {
                optionsHtml += `<option value="${ele.id}">${ele.nombre}</option>`;
            });

            // Agregar el select al panel
            $("#panel").empty()
            $("#panel").append(`
                <div id="containerFac" class="col ms-4">
                    <div class="row">
                        <select id="facultadSelect" name="Curso" required>
                            ${optionsHtml}
                        </select>
                    </div>
                </div>
            `);
        }
    })  
})

$("#panel").on("change", "#facultadSelect", function(){
    let id= $(this).val();
    $("#emptyMessage").remove()
    $.ajax({
        url: "/users/getStudents",
        method: "GET",
        data: {id},
        success: function(response){
            if(!response) $("#containerFac").append(`<div id="emptyMessage" class="row text-center"><h3>No hay estudiantes registrados de esa facultad</h3></div>`)
            else{
                $("#containerFac").append(`
                    <div class="row">
                        <h4> Facultad de ${response[0].facultad} </h4>
                    </div>
                    <div class="row">
                        <div id="lista" class="col-8">
                            
                        </div>
                        <div class="col-4">

                        </div>
                    </div>
                `)
                response.forEach(ele => {
                    $("#lista").append(`<div class="row">${ele.nombre} ${ ele.apellido1} ${ele.apellido2}</div>`)
                })

            }
        }
    })
})

$("#mensajes").on("click", () => {
    removeAllStrongs()
    $("#mensajes").addClass("negrita")
})

$("#instalacion").on("click", () => {
    removeAllStrongs()
    $("#instalacion").addClass("negrita")
})

$("#apariencia").on("click", () => {
    removeAllStrongs()
    $("#apariencia").addClass("negrita")
})

function removeAllStrongs(){
    $("#inicio").removeClass("negrita")
    $("#solicitudes").removeClass("negrita")
    $("#roles").removeClass("negrita")
    $("#estadisticas").removeClass("negrita")
    $("#mensajes").removeClass("negrita")
    $("#instalacion").removeClass("negrita")
    $("#apariencia").removeClass("negrita")
}

function calcularCurso(curso) {
    if(curso === 1) return "primer"
    if(curso === 2) return "segundo"
    if(curso === 3) return "tercer"
    if(curso === 4) return "cuarto"
    if(curso === 5) return "quinto"
    if(curso === 6) return "sexto"
}