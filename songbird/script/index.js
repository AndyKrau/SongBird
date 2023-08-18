
document.addEventListener('load', soundIndex('./media/audio/index_song.mp3'));

function soundIndex() {
    let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = './media/audio/index_song.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
}


