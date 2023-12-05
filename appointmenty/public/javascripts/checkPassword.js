$("#confirmPassword").on("keyup", () => {
    $("#errorConfirm").remove()
    let password = $("#password").val()
    let confirmPassword = $("#confirmPassword").val()
    
    if(password !== confirmPassword) $("#confirmContainer").append(`<p style="color:red" id="errorConfirm">Las contraseñas deben coincidir</p>`)
    else $("#errorConfirm").remove()
})


let sizeCheck = /^.{8,}$/
let capitalCheck = /[A-ZÁÉÍÓÚ]/
let specialCheck = /[^a-zA-Z0-9]/
let numberCheck = /\d/
let allChech = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/

$("#password").on("keyup", () => {
    $("#capitalCheck").remove()
    $("#sizeCheck").remove()
    $("#specialCheck").remove()
    $("#numberCheck").remove()

    if(!capitalCheck.test($("#password").val()) === true) $("#passContainer").append(`<li style="color:red" id="capitalCheck">Debe contener una mayuscula</li>`)
    else $("#capitalCheck").remove()

    if(!sizeCheck.test($("#password").val()) === true) $("#passContainer").append(`<li style="color:red" id="sizeCheck">Debe contener 8 caracteres</li>`)
    else $("#sizeCheck").remove()

    if(!specialCheck.test($("#password").val()) === true) $("#passContainer").append(`<li style="color:red" id="specialCheck">Debe contener 1 caracter especial</li>`)
    else $("#specialCheck").remove()

    if(!numberCheck.test($("#password").val()) === true) $("#passContainer").append(`<li style="color:red" id="numberCheck">Debe contener 1 número</li>`)
    else $("#numberCheck").remove()

    if(allChech.test($("#password").val())=== true) $("#register").prop('disabled', false)
    else $("#register").prop('disabled', true)
})

$("#email").on("blur", () => {
    let numberCheck = /^\w*@ucm[.]es$/
    $("#errorEmail").remove()

    if(numberCheck.test($("#email").val()) === false) $("#emailContainer").append(`<p style="color:red" id="errorEmail">Solo correo UCM</p>`)
    else $("#errorEmail").remove()
})