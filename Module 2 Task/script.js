document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const formData = {
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      email: document.getElementById("email").value,
      phoneNumber: document.getElementById("phone-number").value,
      city: document.getElementById("city").value,
      country: document.getElementById("country").value,
      address: document.getElementById("address").value,
      message: document.getElementById("message").value,
      termsAccepted: document.getElementById("link-checkbox").checked,
    };
    
    console.log("Form Data:", formData);

    alert("From Data Submitted Successfully");
    // form.reset();
  });
});
