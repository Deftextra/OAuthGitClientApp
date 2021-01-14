﻿import 'bootstrap';
import './layout.scss'
import $ from 'jquery'


window.addEventListener("load", () => {
    /* Add margin to container to prevent footer from overlapping */
    const footerHeight = $("footer").outerHeight(true);
    $(".container-fluid").css("margin-bottom", footerHeight.toString() + "px");

})