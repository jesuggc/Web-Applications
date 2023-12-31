$("#login").on("click", function(e) {
    e.preventDefault()
    var email = $('#email').val();
    var password = $('#password').val();
    $('#wrongMail').remove();
    $('#wrongPass').remove();
    
    $.ajax({
        url: "/users/checkEmail",
        type: "GET",
        data: {email},
        success: function(response) {
            if(response.existe === false) $("#emailContainer").append(`<p id="wrongMail" class="red">Correo no existente</p>`)
            else {
                $.ajax({
                    url: "/users/login",
                    type: "POST",
                    data: {email,password},
                    success: function(response) {
                        if (response === false) $("#passContainer").append(`<p id="wrongPass" class="red">Contraseña incorrecta</p>`)
                        else if (response.verificado == false) {
                            $("#mainDiv").empty()
                            $("#mainDiv").append(`
                            <h1> Estimado ${response.nombre}: </h1>
                            <p> En estos momentos su cuenta esta pendiente de verificación.</p>
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
