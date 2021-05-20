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
                let url = 'http://khlabich/layout/telegram.php';
                let response = await fetch(url, {
                    method: 'POST',
                    mode: 'no-cors',
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

    exchangeMenu();
    toggleMenuBtn && mobileMenu();
    popup && controlOfPopup();
    sendQuestionToTelegram();
})();