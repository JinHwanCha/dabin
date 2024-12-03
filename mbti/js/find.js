$(document).ready(function () {
    // 페이지 로드 시 localStorage에서 MBTI 값을 가져와 .question .mbti에 삽입
    var mbtiType = localStorage.getItem('mbtiType'); // 로컬 저장소에서 MBTI 값 가져오기

    if (mbtiType) {
        $('.question .mbti').text('(' + mbtiType.toLowerCase() + ')'); // 예: '(ISFP)'
    } else {
        $('.question .mbti').text('(Unknown)'); // 값이 없을 경우 기본값
    }

    // 버튼 클릭 시 동작
    $('#inputBtn').click(function () {
        // textarea에서 입력된 텍스트 가져오기
        var inputText = $('#inputText').val();

        // 문장들을 엔터(\n)로 구분하여 배열로 만들기
        var sentences = inputText.split('\n');

        // 배열을 localStorage에 저장
        localStorage.setItem('sentences', JSON.stringify(sentences));

        // 동적으로 페이지 URL을 생성하여 이동
        if (mbtiType) {
            var newPage = "../new/new.html"; // 예: "../new/new.html"
            window.location.href = newPage; // 새 페이지로 이동
        } else {
            alert("MBTI 값이 없습니다."); // MBTI 값이 없을 경우 경고
        }
    });
});
