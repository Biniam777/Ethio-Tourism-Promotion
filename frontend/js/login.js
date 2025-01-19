// Select the login form
const loginForm = document.getElementById("loginForm");

// Add a submit event listener
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the form from refreshing the page

  // Collect user credentials from the form
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

   localStorage.setItem("username", username);

  // Basic validation to ensure fields are not empty
  if (!email || !password) {
    alert("Please fill in both email and password.");
    return;
  }

  // Prepare the data to send to the API
  const credentials = {
    email,
    password,
  };

  try {
    // Make the POST request to the login API
    const response = await fetch("http://localhost:5000/api/accounts/log-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Inform the server you're sending JSON
      },
      body: JSON.stringify(credentials), // Convert credentials to JSON string
    });

    if (response.ok) {
      // If login is successful, handle the response
      const result = await response.json();
      console.log("Response from server:", result);

      // Store the access token in localStorage
      const { accessToken } = result;
      localStorage.setItem("accessToken", accessToken);

      // Now, let's get the full account details, including the role
      const accountResponse = await fetch(
        `http://localhost:5000/api/accounts/account/${email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the token to the backend
          },
        }
      );

      if (accountResponse.ok) {
        const accountData = await accountResponse.json();
        console.log("Account Data:", accountData);

        // Check if the role is properly retrieved from the accountData
        if (accountData && accountData.account && accountData.account.role) {
          const userRole = accountData.account.role; 
         // Assuming role is included in the response
          console.log("User Role:", userRole);

          // Redirect based on the role
          if (userRole ==="admin") {
           
            window.location.href = "../../frontend/admin/admin.html"; // Redirect to admin page
          } else {
         
            window.location.href = "../../frontend/event-page/event.html"; // Redirect to user page
          }
        } else {
          alert("Role not found in account details.");
        }
      } else {
        const accountError = await accountResponse.json();
        console.error("Account Details Fetch Error:", accountError);
        alert("Failed to fetch account details.");
      }
    } else {
      // Handle errors returned by the API
      const errorData = await response.json();
      console.error("Login Failed:", errorData);
      alert(`Login failed: ${errorData.message || "Invalid credentials"}`);
    }
  } catch (error) {
    // Handle network or unexpected errors
    console.error("Network error:", error);
    alert("An unexpected error occurred. Please try again later.");
  }
});
