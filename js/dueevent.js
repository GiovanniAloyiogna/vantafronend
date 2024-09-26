let sortedEvents = [];

$(document).ready(function () {
  function fetchEvents() {
    $.ajax({
      url: `${apiConfig.apiUrl}/api/evenements-gestion/evenement`,
      method: "GET",
      success: function (response) {
        const today = new Date().toISOString().split("T")[0];
        const filteredEvents = response.data.filter(
          (event) =>
            new Date(event.unformatteddate).toISOString().split("T")[0] ===
            today
        );

        sortedEvents = filteredEvents.sort(
          (a, b) => new Date(a.unformatteddate) - new Date(b.unformatteddate)
        );

        if (sortedEvents.length > 0) {
          displayEvents(sortedEvents);
        } else {
          $("#events-carousel").html("<p>No events available for today.</p>");
        }
      },
      error: function (error) {
        console.error("Error fetching events:", error);
        $("#events-carousel").html("<p>Error fetching events.</p>");
      },
    });
  }

  function displayEvents(events) {
    let contain = $("#events-carousel");
    contain.empty();
    events.map((item, index) => {
      const eventDate = new Date(item.unformatteddate);
      const dd = String(eventDate.getDate()).padStart(2, "0");
      const mm = String(eventDate.getMonth() + 1).padStart(2, "0");
      const yyyy = eventDate.getFullYear();
      const timerdate = mm + "/" + dd + "/" + yyyy;

      // Generate a unique ID for the countdown timer
      const countdownId = `countdown-time-${index}`;

      contain.append(`
        <div class="carousel-item" data-event-id="${item.id}>
          <div class="container">
            <div class="row">
              <div class="col-md-12" >
                <h1 class="banner_taital" style="color:#c2c0c0 !important;">${item.nom}</h1>
                <p class="banner_text">${item.description}</p>
                <div class="countdown__timer" id="${countdownId}">
                  <div class="countdown__item"><span >00</span></div>
                  <div class="countdown__item"><span >00</span></div>
                  <div class="countdown__item"><span >00</span></div>
                  <div class="countdown__item"><span>00</span></div>
                </div>
                <div class="read_bt">
                  <a href="#" class="btn btn-dark ticket-btn " style="color: #c2c0c0; background-color:none">Reserver</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `);

      // Initialize the countdown for each event
      $(`#${countdownId}`).countdown(timerdate, function (e) {
        $(this).html(
          e.strftime(
            "<div class='countdown__item'><span>%D</span> <p>J</p> </div>" +
              "<div class='countdown__item'><span>%H</span> <p>H</p> </div>" +
              "<div class='countdown__item'><span>%M</span> <p>M</p> </div>" +
              "<div class='countdown__item'><span>%S</span> <p>S</p> </div>"
          )
        );
      });
    });

    // Re-initialize the carousel (if using Bootstrap)
    $("#events-carousel").carousel("dispose").carousel();
    $(".ticket-btn").on("click", function (e) {
      e.preventDefault();

      const eventId = $(this).closest("[data-event-id]").data("event-id");
      localStorage.setItem("selectedEventId", eventId);

      // window.location.href = $(this).find("a").attr("href"); // Navigate to the desired page
      if (localStorage.getItem("selectedEventId")) {
        window.location.href = "blog-details.html";
      }
    });
  }

  fetchEvents();
});
