$.ajax({
  url: `${apiConfig.apiUrl}/api/cartes`,
  method: "GET",
  success: function (response) {
    console.log("data hjj", response.data);

    localStorage.setItem("all-cards", JSON.stringify(response.data));
    console.log("parsed data hjj", JSON.parse(localStorage.getItem("all-cards")));
  },
  error: function (error) {
    console.error("Error fetching cards:", error);
    alert("An error occurred while fetching cards. Please try again later.");
  },
});
