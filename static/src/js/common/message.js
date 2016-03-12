$(function () {
    $('.eux-message-btn').click(function() {
        $('.eux-message').fadeIn('slow');
        return false;
    });
    $('.eux-message .eux-close-side').click(function() {
        $('.eux-message').fadeOut('slow');
    });

    $('#eux-message-form').submit(function() {
        var pdata = $(this).serialize();
        alert(pdata);
        $.post('/message', pdata, function(data) {
            data = JSON.parse(data);
            if (data.status == 200) {
                alert('留言成功！');
            } else {
                alert(data.msg);
            }
        });
        return false;
    });
});
