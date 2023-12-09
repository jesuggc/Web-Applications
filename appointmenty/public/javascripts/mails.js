$(".rowMail").on("click", function(){
    let id= $(this).data("id");
        //$("#lector").toggleClass("d-none")
        $("#mostrar").removeClass("d-none")

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
            data:{id}

        })
    
})
$(".btn-close").on("click", ()=>{
    $("#mostrar").addClass("d-none")
    $("#listar").addClass("rounded-4")
    $("#listar").removeClass("rounded-start-4")
})
