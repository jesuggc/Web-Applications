$("#submit").on("click", () => {
    let title = $("#title").text()
    let appearance = {
        title:title,
    }
    $.ajax({
        url: "/admin/newAppearance",
        type: "GET",
        data: appearance,
        success: function(repsonse) {
            console.log("Exito")
        }
    })
})