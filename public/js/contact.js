jQuery(document).ready( function ($) {
  //get the form
  var form = $('#contact_form');

  //messages div
  var formMessages = $('#form_messages').hide();

  //establish event listener on the contact form
  $(form).submit(function(event) {
    //stop the browser from submitting the form
    event.preventDefault();

    //create key/value pairs for incoming data
    var formData = $(form).serialize();

    //submit the form via ajax
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    }).done(function(response) {
      //set the formMessages text
      $(formMessages).text(response).fadeIn(2000);
      console.log(response)

      var resPattern = /^Thank you/;
      if (resPattern.test(response)) {
        //set formMessages class to success
        $(formMessages).removeClass('contact-error');
        $(formMessages).addClass('contact-success');

        //clear the form
        $('#name').val('');
        $('#email').val('');
        $('#subject').val('');
        $('#message').val('');
      } else {
        //set the formMessages class to error
        $(formMessages).removeClass('contact-success');
        $(formMessages).addClass('contact-error');
      }
    }).fail(function(data) {
      /*set the formMessages class to error
      $(formMessages).removeClass('contact-success');
      $(formMessages).addClass('contact-error');

      //set the formMessages text
      if (data.responseText !== '') {
        $(formMessages).text(data.responseText);
      } else {
        $(formMessages).text('Oops, something went wrong with your form submission!');
      }*/
    });
  });
});