let contador = 0;
let lista = []
let bloqueado = false
const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("#liveToast"))

function getMiddle(array) {
    return array.sort((a, b) => {
        return a - b;
    })[1]
}

$(".hora").on("click", function(e) {
    if(!bloqueado) {
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
        } else fillToast($(this))
    } else {
        $(".toast-body").empty()
        $(".toast-body").append("Ya tienes una reserva para el dia seleccionado")
        toastBootstrap.show()
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
    $("#horario").show()
    resetBusy()
    $.ajax({
        url: "/bookings/busyHours",
        method: "GET",
        data: {fecha,idInstalacion},
        success: function(response) {
            lockBusy(response)
        }
    })
})


$("#enviar").on("click", () => {
    let fecha = $("#calendario").val()
    let idInstalacion = $("#sala").val().split("#")[0]
    if(contador>0) {
        lista.sort((a, b) => {
            return a - b;
        })
        let horaIni = lista[0]
        let horaFin = lista[contador-1]
    
        $.ajax({
            url: "/bookings/createBooking",
            method: "POST",
            data: {fecha,idInstalacion,horaIni,horaFin},
            success: function(response) {
                //modal
                // cambiar
                window.location.href = "/"
            }
        })
    }
})

function fillToast(x) {
    
    if(x.hasClass("noDisponible")){
        $(".toast-body").empty()
        $(".toast-body").append("La hora seleccionada no está disponible")
        toastBootstrap.show()
    } else if (x.hasClass("ocupado")) {
        $(".toast-body").empty()
        $(".toast-body").append("La hora seleccionada ya está ocupada")
        toastBootstrap.show()
    } else if (contador === 3 && x.hasClass("disponible")) {
        $(".toast-body").empty()
        $(".toast-body").append("Las reservas no puede superar las 3 horas")
        toastBootstrap.show()
    } else {
        $(".toast-body").empty()
        $(".toast-body").append("Las horas deben de ser consecutivas")
        toastBootstrap.show()
    }
}

function reset() {
    for(let i = 9; i <= 20; i++) {
        $("#"+i).removeClass(["noDisponible","seleccionado","ocupado","disponible"])
        $("#"+i).addClass("disponible")
    }
    contador = 0
    lista = []
    bloqueado = false
}

function resetBusy() {
    for(let i = 9; i <= 20; i++) {
        if(!$("#"+i).hasClass("noDisponible")) {
            $("#"+i).removeClass(["noDisponible","seleccionado","ocupado","disponible"])
            $("#"+i).addClass("disponible")

        }
    }
    contador = 0
    lista = []
    bloqueado = false
}

function lockBusy(horas) {
    horas.forEach(ele => {
        for(let i = ele.horaIni; i <= ele.horaFin; i++) {
            if(!ele.reservaPropia) {
                $("#"+i).removeClass("disponible")
                $("#"+i).addClass("ocupado")
            } else {
                $("#"+i).removeClass("disponible")
                $("#"+i).addClass("reservado")
                bloqueado = true
            }
        }
    })
}

function lockDisponibility(ini,fin) {
    for(let i = 9; i < ini; i++) {
        $("#"+i).toggleClass("disponible")
        $("#"+i).toggleClass("noDisponible")
    }
    for(let i = 20; i >= fin; i--) {
        $("#"+i).toggleClass("disponible")
        $("#"+i).toggleClass("noDisponible")
    }
}
