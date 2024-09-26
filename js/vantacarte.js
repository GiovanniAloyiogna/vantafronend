<script>
  $(document).ready(function ()
  {function updateCardPreview() {
    var selectedCard = $("#cardSelect").val();
    var name = $("#name").val();
    var surname = $("#surname").val();
    var email = $("#email").val();
    var signature = $("#signature").prop("files")[0];

    var cardPreview = $("#cardPreview");

    // Mettre à jour l'arrière-plan de la carte
    if (selectedCard) {
      cardPreview.css(
        "background-image",
        "url(images/" + selectedCard + ".jpg)"
      );
    }

    // Construire le contenu de la carte
    var cardContent = `
        <div style="text-align: center; padding: 20px;" >
           <div class="row "><img src="" alt="Signature" style="width: 100px; display: block; margin: 10px auto;" id="photo-img"></div>
          <div class="row d-flex"><h5 style="margin: 0; color:white ">${name} ${surname}</h5>
          <p style="margin: 0;color:white ">${email}</p></div>
        </div>
      `;

    // Ajouter la signature si disponible
    if (signature) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $(`#photo-img`).attr("src", e.target.result);
        cardPreview.html(cardContent);
      };
      reader.readAsDataURL(signature);
    } else {
      cardPreview.html(cardContent);
    }
    $("#name, #surname, #email").on("input", updateCardPreview);
    $("#cardSelect").on("change", updateCardPreview);
    $("#signature").on("change", updateCardPreview);
  }}
  );
</script>;
