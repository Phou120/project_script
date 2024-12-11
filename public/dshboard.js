
    const userData = localStorage.getItem('user');

    // Parse the data back to a JavaScript object
    const user = JSON.parse(userData);

    // Reference to the HTML element where the username will be displayed
    const usernameDiv = document.getElementById('username');
    const profile = document.getElementById('profile');

    // Check if user data exists and has a username property
    if (user && user.first_name) {
    console.log(user.profile);
    // Display the username
    usernameDiv.textContent = `${user.first_name} ${user.last_name}`;
    // Update the profile image's src attribute
    if (user.profile) {
        profile.src = user.profile; // Set profile image URL
    }
    } else {
    // Fallback message if username is not found
    usernameDiv.textContent = '';
    profile.src =
        'https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-1.jpg'; // Fallback to default image
    }

    let currentPage = 1; // Start at page 1
    let totalPages = 3; // Total number of pages
    const usersPerPage = 3; // Users per page

    // Function to fetch users from the backend
    async function fetchUsers(page = 1) {
    try {
        // Fetch users from the API with pagination parameters
        const response = await fetch(
        `http://127.0.0.1:3000/users?page=${page}&limit=${usersPerPage}`,
        );
        const data = await response.json();

        if (data.data && Array.isArray(data.data)) {
        // Add serial numbers to the data
        data.data.forEach((item, index) => {
            item.serialNumber = index + 1; // Generate serial number starting from 1
        });

        // Update user table
        const userList = document.getElementById('user-list');
        userList.innerHTML = ''; // Clear existing rows

        // Populate rows with fetched data
        data.data.forEach((user, index) => {
            const row = document.createElement('tr');
            // Check if profile_url is null or empty, set to default image if so
            const profileImage = user.profile_url
            ? user.profile_url
            : 'https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-1.jpg'; // Replace with your default image URL
            row.innerHTML = `
                        <td>${user.serialNumber}</td> <!-- Use the generated serial number -->
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td>${user.email}</td>
                        <td>${user.tel}</td>
                        <td>
                            <img src="${profileImage}" alt="Profile" class="rounded-profile" width="50" height="50">
                        </td>
                        <td>
                        <!-- Update Button with Edit Icon -->
                        <button class="action-btn update" onclick="updateUser(${user.id})">
                            <i class="fas fa-pencil-alt"></i> <!-- Edit Icon -->
                        </button>
                        <!-- Delete Button with Trash Icon -->
                        <button class="action-btn delete" onclick="deleteUser(${user.id})">
                            <i class="fas fa-trash-alt"></i> <!-- Trash Icon -->
                        </button>
                        </td>
                    `;
            userList.appendChild(row);
        });

        // Update pagination details
        totalPages = data.totalPages;
        currentPage = data.currentPage;
        updatePaginationControls(); // Refresh pagination controls
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
    }

    // Update pagination buttons and page info
    function updatePaginationControls() {
    const pageInfo = document.getElementById('page-info');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const paginationContainer = document.getElementById('pagination');

    // Update page info text
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    // Enable/disable "Previous" and "Next" buttons
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;

    // Clear and regenerate pagination buttons
    paginationContainer.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
        pageButton.classList.add('active'); // Highlight current page
        }
        pageButton.onclick = () => fetchUsers(i);
        paginationContainer.appendChild(pageButton);
    }
    }

    // Change page when "Previous" or "Next" is clicked
    function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        fetchUsers(newPage);
    }
    }

    // update user  \\
    // Function to close the modal
    function closeModal() {
    document.getElementById('update-user-modal').style.display = 'none';
    }

    // Function to open the modal (with pre-filled data)
    function updateUser(userId) {
    // Fetch user details by ID (this is an example; you may need to adjust the endpoint)
    fetch(`http://127.0.0.1:3000/users/${userId}`)
        .then((response) => response.json())
        .then((user) => {
        console.log('name', user.user.id);
        // Populate modal fields with user data
        document.getElementById('user-id').value = user.user.id;
        document.getElementById('update-first-name').value =
            user.user.first_name;
        document.getElementById('update-last-name').value =
            user.user.last_name;
        document.getElementById('update-email').value = user.user.email;
        document.getElementById('update-tel').value = user.user.tel;
        // document.getElementById('update-profile').value = user.user.profile;
        document.getElementById('profile-image-preview').value =
            user.user.profile_url;

        const profileImage = user.user.profile_url;
        const profileImagePreview = document.getElementById(
            'profile-image-preview',
        );

        if (profileImage) {
            profileImagePreview.src = profileImage; // Set image source for preview
        } else {
            profileImagePreview.src =
            'https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-1.jpg'; // Clear image if no profile image is provided
        }

        // Show the modal
        document.getElementById('update-user-modal').style.display = 'flex';
        })
        .catch((error) => {
        console.error('Error fetching user data:', error);
        });
    }


    // Handle the file input change and preview the selected image
    function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const image = document.getElementById('profile-image-preview');
        image.src = e.target.result;

        // Apply a "selected" effect after the user uploads an image
        document.querySelector('.image-preview').classList.add('selected');
    };

    if (file) {
        reader.readAsDataURL(file);
    }
    }

    function clearImage() {
    const preview = document.getElementById('profile-image-preview');
    const input = document.getElementById('image');

    // Reset the image preview to default
    preview.src =
        'https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-1.jpg';

    // Clear the input file value
    input.value = '';
    }

    function saveUserUpdate() {
    document
        .querySelectorAll('.error')
        .forEach((errorDiv) => (errorDiv.innerHTML = ''));

    const userId = document.getElementById('user-id').value;
    const firstName = document.getElementById('update-first-name').value;
    const lastName = document.getElementById('update-last-name').value;
    const email = document.getElementById('update-email').value;
    const tel = document.getElementById('update-tel').value;
    const profileImage = document.getElementById('image').files[0]; // File input

    let isValid = true;

    // Validate first name
    if (!firstName) {
        document.getElementById('first-name-error').innerText =
        'First name is required.';
        isValid = false;
    }

    // Validate last name
    if (!lastName) {
        document.getElementById('last-name-error').innerText =
        'Last name is required.';
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        document.getElementById('email-error').innerText =
        'Please enter a valid email address.';
        isValid = false;
    }

    // Validate phone number
    const telRegex = /^[0-9]{6,16}$/;
    if (!tel || !telRegex.test(tel)) {
        document.getElementById('tel-error').innerText =
        'A valid 10-digit phone number is required.';
        isValid = false;
    }

    // Validate profile image
    if (profileImage) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(profileImage.type)) {
        document.getElementById('image-error').innerText =
            'Please upload a valid image file (JPEG or PNG).';
        isValid = false;
        }
    }

    if (!isValid) return;

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('tel', tel);

    console.log('FormData content:', formData);
    if (profileImage) {
        formData.append('profile', profileImage);
    }

    // Send data using a PUT request
    console.log('id:', userId);

    fetch(`http://127.0.0.1:3000/users/${userId}`, {
        method: 'PUT',
        body: formData,
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
        })
        .then((data) => {
        console.log('Response:', data);

        if (data.success) {
            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '<small>Your work has been saved</small>',
            showConfirmButton: false,
            timer: 1500,
            width: '200px', // Smaller width
            heightAuto: false, // Disable auto height for manual adjustment
            customClass: {
                popup: 'swal-small-popup', // Custom class for the modal container
                title: 'swal-small-title', // Custom class for the title
            },
            });

            closeModal(); // Close modal on success
            fetchUsers(currentPage); // Reload users after update
        } else {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="#">Why do I have this issue?</a>',
            });
        }

        closeModal();
        fetchUsers(currentPage); // Reload users after update
        })
        .catch((error) => {
        console.error('Error updating user:', error);
        // alert('Failed to update user. Please try again.');
        });
    }

    // end \\

    async function deleteUser(userId) {
    // Show confirmation dialog with SweetAlert
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
        // If the user confirms, proceed with the deletion
        if (result.isConfirmed) {
        try {
            // Send DELETE request to the API
            const response = await fetch(
            `http://localhost:3000/users/${userId}`,
            {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                // Include any additional headers like Authorization if needed
                },
            },
            );

            // Check if the deletion was successful
            if (response.ok) {
            // Notify the user that the deletion was successful
            Swal.fire({
                title: 'Deleted!',
                text: 'The user has been deleted.',
                icon: 'success',
                showConfirmButton: false, // Hide the confirm button
                timer: 1500, // Auto-close after 1.5 seconds
            });

            // Optionally, remove the row from the table
            const rowToDelete = document.getElementById(
                `user-row-${userId}`,
            );
            if (rowToDelete) {
                rowToDelete.remove();
            }
            } else {
            // Handle failure case
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete the user.',
                icon: 'error',
            });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            Swal.fire({
            title: 'Error!',
            text: 'An error occurred while deleting the user.',
            icon: 'error',
            });
        }
        }
    });
    }

    // Initial fetch of users (page 1)
    fetchUsers(currentPage);

    // Handle navigation
    document
    .getElementById('dashboard-menu')
    .addEventListener('click', () => {
        document.getElementById('dashboard-content').style.display = 'flex';
        document.getElementById('users-content').style.display = 'none';
        document.getElementById('page-title').textContent = 'Dashboard';
        document.getElementById('reports-content').style.display = 'none';
        document.querySelector('.graph').style.display = 'block';
    });

    document.getElementById('users-menu').addEventListener('click', () => {
    document.getElementById('dashboard-content').style.display = 'none';
    document.getElementById('users-content').style.display = 'block';
    document.getElementById('reports-content').style.display = 'none';
    // Hide the Recent Activity section when viewing Users
    document.querySelector('.graph').style.display = 'none';
    document.getElementById('page-title').textContent = 'Users';
    fetchUsers();
    });

    // Check if the token exists in localStorage when the page loads
    window.onload = function () {
    const token = localStorage.getItem('authToken'); // Replace 'authToken' with your actual token key
    if (!token) {
        // If no token is found, redirect to the sign-in page
        window.location.href = 'http://localhost:3000/sign-in'; // Replace with your actual sign-in page URL
    }
    };

    // Logout modal functionality
    document
    .getElementById('logout')
    .addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior

        // Show the logout modal
        document.getElementById('logout-modal').style.display = 'flex';
    });

    // Cancel logout
    document
    .getElementById('cancel-logout')
    .addEventListener('click', function () {
        document.getElementById('logout-modal').style.display = 'none';
    });

    // Confirm logout   
    document
    .getElementById('confirm-logout')
    .addEventListener('click', function () {
        // Remove the token from localStorage
        localStorage.removeItem('authToken'); // Replace 'authToken' with your actual token key

        // Redirect to sign-in page
        window.location.href = 'http://localhost:3000/sign-in'; // Replace with your actual sign-in page URL
    });

