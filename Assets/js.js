$(document).ready(function() {

    //Array of topics. 

    var topics = ["Plant", "Cats", "Mouse", "Food", "Fish"];

        //Api 
    function displayInfo() {
        var apiKey = "CmyqdBYqPZwAdUR8zfvfCHarcGRZIDZk";
        var topic = $(this).attr("topic-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apiKey + "&limit=10";

        //AJAX and GET 

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            //empty the div so it doesnt reapeat. 

            $("#topicGif").empty();
            // sets input to results. 
            var results = response.data;


            for (var i = 0; i < results.length; i++) {
                var div = $("<div class='userTopic'>");

                var rating = results[i].rating;
                var pRate = $("<p>").text("Rating: " + rating);

                //Add data for still and animation
                var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");
                var urlStill = results[i].images.fixed_height_still.url;
                var urlPlay = results[i].images.fixed_height.url;


                div.append(gif).append(pRate);

                $("#topicGif").append(div);
            }

            //on click for still and animated gif states. 

            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            });
        });

    }


    function renderButtons() { // Create a function to make buttons and assign them a class. 

        //delete original array of buttons everytime renders so they do not keep repeating

        $("#buttons").empty();

        for (var i = 0; i < topics.length; i++) {

            var addButton = $("<button>");

            addButton.addClass("topic").attr("topic-name", topics[i]).text(topics[i]);
            $("#buttons").append(addButton);
        }
    }



    $("#addTopic").on("click", function(event) {
        event.preventDefault();
        var topic = $("#user-input").val().trim();

        //push the new info into the array.
        topics.push(topic);
            $("#user-input").val(" ");
        renderButtons();
    });

    
    $(document).on("click", ".topic", displayInfo);
    renderButtons();

});