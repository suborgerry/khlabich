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

            setTimeout(displayNone, 1000);
            function displayNone() {
                popup.style.display = "none";
            } 
        };
    };

    popup && controlOfPopup();

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

                console.log(new FormData(messageObj.block));
            } catch(error) {
                console.error("Error: " + error)
            }
        }

        function alertInput(input) {
            input.classList.add('alert-input');
            input.classList.add('alert-border');
            setTimeout((() => { input.classList.remove('alert-input') }), 1500);
        }
    };
    sendQuestionToTelegram();
})();