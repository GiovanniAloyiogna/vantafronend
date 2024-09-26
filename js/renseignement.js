$(document).ready(function () {
  // Click event for the "Envoyer" button
  $("#submitButton").click(function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Clear previous errors
    $(".error").remove();

    // Collect form data
    var name = $("#name").val().trim();
    var phone = $("#phone").val().trim();
    var email = $("#email").val().trim();
    var message = $("#comment").val().trim();
    var isValid = true;

    // Validate form fields
    if (name === "") {
      $("#name").after('<span class="error">Ce champ est requis.</span>');
      isValid = false;
    }

    if (phone === "" || !/^\d+$/.test(phone)) {
      $("#phone").after(
        '<span class="error">Veuillez entrer un numéro de téléphone valide.</span>'
      );
      isValid = false;
    }

    if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
      $("#email").after(
        '<span class="error">Veuillez entrer une adresse email valide.</span>'
      );
      isValid = false;
    }

    if (message === "") {
      $("#comment").after('<span class="error">Ce champ est requis.</span>');
      isValid = false;
    }

    // If form is valid, submit the form via AJAX
    if (isValid) {
      $.ajax({
        url: `${apiConfig.appUrl}/api/commentaires/renseignements`,
        method: "POST",
        data: {
          Name: name,
          PhoneNumber: phone,
          Email: email,
          Message: message, // Fixed typo here
        },
        success: function (response) {
          // Show success message
          alert("Votre message a été envoyé avec succès !");
          $("#contactForm")[0].reset(); // Reset the form
        },
        error: function (xhr, status, error) {
          // Show error message
          alert("Une erreur s'est produite. Veuillez réessayer.");
        },
      });
    }
  });
});
