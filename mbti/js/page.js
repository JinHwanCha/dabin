$(document).ready(function() {
    // 요소 선택
    const items = document.querySelectorAll('.item');
    const title = document.querySelector('.title');

    // 초기 설정
    let titleWidth = parseInt(getComputedStyle(title).width); // px 단위로 가져옴
    let titleHeight = parseInt(getComputedStyle(title).height); // px 단위로 가져옴
    const minSize = 300; // 최소 크기(px)
    let isTitleDestroyed = false; // 테두리가 사라졌는지 확인
    let speedIncrease = 0.4; // 속도 증가 값 (속도가 증가하는 비율)
    let baseSpeed = 1.5; // 초기 속도
    let speeds = []; // 각 .item의 속도를 저장하는 배열

    // .item을 가장 가까운 테두리로 이동시키는 함수
    function moveItemToClosestEdge(item, delay = 0, speed = baseSpeed) {
        const originalX = item.offsetLeft;
        const originalY = item.offsetTop;
        const titleRect = title.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        // .item과 .title 사이의 중심 거리 계산
        const centerX = itemRect.left + itemRect.width / 2;
        const centerY = itemRect.top + itemRect.height / 2;
        const titleCenterX = titleRect.left + titleRect.width / 2;
        const titleCenterY = titleRect.top + titleRect.height / 2;

        const dx = centerX - titleCenterX;
        const dy = centerY - titleCenterY;

        // 가장 가까운 테두리의 x, y 좌표 계산
        let targetX, targetY;
        const aspectRatio = titleRect.width / titleRect.height;

        if (Math.abs(dx / dy) > aspectRatio) {
            // 수평 테두리가 더 가까움
            targetX = titleCenterX + (dx > 0 ? titleRect.width / 2 : -titleRect.width / 2);
            targetY = titleCenterY + (dy / Math.abs(dx)) * Math.abs(targetX - titleCenterX);
        } else {
            // 수직 테두리가 더 가까움
            targetY = titleCenterY + (dy > 0 ? titleRect.height / 2 : -titleRect.height / 2);
            targetX = titleCenterX + (dx / Math.abs(dy)) * Math.abs(targetY - titleCenterY);
        }

        // .item 이동
        gsap.to(item, {
            duration: 0.5, // duration을 고정
            delay: delay, // 각 .item마다 출발 시간이 달라짐
            x: targetX - itemRect.left - itemRect.width / 2,
            y: targetY - itemRect.top - itemRect.height / 2,
            onComplete: () => {
                if (!isTitleDestroyed) {
                    checkCollision(item, speed); // 충돌 확인
                    speed += speedIncrease; // 속도 증가
                    moveItemToClosestEdge(item, 0, speed); // 이동을 반복하면서 속도 증가
                }
            },
        });
    }

    // 원래 자리로 돌아가는 함수
    function returnToOriginalPosition(item, originalX, originalY, speed) {
        // 원래 위치로 돌아가는 애니메이션
        gsap.to(item, {
            duration: 0.5, // 복귀 시간
            x: originalX - item.offsetLeft, // 원래 위치와 현재 위치의 차이만큼 이동
            y: originalY - item.offsetTop, // 원래 위치와 현재 위치의 차이만큼 이동
            onComplete: () => {
                if (!isTitleDestroyed) {
                    speed += speedIncrease; // 속도 증가
                    moveItemToClosestEdge(item, 0, speed); // 바로 다시 출발 (속도 증가)
                }
            },
        });
    }

    // 충돌 확인 함수
    function checkCollision(item, speed) {
        const itemRect = item.getBoundingClientRect();
        const titleRect = title.getBoundingClientRect();

        const isColliding =
            itemRect.right > titleRect.left &&
            itemRect.left < titleRect.right &&
            itemRect.bottom > titleRect.top &&
            itemRect.top < titleRect.bottom;

        if (isColliding) {
            reduceTitleSize(speed); // 충돌 시 바로 .title 크기 감소
        }
    }

    // .title 크기 감소 함수 (충돌 시 크기 감소)
    function reduceTitleSize(speed) {
        if (titleWidth > minSize && titleHeight > minSize) {
            titleWidth *= 0.95; // 너비 10% 감소
            titleHeight *= 0.95; // 높이 10% 감소
            gsap.to(title, {
                duration: 0.5,
                width: titleWidth + 'px',
                height: titleHeight + 'px',
                onComplete: () => {
                    // 크기가 최소값 이하일 때
                    if (titleWidth <= minSize && titleHeight <= minSize) {
                        destroyTitleBorder(); // 테두리 제거
                        stopItems(); // 모든 .item을 제자리로 이동
                        resetItems(); // .item들이 제자리로 돌아가도록 설정
                    }
                }
            });
        }
    }

    // .title의 테두리 제거 함수
    function destroyTitleBorder() {
        gsap.to(title, {
            duration: 0.5,
            border: "0px solid transparent",
        });
        isTitleDestroyed = true; // 테두리 제거 확인
    }

    // .item들이 제자리로 돌아가는 함수
    function resetItems() {
        items.forEach((item) => {
            gsap.to(item, {
                duration: 1,
                x: 0,
                y: 0,
                onComplete: () => {
                    stopItems(); // 모든 .item이 제자리로 돌아가면 애니메이션을 멈추도록
                }
            });
        });
    }

    // .item들이 제자리로 멈추도록 하는 함수
    function stopItems() {
        items.forEach((item) => {
            gsap.to(item, {
                duration: 0.5,
                x: 0,
                y: 0,
            });
        });
    }

    // .item 애니메이션 시작
    function startRandomMovement() {
        items.forEach((item, index) => {
            const delay = Math.random() * 2; // 무작위 출발 시간
            const initialSpeed = baseSpeed + Math.random() * 1.5; // 무작위 초기 속도 (1.5에서 3까지)
            speeds.push(initialSpeed); // 각 item의 속도 배열에 추가
            moveItemToClosestEdge(item, delay, initialSpeed); // 각 .item을 개별적으로 출발
        });
    }

    $('.page').on('click', function() {
        // 애니메이션 시작
        startRandomMovement();
    });


    $('.title .click').click(function (e) {
        e.preventDefault(); // 기본 동작 방지
        var mbtiType = $(this).text().trim(); // .click 텍스트 가져오기 (예: 'ISFP')
        localStorage.setItem('mbtiType', mbtiType); // 로컬 저장소에 저장
        window.location.href = $(this).attr('href'); // 클릭한 링크로 이동
    });
});
