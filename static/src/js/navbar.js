$(function() {
    $('#eux-collapse-btn').click(function(e) {
        e.stopPropagation();
        $('#navbar').height(window.innerHeight);
        slideLeft();

        $('body').click(function(e) {
            slideRight();
        });
    });

    //阻止导航栏的事件传递
    $('#navbar').click(function(e) {
        e.stopPropagation();
    });

    $('#eux-close-side').click(function() {
        slideRight();
    });

    function slideLeft() {
        $('#navbar').animate({'right': 0}, 'slow');
    }
    function slideRight() {
        $('#navbar').animate({'right': '-200px'}, 'slow');
    }
});