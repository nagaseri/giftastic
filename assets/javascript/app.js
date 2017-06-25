//array of animals
var animalArray = ["Cat", "Dog", "Bird", "Honey Badger", "Rabbit"];
console.log('animalArray', animalArray);
 
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
			//prepend buttons to the gifsRatingsDiv
			$("#animal-buttons").prepend(newButton);
		}
};

//function to display buttons and gifs
function displayGIFs(){
	//var animal
	var animal = $(this).attr("data-name");
	console.log('this', this);
	//queryurl
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=5";
	console.log('queryURL', queryURL);
	//ajax call
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);
			//display the rating and the gif on the HTML
      		var rating = $("<p>").text("Rating: " + response.rating);
      		var animalGif = $("<img>").attr("src", response.fixed_height_still);
      		//empty animals div of gifs and rating info
      		$("#animals").empty();
      		//append the rating and gif to the animal Div on HTML
      		$("#animals").append(rating, animalGif);

			//create new div to hold each animal rating info and gifs
			// var gifsRatingsDiv = $("<div class ='gifsRatings'>"); 
			// //pull the rating info
			// var rating = response.rating;
			// console.log('response.rating', response.rating);
			// //create new div to hold/store the response.rating and display it in HTML
			// var ratingDiv = $("<p>").text("Rating: "+ rating);
			// //pull ten gifs
			// var gifs = response.fixed_height_still; 
			// //display the rating by appending new var to the new div
			// gifsRatingsDiv.append(ratingDiv);
			// //append var gifs to the gifsRatingsDiv
			// gifsRatingsDiv.append(gifs);
			// //append response and gif divs to the grander HTML div 
			// $("#animals").prepend(gifsRatingsDiv);
		});
};

$("#animal-buttons").on("click", function(){
	//run function to display buttons and gifs
	displayGIFs();
});

//on click function on gif 
$("#animals").on("click", function(){
	//create variable for gif state 
	var state = $(this).attr("data-state");
    console.log(state);
	//create variable for still state
	var still = $(this).attr("data-still");
	//create variable for animated state
	var animate = $(this).attr("data-animate");
	//conditionals 
		//if gif is still
		if(state === 'still'){
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

$(function(){
//on click function when user clicks button id=add-animal
	$("#add-animal").on("click", function(event){
		event.preventdefault();
		console.log('click work?');
		//store the animal name from the text box id=animal-input
		var userInput = $("#animal-input").val().trim();
		//add new user input to the animal array
		animalArray.push(userInput);
		//run function to render buttons
		// renderButtons();
	});
});