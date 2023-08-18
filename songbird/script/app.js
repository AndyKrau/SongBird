import birdsData from './bird.js';

let count = 0;

let rand;
let randBird;
let randId; 
let randName; 
let randAudio; 
let randImage;
let birdGroup;

firstLoad(count);


let clickNext = document.querySelector('.button_next');
clickNext.addEventListener('click', () => {
    count++;
    // console.log('addEventListener count--->', count)

    if (count >= 5) {
        let showButton = document.querySelector('.button_next'); // блокировка кнопки next
        showButton.innerHTML = 'Finish!'}

    if (count >= 6 ) {
        soundFinal();
        count = 0;
        let hideWrapper = document.querySelector('.question');
        hideWrapper.classList.add('no-display');
        let hideWrapper2 = document.querySelector('.answer');
        hideWrapper2.classList.add('no-display');
        let showFinishTag = document.querySelector('.finish-banner');
        showFinishTag.classList.remove('no-display');
        showFinishTag.classList.add('display-finish');

        // let currentBirdClass = document.querySelector('.bird-nav__item');
        // currentBirdClass.classList.add('active');
    }

    let currentBirdClass = document.querySelector('.active');
        currentBirdClass.classList.remove('active');

    let nextBirdClass = currentBirdClass.nextElementSibling;
        if (nextBirdClass == null) {
            let currentBirdClass = document.querySelector('.bird-nav__item');
            currentBirdClass.classList.add('active');
        } else {
            nextBirdClass.classList.add('active');
        }

    let showButton = document.querySelector('.button_next'); // блокировка кнопки next
        showButton.classList.remove('active_button');

    firstLoad(count);
});

let clickOnceAgain = document.querySelector('.finish-banner__button');
clickOnceAgain.addEventListener('click', () => {
    
    let unHideWrapper = document.querySelector('.question');
    unHideWrapper.classList.remove('no-display');
    unHideWrapper.classList.add('display-finish');

        let unhideWrapper2 = document.querySelector('.answer');
        unhideWrapper2.classList.remove('no-display');
        unhideWrapper2.classList.add('display-finish');

            let hideFinishTag = document.querySelector('.finish-banner');
            hideFinishTag.classList.remove('display-finish');
            hideFinishTag.classList.add('no-display');

    window.location.reload(true);
})



//_________Functions______________________________________________________________________________________________



function firstLoad(count) {
    let birdClass = count;
    rand = Math.floor(Math.random() * birdsData[birdClass].length);
    randBird = (birdsData[birdClass][rand]);
    birdGroup = (birdsData[birdClass]);
    randId = (birdsData[birdClass][rand].id); 
    randName = (birdsData[birdClass][rand].name); 
    randAudio = (birdsData[birdClass][rand].audio); 
    randImage = (birdsData[birdClass][rand].image);
        
    // console.log('\nСледующий раунд______________________________________>');
    // console.log('randData, randBird:', randBird);
    // console.log('randData, randId:', randId);  
    // console.log('randData, randName:', randName);  
    // console.log('randData, randAudio:', randAudio);  
    // console.log('randData, randImage:', randImage);  
    // console.log('Данные загружены');
    
    loadTestAudio(randAudio); //первая загрузка аудио
    loadTestNonamePicture(); //первая загрузка noname картинки
    loadTestShadowName(); //первая загрузка **** name 
    loadTestAnswer(birdClass); // загрузка имен птиц для ответов из  объекта [0]
    clickOnAnswer(randName, randBird); // отслкживаем клик по ответу из списка
    returnQuestionPosition(); // возвращает закрытые данные в вопросе

}



function loadTestAudio(item) { // загрузка  аудио тестовой страницы
    let test_audio = document.querySelector('#question__audio');
    test_audio.src = item;
};

function stopAudio() { // стоп пение при правильном ответе
    let test_audio = document.querySelector('#question__audio');
    test_audio.pause();
}

function loadTestNonamePicture() { // загрузка noname картинки
    let NonamePicture = document.querySelector('.question__img');
    NonamePicture.src = './media/img/noname_bird.jpg';
};

function loadTestShadowName() { // загрузка noname имени *****
    let ShadowName = document.querySelector('#question__bird-name');
    ShadowName.innerHTML = '*****';
};

function loadTestAnswer(birdClass) { // загрузка имен птиц для ответов из  объекта [0]
    let TestAnswer = document.querySelectorAll('#answer__group-list-item');
    for (let i = 0; i < TestAnswer.length; i++) {
        TestAnswer[i].innerHTML = birdsData[birdClass][i].name;
    }
};

function clickOnAnswer(randName, randBird) { // отслкживаем клик по ответу из списка
    document.getElementById('answer__group-list').addEventListener('click', (event)=>{
        const t = event.target.closest('li');
        
        // console.log('getElementById, answer__group:', t );
        // console.log('getElementById, answer__group:', t.innerHTML);
        // console.log('checkRightAnswer, check:', t.previousElementSibling);
        if(t){
            checkRightAnswer(randName, t, randBird);
        }
    });
}   

