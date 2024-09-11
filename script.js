"use strict";
/*  
  This script retrieves the Astronomy Picture of the Day (APOD) from NASA
  and displays it on the webpage based on user-selected date.
*/

// Retrieve HTML elements by their IDs
let imageBox = document.getElementById("nasaImage"); // Container for image and video
let dateBox = document.getElementById("dateBox"); // Input element for selecting the date
let title = document.getElementById("imageTitle"); // Element for displaying the title
let description = document.getElementById("imageDescription"); // Element for displaying the description
let video = document.getElementById("video"); // Element for displaying video
let image = document.getElementById("image"); // Element for displaying image

/**
 * Updates the webpage with the astronomy picture or video based on the response from the API.
 */
const showPicture = (json) => {
    // Check if the media type is video
    if (json.media_type === "video") {
        title.innerHTML = json.title; // Set the title of the video
        description.innerHTML = json.explanation; // Set the description of the video
        video.src = json.url; // Set the source URL of the video
        video.style.display = "block"; // Show the video element
        image.style.display = "none"; // Hide the image element
    } 
    // Check if the media type is image
    else if (json.media_type === "image") {
        title.innerHTML = json.title; // Set the title of the image
        description.innerHTML = json.explanation; // Set the description of the image
        image.src = json.url; // Set the source URL of the image
        image.style.display = "block"; // Show the image element
        video.style.display = "none"; // Hide the video element
    } 
    // If media type is neither video nor image
    else {
        description.innerHTML = "Image not Available"; // Show a fallback message
    }
}

// Event handler for when the date input changes
dateBox.onchange = function (e) {
    var dateStr = e.target.value; // Get the selected date value
    // Fetch data from NASA API using the selected date
    fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&&date=${dateStr}`)
        .then(response => response.json()) // Parse the JSON response
        .then(data => showPicture(data)) // Update the page with the picture or video
        .catch((error) => {
            console.debug(error); // Log any errors to the console
        })
}
