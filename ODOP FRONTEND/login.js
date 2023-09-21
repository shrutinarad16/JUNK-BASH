// Get form elements
const loginForm = document.getElementById("login-form");
const forgotPasswordForm = document.getElementById("forgot-password-form");
const registerForm = document.getElementById("register-form");

// Get links for toggling forms
const forgotPasswordLink = document.getElementById("forgot-password");
const registerLink = document.getElementById("register-link");
const backToLoginLink = document.getElementById("back-to-login");

// Handle form toggling
forgotPasswordLink.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    forgotPasswordForm.classList.remove("hidden");
});

registerLink.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
});

backToLoginLink.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    forgotPasswordForm.classList.add("hidden");
    registerForm.classList.add("hidden");
});

// Handle login form submission
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add your login logic here
    alert("Login successful!"); // Replace with actual login logic
});

// Add an event listener for the "Register as Seller" link
document.getElementById('register-link-seller').addEventListener('click', function (e) {
    e.preventDefault();
    toggleRegistrationForms('seller-register-form');
});

// Function to toggle between registration forms
function toggleRegistrationForms(formId) {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.classList.add('hidden'));
    document.getElementById(formId).classList.remove('hidden');
}

// Event listener for seller registration form submission
document.getElementById('seller-register-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // Get seller registration form data
    const sellerName = document.getElementById('seller-name').value;
    const sellerID = document.getElementById('seller-id').value;
    const sellerEmail = document.getElementById('seller-email').value;
    const sellerPassword = document.getElementById('seller-password').value;
    const sellerPhone = document.getElementById('seller-phone').value;
    const sellerAadhar = document.getElementById('seller-aadhar').value;
    const sellerAadharFile = document.getElementById('seller-aadhar-upload').files[0];

    alert("Registration successful!"); 
    // You can send the data to a server or perform any other actions needed for seller registration

    // For previewing Aadhar card (optional)
    if (sellerAadharFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const aadharPreview = document.createElement('img');
            aadharPreview.src = e.target.result;
            // Display Aadhar card preview (you may need to modify this part)
            const previewContainer = document.getElementById('aadhar-preview-container');
            previewContainer.innerHTML = '';
            previewContainer.appendChild(aadharPreview);
        };
        reader.readAsDataURL(sellerAadharFile);
    }

    // After successful registration, you can redirect the user or perform other actions
});