function checkRightAnswer(randName, currentItem, randBird) { // Проверка на правильность ответа
    let currentName = currentItem.lastElementChild.innerHTML;

    // console.log('checkRightAnswer, currentName:', currentName);  
    // console.log('checkRightAnswer, randItem:', randName);  

    if (currentName === randName) {

        soundClickCorrect();
        // console.log('checkRightAnswer, check:', 'Same!');
        let parentItem = currentItem.firstElementChild;
        parentItem.classList.remove('incorrect-answer');
        parentItem.classList.add('correct-answer');
        showBirdInfo(randBird);

        let showButton = document.querySelector('.button_next'); // разблокировка кнопки next
        showButton.classList.add('active_button');

        let block = document.querySelectorAll('.answer__group-list-item'); // Блокировка ответов после правильного ответа
        block.forEach((item) => {
            item.classList.add('block_answer');
        })

        let score = 0;
        let scoreSumm = 0;
        let minusPoint;
        let sum;
        let scoreFalse = document.querySelectorAll('.incorrect-answer'); 
            if (count <= 6) {
                minusPoint = scoreFalse.length;
                // console.log('addEventListener minusPoint--->', scoreFalse.length);
                score = 5 - minusPoint;
                // console.log('addEventListener score------------>', score) ;
                scoreSumm = scoreSumm + score;
                // console.log('addEventListener scoreSumm------------>', scoreSumm) ;
                let scorePoint = document.querySelector('.score__points'); 
                // console.log('addEventListener score__points--->', scorePoint.innerHTML) ;
                sum = scorePoint.innerHTML;
                scorePoint.innerHTML = Number(sum) + scoreSumm;

                let finalScore = document.querySelector('.final-score'); 
                finalScore.innerHTML = scorePoint.innerHTML;
            } 
        stopAudio();

    } else {
        soundClickInCorrect();
        let parentItem = currentItem.firstElementChild;
        parentItem.classList.remove('correct-answer');
        parentItem.classList.add('incorrect-answer');
        
        let currentItemLastChild = currentItem.lastElementChild
        showBirdInfoIncorrect(currentItemLastChild);
        // console.log(currentItemLastChild.innerHTML);
        // console.log(birdGroup[0].name);
        // let description = document.querySelector('.description p');
        // description.innerHTML = `Ответ неверный, это не <strong>${currentName}</strong>.<br>Попробуйте ещё раз!`;
        
        for (let i = 0; i < birdGroup.length; i++) {
            if (birdGroup[i].name == currentItemLastChild.innerHTML) {
                showBirdInfoIncorrect(birdGroup[i]);
            }
        }
    }
}

function showBirdInfo(bird) { // Выводит скрытую информацию в вопросе 
    // console.log('showBirdInfo, randBird:', bird);  

    let showInfoBody = document.querySelector('.bird-info__body');
    showInfoBody.classList.remove('no-display');
    showInfoBody.classList.add('display');

    let img = document.querySelector('.bird-info__img');
    img.src = bird.image;
    img.style.width = '200px';
    img.style.height = '155px';

        let audio = document.querySelector('#bird-info__audio');
        audio.src = bird.audio;

            let birdName = document.querySelector('#birdName');
            birdName.innerHTML = bird.name;

                let birdNameEn = document.querySelector('#birdNameEn');
                birdNameEn.innerHTML = bird.species;

                    let description = document.querySelector('.description');
                    description.innerHTML = bird.description;

    let questionImg = document.querySelector('.question__img');
    questionImg.src = bird.image;
    questionImg.style.width = '200px';
    questionImg.style.height = '155px';

        let questionName = document.querySelector('#question__bird-name');
        questionName.innerHTML = bird.name;
        
}

function showBirdInfoIncorrect(bird) { // Выводит скрытую информацию о неправильной птичке 
    // console.log('showBirdInfo, randBird:', bird);  

    let showInfoBody = document.querySelector('.bird-info__body');
    showInfoBody.classList.remove('no-display');
    showInfoBody.classList.add('display');

    let img = document.querySelector('.bird-info__img');
    img.src = bird.image;
    img.style.width = '200px';
    img.style.height = '155px';

        let audio = document.querySelector('#bird-info__audio');
        audio.src = bird.audio;

            let birdName = document.querySelector('#birdName');
            birdName.innerHTML = bird.name;

                let birdNameEn = document.querySelector('#birdNameEn');
                birdNameEn.innerHTML = bird.species;

                    let description = document.querySelector('.description');
                    description.innerHTML = bird.description;
}

function returnQuestionPosition() {  // Возвращает викторину к закрытым полям и исходному состоянию
    let showInfoBody = document.querySelector('.bird-info__body');
    showInfoBody.classList.remove('display');
    showInfoBody.classList.add('no-display');
    
    let description = document.querySelector('.description');
    description.innerHTML = '<p>Прослушайте аудио-запись и отгадайте иполнителя.<br>Максимальное количество баллов за правильный ответ - 5 баллов, при каждом неправильном ответе отнимается один балл.</p>';

    let block = document.querySelectorAll('.answer__group-list-item'); // разблокировка ответов после правильного ответа
        block.forEach((item) => {
            item.classList.remove('block_answer');
        });

    let dot = document.querySelectorAll('.group-list-item__marker'); // разблокировка ответов после правильного ответа
    dot.forEach((item) => {
        item.classList.remove('incorrect-answer');
        item.classList.remove('correct-answer');
    });


}

function soundClickCorrect() {
    let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = './media/audio/correct.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем

}

function soundClickInCorrect() {
    let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = './media/audio/incorrect.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
}

function soundFinal() {
    let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = './media/audio/final.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
}