document.addEventListener('DOMContentLoaded', () => {
    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent(){
        tabsContent.forEach(item => {
            item.style.display = "none";
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].style.display = "block";
        tabs[i].classList.add('tabheader__item_active'); 
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {

                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
            
        }

    });


    //timer

    const deadline = "2021-09-03";

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor( (t / 1000 * 60 * 60 ) % 24),
              minites = Math.floor((t / 1000 / 60 ) % 60), 
              seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total': t, 
            'days': days,
            'hours': hours,
            'minutes': minites,
            'seconds': seconds
        };

    }

    function getZero(num){
        if(num >= 0 && num < 10 ){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if( t <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


    // modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach((elem, i) =>{
        elem.addEventListener('click', openModal);
    });

    modalCloseBtn.addEventListener('click', closeModal);

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = "hidden";
    }

    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = "";
    }
    modal.addEventListener('click', (event) =>{
        console.dir(event.key);
        if(event.target == modal){
            closeModal();
        }
    });
    document.addEventListener('keydown', (event) =>{
        if(event.key == "Escape" && modal.classList.contains('show')){
            closeModal();
        }
    });

   // const modalTimerId = setTimeout(openModal, 15000);

    window.addEventListener('scroll', function openOnscrollModal(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 5){
            openModal();
            window.removeEventListener('scroll', openOnscrollModal);
            
        }
    });

    //use class

    class MenuCard{
        constructor(src, alt, title, descr, price, parentElem, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parentElem = document.querySelector(parentElem);
            this.transfer = 27;
            this.changeToUAH();
            
        }
        changeToUAH(){
            this.price = this.price * this.transfer;
        }
        render(){
            const elem = document.createElement('div');
            elem.classList.add()
            if(this.classes.length === 0){
                elem.classList.add('menu__item');
            } else {
                this.classes.forEach(className => {
                    elem.classList.add(className);
                })
            }
            elem.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parentElem.append(elem);   
        }
    }

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        28,
        '.menu__field > .container',
        'menu__item',
        'test2',
        'test3'
        
    ).render();
    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        ' меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        28,
        '.menu__field > .container'
    ).render();
    new MenuCard(
        'img/tabs/post.jpg',
        'vegy',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        28,
        '.menu__field > .container'
    ).render();
});
