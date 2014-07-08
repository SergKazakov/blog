$(function () {
    'use strict';
    var dropdown = $('#dropdown');
    $('.has-dropdown').click(function () {
        if (dropdown.hasClass('dropdown-wr_active')) {
            dropdown.removeClass('dropdown-wr_active');
        }
        else {
            dropdown.addClass('dropdown-wr_active');
        }
    });
    $('#close').click(function (e) {
        e.preventDefault();
        dropdown.addClass('dropdown-wr_active');
    });
});