

$(document).ready(function () {
  let currentPage = 1;
  let selectedCategory = "";

  function fetchEvents(page = 1, category = "") {
    $.ajax({
      url: `${apiConfig.apiUrl}/api/evenements-gestion/evenement/withpagination?page=${page}&category=${category}`,
      method: "GET",
      success: function (response) {
        displayEvents(response.data);
        setupPagination(response.data);
      },
      error: function (error) {
        console.error("Error fetching events:", error);
      },
    });
  }

  function displayEvents(events) {
    const eventContainer = $(".event_section");
    const search_box = $("#search-box");
    eventContainer.empty();
    search_box.empty();

    search_box.append(`
      <div class="row flex justify-content-center align-items-center m-3">
        <div class="form-group col-md-4">
          <select id="inputState" class="form-control" style="background-color: black; color: #c2c2c2">
            <option value="">All</option>
            <option value="Concerts" ${
              selectedCategory === "Concerts" ? "selected" : ""
            }>Concerts</option>
            <option value="Parties" ${
              selectedCategory === "Parties" ? "selected" : ""
            }>Parties</option>
          </select>
        </div>
      </div>
    `);

    $("#inputState").change(function () {
      selectedCategory = $(this).val();
      fetchEvents(1, selectedCategory);
    });

    events.data?.forEach((event) => {
      const eventHtml = `
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="videos__item">
            <div class="videos__item__pic set-bg" data-setbg="${
              apiConfig.apiUrl+'/'+ event.photo
            }">
              <a href="javascript:void(0);" class="play-btn video-popup" data-video-url="${
                apiConfig.apiUrl +'/' + event.lien
              }"><i class="fa fa-play"></i></a>
            </div>
            <div class="videos__item__text">
              <h5 style="color:#c2c0c0 ">${event.nom}</h5>
               <span style="color:#c2c0c0 ">${event.description}</span>
              <ul>
                <li style="color:green ">${new Date(
                  event.cree_le
                ).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</li>
                <li style="color:green ">${event.nom_categorie}</li>
                <li>200 Commentaires</li>
              </ul>
            </div>
          </div>
        </div>
      `;
      eventContainer.append(eventHtml);
    });

    $(".set-bg").each(function () {
      var bg = $(this).data("setbg");
      $(this).css("background-image", "url(" + bg + ")");
    });

    // Bind popup events
    $(".video-popup").on("click", function () {
      console.log($(this).data("video-url"));
      const videoUrl = $(this).data("video-url");
      showVideoPopup(videoUrl);
    });

    $(".details-popup").on("click", function () {
      const eventDetails = JSON.parse($(this).data("event-details"));
      showDetailsPopup(eventDetails);
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

    paginationLinks.find("a").on("click", function (e) {
      e.preventDefault();
      currentPage = $(this).data("page");
      fetchEvents(currentPage, selectedCategory);
    });
  }

  function showVideoPopup(videoUrl) {
    $("body").append(`
      <div class="popup-overlay">
        <div class="popup-content">
          <button class="popup-close">&times;</button>
          <video controls autoplay>
            <source src="${videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    `);

    $(".popup-close").on("click", function () {
      $(".popup-overlay").remove();
    });
  }

  function showDetailsPopup(eventDetails) {
    $("body").append(`
      <div class="popup-overlay">
        <div class="popup-content">
          <button class="popup-close">&times;</button>
          <h3>${eventDetails.nom}</h3>
          <p>Date: ${new Date(eventDetails.cree_le).toLocaleDateString(
            "fr-FR",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}</p>
          <p>Category: ${eventDetails.nom_categorie}</p>
          <p>Description: ${eventDetails.description}</p>
        </div>
      </div>
    `);

    $(".popup-close").on("click", function () {
      $(".popup-overlay").remove();
    });
  }

  fetchEvents();
});
