$(document).ready(function () {
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
      },
    });
  }

  function displayEvents(events) {
    const eventContainer = $(".event_section_slider");
    eventContainer.empty();

    let div = '<div class="event__slider owl-carousel">';

    events.forEach((event) => {
      div += `
        <div class="col-lg-4 col-sm-12 col-md-12" data-id="event-${
          event.id
        }" data-event-id="${event.id}">
          <div class="event__item">
            <div class="event__item__pic set-bg" data-setbg="${
              apiConfig.apiUrl
            }/${event.photo}">
              <div class="tag-date  ">
                <button class="btn btn-dark buy-ticket-btn " style="color: #c2c0c0; background-color:none">Acheter ticket</button>
              </div>
            </div>
            <div class="event__item__text">
              <h4 style="color:#c2c0c0">${event.nom}</h4>
              <p><i class="fa fa-map-marker" style="color:#c2c0c0"></i> ${
                event.addresse
              }</p>
              <p><i class="fa fa-calendar" style="color:#c2c0c0"></i> ${new Date(
                event.unformatteddate
              ).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</p>
              <span class="event-details text-white" data-id="${
                event.id
              }">Details</span>
            </div>
          </div>
        </div>
      `;
    });

    div += "</div>";
    eventContainer.append(div);

    $(".set-bg").each(function () {
      var bg = $(this).data("setbg");
      $(this).css("background-image", "url(" + bg + ")");
    });

    $(".event__slider").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      nav: true,
      dots: true,
      pagination: true,
      animateOut: "fadeOut",
      responsive: {
        0: { items: 1 },
        600: { items: 1 },
        1000: { items: 3 },
      },
    });

    // Event handler for details link
    $(".event-details").on("click", function (e) {
      e.preventDefault();
      const eventId = $(this).data("id");
      const event = events.find((ev) => ev.id === eventId);
      if (event) {
        $("#modalTitle").text(event.nom);
        $("#modalAddress").text(event.addresse);
        $("#modalDate").text(
          new Date(event.unformatteddate).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
        $("#modalImage").attr("src", apiConfig.apiUrl+'/' + event.photo);
        $("#event-description").html(`${event.description}`);
        $("#event-places").html(`${event.nombre_places} Places disponibles`);
        if (event?.tickets.length > 0) {
          $("#tickets-details").empty();
          event?.tickets.map((item) => {
            $("#tickets-details")
              .append(`<div class="col-lg-3 col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
            <div class="card text-center p-3 mb-3" style="max-width: 18rem">
              <div class="card-body">
                <!-- Ticket Image -->
                <div
                  class="d-flex justify-content-center align-items-center mb-3"
                >
                  <img
                    src="/img/ticket.png"
                    alt="Ticket"
                    style="width: 4rem; height: 4rem"
                  />
                </div>

                <!-- Ticket Type -->
                <h5 class="card-title">${item.billet_name}</h5>

                <!-- Ticket Price -->
                <p class="card-text" style="color: #c2c0c0">Prix: ${
                  item.price + " " + "Cfa"
                }</p>
              </div>
            </div>
          </div>`);
          });
        } else {
          $("#tickets-details").empty();
        }

        $("#eventModal").show();
      }
    });

    // Event handler for the "Acheter ticket" button
    $(".buy-ticket-btn").on("click", function (e) {
      e.preventDefault();
      console.log("clcked");

      const eventId = $(this).closest("[data-event-id]").data("event-id");
      localStorage.setItem("selectedEventId", eventId);

      // window.location.href = $(this).find("a").attr("href"); // Navigate to the desired page
      if (localStorage.getItem("selectedEventId")) {
        window.location.href = "details.html";
      }
    });

    // Close modal functionality
    $(".close").on("click", function () {
      $("#eventModal").hide();
    });

    $(window).on("click", function (e) {
      if ($(e.target).is("#eventModal")) {
        $("#eventModal").hide();
      }
    });
  }

  fetchEvents();
});
