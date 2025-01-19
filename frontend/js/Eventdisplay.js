// Function to fetch and display events
async function fetchAndDisplayEvents() {
  try {
    const response = await fetch("http://localhost:5000/api/events/event"); // URL to fetch events from the backend
    const events = await response.json();

    // Log the events to check the category values
    console.log(events); // This will help us debug the categories

    // Separate events into categories
    const historicalEvents = events.filter(
      (event) => event.category && event.category.toLowerCase() === "historical"
    );
    const culturalEvents = events.filter(
      (event) => event.category && event.category.toLowerCase() === "cultural"
    );

    // Get the event containers
    const historicalContainer = document.getElementById("historical-events");
    const culturalContainer = document.getElementById("cultural-events");

    // Populate historical events
    if (historicalEvents.length === 0) {
      historicalContainer.innerHTML = ` 
        <div class="event-section">
          <img src="images/marc-szeglat-Rj21YHC1CIY-unsplash.jpg" alt="Historical Event">
          <div class="event-description">
            <p>No historical events available at the moment.</p>
          </div>
        </div>
      `;
    } else {
      historicalEvents.forEach((event) => {
        historicalContainer.innerHTML += `
          <div class="event-section">
            <img src="${
              event.image || "images/marc-szeglat-Rj21YHC1CIY-unsplash.jpg"
            }" alt="Historical Event">
            <div class="event-description">
              <h3>${event.title}</h3>
              <p>${event.content}</p>
            </div>
          </div>
        `;
      });
    }

    // Populate cultural events
    if (culturalEvents.length === 0) {
      culturalContainer.innerHTML = `
        <div class="event-section">
          <img src="images/Genna (Ethiopia).jpg" alt="Cultural Event">
          <div class="event-description">
            <p>No cultural events available at the moment.</p>
          </div>
        </div>
      `;
    } else {
      culturalEvents.forEach((event) => {
        culturalContainer.innerHTML += `
          <div class="event-section">
            <img src="${
              event.image || "images/Genna (Ethiopia).jpg"
            }" alt="Cultural Event">
            <div class="event-description">
              <h3>${event.title}</h3>
              <p>${event.content}</p>
            </div>
          </div>
        `;
      });
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

// Call the function to fetch and display events when the page loads
document.addEventListener("DOMContentLoaded", fetchAndDisplayEvents);
