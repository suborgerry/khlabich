(() => {
    const orderPopup  = document.querySelector('#order-popup');
    const reviewPopup = document.querySelector('#review-popup');

    function controlOfPopup() {
        document.body.addEventListener('click', evt => {
            if(evt.target.matches('.open_popup')) {
                openPopup(orderPopup);
                sendQuestionToTelegram(orderPopup);
            } else if (evt.target.matches('.contacts_container_item_order')) {
                openPopup(reviewPopup);
                sendQuestionToTelegram(reviewPopup);
            }
        });


        function openPopup(container) {
            container.style.display = "flex";

            setTimeout(opacityVisible, 100);
            function opacityVisible() {
                container.style.opacity = 1;
            }
            const closeBtn = container.querySelector('#close-order-popup');
            closeBtn.addEventListener('click', () => { closePopup(container) });
        };

        function closePopup(container) {
            container.style.opacity = 0;

            setTimeout(displayNone, 500);

            function displayNone() {
                const popupObj = {
                    end: container.querySelector('.hidden-end'),
                    form: container.querySelector('#message-block'),
                    title: container.querySelector('#popup-title'),
                };

                container.style.display = "none";
                popupObj.end ? popupObj.end.remove() : false;
                popupObj.form.style.display = "flex";
                popupObj.form.style.opacity = 1;
                popupObj.title.style.display = "block";
                popupObj.title.style.opacity = 1;
                popupObj.form.reset()
            } 
        };
    };

    function sendQuestionToTelegram(container) {
        let checkContainer = container.dataset.containerType

        const sendButton = container.querySelector('#order-user-btn');
        if (sendButton === null) { return };
                
        sendButton.addEventListener('click', sendMessage)
        async function sendMessage() {
            try {
                const messageObj = {
                    block: container.querySelector('#message-block'),
                    name: container.querySelector('#order-user-name'),
                    number: container.querySelector('#order-user-number'),
                    question: container.querySelector('#order-user-ques'),
                };

                let regex = /^(\+38|38)?[\s\-]?\(?[0][0-9]{2}\)?[\s\-]?[0-9]{3}?[0-9]{2}?[0-9]{2}$/;
                let checkInput = true;                

                if(!regex.test(messageObj.number.value)) {
                    alertInput(messageObj.number);
                    checkInput = false;
                };

                if (messageObj.question.value.length < 3) {
                    alertInput(messageObj.question);
                    checkInput = false;
                };

                if (!checkInput) {
                    return
                };
                let url = 'telegram.php';
                let response = await fetch(url, {
                    method: 'POST',
                    mode: 'no-cors',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: new FormData(messageObj.block)
                });

                endOfRequest(checkContainer);
            } catch(error) {
                console.error("Error: " + error)
            }
        }

        function endOfRequest(checkContainer) {
            const popupObj = {
                container: container.querySelector('.order_popup_container'),
                title: container.querySelector('.order_popup_container_title'),
                form: container.querySelector('.order_popup_container_form_group'),
                end: document.createElement('h3')
            };
            
            popupObj.end.classList.add('order_popup_container_title','hidden-end');

            if(checkContainer === 'order') {
                popupObj.end.innerHTML = "Ваш вопрос отправлен в обработку.<br>Пожалуйста ожидайте, с Вами свяжется наш менеджер";
            } else if (checkContainer === 'review') {
                popupObj.end.innerHTML = "Спасибо большое за Ваш отзыв!";
            }

            popupObj.container.appendChild(popupObj.end);

            popupObj.title.style.opacity = 0;
            popupObj.form.style.opacity = 0;

            setTimeout((() => {
                popupObj.title.style.display = "none";
                popupObj.form.style.display = "none";
                popupObj.end.style.display = "block";
                popupObj.end.style.opacity = 1;
            }), 500)
        };

        function alertInput(input) {
            input.classList.add('alert-input');
            input.classList.add('alert-border');
            setTimeout((() => { input.classList.remove('alert-input') }), 1500);
        }
    };
    
    const toggleMenuBtn = document.querySelector('#togle-menu');
    function mobileMenu() {
        toggleMenuBtn.addEventListener("click", toggleMenu);
        function toggleMenu() {
            let items = document.querySelector('.header_mobile_items');
            items.classList.toggle('open');
        }
    };

    function exchangeMenu() {
        const menusObj = {
            desctop: document.querySelector('#desctop-menu'),
            mobile: document.querySelector('#mobile-menu'),
            number: document.querySelector('#desctop-telephone')
        };

        if(window.innerWidth < 1020) {
            menusObj.desctop.remove();
            menusObj.number.remove();
        } else {
            menusObj.mobile.remove();
        }
    }


    const catalogPortfolioContainer = document.querySelector('.catalog_portfolio_container');
    const catalogElementPopup       = document.querySelector('#modal-portfolio');

    catalogPortfolioContainer && catalogPortfolioContainer.addEventListener('click', evt => {
        if(evt.target.classList.contains('portfolio_trigger') && evt.target.matches('div')) {
            let title = evt.target.querySelector('.catalog_portfolio_item_text');
            let text  = evt.target.querySelector('.catalog_portfolio_item_hidden');
            
            title = title.innerText;
            text  = text.innerText.replace(/\r?\n/g, "");

            openPortfolioElement(title, text);
        } else if(evt.target.parentElement.matches('div') && evt.target.parentElement.classList.contains('portfolio_trigger')) {
            let title = evt.target.parentElement.querySelector('.catalog_portfolio_item_text');
            let text  = evt.target.parentElement.querySelector('.catalog_portfolio_item_hidden');
            
            title = title.innerText;
            text  = text.innerText.replace(/\r?\n/g, "");

            openPortfolioElement(title, text);
        };

        let closeBtn = document.querySelector('#close-portfolio-popup');
        closeBtn.addEventListener('click', closePortfolioElement);
    });

    function openPortfolioElement(title, text) {
        modalPortfolio(title, text);

        catalogElementPopup.style.display = 'flex';
        setTimeout(() => {
            catalogElementPopup.style.opacity = 1;
        }, 150);

        $('.owl-modal-portfolio').owlCarousel({
            items: 1,
            nav: true,
            margin: 25,
            navText: ["<img src='images/prev.png'>","<img src='images/next.png'>"],
            dots: false,
            animateOut: 'slideOutUp',
            animateIn: 'slideInUp'
        });
        let owlPort = $(".owl-portfolio");
        owlPort.owlCarousel();
        $("#owl-next").click(function(){
            owlPort.trigger("next.owl.carousel");
        });
        $("#owl-prev").click(function(){
            owlPort.trigger("prev.owl.carousel");
        });
    };

    function closePortfolioElement() {
        let containerPortfolio = document.querySelector('.modal_portfolio_container');
        catalogElementPopup.style.opacity = 0;
        setTimeout(() => {
        catalogElementPopup.style.display = 'none';
        }, 700);
        containerPortfolio.remove();
    }

    function modalPortfolio(title, text) {
        let modalElements = {
            container: document.createElement('div'),
            main: document.createElement('div'),
            mainLeft: document.createElement('div'),
            mainContainerFirst: document.createElement('div'),
            mainContainerSecond: document.createElement('div'),
            mainContainerThird: document.createElement('div'),
            mainContainerForth: document.createElement('div'),
            mainRight: document.createElement('div'),
            about: document.createElement('div'),
            aboutTitle: document.createElement('h4'),
            aboutText: document.createElement('p'),
            closeButton: document.createElement('button'),
            nav: document.createElement('div'),
            prevButton: document.createElement('button'),
            nextButton: document.createElement('button')
        }

        const images = {
            0: './images/portfolio/e.jpg',
            1: './images/portfolio/q.jpg',
            2: './images/portfolio/w.jpg',
            3: './images/portfolio/z.jpg',
            4: './images/portfolio/z.jpg',
            5: './images/portfolio/w.jpg',
            6: './images/portfolio/q.jpg',
            7: './images/portfolio/e.jpg',
            8: './images/portfolio/z.jpg',
        };

        modalElements.container.classList.add('modal_portfolio_container');
        modalElements.main.classList.add('modal_portfolio_main');
        modalElements.mainLeft.classList.add('modal_portfolio_main_left', 'owl-mdodal-portfolio');
        modalElements.mainContainerFirst.classList.add('modal_portfolio_main_container');
        modalElements.mainContainerSecond.classList.add('modal_portfolio_main_container');
        modalElements.mainContainerThird.classList.add('modal_portfolio_main_container');
        modalElements.mainContainerForth.classList.add('modal_portfolio_main_container');
        modalElements.mainRight.classList.add('modal_portfolio_main_right');
        modalElements.about.classList.add('modal_portfolio_about');
        modalElements.aboutTitle.classList.add('modal_portfolio_about_title');
        modalElements.aboutText.classList.add('modal_portfolio_about');
        modalElements.closeButton.classList.add('order_popup_container_button', 'modal_portfolio_close');
        modalElements.closeButton.setAttribute('type', 'button');
        modalElements.closeButton.id = 'close-portfolio-popup';
        modalElements.closeButton.innerHTML = '&#x2715;';
        modalElements.nav.classList.add('owl-nav');
        modalElements.prevButton.classList.add('owl-prev');
        modalElements.nextButton.classList.add('owl-next');
        modalElements.prevButton.setAttribute('type', 'button');
        modalElements.nextButton.setAttribute('type', 'button');

        modalElements.prevButton.innerHTML = '<img src="images/prev.png">';
        modalElements.nextButton.innerHTML = '<img src="images/next.png">';

        modalElements.nav.append(modalElements.prevButton, modalElements.nextButton);

        for (let key in images) {
            let prevImage = document.createElement('img');
            prevImage.classList.add('modal_portfolio_main_left_img')
            prevImage.setAttribute('src', images[key]);
            modalElements.mainLeft.append(prevImage);
        };

        modalElements.mainLeft.append(modalElements.nav);

        // if(modalElements.mainLeft != null) {
        //     modalElements.mainLeft.addEventListener('click')
        //     if (evt.target.matches("img")) {
        //         console.log(evt.target);
        //     }
        // };

        if(modalElements.mainLeft != null) {
            modalElements.mainLeft.addEventListener('click', evt => {
                if(evt.target.classList.contains('owl-prev') || evt.target.parentElement.classList.contains('owl-prev')) {
                    clidePortfolio(false);
                } else if (evt.target.classList.contains('owl-next') || evt.target.parentElement.classList.contains('owl-next')) {
                    clidePortfolio(true);
                };

                if (evt.target.classList.contains("modal_portfolio_main_left_img")) {
                    fullImage.src = evt.target.src;
                    if(window.innerWidth < 700) {
                        evt.target.classList.toggle('zooms')
                    }
                }
            });

            let imgMarginCount = 108;

            function clidePortfolio(direction) {
                let marginImg = modalElements.mainLeft.childNodes[0].style.marginTop;
                marginImg = parseInt(marginImg) ? parseInt(marginImg) : 0;

                if(modalElements.mainLeft.scrollHeight > 520 && direction) {
                    let marginTopImg = parseInt('-108');

                    modalElements.mainLeft.childNodes[0].style.marginTop = marginImg + marginTopImg + 'px';
                } else if (imgMarginCount < 0 && imgMarginCount != 0 && !direction) {
                    let marginTopImg = parseInt('108');

                    modalElements.mainLeft.childNodes[0].style.marginTop = marginImg + marginTopImg + 'px';
                };
                
                imgMarginCount = document.querySelector('.modal_portfolio_main_left').querySelectorAll('img')[0].style.marginTop;
                imgMarginCount = parseInt(imgMarginCount);
            }
        };

        let fullImage = document.createElement('img');
        fullImage.setAttribute('src', './images/portfolio/e.jpg');
        modalElements.mainRight.append(fullImage);

        modalElements.main.prepend(modalElements.mainLeft);
        modalElements.main.append(modalElements.mainRight);
        modalElements.container.prepend(modalElements.main);

        modalElements.aboutTitle.innerText = title;
        modalElements.aboutText.innerText = text;
        
        modalElements.about.prepend(modalElements.aboutTitle);
        modalElements.about.append(modalElements.aboutText);

        modalElements.container.append(modalElements.about);
        modalElements.container.append(modalElements.closeButton);

        let modalParent = document.querySelector('#modal-portfolio');
        modalParent.append(modalElements.container);
    };

    exchangeMenu();
    toggleMenuBtn && mobileMenu();
    orderPopup && controlOfPopup();
    // ccatalogPortfolioContainer && (() => { 
    //     modalPortfolio();
    //     catalogElementPopup.style.display = 'flex';
    //     setTimeout(() => {
    //         catalogElementPopup.style.opacity = 1;
    //     }, 150);
    // })();
})();
