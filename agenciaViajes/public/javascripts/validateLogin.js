$(function() {
    $("#login").click( function() {
        let correo = $("#email").val()
        $.ajax({
            url: "/checkEmail",
            type: "GET",
            data: {correo},
            success: function(response) {
                $("#emailContainer").append(`<h3>${response.existe}</h3>`)
               
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        })
    })
})