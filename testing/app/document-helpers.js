// Functionality to enhance Kendo widgets, either because we haven't discovered how to use certain aspects properly or because they just don't quite
// work in the way we want them to.

// "uh-oh-spaghettios" used to enhance deficiences in displaying validation errors. Generic class name won't clash.
// At moment it has been used to enhance DropDownList but expect battles with other widgets, e.g. DatePicker and Upload.

$(document).ready(function () {

    // Because boffins at Telerik opted to only add the class "input-validation-error" to the undisplayed <input> that is used to hold the selected value
    // of a DropDownList (and not also to the outer "k-dropdown") styling when got an error is not a trivial thing (unless I am missing something).
    // The problem is that CSS cannot be applied to an element depending on what it contains.
    // Therefore will ensure that, every time classes being applied to one of those <input> elements changes, the "input-validation-error" is
    // applied or removed from the containing dropdown wrapper element accordingly.

    // This function was originally written for RadDropDownList but it was later found that almost same code could be used for other Kendo widgets.
    var ensureOuterWidgetTagWillReceiveIndicatorClassIfValidationError = function (widgetSelector) {
        var widgetInputSelector = widgetSelector + " input";
        $("body").on("cssClassChanged", widgetInputSelector, function (event) {
        ////$(".form-control").on("cssClassChanged", widgetInputSelector, function (event) {       // TOO SPECIFIC: Failed if form items were added via AJAX.
            var isError = $(this).hasClass("input-validation-error");
            //alert(aaa);
            var widget = $(this).closest(widgetSelector);
            if (isError) {
                // Never simple with Telerik. Adding the class that jquery.validate uses won't work because Telerik have programmed something to manually
                // add a "display:none" inline style. Clicking submit twice will result in an invalid DropDownListDisappearing.
                widget.addClass("uh-oh-spaghettios");
            } else {
                widget.removeClass("uh-oh-spaghettios");
            }
        });
    };

    // ensureOuterWidgetTagWillReceiveIndicatorClassIfValidationError(".k-dropdown");
    // ensureOuterWidgetTagWillReceiveIndicatorClassIfValidationError(".k-datetimepicker");
    //
    // // Can probably just use one call with all CSS classes separated by commas. NO: Caused "too much recursion error".
    // //ensureOuterWidgetTagWillReceiveIndicatorClassIfValidationError(".k-datepicker, .k-timepicker");
    // ensureOuterWidgetTagWillReceiveIndicatorClassIfValidationError(".k-datepicker");
    // ensureOuterWidgetTagWillReceiveIndicatorClassIfValidationError(".k-timepicker");
    //
    // ensureOuterWidgetTagWillReceiveIndicatorClassIfValidationError(".k-numerictextbox");
});
