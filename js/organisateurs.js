

$(document).ready(function () {
  function fetchEvents() {
    $.ajax({
      url: `${apiConfig.apiUrl}/api/organisateurs`,
      method: "GET",
      success: function (response) {
        console.log("events", response?.data);
        displayEvents(response?.data);
      },
      error: function (error) {
        console.error("Error fetching events:", error);
      },
    });
  }

  function displayEvents(events) {
    const eventContainer = $(".organizers");
    eventContainer.empty();

    events.forEach((event) => {
      const div = `
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="about__services__item">
              <div
                class="about__services__item__pic set-bg relative"
                data-setbg="${apiConfig.apiUrl}/${event?.logo}"
              >
                
              </div>
              
              <div class="about__services__item__text">
              <div class="organizer-contact ">
              
                  <a href="#" target="_blank" rel="noopener noreferrer">Contacter</a>
                </div>
                <h4 style="color:#c2c0c0">${event?.nom}</h4>
                <p>
                  ${event?.description}
                </p>
              </div>
            </div>
          </div>
        `;
      eventContainer.append(div);
    });

    // Set the background images for the dynamically added elements
    $(".set-bg").each(function () {
      var bg = $(this).data("setbg");
      $(this).css("background-image", "url(" + bg + ")");
    });
  }

  // Fetch events when the page loads
  fetchEvents();
});
