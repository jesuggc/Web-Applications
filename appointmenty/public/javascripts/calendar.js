let contador = 0;
let lista = []
let bloqueado = false
let diaYaReservado = false
const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("#liveToast"))
let idTipo = $("#mainTitle").attr("data-id")
function getMiddle(array) {
    return array.sort((a, b) => {
        return a - b;
    })[1]
}

$(function() {
    $.ajax({
        url: "/admin/getFacultades",
        type: "GET",
        success: function(response) {
            response.forEach(ele => {
                $("#facultad").append(`<option value = ${ele.id}>${ele.nombre}</option>`)
            })
        }
    })
});

$("#facultad").on("change", function() {
    let idFacultad = $(this).val()
    let facultadTitle = $("#facultad option:selected").text()
    let tipoTitle = $("#title").text().split("-")[1]
    $("#title").empty()
    $("#title").append(`${facultadTitle} - ${tipoTitle}`)

    $.ajax({
        url: "/admin/getInstalaciones",
        type: "GET",
        data: {idFacultad,idTipo},
        success: function(response) {
            $(".instalacion").addClass("d-none")
            $(".instalacion").each(function(i,ele) {
                if(i < response.length) {
                    $(ele).attr("data-id",response[i].id) 
                }
            })
            $(".nombreInstalacion").empty()
            $(".nombreInstalacion").each(function(i,ele) {
                if(i < response.length) {
                    $(ele).append(response[i].nombre) 
                }
            })
            $(".aforoInstalacion").empty()
            $(".aforoInstalacion").each(function(i,ele) {
                if(i < response.length) {
                    $(ele).append(`Aforo máximo:${response[i].aforo}`) 
                    $(this).closest(".instalacion").removeClass("d-none")
                }
            })
            
        }
    })
})

$(".hora").on("click", function(e) {
    if(!bloqueado && !diaYaReservado) {
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
        if(bloqueado) {
            $(".toast-body").empty()
             $(".toast-body").append("Ya tienes una reserva para el dia seleccionado")
            toastBootstrap.show()
        } else {
            $(".toast-body").empty()
            $(".toast-body").append("Solo puedes hacer reserva en una instalación por día")
            toastBootstrap.show()
        }
        
    }
})

$("#calendario").on("change", () => {
    let fecha = $("#calendario").val()
    let idInstalacion = $(".marcado").attr("data-id")
    $("#calendario").addClass("horaSeleccionada")
    $("#horario").show()
    callBusy(fecha,idInstalacion)
})


$("#enviar").on("click", () => {
    if(contador>0) {
        let fecha = $("#calendario").val()
        let idInstalacion = $(".marcado").attr("data-id")
        lista.sort((a, b) => {
            return a - b;
        })
        let horaIni = lista[0]
        let horaFin = lista[contador-1]
    
        $.ajax({
            url: `/bookings/${idTipo}/createBooking`,
            method: "POST",
            data: {fecha,idInstalacion,horaIni,horaFin},
            success: function(response) {
                $(".modal-body").empty()
                $(".modal-body").append(`<p>Reserva creada con éxito con id ${response}`)
                $("#horario").hide()

                $(".modal").modal("show")
            }
        })
    }
    $(".instalacion").removeClass("marcado")
    
})

$(".instalacion").on("click", function()  {
    $(".instalacion").removeClass("marcado")
    $(this).addClass("marcado")
    $("#aforo").attr("max",$(".marcado > h5").text().split(":")[1].trim())
    $("#aforo").val(0)
    $("#optionsContainer").removeClass("d-none")
    let ini = $("#title").attr("data-id").split("#")[0];
    let fin = $("#title").attr("data-id").split("#")[1];    
    reset()
    lockDisponibility(ini,fin)
    if($("#calendario").hasClass("horaSeleccionada")) {
        $("#horario").show()
        let fecha = $("#calendario").val()
        let idInstalacion = $(".marcado").attr("data-id")
        callBusy(fecha,idInstalacion)
    }
})

function callBusy(fecha,idInstalacion) {
    resetBusy()
    $.ajax({
        url: `/bookings/${idTipo}/busyHours`,
        method: "GET",
        data: {fecha,idInstalacion},
        success: function(response) {
            lockBusy(response.horas)
            diaYaReservado = response.diaYaReservado
        }
    })
}

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
        $("#"+i).removeClass(["noDisponible","seleccionado","ocupado","disponible", "reservado"])
        $("#"+i).addClass("disponible")
    }
    contador = 0
    lista = []
    bloqueado = false
    diaYaReservado = false
}

function resetBusy() {
    for(let i = 9; i <= 20; i++) {
        if(!$("#"+i).hasClass("noDisponible")) {
            $("#"+i).removeClass(["noDisponible","seleccionado","ocupado","disponible","reservado"])
            $("#"+i).addClass("disponible")
        }
    }
    contador = 0
    lista = []
    bloqueado = false
    diaYaReservado = false
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
