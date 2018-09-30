$(function () {
    $(".change-state").on("click", function (event) {
        var id = $(this).data("id");
        var newState = $(this).data("newstate");

        var newDevouredState = {
            devoured: newState
        };
        console.log(newDevouredState);

        //Send the PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(
            function () {
                console.log(`Changed state to ${newState}`)
                location.reload();
            }
        )
    })
    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on submit event
        event.preventDefault();

        var newBurger = {
            name: $("#newBurg").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        }

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log(`Created new burger`);
                location.reload();
            }
        )
    })

    $(".delete-burger").on("click", function (event) {
        var id = $(this).data("id");


        $.ajax(`api/burgers/${id}`, {
            type: "DELETE"
        }).then(
            function () {
                console.log(`deleted burger: ${id}`);
                location.reload
            }
        )

    })

})