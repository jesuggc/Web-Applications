$(function() {
    $("#login").click( function() {
        var email = $('#email').val();
        var password = $('#contrasena').val();
        $('#wrongMail').remove();
        $('#wrongPass').remove();
        
        $.ajax({
            url: "/users/checkEmail",
            type: "GET",
            data: {email},
            success: function(response) {
                if(response.existe === false) $("#emailContainer").append(`<p id="wrongMail" style="color:red">Correo no existente</p>`)
                else {
                    $.ajax({
                        url: "/users/login",
                        type: "POST",
                        data: {email,password},
                        success: function(response) {
                            console.log(response.verificado)
                            console.log(response.verificado==false)
                            if (response === false) $("#passContainer").append(`<p id="wrongPass" style="color:red">Contraseña incorrecta</p>`)
                            else if (response.verificado == false) {
                                $("#mainDiv").empty()
                                $("#mainDiv").append(`
                                <h1> Estimado ${response.nombre}: </h1>
                                <p style="justify-content"> En estos momentos su cuenta esta pendiente de verificación.</p>
                                <p> En cuanto un administrador de la página valide su registro podrá disfrutar de todos los servicios ofrecidos por el sistema de reservas de la Universidad Complutense 
                                de Madrid. </p>
                                <p> Tras la verificación recibirá un correo a ${response.correo}.</p>
                                <a class="my-4" href="/users/login"><button type="button" class="btn btn-danger">Volver</button></a>
                                `)
                            }
                            else window.location.href = "/"
                        }
                    })
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        })
    })
})