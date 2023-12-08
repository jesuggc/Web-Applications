let contador = 0;
let lista = []

function getMiddle(array) {
    return array.sort((a, b) => {
        return a - b;
    })[1]
}

$(".hora").on("click", function(e) {
    let id = parseInt($(this).attr("id"))
    let todoBien = false
    if(lista.length === 0) todoBien = true
    lista.forEach(ele=>{
        if(id === ele+1 || id === ele-1 || id === ele) todoBien = true 
        if(lista.length ===3 && getMiddle(lista) === id) todoBien = false
    })

    if((contador <= 2 || $(this).hasClass("seleccionado")) && todoBien && !$(this).hasClass("noDisponible") && !$(this).hasClass("ocupado"))  {
        $(this).toggleClass("seleccionado")
        $(this).toggleClass("disponible")
        if($(this).hasClass("seleccionado")) {
            contador++
            lista.push(id)
        }
        else {
            lista.splice(lista.indexOf(id),1)
            contador--
        } 
    }
})

$("#tipo").on("change", function() {
    let ini = $(this).val().split("#")[2];
    let fin = $(this).val().split("#")[3];    
    reset()
    lockDisponibility(ini,fin)

    console.log(ini,fin)
    let tipo = $(this).val().split("#")[0];
    let facultad = null    
    if($("#facultad").val()) facultad = $("#facultad").val().split("#")[0]

    $.ajax({
        url: '/bookings/instalaciones',
        type: 'GET',
        data: {tipo,facultad},
        success: function(response) {
            $("#sala").empty()
            $("#sala").append(`<option hidden selected>Selecciona una opción</option>`)
            response.forEach(ele => {
                $("#sala").append(`<option value="${ele.id}#${ele.nombre}#${ele.aforo}">${ele.nombre}</option>`)
            })

        }
    })
})

$("#sala").on("change", function(){
    let aforo = $(this).val().split("#")[2]
    $("#aforo").attr("max", aforo)
    $("#aforo").val("1")

})

$("#calendario").on("input", () => {
    let fecha = $("#calendario").val()
    let idInstalacion = $("#sala").val().split("#")[0]
    console.log(fecha,idInstalacion)
})

$("#enviar").on("click", () => {
    console.log(lista)
})

function reset() {
    for(let i = 9; i <= 20; i++) {
        $("#"+i).removeClass(["noDisponible","seleccionado","ocupado","disponible"])
        $("#"+i).addClass("disponible")
    }
    contador = 0
    lista = []
}

function lockDisponibility(ini,fin) {
    for(let i = 9; i < ini; i++) {
        $("#"+i).toggleClass("disponible")
        $("#"+i).toggleClass("noDisponible")
        $("#"+i).prop("disabled", true);
    }
    for(let i = 20; i >= fin; i--) {
        $("#"+i).toggleClass("disponible")
        $("#"+i).toggleClass("noDisponible")
        $("#"+i).prop("disabled", true);
    }
}
