$("#solicitudes").on("click", function(){
    console.log("ENtro")
    $.ajax({
        url: "/users/solicitudes",
        method: "GET",
        success: function(response){
            console.log(response);
            response.forEach(ele => {
                $("#panel").append(`
                <div class="card my-2">
                    <div class="card-header">
                        <div class="justify-content-between d-flex">
                            <h3>${ele.nombre}</h3>
                        </div>
                    </div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <footer class="blockquote-footer"><p>hora</p></footer>
                        </blockquote>
                    </div>
                </div>
                `)
                
            });





        }
    })
})