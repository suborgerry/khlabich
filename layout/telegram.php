<?php
        $name      = $_POST['name'];
        $number    = $_POST['number'];
        $question  = $_POST['question'];

        $data_user = array(
            'СООБЩЕНИЕ С САЙТА' => '',
            'Имя: ' => $name,
            'Телефон: ' => $number,
            'Вопрос: ' => $question
        );

        foreach($data_user as $key => $value) {
            $str = $key.$value;
            $strRepl = str_replace(" ", "%20", $str);
            $message .= $strRepl."%0A";
        };


        $bot_token = "1876926736:AAEDkuSymfeRjVP9QFw1W63bRlTC79EHj2U";
        $chat_id   = "-1001200463032";
        // $chat_id   = "517243024";
        print_r($message);
        $responce = fopen("https://api.telegram.org/bot{$bot_token}/sendMessage?chat_id={$chat_id}&text={$message}", "r");
