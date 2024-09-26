$(document).ready(function () {
  function fetchEvents() {
    $.ajax({
      url: `${apiConfig.apiUrl}/api/cartes`,
      method: "GET",
      success: function (response) {
        displayEvents(response.data);
      },
      error: function (error) {
        console.error("Error fetching events:", error);
      },
    });
  }

  function displayEvents(events) {
    const eventContainer = $(".accordion-custom");
    eventContainer.empty();

    events.forEach((event) => {
      const eventHtml = `
          <div class="card">
            <div
              class="card-header"
              id="heading${event.id}"
              data-toggle="collapse"
              data-target="#collapse${event.id}"
              aria-expanded="false"
              aria-controls="collapse${event.id}"
            >
              <div class="d-flex align-items-center">
                <i class="fa fa-gift"></i>
                <span class="ml-2">${event.nom}</span>
              </div>
            </div>
            <div
              id="collapse${event.id}"
              class="collapse"
              aria-labelledby="heading${event.id}"
              data-parent=".accordion-custom"
            >
              <div class="card-body">
                <ul class="list-unstyled">
                  <li>
                    <i class="fa fa-check-circle check-icon"></i>
                    ${event.reduction}% Reduction sur vos evenements
                  </li>
                  <li>
                    
                </ul>
                <img src="${apiConfig.apiUrl+"/"}${
        event?.photo
      }" alt="image carte"/>
              </div>
            </div>
          </div>
        `;

      eventContainer.append(eventHtml);
    });
  }

  // Call the function to fetch events when the page loads
  fetchEvents();
});
