$(document).ready(function() {
    $('#inputBtn').click(function() {
        // textarea에서 입력된 텍스트 가져오기
        var inputText = $('#inputText').val();
        
        // 문장들을 엔터(\n)로 구분하여 배열로 만들기
        var sentences = inputText.split('\n');

        // 배열을 localStorage에 저장
        localStorage.setItem('sentences', JSON.stringify(sentences));

        // 페이지 이동
        window.location.href = "../new/new_istj.html"; // 이 부분은 실제 페이지 URL로 변경
    });
});
