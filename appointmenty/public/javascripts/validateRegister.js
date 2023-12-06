
let nombre=false;
let emailBool=false;
let surname1=false;
let surname2=false;
let passwordBool=false;
let success=false
$("#confirmPassword").on("keyup", () => {
    $("#errorConfirm").remove()
    let password = $("#password").val()
    let confirmPassword = $("#confirmPassword").val()
    
    if(password !== confirmPassword){
        $("#confirmContainer").append(`<p style="color:red" id="errorConfirm">Las contraseñas deben coincidir</p>`)
        passwordBool=false;
    } 
    else {
        passwordBool=true;
        $("#errorConfirm").remove()
        
    }
})


let sizeCheck = /^.{8,}$/
let capitalCheck = /[A-ZÁÉÍÓÚ]/
let specialCheck = /[^a-zA-Z0-9]/
let numberCheck = /\d/
let allCheck = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/

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

    if(allCheck.test($("#password").val())=== true) {
        $("#register").prop('disabled', false);
        // passwordBool=false;
    }
    else $("#register").prop('disabled', true)
})

$("#email").on("blur", () => {
    let emailCheck = /^\w*@ucm[.]es$/
    $("#errorEmail").remove()

    if(emailCheck.test($("#email").val()) === false) $("#emailContainer").append(`<p style="color:red" id="errorEmail">Solo correo UCM</p>`)
    else $("#errorEmail").remove()
    var email = $('#email').val();
        var password = $('#contrasena').val();
        $('#wrongMail').remove();
        $('#wrongPass').remove();
        
        $.ajax({
            url: "/users/checkEmail",
            type: "GET",
            data: {email},
            success: function(response) {
                if(response.existe === true) $("#emailContainer").append(`<p id="wrongMail" style="color:red">Correo ya existente</p>`)
                else emailBool=true;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        })
})

$("#name").on("keyup",()=>{
    let letterCheck = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+$/
    let letterSizeCheck = /^.{3,}$/
   
    $("#letterCheck").remove()
    $("#letterSizeCheck").remove()
    if(letterCheck.test($("#name").val()) === false ) $("#nameContainer").append(`<p style="color:red" id="letterCheck">Solo puede contener letras</p>`)
    else {
        nombre=true;
        $("#letterCheck").remove()
    }
    if(letterSizeCheck.test($("#name").val()) === false ) $("#nameContainer").append(`<p style="color:red" id="letterSizeCheck">Nombre demasiado corto</p>`)
    else {
        $("#letterSizeCheck").remove()
        nombre=true;
    }
})
$("#surname1").on("keyup",()=>{
    let surname1Check = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+$/
    let surname1sizeCheck = /^.{3,}$/
    $("#surname1Check").remove()
    $("#surname1SizeCheck").remove()
    if(surname1Check.test($("#surname1").val()) === false ) $("#surname1Container").append(`<p style="color:red" id="surname1Check">Solo puede contener letras</p>`)
    else {
        $("#surname1Check").remove()
        surname1=true;
    }
    if(surname1sizeCheck.test($("#surname1").val()) === false ) $("#surname1Container").append(`<p style="color:red" id="surname1SizeCheck">Apellido demasiado corto</p>`)
    else {
        $("#surname1SizeCheck").remove()
        surname1=true;
    }
})
$("#surname2").on("keyup",()=>{
    let surname2Check = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+$/
    let surname2sizeCheck = /^.{3,}$/
    $("#surname2Check").remove()
    $("#surname2SizeCheck").remove()
    if(surname2Check.test($("#surname2").val()) === false ) $("#surname2Container").append(`<p style="color:red" id="surname2Check">Solo puede contener letras</p>`)
    else {
        $("#surname2Check").remove()
        surname2=true;
    }
    if(surname2sizeCheck.test($("#surname2").val()) === false ) $("#surname2Container").append(`<p style="color:red" id="surname2SizeCheck">Apellido demasiado corto</p>`)
    else {
        $("#surname2SizeCheck").remove()
        surname2=true;
    }
})


$('#myForm input').on('keyup', function() {
    console.log("1",nombre)
    console.log("2",passwordBool)
    console.log("3",emailBool)
    console.log("4",surname1)
    console.log("5",surname2)
    if(nombre && passwordBool && emailBool && surname1 && surname2) {
        console.log("FALLO")
        $('#register').prop('disabled', false);
    }
    else $('#register').prop('disabled', true);
});