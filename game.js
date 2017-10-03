var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

$("#buttons").on("click", function() {
    var animal = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<div class='animal-item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);


                var still = results[i].images.fixed_height_still.url;
                var animated = results[i].images.fixed_height.url;

                var animalImage = $("<img>");
                animalImage.attr("src", still);
                animalImage.attr("data-still", still);
                animalImage.attr("data-animate", animated);
                animalImage.attr("data-state", "still");
                animalImage.addClass("animal-image");

                animalDiv.append(p);
                animalDiv.append(animalImage);


                $("#gifs-appear-here").prepend(animalDiv);
            };
        });

})






function renderButton() {

    $("#buttons").empty();

    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");

        a.addClass("gif");
        a.attr("data-types", animals[i]);
        a.text(animals[i]);
        $("#buttons").append(a);

    }
}

renderButton();


$(".animal-image").on("click", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


$("#add-gif").on("click", function(event) {
    event.preventDefault();

    var gifs = $("#gif-input").val().trim();

    animals.push(gifs);

    renderButton();

});