$(document).ready(function () {
  let cards = JSON.parse(localStorage.getItem("all-cards"));

  function fetchEvents() {
    $.ajax({
      url: `${apiConfig.apiUrl}/api/evenements-gestion/evenement`,
      method: "GET",
      success: function (response) {
        const today = new Date().toISOString().split("T")[0];
        const filteredEvents = response.data.filter(
          (event) =>
            new Date(event.unformatteddate).toISOString().split("T")[0] >= today
        );
        displayEvents(filteredEvents);
      },
      error: function (error) {
        console.error("Error fetching events:", error);
        alert(
          "An error occurred while fetching events. Please try again later."
        );
      },
    });
  }

  // function fetchCards() {
  //   $.ajax({
  //     url: `${apiConfig.apiUrl}/api/cartes`,
  //     method: "GET",
  //     success: function (response) {
  //       displayCards(response.data);
  //     },
  //     error: function (error) {
  //       console.error("Error fetching cards:", error);
  //       alert(
  //         "An error occurred while fetching cards. Please try again later."
  //       );
  //     },
  //   });
  // }

  function displayEvents(events) {
    const selectedEventId = localStorage.getItem("selectedEventId");

    if (selectedEventId) {
      const event = events.find((ev) => ev.id === parseInt(selectedEventId));
      if (event) {
        const imageUrl = apiConfig.apiUrl + "/" + event.photo;

        $("#evenement-reservation-container").html(`
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="blog__details__content">
                                <div class="blog__details__item">
                                    <div class="blog__details__item__pic set-bg" data-setbg="${imageUrl}">
                                        <a href="#"><i class="fa fa-share-alt"></i></a>
                                    </div>
                                    <div class="blog__details__item__text">
                                        <span>${event.nom}</span>
                                        <div class="blog__details__item__widget">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <ul>
                                                        <li>${event.date}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="blog__details__desc">
                                    <p class="text-white">${
                                      event.description
                                    }</p>
                                </div>
                                <div class="blog__details__tags">
                                    ${event.tickets
                                      .map(
                                        (ticket) => `
                                        <a href="#">${ticket.billet_name}</a>
                                        <a href="#" style="background-color:red;color:#c2c0c0">${ticket.price}</a>
                                    `
                                      )
                                      .join("")}
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="blog__sidebar">
                                <div class="blog__sidebar__item">
                                    <div class="blog__sidebar__title">
                                        <h4 style="color: #c2c0c0; font-size: 2rem">Reservation ticket</h4>
                                    </div>
                                    <p>Remplissez la forme!</p>
                                    <div class="form-container">
                                        <div class="image-holder"></div>
                                        <form method="post" id="form-reservation">
                                            <input class="form-control" type="text" id="add-event-uid" name="uuid"  style="background-color: #1e1e1e; color: #c2c0c0; border: 1px solid #363030; border-radius: 6px;" required  hidden/>
 <input class="form-control" type="number" id="add-event-id" name="event_id"  style="background-color: #1e1e1e; color: #c2c0c0; border: 1px solid #363030; border-radius: 6px;" required  value="${selectedEventId}" hidden />

                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="form-group">
                                                        <input class="form-control" type="text" id="nom" name="nom" placeholder="Nom" style="background-color: #1e1e1e; color: #c2c0c0; border: 1px solid #363030; border-radius: 6px;" required />
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="form-group">
                                                        <input class="form-control" type="text" id="prenom" name="prenom" placeholder="Prenom" style="background-color: #1e1e1e; color: #c2c0c0; border: 1px solid #363030; border-radius: 6px;" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="form-group">
                                                        <input class="form-control" type="email" id="email" name="client_email" placeholder="Email" style="background-color: #1e1e1e; color: #c2c0c0; border: 1px solid #363030; border-radius: 6px;" required />
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="form-group">
                                                        <select name="carte_id" id="cardSelect" class="form-control" style="background-color: #1e1e1e; color: #c2c0c0; border: 1px solid #363030; border-radius: 6px;" required></select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <select name="billet_id" id="carte_physique" class="form-control" style="background-color: #1e1e1e; color: #c2c0c0; border: 1px solid #363030; border-radius: 6px;">
                                                        ${cards
                                                          .map(
                                                            (item) => `
                                                            <option value="${item.id}">
                                                                ${item.nom} - $${item.prix}
                                                            </option>
                                                        `
                                                          )
                                                          .join("")}
                                                        </select>                              
        
   
                                                    </div>
                                                </div>
                                                <p id="cartes-charges" style="color: red" class="p-0 m-0 text-center"></p>
                                            </div>
                                            <div class="form-group">
                                                <button id="payButtonSing" class="btn btn-default btn-block" type="submit" style="background-color:#363030; color: #c2c0c0; border: none; border-radius: 50px; padding: 12px 25px;">
                                                    Payer
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="blog__sidebar__item">
                                    <div class="blog__sidebar__title">
                                        <h2 style="color:white">Visitez Sing Pay pour vos achats</h2>
                                    </div>
                                    <img
                                        src="/img/icon.png"
                                        alt=""
                                        style="max-width: 100%; max-height: 100%; width: 3rem; height: 3rem;"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                `);

        // Apply the background images
        $(".set-bg").each(function () {
          const bg = $(this).data("setbg");
          $(this).css("background-image", "url(" + bg + ")");
        });

        displayTickets(event.tickets);

        // Attach the click event handler after content is loaded
        $("#payButtonSing").on("click", function (e) {
          e.preventDefault();

          // Form validation
          const isValid = validateForm();
          if (!isValid) {
            return; // Stop if the form is not valid
          }

          // Retrieve form data
          const formData = {
            nom: $("#nom").val(),
            prenom: $("#prenom").val(),
            client_email: $("#email").val(),
            billet_id: $("#cardSelect").val(),
            carte_id: $("#carte_physique").val(),
            event_id: $("#add-event-id").val(),
            uuid: $("#add-event-uid").val(),
          };
          $("#paymentModal").modal("show");
          // Post data to the server
          fetch(`${apiConfig.apiUrl}/api/payerticketsite`, {
            // Update this URL
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem("uuid", $("#add-event-uid").val());
              $("#paymentModal").modal("hide");
              $("#form-reservation")[0].reset(); // This resets the form fields

              // Optionally redirect to the payment page
              window.location.href = "payement.html";
              //alert("Réservation réussie!");
            })
            .catch((error) => {
              console.error("Error:", error);
              alert(
                "Une erreur est survenue lors de la soumission du formulaire. Veuillez réessayer plus tard."
              );
            });
        });
      } else {
        console.error("Event not found");
        alert("L'événement sélectionné n'existe pas.");
      }
    } else {
      console.error("No event ID found in localStorage");
      alert("Aucun événement sélectionné.");
    }
    $("#add-event-uid").val(generateUUID());
  }

  function displayTickets(tickets) {
    const cardSelect = $("#cardSelect");
    // const cartePhysiqueSelect = $("#carte_physique");

    cardSelect.empty();
    //cartePhysiqueSelect.empty();

    tickets.forEach((ticket) => {
      cardSelect.append(
        `<option value="${ticket.billet_id}">${ticket.billet_name} - ${ticket.price}</option>`
      );
      //   cartePhysiqueSelect.append(
      //     `<option value="${ticket.id}">${ticket.billet_name} - ${ticket.price}</option>`
      //   );
    });
  }

  function validateForm() {
    let isValid = true;

    // Validate each required field
    $("#form-reservation")
      .find("input[required], select[required]")
      .each(function () {
        if ($(this).val() === "") {
          $(this).css("border", "1px solid red");
          isValid = false;
        } else {
          $(this).css("border", "1px solid #363030");
        }
      });

    return isValid;
  }

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  // Fetch events and cards on page load
  fetchEvents();

  // Generate and set UUID
});
