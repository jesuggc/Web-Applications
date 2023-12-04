$("#confirmPassword").on("keyup", () => {
    $("#errorConfirm").remove()
    let password = $("#password").val()
    let confirmPassword = $("#confirmPassword").val()
    
    if(password !== confirmPassword) $("#confirmContainer").append(`<p style="color:red" id="errorConfirm">Las contraseñas deben coincidir</p>`)
    else $("#errorConfirm").remove()
})


let sizeCheck = /^.{8,}$/
let vowelCheck = /[A-ZÁÉÍÓÚ]/
// let specialCheck = //

$("#password").on("keyup", () => {
    $("#vowelCheck").remove()
    $("#sizeCheck").remove()

    //Un titulo que diga "La contraseña:" estaria bien

    if(!vowelCheck.test($("#password").val()) === true) $("#passContainer").append(`<li style="color:red" id="vowelCheck">Debe contener una mayuscula</li>`)
    else $("#vowelCheck").remove()

    if(!sizeCheck.test($("#password").val()) === true) $("#passContainer").append(`<li style="color:red" id="sizeCheck">Debe contener 8 caracteres</li>`)
    else $("#sizeCheck").remove()

    //Habilitar el boton de registro si todo se cumple, inhabilitar en caso contrario

    // console.log(specialCheck.test($("#password").val()))
})