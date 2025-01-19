$(document).ready(function () {
  $("#destination").select2({
    placeholder: "Select destinations",
    allowClear: true,
  });

  flatpickr("#date", {
    mode: "range",
    dateFormat: "F j, Y",
    minDate: "today",
    weekNumbers: true,
    defaultDate: null,
  });

  // Handle form submission
  $("form").submit(function (e) {
    e.preventDefault(); // Prevent default form submission

    const title = $("#title").val(); // Get trip title
    const dateRange = $("#date").val(); // Get date range
    const destinations = $("#destination").val(); // Get selected destinations
    const username = $("#name").val(); // Get username (id="name")

    // Check if required fields are missing
    if (!title || !dateRange || !destinations.length || !username) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Prepare data to send to the server
    const data = {
      title: title,
      startDate: dateRange.split(" to ")[0], // Extract start date from range
      endDate: dateRange.split(" to ")[1], // Extract end date from range
      destinations: destinations,
      username: username, // Send the username from the form
    };

    // Send POST request to create a new trip plan
    $.ajax({
      url: "http://localhost:5000/api/tripplans/trip-plans", // Adjust the URL as necessary
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        alert("Trip plan created successfully!");
        console.log("Trip plan response:", response);
        // Optionally, redirect to another page or reset form
      },
      error: function (error) {
        // Log the error to the console for debugging
        console.error("Error creating trip plan:", error);

        // Alert the user with a more specific message
        if (error.responseJSON && error.responseJSON.message) {
          alert(`Error: ${error.responseJSON.message}`);
        } else {
          alert("An unexpected error occurred while creating the trip plan.");
        }
      },
    });
  });
});
