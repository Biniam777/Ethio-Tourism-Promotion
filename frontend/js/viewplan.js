document.addEventListener("DOMContentLoaded", async () => {
  const username = localStorage.getItem("username");

  // Check if the username exists in localStorage
  if (!username) {
    alert("You must be logged in to view your trip plans.");
    window.location.href = "/login"; // Redirect to login page if no username is found
    return;
  }

  // Fetch all trip plans (without filtering on the server-side)
  try {
    const response = await fetch(
      "http://localhost:5000/api/tripPlans/trip-plans"
    ); // Get all plans from the backend

    if (response.ok) {
      const plans = await response.json(); // Get the array of trip plans
      const tableBody = document.getElementById("plansTableBody");

      // Filter the plans based on the logged-in username
      const userPlans = plans.filter((plan) => plan.username === username);

      // Check if there are plans to display for this user
      if (userPlans.length === 0) {
        tableBody.innerHTML =
          "<tr><td colspan='6'>No trip plans found.</td></tr>";
        return;
      }

      // Populate the table with filtered trip plans
      userPlans.forEach((plan) => {
        const row = document.createElement("tr");

        // Create cells for each column
        row.innerHTML = `
        
          <td>${plan.title}</td>
          <td>${new Date(plan.startDate).toLocaleDateString()}</td>
          <td>${
            plan.endDate ? new Date(plan.endDate).toLocaleDateString() : "N/A"
          }</td>
          <td>${plan.destinations.join(", ")}</td>
         
        `;

        // Append the row to the table body
        tableBody.appendChild(row);
      });
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error fetching trip plans:", error);
    alert(
      "An error occurred while fetching your trip plans. Please try again later."
    );
  }
});
