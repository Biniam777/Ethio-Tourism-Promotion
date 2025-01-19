$(document).ready(function () {
  // Initialize select2 for multiple selections
  $("#destination").select2({
    placeholder: "Select destinations",
    allowClear: true,
  });

  // Fetch destinations from your backend
  $.get("http://localhost:5000/api/destinations/destinations", function (data) {
    // Add options dynamically to the select element
    data.forEach(function (destination) {
      // Append each destination as an option in the dropdown
      $("#destination").append(new Option(destination.name, destination.id));
    });

    // Re-initialize select2 to apply the new options
    $("#destination").trigger("change");
  });

  // Initialize flatpickr for date range
  flatpickr("#date", {
    mode: "range",
    dateFormat: "F j, Y",
    minDate: "today",
    weekNumbers: true,
    defaultDate: null,
  });
});
