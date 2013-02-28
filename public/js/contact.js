/**
 * Without this, contact form NO work
 */
$(document).on('ready', function () {
    
    "use strict";

    function Contact(attributes) {
        var props, defaults, save;

        defaults = {
            name    : 'Mr Anonymous',
            email   : '',
            message : 'Not "very" talkative'
        };

        this.props = _.defaults(attributes, defaults);
    }

    _.assign(Contact.prototype, {
        save: function(success, err){

            var request = $.post('contact/submit', this.props);
                request.fail(function (data) { err($.parseJSON(data.responseText).error) });
                request.done(success);
        }
    });

    var contactForm = (function ($) {
        
        var el = {};

        // Public Initializer
        function init() {
            _cacheElements();
            _bindEvents();
        }

        function _cacheElements() {
            el.form         = $('.contact-form form');
            el.email_input  = el.form.find('#input-email');
            el.email_error  = el.email_input.siblings('.error-message');
        }

        function _bindEvents() {
            el.form.on('submit', _formHandler);
            el.email_input.on('focus', _resetErrors);
        }

        function _formHandler(ev) {
            ev.preventDefault();
            var contact = new Contact(el.form.serializeObject());
                contact.save(_renderThanks, _renderError);
        }

        function _renderThanks() {
            el.form.hide();
            $('#thank-you').show();
        }

        function _renderError(message) {
            el.email_input.addClass('error');
            el.email_error.text(message);
        }

        function _resetErrors() {
            el.email_input.removeClass('error');
            el.email_error.text('');
        }

        return { init: init };

    })(jQuery);

    contactForm.init();

});