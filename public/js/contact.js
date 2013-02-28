/**
 * Contact Form
 * Dependencies: Lodash & jQuery
 */

// Create our contact pseudo-model
function Contact(attributes) {
    "use strict";

    var props, defaults, save;

    defaults = {
        name    : 'Mr Anonymous',
        email   : '',
        message : 'Not "very" talkative'
    };

    this.props = _.defaults(attributes, defaults);
}

// Attach a save method to the our contact model
_.assign(Contact.prototype, {
    save: function (success, err) {

        var request = $.post('contact/submit', this.props);
            request.fail(function (data) { err($.parseJSON(data.responseText).error); });
            request.done(success);
    }
});

//  
var contactForm = (function ($) {
    "use strict";
    
    // Element container object
    var el = {};

    // Public Initializer
    function init() {
        _cacheElements();
        _bindEvents();
    }

    // Cache elements - so we dip into the DOM less
    function _cacheElements() {
        el.form         = $('.contact-form form');
        el.email_input  = el.form.find('#input-email');
        el.email_error  = el.email_input.siblings('.error-message');
    }

    // Bind to our form events
    function _bindEvents() {
        el.form.on('submit', _formHandler);
        el.email_input.on('focus', _resetErrors);
    }

    // On contact form submission create a new contact model & save it
    function _formHandler(ev) {
        ev.preventDefault();
        var contact = new Contact(el.form.serializeObject());
            contact.save(_renderThanks, _renderError);
    }

    // If the contact form was sent to the server successfully we say thank you
    function _renderThanks() {
        el.form.hide();
        $('#thank-you').show();
    }

    // Otherwise we display an error
    function _renderError(message) {
        el.email_input.addClass('error');
        el.email_error.text(message);
    }

    // When the user focuses on the email input, we get rid of the errors
    function _resetErrors() {
        el.email_input.removeClass('error');
        el.email_error.text('');
    }

    // Public function returned for initiation
    return { init: init };

})(jQuery);

// Instantiate our Contact Form - once the DOM is ready
$(contactForm.init());