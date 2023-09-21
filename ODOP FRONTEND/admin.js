document.addEventListener("DOMContentLoaded", function () {
  // Function to handle the "Edit" button click
  function handleEditButtonClick(event) {
    event.preventDefault();
    const productName = event.target.dataset.productName;
    alert(`Editing ${productName}`);
  }

  // Function to handle the "Delete" button click
  function handleDeleteButtonClick(event) {
    event.preventDefault();
    const productName = event.target.dataset.productName;
    if (confirm(`Delete ${productName}?`)) {
      alert(`${productName} deleted.`);
      // Add your delete logic here (e.g., make an AJAX request to delete the item)
    }
  }

  // Add click event listeners to all "Edit" buttons
  const editButtons = document.querySelectorAll("a[data-action='edit']");
  editButtons.forEach(function (button) {
    button.addEventListener("click", handleEditButtonClick);
  });

  // Add click event listeners to all "Delete" buttons
  const deleteButtons = document.querySelectorAll("a[data-action='delete']");
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", handleDeleteButtonClick);
  });

  // Function to handle the "Upload Image" button click
  function handleUploadButtonClick(event) {
    event.preventDefault();
    const productName = event.target.dataset.productName;
    const inputFile = document.querySelector(`#productImage${productName}`);
    const uploadedImage = inputFile.files[0];

    if (uploadedImage) {
      // In a real application, you would handle the image upload here by making an AJAX request to the server.
      // For demonstration, we'll just log the image name.
      console.log(`Image "${uploadedImage.name}" uploaded for ${productName}`);
    } else {
      alert("Please select an image to upload.");
    }
  }

  // Add click event listeners to all "Upload Image" buttons
  const uploadButtons = document.querySelectorAll("button[data-action='upload']");
  uploadButtons.forEach(function (button) {
    button.addEventListener("click", handleUploadButtonClick);
  });

  // Function to handle the "Add New Product" button click
  function handleAddProductButtonClick(event) {
    event.preventDefault();
    alert("Add New Product clicked");
    // Add your logic for adding a new product here
  }

  // Add click event listener to the "Add New Product" button
  const addProductButton = document.querySelector("#addProduct");
  addProductButton.addEventListener("click", handleAddProductButtonClick);

  // Similar functionality can be added for other buttons
});
