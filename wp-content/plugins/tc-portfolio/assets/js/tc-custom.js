jQuery(window).load(function(){
     // Activate isotope in container
    jQuery(".tcportfolio-container").isotope({
        itemSelector: '.tcportfolio_single_items',
        //layoutMode: 'fitRows',
    });
    // Add isotope click function
    jQuery('ul.tcportfolio_filters li').click(function(){
        jQuery("ul.tcportfolio_filters li").removeClass("active");
        jQuery(this).addClass("active");
        var selector = jQuery(this).attr('data-filter');
        jQuery(".tcportfolio-container").isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false,
            }
        });
        return false;
    });

    // content pop up
    jQuery('.tcportfolio-container').magnificPopup({
            type:'inline',
            midClick: true,
            gallery:{
            enabled:true
            },
            delegate: 'a.tc_owl_pop',
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function() {
                   this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
              closeOnContentClick: false,

    });
});
