$(document).ready(function(){
    if(document.location.pathname === '/'){

        $(document).scroll(function(){
            var scrollPos = document.body.scrollTop;
            if(scrollPos > ($('#hero').height() - $('#nav').height() - 200)){
                $('#nav').removeClass('clear');
                $('#nav').addClass('red');
            }else if(scrollPos < ($('#hero').height() - $('#nav').height() - 200)){
                $('#nav').removeClass('red');
                $('#nav').addClass('clear');
            }

        });
    }


    $.ajax({
        url: '/api/login', 
    }).done(function(res){
        if(res === true){
            $('#adminLink').removeClass('hide');
            $('#logoutLink').removeClass('hide');
        }
    });

});

$(window).on('resize', function(){
    fixHeroTimeout(500);
});

function fixHero(){
  $('#hero').height($('#hero-img').height() - 150);
}

var id;
function fixHeroTimeout(timeout){
    clearTimeout(id);
    id = setTimeout(fixHero, timeout);
}

$(window).on('load', function(){
    fixHeroTimeout(50);
});