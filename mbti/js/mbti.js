$(document).ready(function () {
    // 각 MBTI 항목에 대한 링크 자동 생성
    $('.smooth-link').click(function (event) {
        event.preventDefault(); // 기본 링크 이동 동작 방지

        // 클릭된 MBTI 텍스트 가져오기 (소문자로 변환)
        var mbtiType = $(this).find('.title-mbti').text().toLowerCase();

        // 선택된 MBTI를 localStorage에 저장
        localStorage.setItem('mbtiType', mbtiType);

        // 공통 페이지로 이동
        window.location.href = './mbti_page.html';
    });
});
