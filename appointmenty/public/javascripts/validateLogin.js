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
                            if (response === false) $("#passContainer").append(`<p id="wrongPass" style="color:red">Contraseña incorrecta</p>`)
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