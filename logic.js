$(document).ready(function(){

	var animals=["panda", "lion", "fish", "cat", "puppy", "tiger", "bird"];
	var results;
    renderButtons();
    //Function for dumping the JSON content for each button into the div
    // function displayAnimalsInfo(){	
    	$(document).on("click", ".animal", function(){
    		var animal = $(this).attr("data-name");
    		$('#animals-view').empty();
    		renderButtons();
    	// console.log("animal is " + animal);
	//Constructing a URL to search Giphy for the animal
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	animal + "&api_key=ju0vCjB7txFaoRlWvQciiUd2KDlBbUnW&limit=10";

	//Performing the AJAX GET request
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		// $("#animals-view").text(JSON.stringify(response));
		console.log(response);
		results = response.data;
		for (var i = 0; i < results.length; i++) {

	  	//Creating div and having gifs inside 
	  	var animalDiv = $("<div>");
	  	var objRating = response.data[i].rating;
	  	console.log(objRating);
	  	//creating a paragraph tag with the result item's rating
	  	var p = $("<p>").text("Rating: " + objRating);

	  	//Creating and storing an image tag
	  	// var animalImage = $("<img>");
	  	var animalImage = $('<img class="images_div" src="'+results[i].images.downsized_still.url+'" data-state="still" number="'+i+'">')


	  	//Setting the src attribute of the image to a property pulled off teh result item
	  	// animalImage.attr("src", results[i].images.original.url);
	  	// console.log(animalImage);

	  	//Appending the paragraph and image tag to the animalDiv
	  	animalDiv.append(p);
	  	animalDiv.append(animalImage);

	  	//Prepending the animalDiv to tht HTML page in the "#gifs-appear-here" div
	  	$("#animals-view").prepend(animalDiv);
	  }
	});
})


//Function for displaying movie data
function renderButtons() {
	// deleting the buttons prior to adding new animals
	// this is necessary otherwise you will have repeat buttons
	$("#buttons-view").empty();
	for (var i=0; i < animals.length; i++) {

  	// Then dynamically generating buttons for each movie in the array
  	// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></buttons>)
  	var a = $("<button>");
  	// Adding a class of animal to our button
  	a.addClass("animal");
  	// Adding a data-attribute
  	a.attr("data-name", animals[i]);
  	// Providing the initial button text
  	a.text(animals[i]);
  	// Adding the button to the buttons-view div
  	$("#buttons-view").append(a);
  }
}

//This function handles events where one button is clicked
$("#add-animals").on("click", function(event)
{
	event.preventDefault();
	//This line grabs the input from teh textbox
	var animal = $("#animal-input").val().trim();

    //so user won't be able to add a blank button
    if (animal == ""){
    	return false; 
    }
	//Adding the animal from the textbox to the array
	animals.push(animal);
	console.log(animals);

	//Calling renderButtons which handles the processing of the animal array
	renderButtons();
});

$(document).on("click",".images_div",function pausing_image(){
	var data_state = $(this).attr("data-state");
    // console.log(data_state);
    var index = $(this).attr("number");    
    if (data_state=="still"){
    	$(this).attr("data-state","animate");
    	$(this).attr("src",results[index].images.downsized.url);
    }
    else if (data_state=="animate"){
    	$(this).attr("data-state","still");
    	$(this).attr("src",results[index].images.downsized_still.url);
    }
})

//Function for displaying the animal info
//Using $(document).on instead of $(".movie").on to add event listenersto dynamically generated elemts
// $(document).on("click", ".animal", displayAnimalsInfo);
// $(".animal").on("click", displayAnimalsInfo);

//Calling renderButtons function to display the initial buttons


// $('body').on('click', '.animals-view',function(){
//     console.log('clicked!');
// });

});