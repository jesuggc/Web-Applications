$(function() {
    $("#login").click( function() {
        var email = $('#email').val();
        var password = $('#contrasena').val();
        
        $('#errorMessage').remove();
        
        $.ajax({
            url: "/checkEmail",
            type: "GET",
            data: {email},
            success: function(response) {
                if(response.existe === false) $("#emailContainer").append(`<p id="errorMessage" style="color:yellow">Correo no existente</p>`)
                else {
                    $.ajax({
                        url: "/submitLogin",
                        type: "POST",
                        data: {email,password},
                        success: function(response) {
                            window.location.href = "/"
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