$(document).ready(function () {
    // localStorage에서 MBTI 값을 가져옵니다
    var mbtiType = localStorage.getItem('mbtiType'); // 로컬 저장소에서 MBTI 값 가져오기

    if (mbtiType) {
        // .title .click 요소에 MBTI 값을 삽입
        $('.title .click').text(mbtiType); // 텍스트를 설정
        $('.title .click').attr('href', '../index.html'); // 필요시 링크도 설정
    } else {
        // MBTI 값이 없을 경우 기본값 설정
        $('.title .click').text('Unknown');
    }

    // localStorage에서 저장된 문장 배열을 가져와 리스트에 표시
    var sentences = JSON.parse(localStorage.getItem('sentences')) || []; // 배열 형태로 가져오기

    // 각 문장을 <ul id="resultList"> 안에 <li>로 추가
    var $resultList = $('#resultList');
    sentences.forEach(function (sentence) {
        if (sentence.trim() !== '') { // 빈 문장은 제외
            $resultList.append('<li>' + sentence + '</li>');
        }
    });
});
