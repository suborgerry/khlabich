(() => {
    const popup = document.querySelector('#order-popup');
    function controlOfPopup() {
        const closeBtn = document.querySelector('#close-order-popup');

        document.body.addEventListener('click', evt => {
            if(evt.target.matches('.open_popup')) {
                openPopup();
            }
        });

        closeBtn.addEventListener('click', closePopup);

        function openPopup() {
            popup.style.display = "flex";

            setTimeout(opacityVisible, 100);
            function opacityVisible() {
                popup.style.opacity = "1";
            }
        };

        function closePopup() {
            popup.style.opacity = "0";

            setTimeout(displayNone, 500);

            function displayNone() {
                const popupObj = {
                    end: document.querySelector('.hidden-end'),
                    form: document.querySelector('#message-block'),
                    title: document.querySelector('#popup-title'),
                };

                popup.style.display = "none";
                popupObj.end.remove();
                popupObj.form.style.display = "flex";
                popupObj.form.style.opacity = "1";
                popupObj.title.style.display = "block";
                popupObj.title.style.opacity = "1";
                popupObj.form.reset()
            } 
        };
    };

    function sendQuestionToTelegram() {
        const sendButton = document.querySelector('#order-user-btn');
        if (sendButton === null) { return };
                
        sendButton.addEventListener('click', sendMessage)
        async function sendMessage() {
            try {
                const messageObj = {
                    block: document.querySelector('#message-block'),
                    name: document.querySelector('#order-user-name'),
                    number: document.querySelector('#order-user-number'),
                    question: document.querySelector('#order-user-ques'),
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
//                     mode: 'no-cors',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: new FormData(messageObj.block)
                });

                endOfRequest();
            } catch(error) {
                console.error("Error: " + error)
            }
        }

        function endOfRequest() {
            const popupObj = {
                container: document.querySelector('.order_popup_container'),
                title: popup.querySelector('.order_popup_container_title'),
                form: popup.querySelector('.order_popup_container_form_group'),
                end: document.createElement('h3')
            };
            popupObj.end.classList.add('order_popup_container_title','hidden-end');
            popupObj.end.innerHTML = "Ваш вопрос отправлен в обработку.<br>Пожалуйста ожидайте, с Вами свяжется наш менеджер";
            popupObj.container.appendChild(popupObj.end);

            popupObj.title.style.opacity = "0";
            popupObj.form.style.opacity = "0";

            setTimeout((() => {
                popupObj.title.style.display = "none";
                popupObj.form.style.display = "none";
                popupObj.end.style.display = "block";
                popupObj.end.style.opacity = "1"
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
    function modalPortfolio() {
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
        }

        const images = {
            0: './images/portfolio/e.jpg',
            1: './images/portfolio/q.jpg',
            2: './images/portfolio/w.jpg',
            3: './images/portfolio/z.jpg',
            4: './images/portfolio/z.jpg',
            5: './images/portfolio/w.jpg',
            6: './images/portfolio/q.jpg',
            7: './images/portfolio/e.jpg'
        };

        modalElements.container.classList.add('modal_portfolio_container');
        modalElements.main.classList.add('modal_portfolio_main');
        modalElements.mainLeft.classList.add('modal_portfolio_main_left', 'owl-modal-portfolio');
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

        let imageCount = 0;
        for (let key in images) {
            if(imageCount < 4) {
                console.log(images[key]);
                let prevImage = document.createElement('img');

                prevImage.setAttribute('src', images[key]);
                modalElements.mainContainerFirst.prepend(prevImage);
                modalElements.mainLeft.append(modalElements.mainContainerFirst);
                imageCount++
            } else if (imageCount < 8) {
                let prevImage = document.createElement('img');

                prevImage.setAttribute('src', images[key]);
                modalElements.mainContainerSecond.prepend(prevImage);
                modalElements.mainLeft.append(modalElements.mainContainerSecond);
                imageCount++
            } else if (imageCount < 12) {
                let prevImage = document.createElement('img');

                prevImage.setAttribute('src', images[key]);
                modalElements.mainContainerThird.prepend(prevImage);
                modalElements.mainLeft.append(modalElements.mainContainerThird);
                imageCount++
            } else if (imageCount < 16) {
                let prevImage = document.createElement('img');

                prevImage.setAttribute('src', images[key]);
                modalElements.mainContainerForth.prepend(prevImage);
                modalElements.mainLeft.append(modalElements.mainContainerThird);
                imageCount++
            };
        };

        let fullImage = document.createElement('img');
        fullImage.setAttribute('src', './images/portfolio/e.jpg');
        modalElements.mainRight.append(fullImage);

        modalElements.main.prepend(modalElements.mainLeft);
        modalElements.main.append(modalElements.mainRight);
        modalElements.container.prepend(modalElements.main);

        modalElements.aboutTitle.innerText = 'Кухня для Дмитрия из г. Каменец-Подольский';
        modalElements.aboutText.innerText = 'Приятно, граждане, наблюдать, как акционеры крупнейших компаний лишь добавляют фракционных разногласий и описаны максимально подробно. В своём стремлении улучшить пользовательский опыт мы упускаем, что стремящиеся вытеснить традиционное производство, нанотехнологии своевременно верифицированы.';
        
        modalElements.about.prepend(modalElements.aboutTitle);
        modalElements.about.append(modalElements.aboutText);

        modalElements.container.append(modalElements.about);
        modalElements.container.append(modalElements.closeButton);

        let modalParent = document.querySelector('#modal-portfolio');
        modalParent.append(modalElements.container);

        console.log(modalElements.container);
    };

    exchangeMenu();
    toggleMenuBtn && mobileMenu();
    popup && controlOfPopup();
    sendQuestionToTelegram();
    catalogPortfolioContainer && modalPortfolio();
})();
