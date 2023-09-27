$(document).ready(function(){
  
		
    (function($) {
        "use strict";

    
    jQuery.validator.addMethod('answercheck', function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value)
    }, "type the correct answer -_-");

    // validate contactForm form
    $(function() {
        $('#contactForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                sujet: {
                    required: true,
                    minlength: 4
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 20
                }
            },
            messages: {
                name: {
                    required: "Entrer un nom et prénom?",
                    minlength: "votre nom doit comporter au moins 2 caractères"
                },
                sujet: {
                    required: "Entrer un sujet?",
                    minlength: "votre sujet doit comprendre au moins 4 caractères"
                },
               
                email: {
                    required: "entrer un Email "
                },
                message: {
                    required: "Vous devez écrire quelque chose pour envoyer ce formulaire.",
                    minlength: "c'est tout? vraiment?"
                }
            },
            submitHandler: function(form) {
				//-----------
				  var form = $('#contactForm');
		               // event.preventDefault();
		               var form_status = $('<div class="form_status"></div>');
		                 $.ajax({
			                type: "POST",
			                url: "sendemail.php",
			                data: $(form).serialize(),
			                beforeSend: function(){
				        form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Envoie de l\'Email...</p>').fadeIn() );
			                    }
		                   }).done(function(data){
			                 form_status.html('<p class="text-success">' + data.message + '</p>').delay(6000).fadeOut();
		                 	 $('#contactForm :input').attr('disabled', 'disabled');
     
		                    });
				
				 
				//-----------------
               
            }
        })
    })
        
 })(jQuery)
})