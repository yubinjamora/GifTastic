
var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
];


function buttonRender() {
    $("#animal-button").empty();

    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("gif");
        a.attr("data-type", animals[i]);
        a.text(animals[i]);
        $("#animal-button").append(a);
    }

}


$(document).on("click", ".gif", function(){


    var animal = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                

                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                animalImage.addClass("animal-image");

                animalDiv.append(p);
                animalDiv.append(animalImage);

                $("#gifs-appear-here").append(animalDiv);
            }
        });
});

$(document).on("click", ".animal-image", function() {

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
    var newitem = $("#gif-input").val();

   
        animals.push(newitem);
    

    buttonRender();

});

buttonRender();
