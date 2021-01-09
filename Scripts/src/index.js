import 'bootstrap';
import '../sass/index.scss'
import $ from 'jquery'


window.addEventListener("load", () => {
    /* Add margin to container to prevent footer from overlapping */
    const footerHeight = $("footer").outerHeight(true);
    $(".container-fluid").css("margin-bottom", footerHeight.toString() + "px" );
})

$(window).on('resize', function(){
    var win = $(this); //this = window
    if (win.width() <= 786) {
        if($(".navbar:nth-child(2)").con) {
            $(".nav-link > img").css("display", "none");
        }
    }
    
    // if (win.width() > 786) {
    //     $(".nav-link > img").css("display", "inline-block");
    // }
});
