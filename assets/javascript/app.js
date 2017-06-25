$(function(){
});

//array of animals
var animalArray = ["Cat", "Dog", "Bird", "Honey Badger"];
 
//function to display buttons and gifs
function displayGIFs(){
	//empty buttons
	 $("#animal-buttons").empty();
	//default setting none for buttons?

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
		//console.log response
		console.log(response);
		//create for loop to go through each animal in the array
		for(var i = 0; i < animalArray.length; i++){
			//empty the array 
			
			//create new div to hold each animal rating info and gifs
			var gifsRatingsDiv = $("<div class ='gifsRatings'>"); 
			//pull the rating info
			var rating = response.rating;
			console.log('response.rating', response.rating);
			//pull ten gifs
			var gifs = response.fixed_height_still; 
			//create new div to hold/store the response.rating and display it in HTML
			var ratingDiv = $("<p>").text("Rating: + rating");
			//display the rating by appending new var to the new div
			gifsRatingsDiv.append(ratingDiv);
			//append var gifs to the gifsRatingsDiv
			gifsRatingsDiv.append(gifs);
			//append response and gif divs to the grander HTML div 
			$("#animals").prepend(gifsRatingsDiv);
		}

	});
};

//on click function on gif 
	//create variable for gif state 
	//create variable for still state
	//create variable for animated state
	//conditionals 
		//if gif is still
			//animate
		//if gif is animated
			//make still

//on click function when user clicks button id=add-animal
$("#add-animal").on("click", function(event){
	event.preventdefault();
	//store the animal name from the text box id=animal-input
	var userInput = $("#animal-input").val().trim();
	//add new user input to the animal array
	animalArray.push(userInput);
	//run function to display buttons and gifs
	displayGIFs();
});