$(document).ready(function () {
  let currentPage = 1;
  function fetchEvents(page = 1) {
    $.ajax({
      url: `${apiConfig.apiUrl}/api/newsroom/withpagination?page=${page}`,
      method: "GET",
      success: function (response) {
        console.log("events ddata", response?.data);
        displayEvents(response?.data?.data);
        setupPagination(response?.data);
      },
      error: function (error) {
        console.error("Error fetching events:", error);
      },
    });
  }

  function displayEvents(events) {
    const eventContainer = $(".bog_container");
    eventContainer.empty();

    events.forEach((event) => {
      const eventHtml = `
          <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="blog__item">
                  <div class="blog__item__pic">
                    <img src="${apiConfig.apiUrl + "/"}${
        event?.image
      }" alt="" />
                  </div>
                  <div class="blog__item__text" style="background-color:white">
                    <span>${event.title}</span>
                    <h5 style="color:#444444">
                       ${event.description}
                    </h5>
                    <ul>
                      <li><span><a href="${
                        event.source
                      }" style="color:green">Lire article</a></span></li>
                      <li>${new Date(event.created_at).toLocaleDateString(
                        "fr-FR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}</li>
                    </ul>
                  </div>
                </div>
              </div>
        `;

      eventContainer.append(eventHtml);
    });
  }

  function setupPagination(response) {
    const paginationLinks = $(".pagination__links");
    paginationLinks.empty();

    if (response.prev_page_url) {
      paginationLinks.append(
        `<a href="#" data-page="${currentPage - 1}">Précédent</a>`
      );
    }

    for (let page = 1; page <= response.last_page; page++) {
      paginationLinks.append(
        `<a href="#" data-page="${page}" class="${
          page === currentPage ? "active" : ""
        }">${page}</a>`
      );
    }

    if (response.next_page_url) {
      paginationLinks.append(
        `<a href="#" data-page="${currentPage + 1}">Suivant</a>`
      );
    }

    // Handle pagination click
    paginationLinks.find("a").on("click", function (e) {
      e.preventDefault();
      currentPage = $(this).data("page");
      fetchEvents(currentPage, selectedCategory); // Pass the selected category
    });
  }
  // Call the function to fetch events when the page loads
  fetchEvents();
});
