
$(".botonAceptar").on("click", function(){
    let id = $(this).attr('data-id');
    $.ajax({
        url: "/admin/acceptRequest",
        method: "POST",
        data: {id}
    })
    $(this).closest(".container").remove();   

});

$(".botonEliminar").on("click", function(){
    let id = $(this).attr('data-id');
    $.ajax({
        url: "/admin/dropRequest",
        method: "POST",
        data: {id}
    })
    $(this).closest(".container").remove();   

});

// ROLES
$(".adminSwitch").on("change", function(){
    let id= $(this).attr('data-id');
    $.ajax({
        url: "/admin/changeRols",
        method: "POST",
        data: {id}
    })
    $(this).closest(".container").remove();
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
                const imagesq = URL.createObjectURL
                response.forEach(ele => {
                    $("#lista").append(`<div class="row">${ele.nombre} ${ ele.apellido1} ${ele.apellido2}</div>`)
                })

            }
        }
    })
})


function calcularCurso(curso) {
    if(curso === 1) return "primer"
    if(curso === 2) return "segundo"
    if(curso === 3) return "tercer"
    if(curso === 4) return "cuarto"
    if(curso === 5) return "quinto"
    if(curso === 6) return "sexto"
}