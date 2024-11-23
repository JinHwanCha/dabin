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
    
     // URL에서 mbtiType을 가져옵니다 (예: "esfj")
     var mbtiType = window.location.href.split('/').pop().replace('_find.html', '').toLowerCase(); // 'esfj' 가져오기

     // .question .mbti 요소에 mbtiType을 동적으로 삽입
     $('.question .mbti').text('(' + mbtiType.toUpperCase() + ')'); // 예: '(ESFJ)'
});