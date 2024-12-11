// Handle form submission
document.getElementById('signup-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form from submitting the default way
  
    // Get form data
    const formData = new FormData(this);
    const data = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      password: formData.get('password'),
      tel: formData.get('tel')
    };
  
    try {
      // Make API request to sign up
      const response = await fetch('http://localhost:3000/users/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // If successful, display a success message
        alert('Sign-up successful!');
        // Optionally, redirect to login page or home page
        // window.location.href = '/login'; // Example of redirect
      } else {
        // If error, show error message from API response
        document.getElementById('error-message').textContent = result.error || 'An error occurred!';
      }
    } catch (error) {
      // Handle any errors during the fetch request
      document.getElementById('error-message').textContent = 'Network error. Please try again.';
    }
  });
  