// reserve table
// Function to fetch reservation data from the backend
    async function fetchReservations() {
    try {
        const response = await fetch('http://127.0.0.1:3000/reserve-tables'); // Adjust the API URL if needed
        const data = await response.json();
        // console.log('object', data);

        if (data && data.data) {
        // Add serial numbers to the data
        data.data.forEach((item, index) => {
            item.serialNumber = index + 1; // Generate serial number starting from 1
        });

        const reservationList = document.getElementById('reservation-list');
        reservationList.innerHTML = ''; // Clear any existing rows

        // Loop through the reservations and create a new row for each
        data.data.forEach((data) => {
            // console.log('object', data);

            // Format the date to yyyy-mm-dd (e.g., 2024-01-03)
            const formattedDate = new Date(data.date).toLocaleDateString(
            'en-CA',
            ); // 'en-CA' gives yyyy-mm-dd format

            // Directly use the time field (data.time) to get hh:mm format
            const formattedTime = data.time.substring(0, 5); // Extract 'hh:mm' from 'hh:mm:ss'

            // Set the status class based on status value
            const statusClass =
            data.status === 'pending'
                ? 'status-pending'
                : data.status === 'success'
                ? 'status-success'
                : 'status-cancel'; // Class for 'cancel' status

            const statusLabel =
            data.status === 'pending'
                ? 'Pending'
                : data.status === 'success'
                ? 'Success'
                : 'Cancelled'; // Label for 'cancel' status

            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${data.serialNumber}</td> <!-- Use the generated serial number -->
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.tel}</td>
            <td>${data.qty_person}</td>
            <td>${formattedDate}</td>
            <td>${formattedTime}</td>
            <td>${data.message}</td>
            <td>
                <button class="status-btn ${statusClass}" onclick="handleStatusClick(${data.id}, '${data.status}')">
                ${statusLabel}
                </button>
            </td>
           <td>
                <!-- Update Button with Edit Icon -->
                <button class="action-btn update" onclick="getReserve(${data.id})">
                    <i class="fas fa-pencil-alt"></i> <!-- Edit Icon -->
                </button>
                <!-- Delete Button with Trash Icon -->
                <button class="action-btn delete" onclick="deleteReserve(${data.id})">
                    <i class="fas fa-trash-alt"></i> <!-- Trash Icon -->
                </button>
                <!-- Details Button with Eye Icon -->
                <button class="action-btn details" onclick="showDetails(${data.id})">
                    <i class="fas fa-eye"></i> <!-- Eye Icon -->
                </button>
            </td>
            `;
            reservationList.appendChild(row);
        });
        }
    } catch (error) {
        console.error('Error fetching reservations:', error);
    }
    }

    function handleStatusClick(id, currentStatus) {
    Swal.fire({
        title: 'Approve reservation',
        input: 'select',
        inputOptions: {
        pending: 'Pending',
        success: 'Success',
        cancel: 'Cancel',
        },
        // inputPlaceholder: 'Select a status',
        inputValue: currentStatus, // Pre-select the current status
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: async (newStatus) => {
        try {
            // Send a PUT request to update the status
            const response = await fetch(
            `http://127.0.0.1:3000/reserve-tables/approve/${id}`,
            {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }), // Send new status in the request body
            },
            );
            console.log('h' + JSON.stringify({ status: newStatus }));

            if (!response.ok) {
            throw new Error('Failed to update status');
            }
            return response.json();
        } catch (error) {
            Swal.showValidationMessage(`Request failed: ${error.message}`);
        }
        },
        allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire({
            title: 'Approve Successfully',
            icon: 'success',
            timer: 1500, // Auto-close the success popup after 1.5 seconds
            showConfirmButton: false, // Hide the confirm button
        });
        // Call the function to refresh reservation data
        fetchReservations(); // Assuming loadReservationData() fetches and displays the updated data
        }
    });
    }


    function getReserve(id) {
        // Fetch reservation details by ID
        fetch(`http://127.0.0.1:3000/reserve-tables/${id}`)
        .then((response) => response.json())
        .then((responseData) => {
            const data = responseData.data; // Access the `data` object
            // Populate modal fields with reservation data
            document.getElementById('user-id').value = data.id;
            document.getElementById('update-first-name').value = data.name;
            document.getElementById('update-qty-person').value = data.qty_person;
            document.getElementById('update-date').value = data.date.split('T')[0]; // Extract date part
            document.getElementById('update-time').value = data.time;
    
            // Show the modal
            document.getElementById('list-reserve-modal').style.display = 'flex';
        })
        .catch((error) => {
            console.error('Error fetching reservation data:', error);
        });
    }

    // Close modal
    function closeModal() {
        document.getElementById('list-reserve-modal').style.display = 'none';
    }


    // Function to fetch reservation details and show them in the form
    function showDetails(id) {
        // Fetch data from the API
        fetch(`http://127.0.0.1:3000/reserve-tables/${id}`)
            .then((response) => response.json()) // Parse the JSON response
            .then((data) => {
                // Populate the form with fetched data
                document.getElementById('name').textContent = data.name || 'N/A';
                document.getElementById('email').textContent = data.email || 'N/A';
                document.getElementById('tel').textContent = data.tel || 'N/A';
                document.getElementById('message').textContent = data.message || 'N/A';
                document.getElementById('qty_person').textContent = data.qty_person || 'N/A';
                document.getElementById('date').textContent = data.date ? new Date(data.date).toLocaleDateString() : 'N/A'; // Format date
                document.getElementById('time').textContent = data.time || 'N/A'; // Assuming time is in hh:mm format
                document.getElementById('status').textContent = data.status || 'N/A';
                
                // Show the modal with the form
                const modal = document.getElementById('detailsModal');
                modal.style.display = 'block';
            })
            .catch((error) => {
                console.error('Error fetching reservation details:', error);
                alert('Failed to load reservation details.');
            });
    }

    // Close the modal
    function closeModal() {
        const modal = document.getElementById('detailsModal');
        modal.style.display = 'none';
    }





    function validateForm(name, qty_person, date, time) {
        // Clear previous error messages
        clearErrorMessages();
    
        let isValid = true;
    
        // Validate name: It should not be empty
        if (!name || name.trim() === "") {
            displayErrorMessage('name-error', "Name cannot be empty.");
            isValid = false;
        }
    
        // Validate qty_person: It should be a positive integer
        if (!qty_person || isNaN(qty_person) || parseInt(qty_person) <= 0) {
            displayErrorMessage('qty-person-error', "Quantity of persons must be a positive integer.");
            isValid = false;
        }
    
        // Validate date: It should match the YYYY-MM-DD format
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!date || !dateRegex.test(date)) {
            displayErrorMessage('date-error', "Please enter a valid date in YYYY-MM-DD format.");
            isValid = false;
        }

        // Return true if all validations pass, otherwise false
        return isValid;
    }
    
    function displayErrorMessage(errorElementId, errorMessage) {
        const errorElement = document.getElementById(errorElementId);
        if (errorElement) {
            errorElement.innerText = errorMessage;
            errorElement.style.color = 'red'; // You can style it as you wish
        }
    }
    
    function clearErrorMessages() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach((element) => {
            element.innerText = ''; // Clear the error message
        });
    }

    // Save changes (optional)
    function saveChanges() {
        const id = document.getElementById('user-id').value;
    
        const name = document.getElementById('update-first-name').value;
        const qty_person = document.getElementById('update-qty-person').value;
        const date = document.getElementById('update-date').value;
        const time = document.getElementById('update-time').value;
    
         // Validate the form inputs
        if (!validateForm(name, qty_person, date, time)) {
            return; // Stop if validation fails
        }

        // Create the updatedData object
        const updatedData = {
            name: name,
            qty_person: parseInt(qty_person), // Ensure qty_person is treated as a number
            date: date, // Ensure date is in the correct format (e.g., YYYY-MM-DD)
            time: time
        };
    
        console.log('updatedData:', updatedData);
    
        // Send the PUT request to update the reservation
        fetch(`http://127.0.0.1:3000/reserve-tables/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        })
        .then((response) => response.json())
        .then(() => {
            Swal.fire({
                title: 'Update Reserve!',
                text: 'The reserve table has been Update.',
                icon: 'success',
                showConfirmButton: false, // Hide the confirm button
                timer: 1500, // Auto-close after 1.5 seconds
            });
            closeModal(); // Close the modal after the update
            fetchReservations(); // Refresh the reservation list
        })
        .catch((error) => {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update the reserve table.',
                icon: 'error',
            });
        });
    }
    

    async function deleteReserve(id) {
        // Show confirmation dialog with SweetAlert
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            // If the user confirms, proceed with the deletion
            if (result.isConfirmed) {
            try {
                // Send DELETE request to the API
                const response = await fetch(
                    `http://127.0.0.1:3000/reserve-tables/${id}`,
                    {
                        method: 'DELETE',
                        headers: {
                        'Content-Type': 'application/json',
                        // Include any additional headers like Authorization if needed
                        },
                    },
                );

                console.log('response'+response.status);
    
                // Check if the deletion was successful
                if (response.ok) {
                // Notify the user that the deletion was successful
                Swal.fire({
                    title: 'Deleted!',
                    text: 'The reserve table has been deleted.',
                    icon: 'success',
                    showConfirmButton: false, // Hide the confirm button
                    timer: 1500, // Auto-close after 1.5 seconds
                });
    
                setTimeout(() => {
                    fetchReservations(); // Reload reservations after 1.5 seconds
                }, 1500); // Match the timer duration for seamless experience

                } else {
                // Handle failure case
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to delete the reserve table.',
                    icon: 'error',
                });
                }
            } catch (error) {
                console.error('Error deleting reserve table:', error);
                Swal.fire({
                title: 'Error!',
                text: 'An error occurred while deleting the reserve table.',
                icon: 'error',
                });
            }
            }
        });
        }
  
    // Initialize data
    fetchReservations();

    // Function to handle the click event on the "Reports" menu item
    document
    .getElementById('report-reserve-table')
    .addEventListener('click', function () {
    // Hide other content and display the reports content
    document.getElementById('dashboard-content').style.display = 'none';
    document.getElementById('users-content').style.display = 'none';
    document.getElementById('reports-content').style.display = 'block'; // Show the reports content
    document.querySelector('.graph').style.display = 'none';
    document.getElementById('page-title').textContent = 'Report Reserve';

    // Fetch and display the reservations
    fetchReservations();
    });
