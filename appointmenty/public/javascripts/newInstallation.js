const toastBootstrap = bootstrap.Toast.getOrCreateInstance($("#liveToast"))
$("#formFile").on("input", function(){
    var inputFile = $('#formFile')[0];
    const formData = new FormData();
    formData.append('foto', inputFile.files[0]);
    $.ajax({
        url: "/admin/photoToServer",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            const blob = new Blob([new Uint8Array(response.img.data)], { type: 'image/jpeg' });
            var imageURL = URL.createObjectURL(blob)
            $("#divTipo").css("background-image", `url(${imageURL})`)
        }
    })
})
$("#newType").on("click", () => {
    let horaIni = $("#horaIni").val()
    let horaFin = $("#horaFin").val()
    let tipo = $("#tipo").val()
    let nombreTipo = $("#nombreTipo").text()
    var inputFile = $('#formFile')[0];
    const formData = new FormData();
    formData.append('foto', inputFile);

   
    $.ajax({
        url: "/admin/newTypeInstallation",
        type: "POST",
        data: {horaIni, horaFin, tipo, nombreTipo, foto:formData.get('foto')},
        success: (function(response) {
            $(".toast-body").empty()
            $(".toast-body").append("El tipo de instalación se ha creado correctamente")
            toastBootstrap.show()
            $("#tipoInstalacion").append(`<option value="${response}">${nombreTipo}</option>`)
        })
    })

})
$("#instalacionFile").on("input", function(){
    var inputFile = $('#instalacionFile')[0];
    const formData = new FormData();
    formData.append('foto', inputFile.files[0]);
    $.ajax({
        url: "/admin/photoToServer",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            const blob = new Blob([new Uint8Array(response.img.data)], { type: 'image/jpeg' });
            var imageURL = URL.createObjectURL(blob)
            $("#divInstalacion").css("background-image", `url(${imageURL})`)
        }
    })
})
$("#newInstallation").on("click", () => {
    let idFacultad = $("#facultad").val().split("#")[0]
    let aforoMax =  $("#aforoMax").val()
    let tipoInstalacion =  $("#tipoInstalacion").val()
    let nombreInstalacion = $("#nombreInstalacion").text()
    var inputFile = $('#instalacionFile')[0];
    const formData = new FormData();
    formData.append('foto', inputFile);
    
    $.ajax({
        url: "/admin/newInstallation",
        type: "POST",
        data: {nombreInstalacion, idFacultad, aforoMax, tipoInstalacion, foto:formData.get('foto')},
        success: (function(response) {
            $(".toast-body").empty()
            $(".toast-body").append("La instalación se ha creado correctamente")
            toastBootstrap.show()
        })
    })
    console.log(idFacultad,aforoMax,tipoInstalacion,nombreInstalacion)
})