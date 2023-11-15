# Мессенджер (Яндекс.Практикум)

Данный репозиторий представляет из себя учебное задание второго спринта в рамках обучения курсу Middle Frontend Developer в Яндекс.Практикум.

## Disclaimer

Оговорю сразу два момента с импортами:
1. в .tsconfig была специально добавлена опция, разрешающая ссылки на модули с указанием расширения файла, т.к. я не люблю, когда у меня внутри, например, пакета классов нужно ещё делать кучу подпапок для каждого класса. Если это жёсткое требование - то я, конечно, это сделаю, но сам люблю больше полные импорты.
2. К сожалению, не до конца понял, как мне стоит импортировать hbs файлы напрямую, т.к. сейчас работают импорты только через ".hbs?raw". Но решил отправить работу на проверку в надежде, что это не такое критичное замечание, т.к. до жесткого дедлайна осталось несколько дней. 

## Скрипты

Для линтинга теперь добавлены два скрипта:
1. npm run lint
2. npm run stylelint

### Нужные ссылки

1. [Figma: MVC](https://www.figma.com/file/sbtB0RzeT89V7y3rvyzy6x/Yandex-Praktikum%3A-Sprint-1?type=design&node-id=0%3A1&mode=design&t=Si48pxi8MbvwfP5q-1)
2. [Netlify](https://yandex-praktikum-akamych-1.netlify.app/):
     * [index](https://yandex-praktikum-akamych-1.netlify.app/)
     * [login](https://yandex-praktikum-akamych-1.netlify.app/login.html)
     * [sign up](https://yandex-praktikum-akamych-1.netlify.app/signup.html)
     * [settings](https://yandex-praktikum-akamych-1.netlify.app/settings.html)
     * [404](https://yandex-praktikum-akamych-1.netlify.app/404.html)
     * [500](https://yandex-praktikum-akamych-1.netlify.app/500.html)
