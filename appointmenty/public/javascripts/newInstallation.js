const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("#liveToast"))

$("#newType").on("click", () => {
    let horaIni = $("#horaIni").val()
    let horaFin = $("#horaFin").val()
    let tipo = $("#tipo").val()
    let nombreTipo = $("#nombreTipo").text()
    console.log(horaIni,horaFin,tipo,nombreTipo)
    $.ajax({
        url: "/admin/newTypeInstallation",
        type: "POST",
        data: {horaIni, horaFin, tipo, nombreTipo},
        success: (function(response) {
            $(".toast-body").empty()
            $(".toast-body").append("El tipo de instalación se ha creado correctamente")
            toastBootstrap.show()
            $("#tipoInstalacion").append(`<option value="${response}">${nombreTipo}</option>`)
        })
    })

})
$("#newInstallation").on("click", () => {
    let idFacultad = $("#facultad").val().split("#")[0]
    let aforoMax =  $("#aforoMax").val()
    let tipoInstalacion =  $("#tipoInstalacion").val()
    let nombreInstalacion = $("#nombreInstalacion").text()

    $.ajax({
        url: "/admin/newInstallation",
        type: "POST",
        data: {nombreInstalacion, idFacultad, aforoMax, tipoInstalacion},
        success: (function(response) {
            $(".toast-body").empty()
            $(".toast-body").append("La instalación se ha creado correctamente")
            toastBootstrap.show()
        })
    })
    console.log(idFacultad,aforoMax,tipoInstalacion,nombreInstalacion)
})