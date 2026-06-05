
$(document).ready(function () {

  
  var currentPage = window.location.pathname.split("/").pop() || "index.html";

  $("nav a").each(function () {
    if ($(this).attr("href") === currentPage) {
      $(this).addClass("active");
    }
  });


  $("#menuToggle").on("click", function () {
    $("nav").toggleClass("open");
    var icon = $(this).text() === "☰" ? "✕" : "☰";
    $(this).text(icon);
  });

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    var name    = $("#contactName").val().trim();
    var email   = $("#contactEmail").val().trim();
    var message = $("#contactMessage").val().trim();
    var valid   = true;

    $(".error-msg").hide();

    if (name === "") {
      $("#nameError").text("Please enter your name.").show();
      valid = false;
    }

    if (email === "" || !email.includes("@") || !email.includes(".")) {
      $("#emailError").text("Please enter a valid email address.").show();
      valid = false;
    }

    if (message === "") {
      $("#messageError").text("Please enter a message.").show();
      valid = false;
    }

    if (valid) {
      $("#contactBtn").text("Sending...").prop("disabled", true);

      $.ajax({
        url: "https://httpbin.org/post",
        method: "POST",
        data: { name: name, email: email, message: message },
        success: function () {
          $("#contactForm").hide();
          $("#successMsg").fadeIn(500);
        },
        error: function () {
          $("#contactForm").hide();
          $("#successMsg").fadeIn(500);
        }
      });
    }
  });

  var params       = new URLSearchParams(window.location.search);
  var productName  = params.get("name")  || "Selected Product";
  var productPrice = params.get("price") || "";

  if ($("#productName").length) {
    $("#productName").text(productName);
    if (productPrice) {
      $("#productPrice").text("Rs. " + Number(productPrice).toLocaleString());
    }
  }

  $("#orderForm").on("submit", function (e) {
    e.preventDefault();

    var size  = $("#orderSize").val();
    var name  = $("#orderName").val().trim();
    var email = $("#orderEmail").val().trim();
    var qty   = $("#orderQty").val().trim();
    var card  = $("#cardNumber").val().trim();
    var exp   = $("#expiry").val().trim();
    var cvv   = $("#cvv").val().trim();
    var valid = true;

    $(".error-msg").hide();

    if (size === "") {
      $("#sizeError").text("Please select a size.").show();
      valid = false;
    }
    if (name === "") {
      $("#orderNameError").text("Please enter your full name.").show();
      valid = false;
    }
    if (email === "" || !email.includes("@")) {
      $("#orderEmailError").text("Please enter a valid email.").show();
      valid = false;
    }
    if (qty === "" || qty < 1) {
      $("#orderQtyError").text("Please enter a quantity.").show();
      valid = false;
    }
    if (card === "" || card.length !== 16) {
      $("#cardError").text("Please enter a 16-digit card number.").show();
      valid = false;
    }
    if (exp === "") {
      $("#expiryError").text("Please enter the expiry date (MM/YY).").show();
      valid = false;
    }
    if (cvv === "" || cvv.length !== 3) {
      $("#cvvError").text("Please enter a 3-digit CVV.").show();
      valid = false;
    }

    if (valid) {
      $("#orderBtn").text("Processing...").prop("disabled", true);
      $("#orderForm").hide();
      $("#orderSuccessMsg").fadeIn(500);
    }
  });

 
  $("body").append('<button id="scrollTopBtn" title="Back to top">&#8679;</button>');

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      $("#scrollTopBtn").addClass("visible");
    } else {
      $("#scrollTopBtn").removeClass("visible");
    }
  });

  $("#scrollTopBtn").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 400);
  });

});
