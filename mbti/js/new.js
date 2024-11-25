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
    var listHtml = '';
    sentences.forEach(function (sentence, index) {
        if (sentence.trim() !== '') { // 빈 문장은 제외
            listHtml += '<li class="item item' + (index + 1) + '">' + sentence + '</li>';
        }
    });

    $('#resultList').html(listHtml); // 리스트 업데이트

    const radius = 300; // 고정 반경 (px)
    const totalDuration = 3.5; // 총 애니메이션 시간 (초)
    const rotations = 20; // 회전 횟수

    $('.new').on('click', function () {
        $('.title').addClass('border')
        const items = $('.item');
        const title = $('.title');

        // .title 중심 계산
        const centerX = title.offset().left + title.width() / 2;
        const centerY = title.offset().top + title.height() / 2;

        // 초기 위치 복구를 위한 데이터 저장
        const initialPositions = [];
        items.each(function () {
            const item = $(this);
            initialPositions.push({
                left: parseFloat(item.css('left')), // 상대 좌표로 저장
                top: parseFloat(item.css('top')),
            });
        });

        // 모든 요소를 .title 중심 기준으로 고정 반경 회전시키기
        const tl = gsap.timeline();

        items.each(function (index, item) {
            const angleStep = (360 / items.length) * index; // 각 아이템의 초기 각도
            const itemEl = $(item);

            // 아이템의 초기 위치를 원형으로 설정
            const angle = angleStep * (Math.PI / 180); // 초기 각도 (라디안)
            const x = centerX + radius * Math.cos(angle) - itemEl.width() / 2; // X 좌표
            const y = centerY + radius * Math.sin(angle) - itemEl.height() / 2; // Y 좌표

            // 초기 위치 설정
            itemEl.css({ left: `${x}px`, top: `${y}px` });

            tl.to(itemEl, {
                duration: totalDuration,
                ease: "none",
                onUpdate: function () {
                    const progressAngle = tl.progress() * 360 * rotations; // 진행된 총 각도
                    const angle = (angleStep + progressAngle) * (Math.PI / 180); // 현재 각도 (라디안)

                    const x = centerX + radius * Math.cos(angle) - itemEl.width() / 2; // X 좌표
                    const y = centerY + radius * Math.sin(angle) - itemEl.height() / 2; // Y 좌표

                    itemEl.css({ left: `${x}px`, top: `${y}px` }); // 위치 업데이트
                },
            }, 0);
        });

        // 애니메이션이 끝나고 원래 위치로 복귀
        tl.to({}, {
            duration: 0.5,
            onUpdate: function () {
                items.each(function (index, item) {
                    const pos = initialPositions[index];
                    $(item).css({ left: `${pos.left}px`, top: `${pos.top}px` });
                });
            },
            onComplete: function () {
                // 애니메이션 완료 후 .btn-reset에 'on' 클래스 추가
                $('.btn-reset').addClass('on');
            }
        });
    });
});
