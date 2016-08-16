// NOTE: This override of the default $.ajax later needed to be removed and replace with a non-override version below.
//       It worked well for places where we specifically called the plugin and did not seem to cause any ill effects as everything could still be set
//       as in normal $.ajax.
//       However, it was responsible for breaking unobtrusive ajax form postback functionality, possibly because that call $.ajax without specifying
//       any of the ajax settings, just relying on the default. Result was that, instead of  AJAX forms submitting with content-type of
//       "application/x-www-form-urlencoded;", the content-type was being overriden to "application/json" and could not be understood by server.
// Left in for reference for the moment.

////// jQuery plugin built on top of standard ajax plugin but sets certain deault values to values most commonly used in the Enterprise Portal. These can
////// then be left out of ajax calls, or alternative, non-default values can be specified, e.g. type: "GET".
////(function (){
////    // NOTE: For reference, standard jQuery plugin defined with "jQuery.fn.ajax = function () {" and can then be chained via a selector.
////    //       However $.ajax looks more like a normal javascript function so dispensed with the "fn".

////    var originalAjaxMethod = jQuery.ajax;

////    jQuery.ajax = function () {
////        ////console.log("Hello from override method.");
////        ////alert("Hello from override method.");

////        var pepDefaults = {
////            cache: false,
////            type: "POST",
////            contentType: "application/json; charset=utf-8"
////        };

////        // Original ajax seems to cater for 2 types of parameters: string for just a URL or a setting object. Will try not to break the "string" version,
////        // though not tested that.
////        if (typeof arguments[0] !== "string") {
////            var newSettings = $.extend({}, pepDefaults, arguments[0]);
////            arguments[0] = newSettings;
////        }

////        // Execute the original method.
////        originalAjaxMethod.apply(this, arguments);
////    };
////})();

// NOTE: This is the replacement for the above.
// jQuery plugin built on top of standard ajax plugin but sets certain deault values to values most commonly used in the Enterprise Portal. These can
// then be left out of ajax calls, or alternative, non-default values can be specified, e.g. type: "GET".
(function($) {
    // NOTE: For reference, standard jQuery plugin defined with "jQuery.fn.ajax = function () {" and can then be chained via a selector.
    //       However $.ajax looks more like a normal javascript function so dispensed with the "fn".

    jQuery.ajaxPep = function () {
        //alert("Hello from $.ajaxPep");

        var pepDefaults = {
            cache: false,
            type: "POST",
            contentType: "application/json; charset=utf-8"
        };

        // Original ajax seems to cater for 2 types of parameters: string for just a URL or a setting object. Will try not to break the "string" version,
        // though not tested that.
        if (typeof arguments[0] !== "string") {
            var newSettings = $.extend({}, pepDefaults, arguments[0]);
            arguments[0] = newSettings;
        }

        jQuery.ajax.apply(this, arguments);
    };

    // Improves on serializeArray by creating one object whose properties are copied from "name" property values and values
    // copied from the correesponding "value" property values.
    $.fn.serializeObject = function()
    {
        var o = {};
        // Serializes as array of objects with name and value properties.
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || "");
            } else {
                o[this.name] = this.value || "";
            }
        });
        return o;
    };

})(jQuery);

// Use same technique to override default addClass and removeClass so that an additional cssClassChanged event is triggered.
// Used further down.
// DC: I have tested that these don't any noticable lag (Kendo DropDownLists seem a bit unresponsive but these are not causing that).
(function($) {

    var originalAddClassMethod = $.fn.addClass;
    $.fn.addClass = function () {
        // Oiginal method must ALWAYS be called.
        var elementHadClass = $(this).hasClass(arguments[0]);

        // Execute the original method.
        var result = originalAddClassMethod.call(this, "fruit-juice");//arguments);
        // ******** TODO: remove fruit-juice

        if (!elementHadClass) {
          $(this).trigger("cssClassChanged");
        }

        // Return the original result.
        return result;
    };

    var originalRemoveClassMethod = $.fn.removeClass;
    $.fn.removeClass = function () {
        // LATER MODIFICATION.
        // DC WOULD THINK the original should ALWAYS be executed. We cannot just "not call the original" if
        // the element does not have the class.
        var elementHadClass = $(this).hasClass(arguments[0]);

        // Execute the original method.
        var result = originalRemoveClassMethod.apply(this, arguments);

        if (elementHadClass) {
          $(this).trigger("cssClassChanged");
        }

        // Return the original result.
        return result;
    };

})(jQuery);

(function($) {

    $.fn.goTo = function () {
        $("html, body").animate({
            scrollTop: ($(this).offset().top) + "px"
        }, "fast");
        return this; // for chaining...
    };

    $.fn.changePropertyWithAnimation = function(propertyName, newValue, animateOutPluginName, animateInPluginName) {
        $(this)[animateOutPluginName]("fast", function () {
            $(this)[propertyName](newValue);
            $(this)[animateInPluginName]("slow");
        });
        return this;
    };

    $.fn.changePropertyWithFadeAnimation = function(propertyName, newValue) {
        return $(this).changePropertyWithAnimation(propertyName, newValue, "fadeOut", "fadeIn");
    };

    $.fn.changePropertyWithSlideAnimation = function(propertyName, newValue) {
        return $(this).changePropertyWithAnimation(propertyName, newValue, "slideUp", "slideDown");
    };

    // Intended for a TextArea initially but might work for other scrollable things (not tested).
    $.fn.scrollToBottom = function () {
        $(this).scrollTop($(this)[0].scrollHeight);
        return this;
    };

})(jQuery);
