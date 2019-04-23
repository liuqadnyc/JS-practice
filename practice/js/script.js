$(function () {

//-------------gallery-------------//

  // These are now multiple images.
  let galleryItems = $(".gallery").find("img");

  // Normally, you would do this in CSS.
  galleryItems.css("width", "30%")
              .css("opacity", "0.7");

  // Fade images in/out when hovering/leaving.
  galleryItems.mouseenter(function() {
    $(this).stop().fadeTo(500, 1);
  });

  galleryItems.mouseleave(function() {
    $(this).stop().fadeTo(500, 0.7);
  });

  // Preview image in lightbox when clicked.
  galleryItems.click(function() {
    // Read image src of clicked image.
    let source = $(this).attr("src");

    // Generate new <img> tag to add to the lightbox.
    let newImage = $("<img>").attr("src", source).css("width", "100%");

    // Prepare and show lightbox preview.
    $(".lightbox").empty().append(newImage).fadeIn(1000); //// To remove all elements *inside* a given elements, you can use empty().
    // $(".lightbox").append(newImage).fadeIn(1000);
  });

  // Exit lightbox preview when clicking it anywhere.
  $(".lightbox").click(function() {
    $(this).stop().fadeOut();
  });

//-------------menu-------------//

  let menuItems = $("#menu li").filter(function(index) {
    return index % 2 == 0;
  });;

  menuItems.find("li").hide();

  menuItems.mouseenter(function(){
    $(this).find("li").stop().slideDown(300);
  });

  menuItems.mouseleave(function(){
    $(this).find("li").stop().slideUp(300);
  });

//-------------box-------------//

  let ARROW_RIGHT= 39;
  let ARROW_LEFT= 37;

  $("html").keydown(function(event) {
    // alert("key:"+event.which);
    if(event.which == ARROW_RIGHT)
    {
      $(".red-box").stop().animate({
        marginLeft: "+=10px"          //margin is the distance between the object and the object near itself
      },50);
    }
    else if(event.which == ARROW_LEFT)
    {
      $(".red-box").stop().animate({
        marginLeft: "-=10px"
      },50);
    }
  });

//-------------slide-------------//

  let slideItem = $(".slide").find("img");
  let i = 0;

  let images = [
    "images/laptop-mobile_small.jpg",
    "images/laptop-on-table_small.jpg",
    "images/people-office-group-team_small.jpg"
  ];

  setInterval(function() {

    i = (i + 1) % images.length;  // i = 1, 2, 0, 1, 2, 0, ...

    slideItem.fadeOut(function() {
      $(this).attr("src", images[i]);
      $(this).fadeIn();
    });

  }, 2000);

  console.log(slideItem);   //differrnt from console.log("slideItem: " + slideItem);



//-------------form-------------//

  $("#form").submit(function(event) {
    // First, read out all entered values.
    var name = $("#name").val();
    var password = $("#password").val();
    var message = $("#message").val();
    var checked = $("#checkbox").is(":checked");

    // Then we use our validation functions (defined below) to check each input.
    validateNameField(name, event);
    validatePasswordField(password, event);
    validateMessageField(message, event);
    validateCheckboxField(checked, event);
  });

  // == NEW PART ==
  // In addition to the previous form validation code, we now provide faster
  // feedback to the user, namely when moving to the next input element.
  enableFastFeedback($("#form"));

  function enableFastFeedback(formElement) {
    var nameInput = formElement.find("#name");
    var passwordInput = formElement.find("#password");
    var messageInput = formElement.find("#message");
    var checkboxInput = formElement.find("#checkbox");

    nameInput.blur(function(event) {
      var name = $(this).val();
      highlight($(this), isValidName(name));
      validateNameField(name,event);
    });

    passwordInput.blur(function(event) {
      var password = $(this).val();
      highlight($(this), isValidPassword(password));
      validatePasswordField(password, event)
    });

    messageInput.blur(function(event) {
      var message = $(this).val();
      highlight($(this), isValidMessage(message));
      validateMessageField(message, event);
    });

    checkboxInput.change(function(event) {
      var isChecked = $(this).is(":checked");
      highlight($(this), isChecked);
      validateCheckboxField(isChecked, event);
    });
  }

  function highlight(element, isValid) {
    var color = "#811";  // red
    if (isValid) {
      color = "#181";  // green
    }

    element.css("box-shadow", "0 0 4px " + color);
  }

  // In the following, we define helper functions that each validate
  // one of the inputs. These will be used further down by our validation
  // functions.

  function isValidName(name) {
    return name.trim().length >= 2;
  }

  function isValidPassword(password) {
    return password.length >= 6 && /.*[0-9].*/.test(password);
  }

  function isValidMessage(message) {
    return message.trim() !== "";
  }

  // Next, we define the actual validation functions which use the helpers from
  // above. These validation functions add a hint for the user for each invalid
  // input and prevent the form from submitting if the input is invalid.

  // First, show a hint if the name is not valid or remove the hint if it's
  // now valid.
  function validateNameField(name, event) {
    if (!isValidName(name)) {
      $("#name-feedback").text("Please enter at least two characters");
      event.preventDefault();
    } else {
      $("#name-feedback").text("");
    }
  }

  // Do the same for the other inputs.
  function validatePasswordField(password, event) {
    if (!isValidPassword(password)) {
      $("#password-feedback").text("The password should have at least 6 characters and contain a number");
      event.preventDefault();
    } else {
      $("#password-feedback").text("");
    }
  }

  function validateMessageField(message, event) {
    if (!isValidMessage(message)) {
      $("#message-feedback").text("Please enter a message.");
      event.preventDefault();
    } else {
      $("#message-feedback").text("");
    }
  }

  function validateCheckboxField(isChecked, event) {
    if (!isChecked) {
      $("#checkbox-feedback").text("Please agree to this.");
      event.preventDefault();
    } else {
      $("#checkbox-feedback").text("");
    }
  }



});