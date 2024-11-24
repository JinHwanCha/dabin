$(document).ready(function () {
    document.body.classList.add('fade-in');

    $('.smooth-link').click(function (e) {
        e.preventDefault(); // 기본 링크 동작 방지
        const target = $(this).attr('href'); // 이동할 URL 가져오기

        $('body').addClass('fade-out'); // 페이드아웃 효과 추가
        setTimeout(function () {
            window.location.href = target; // 페이지 이동
        }, 500); // 페이드아웃 애니메이션 시간과 일치
    });
});