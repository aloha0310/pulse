
//let namber = 7; переменная
//const pi = 3.14; константа(не изменяется)
// number цифры
// string - "", '' , `` строка
//true/false правда/лож
//null не существует
//underfined не имеет значения
//let obj = {
//    name: 'apple'
//    color: 'green'
//    weight: 200
//} коробка с данными

//alert(1234) вывод на экран для пользователя
//console.log() вывод в консоль для разработчика
//confirm('Вам есть 18?') вопрос к пользователю

//let answer = prompt('вам есть 18','');
//console.log(answer); вопрос к пользователю с ответом в консоль

//let isChecked = true,
//    isClose = true;
//console.log(isChecked && isClose); оператор и
//console.log(isChecked || isClose); оператор или

//if (2*4==8){ оператор если, условия
//    console.log('верно') вывод 
//}else { оператор еще
//   console.log('ошибка')
//}
//for (let i = 1; i<8; i++){ цикл
//    console.log(i);
//}
//function logging(a, b){
//    console.log( a + b )
// }
// logging(3, 5);
$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        //adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    dots: true,
                    arrows: false 
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    
    function toggleSlide(item){
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modal
    $('[data-modal=consultation]').on('click',function() {
        $('.overlay, #consultation').fadeIn('slow'); 
    });
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
   

    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    //smooth scrolls and pageup
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600){
            $('.pageup').fadeIn();
        } else{
            $('.pageup').fadeOut();
        }
    });

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "js/mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });
});

