$(document).ready(function () {
  function fetchEvents() {
    $.ajax({
      url: "http://localhost:8000/api/commentaires/",
      method: "GET",
      success: function (response) {
        if (response.data.length > 0) {
          displayEvents(response.data);
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
    let contain = $("#temoignages-id");
    contain.empty();
    events.map((item, index) => {
      // Handle image URL
      let imageUrl = item.photo
        ? `${apiConfig.imageBaseUrl}${item.photo}`
        : "img/quote.png";

      // Add the 'active' class only to the first item
      let activeClass = index === 0 ? "active" : "";
      contain.append(`
                <div class="carousel-item ${activeClass}">
                    <div class="row testimonial_section_2 ">
                        <div class="col-md-3 col-sm-12 testimonial_left text-center">
                            <div class="client_img">
                                <img src="${imageUrl}" alt="Client Image" class="img-fluid" style="max-width:100%; object-fit:cover;" />
                            </div>
                        </div>
                        <div class="col-md-9 col-sm-12 testimonial_right text-md-right text-center">
                            <h4 class="markro_text m-4" style="color:white">${item.nom}</h4>
                            <p class="many_text" style="color:white">
                                ${item.commentaire}
                            </p>
                        </div>
                    </div>
                </div>
            `);
    });

    // Re-initialize the carousel (if using Bootstrap)
    $("#temoignages-id").carousel("dispose").carousel();
  }

  fetchEvents();
});
