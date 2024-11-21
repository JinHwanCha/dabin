$(document).ready(function() {
    // localStorage에서 문장 배열 가져오기
    var sentences = JSON.parse(localStorage.getItem('sentences'));

    // ul에 기존 내용 지우기
    $('#resultList').empty();

    // 문장이 있을 경우만 ul에 추가
    if (sentences) {
        sentences.forEach(function(sentence) {
            if (sentence.trim() !== '') {
                $('#resultList').append('<li>' + sentence.trim() + '</li>');
            }
        });
    }
});