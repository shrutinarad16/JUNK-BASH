// JavaScript code for updating the profile picture

const profileImage = document.getElementById("profile-image");
const profilePictureInput = document.getElementById("profile-picture-input");
const updateProfilePictureButton = document.getElementById("update-profile-picture");

updateProfilePictureButton.addEventListener("click", () => {
    profilePictureInput.click();
});

profilePictureInput.addEventListener("change", () => {
    const file = profilePictureInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// JavaScript code for updating the profile information

const updateProfileButton = document.getElementById("update-profile");

updateProfileButton.addEventListener("click", () => {
    // Get updated profile information from input fields
    const name = document.getElementById("name").value;
    const mobileNumber = document.getElementById("mobile-number").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const state = document.getElementById("state").value;
    alert('Profile updated successfully.');

    // Here, you can send the updated information to a server or perform other actions as needed
    // For this example, we'll simply log the updated information
    console.log("Updated Profile Information:");
    console.log("Name:", name);
    console.log("Mobile Number:", mobileNumber);
    console.log("Email:", email);
    console.log("Address:", address);
    console.log("State:", state);
});
