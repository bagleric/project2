//This is the original
/*function search() {
	// Get the value from the search box
	var searchString = $("#txtSearch").val();
	console.log("Searching for: " + searchString);

	// Set up the parameters to send to the API
	var params = {s: searchString, apikey:"e4eac238"};

    // Use jQuery to make the get request
	$.get("http://www.omdbapi.com/", params, function(data, status){
		// For debugging purposes, make a note that we're back
		console.log("Back from server with the following results:")
		console.log(status);
    	console.log(data);

    	updateResultList(data)
	});
}

function updateResultList(data) {
	if (data.Search && data.Search.length > 0) {
		var resultList = $("#ulResults");
		resultList.empty();

		for (var i = 0; i < data.Search.length; i++) {
			var title = data.Search[i].Title;
			resultList.append("<li><p>" + title + "</p></li>");
		}
	}

}
*/
// this is the stuff for exercise images
/*
function search() {
	// Get the value from the search box
	var searchString = $("#txtSearch").val();
	console.log("Searching for: " + searchString);

	// Set up the parameters to send to the API
	var params = {s: searchString, apikey:"acec9f21b2edbf72e0f9026a5191ce848f920639"};

    // Use jQuery to make the get request
	$.get("https://wger.de/api/v2/exerciseimage/?is_main=True", params, function(data, status){
		// For debugging purposes, make a note that we're back
		console.log("Back from server with the following results:")
		console.log(status);
    	console.log(data);

    	updateResultList(data)
	});
}

function updateResultList(data) {
	if (data.results && data.results.length > 0) {
		var resultList = $("#ulResults");
		resultList.empty();

		for (var i = 0; i < data.results.length; i++) {
			var title = data.results[i].image;
			resultList.append("<img src=\"" + title + "\"/>");
		}
	}

}
*/
//this is the stuff for workout category
$(document).ready(getCategory);

function getCategory() {
    // Get the value from the search box
    var searchString = $("#txtSearch").val();
    console.log("Searching for: " + searchString);
    // Set up the parameters to send to the API
    var params = {
        s: searchString
        , apikey: "acec9f21b2edbf72e0f9026a5191ce848f920639"
    };
    // Use jQuery to make the get request
    $.get("https://wger.de/api/v2/exercisecategory/?is_main=True", params, function (data, status) {
        // For debugging purposes, make a note that we're back
        console.log("Back from server with the following results:")
        console.log(status);
        console.log(data);
        updateCategoryList(data)
    });
}

function updateCategoryList(data) {
    if (data.results && data.results.length > 0) {
        var resultList = $("#category");
        resultList.empty();
        for (var i = 0; i < data.results.length; i++) {
            var title = data.results[i].name;
            var id = data.results[i].id;
            resultList.append("<div class='category-item' onclick=\"getExercises(" + id + ");\">" + title + "</div>");
        }
    }
}
//
//function getExercises(id) {
//    // Get the value from the search box
//    var searchString = $("#txtSearch").val();
//    console.log("Searching for: " + searchString);
//    // Set up the parameters to send to the API
//    var params = { license_author: "wger.de", language:2,limit:500,category:id};
//    // Use jQuery to make the get request
//    $.get("https://wger.de/api/v2/exercise/", params, function (data, status) {
//        // For debugging purposes, make a note that we're back
//        console.log("Back from server with the following results:")
//        console.log(status);
//        console.log(data);
//        updateExerciseList(data)
//    });
//}
//
//function updateExerciseList(data) {
//    if (data.results && data.results.length > 0) {
//        var resultList = $("#exercise");
//        resultList.empty();
//        for (var i = 0; i < data.results.length; i++) {
//            var title = data.results[i].name;
//            var description = data.results[i].description;
//            resultList.append("<div class=\"exercise-title\">" + title + "</div><div class=\"exerciseDescription\">" + description + "</div>");
//        }
//    }
//}
function getExercises(id) {
    // Get the value from the search box
    var searchString = $("#txtSearch").val();
    console.log("Searching for: " + searchString);
    // Set up the parameters to send to the API
    var params = {
        license_author: "wger.de"
        , language: 2
        , limit: 500
        , category: id
    };
    // Use jQuery to make the get request
    $.get("https://wger.de/api/v2/exercise/", params, function (data, status) {
        // For debugging purposes, make a note that we're back
        console.log("Back from server with the following results:")
        console.log(status);
        console.log(data);
        updateExerciseList(data)
    });
}

function updateExerciseList(data) {
    if (data.results && data.results.length > 0) {
        var resultList = $("#exercise");
        resultList.empty();
        for (var i = 0; i < data.results.length; i++) {
            var title = data.results[i].name;
            var description = data.results[i].description;
            var id = data.results[i].id;
            var category = data.results[i].category;
            
            resultList.append("<div id=\"accordion\" role=\"tablist\">" + "<div class=\"card\">" + "<div class=\"card-header\" role=\"tab\" id=\"heading" + id + "\">" + "<h6 class=\"mb-0\">" + "<a data-toggle=\"collapse\" href=\"#collapse" + id + "\" aria-expanded=\"true\" aria-controls=\"collapseOne\">" + title + "</a>" + "</h6>" + "<button onclick=\"addexercise('exercise-" + id + "' , 'category-" + category + "' ,'" + title +"');\">Add to circuit</button>" + "</div>");
            if ((description.toString).length < 5) {
                resultList.append("<div id=\"collapse" + id + "\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"heading" + id + "\" data-parent=\"#accordion\">" + "<div class=\"card-body\">" + description + "</div>" + "</div>");
            }
            resultList.append("</div>");
        }
    }
}

function addexercise(exercise, category, title) {
    var now = new Date();
    var resultList = $("#selectedExercises");
    var id = exercise + category + now.getMilliseconds()
    resultList.prepend("<div class=\"exerciseTile\" id=\"" + id+ "\">" + "<div class=\"exerciseTitle\">"+title+"</div>" + "<button onclick=\"removeexercise('" +id+ "');\">Remove</button>" + "</div>");
}

function removeexercise(tag) {
    var mydiv = $("#selectedExercises");
    var toRemove = "#"+ tag;
    mydiv.children(toRemove).remove();
    
    console.log(toRemove);
}