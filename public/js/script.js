$(".data").hide();

$("#submit").on("click", () => {
  var address = $("#address").val();

  $(".data").hide();
  $(".data").after(
    "<center><img src='/img/Eclipse-1s-200px.gif'  id='loader'></center>"
  );

  $.get("/weather?address=" + address, data => {
    if (data.error) {
      $(".data").hide();
      $(".error").html(data.error);
      $("#loader").remove();
      return;
    } else {
      $(".data").show();
      $(".error").hide();
      $("#forecast").html(data.forecast);
      $("#location").html(data.location);
      $("#add").html(data.address);

      $("#loader").remove();
    }

    console.log(data);
  });
});
