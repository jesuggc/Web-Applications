$(".rowMail").on("click", function(){
        let id = $(this).attr("data-id")
        $(".rowMail").removeClass("abierto")
        $(this).addClass("abierto")

        $("#listar").addClass("border-end")
        $("#listar").addClass("rounded-start-4")
        $("#listar").removeClass("rounded-4")

        if($(this).hasClass("noLeido")) {
            let action = "read"
            $.ajax({
                url:"/users/updateEmail",
                type: "POST",
                data:{id,action}      
            })
        }

        $(this).removeClass("noLeido")
        $(this).addClass("leido")

        $.ajax({
            url:"/users/emailContent",
            type: "GET",
            data:{id},
            success: function(response) {
                cleanListar()
                let nombre = response.nombre
                if(response.admin === 1) {
                    nombre = nombre.toUpperCase()
                    $("#fondo").removeClass("bg-secondary")
                    $("#fondo").addClass("claret")
                }
                $('#nombre').append(`<h5>${nombre}</h5>`)
                $('#correo').append(`<h5>${response.correo}</h5>`)
                $('#fecha').append(`${response.fecha} ${response.hora}`)
                $('#asunto').append(`<h3 id="asuntoMostrar" data-id="${id}">${response.asunto}</h3>`)
                $('#cuerpo').html(response.cuerpo);
                
            }

        })
        $("#mostrar").removeClass("d-none")
})

$(".btn-close").on("click", ()=>{
    $("#mostrar").addClass("d-none")
    $("#listar").addClass("rounded-4")
    $("#listar").removeClass("rounded-start-4")
    $(".abierto").removeClass("abierto")

})

function cleanListar() {
    $('#nombre').empty();
    $('#asunto').empty();
    $('#correo').empty();
    $('#fecha').empty();
    $("#fondo").removeClass("claret")
    $("#fondo").addClass("bg-secondary")
}

$("#listarPrincipal").on("click", () => {
    $(".rowMail").each(function(index, elemento) {
        $(elemento).removeClass("d-none") //TODOS
        if($(elemento).hasClass("archivado")) $(elemento).addClass("d-none")
      });
})
$("#listarFavoritos").on("click", () => {
    $(".rowMail").each(function(index, elemento) {
        $(elemento).removeClass("d-none") //TODOS
        if(!$(elemento).hasClass("favorito")) $(elemento).addClass("d-none") //Los que no sean favs
    });
})
$("#listarArchivados").on("click", () => {
    $(".rowMail").each(function(index, elemento) {
        $(elemento).removeClass("d-none") //TODOS
        if(!$(elemento).hasClass("archivado")) $(elemento).addClass("d-none")
      });
})

$("#favorito").on("click", () => {
    
})
$("#archivar").on("click", function() {
    $
    $(".rowMail").each(function(index, elemento) {
        if($(elemento).hasClass("abierto")) {
            $(elemento).addClass("archivadoT")
            $(elemento).addClass("archivado")
            setTimeout(function() {
                $(elemento).addClass("d-none")
                $("#mostrar").addClass("d-none")
                $(elemento).removeClass("archivadoT")
                $(elemento).removeClass("abierto")
              }, 1000)
        }
    });
})


$("#eliminar").on("click", () => {
    let id = $("#asuntoMostrar").attr("data-id")
    $(".rowMail").each(function(index, elemento) {
        if($(elemento).hasClass("abierto")) {
            $(elemento).addClass("eliminado")
            setTimeout(function() {
                $(elemento).addClass("d-none")
                $("#mostrar").addClass("d-none")
              }, 1000)
        }
    });
    let action = "delete"
        $.ajax({
            url:"/users/updateEmail",
            type: "POST",
            data:{id,action}      
        })
        
})

$(".nuevoCorreo").on("click", () => {
    $(".panelEnviar").removeClass("d-none")
    $(".nuevoCorreo").addClass("d-none")
})

$("#closeEnviar").on("click", () => {
    $(".panelEnviar").addClass("d-none")
    $(".nuevoCorreo").removeClass("d-none")
    resetEnviar()
})

$("#enviarDestinatario").on("click", () => {
    $("#holderDestinatario").remove()
    $("#errorMail").remove()
})
$("#enviarAsunto").on("click", () => {
    $("#holderAsunto").remove()
})
$("#enviarCuerpo").on("click", () => {
    $("#holderCuerpo").remove()
})

$("#enviarDestinatario").on("blur", () => {
    let email = $("#enviarDestinatario").text().trim()
    $.ajax({
        url: "/users/checkEmail",
        type: "GET",
        data: {email},
        success: function(response) {
            console.log(response.existe)
            if(response.existe === true) $("#sendMail").attr("disabled", false);
            else {
                $("#sendMail").attr("disabled", true);
                $("#enviarDestinatario").append(`<p id="errorMail" style="font-size:12px; color:red">Correo incorrecto</p>`)
            }
        }
    })
})

$("#sendMail").on("click", () => {
    let email = $("#enviarDestinatario").text().trim()
    let asunto = $("#enviarAsunto").text().trim()
    let cuerpo = $("#enviarCuerpo").text().trim()

    $.ajax({
        url: "/users/sendMessage",
        type: "POST",
        data: {email,asunto,cuerpo},
        success: function(response) {
           resetEnviar()
           $(".panelEnviar").addClass("d-none")
           $(".nuevoCorreo").removeClass("d-none")
        }
    })
})

function resetEnviar() {
    $("#enviarDestinatario").empty()
    $("#enviarAsunto").empty()
    $("#enviarCuerpo").empty()
    $("#enviarDestinatario").append(`<p id="holderDestinatario">Para: </p>`)
    $("#enviarCuerpo").append(`<p id="holderAsunto">Asunto: </p>`)
    $("#enviarAsunto").append(`<p id="holderCuerpo">Cuerpo: </p>`)
}