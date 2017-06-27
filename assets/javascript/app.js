$(function(){
//array of animals
var animalArray = ["Cat", "Dog", "Bird", "Honey Badger", "Rabbit"];
console.log('animalArray', animalArray);

renderButtons();

//function to render buttons
function renderButtons(){
	//empty buttons
	 $("#animal-buttons").empty();
	//every time the ajax is called, loop through each animal and display new buttons
		for (var i = 0; i < animalArray.length; i++){
	 		//create new animal buttons 
			var newButton = $("<button>");
			//add a class to the buttons
			newButton.addClass("new-animals");
			//add a data attribute 
			newButton.attr("data-name", animalArray[i]);
			//add text to the button
			newButton.text(animalArray[i]);
			//prepend buttons to the animal butttons Div
			$("#animal-buttons").prepend(newButton);
		}
};

//function to display buttons and gifs
function displayGIFs(){
	//var animal
	var animal = $(this).attr("data-name");
	console.log(animal);
	console.log('this', this);
	//queryurl
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
	console.log('queryURL', queryURL);
	//ajax call
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);
	      	//empty animals div of gifs and rating info
	      	$("#animals").empty();
	      	//variable to hold the response from ajax call
			var gifs = response.data;
			//for loop to generate the rating and gifs for each of the objects
			for(var i = 0; i < gifs.length; i++){
				//display the rating and the gif on the HTML
	      		var rating = $("<p>").text("Rating: " + gifs[i].rating);
	      		var animalGif = $('<img data-state="still">');
	      		//assign attribute to animalgif var
	      		animalGif.attr('src', gifs[i].images.fixed_height_still.url)
	   			animalGif.attr('data-animate', gifs[i].images.fixed_height.url)
	   			animalGif.attr('data-still', gifs[i].images.fixed_height_still.url)	
				animalGif.attr('class', 'gif img-responsive')
	      		//append the rating and gif to the animal Div on HTML
	      		$("#animals").append(rating, animalGif);
      		}
		});
};


$(document).on("click", ".new-animals", displayGIFs)
	
//on click function on gif 
$(document).on("click", ".gif", function(){

if (state === "still") {
        $(this).attr("src", animate );
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

	var state = $(this).attr("data-state");
	console.log(still);
	//create variable for still state
	var still = $(this).attr("data-still");
	//create variable for animated state
	var animate = $(this).attr("data-animate");
	//conditionals 
		//if gif is still
		if($(this).attr("data-state") === "still"){
			//animate
			$(this).attr("src", animate);
          	$(this).attr("data-state", "animate");
		//if gif is animated
		}else{
			//make still
			$(this).attr("src", still);
			$(this).attr("data-state", "still");
		}

});


//on click function when user clicks button id=add-animal
	$("#add-animal").on("click", function(event){
		event.preventDefault();
		console.log('click work?');
		//store the animal name from the text box id=animal-input
		var userInput = $("#animal-input").val().trim();
		//add new user input to the animal array
		animalArray.push(userInput);
		//run function to render buttons
		renderButtons();
	});
});

