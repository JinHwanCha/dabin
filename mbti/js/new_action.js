$(document).ready(function () {
    // 요소 선택
    const items = document.querySelectorAll('.item');
    const title = document.querySelector('.title');

    // 초기 설정
    let titleBorderWidth = 0; // 초기 테두리 두께(px)
    const maxBorderWidth = 200; // 최대 테두리 두께(px)
    let isTitleDestroyed = false; // 애니메이션 종료 여부
    let speedIncrease = 1; // 속도 증가 값
    let baseSpeed = 1.5; // 초기 속도
    let speeds = []; // 각 .item의 속도를 저장하는 배열
    let initialPositions = []; // 각 .item의 초기 위치 저장
    let animationCompleteCount = 0; // 완료된 애니메이션 수

    // .item 초기 위치 저장
    items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        initialPositions.push({
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY,
        });
    });

    // .item을 가장 가까운 테두리로 이동시키는 함수
    function moveItemToClosestEdge(item, delay = 0, speed = baseSpeed) {
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
            duration: 0.5,
            delay: delay,
            x: targetX - itemRect.left - itemRect.width / 2,
            y: targetY - itemRect.top - itemRect.height / 2,
            onComplete: () => {
                if (!isTitleDestroyed) {
                    checkCollision(item, speed); // 충돌 확인
                    speed += speedIncrease; // 속도 증가
                    moveItemToClosestEdge(item, 0, speed); // 이동 반복
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
            increaseTitleBorder(speed); // 충돌 시 테두리 두께 증가
        }
    }

    // .title 테두리 두께 증가 함수
    function increaseTitleBorder(speed) {
        if (titleBorderWidth < maxBorderWidth) {
            titleBorderWidth += 10; // 테두리 두께 증가
            gsap.to(title, {
                // duration: 0.5,
                borderWidth: titleBorderWidth + 'px',
                borderColor: '#000',
                borderStyle: 'solid',
                onComplete: () => {
                    if (titleBorderWidth >= maxBorderWidth) {
                        applySentences(); // 저장된 문장 적용
                        stopItems(); // .item 원래 자리로 복귀
                    }
                },
            });
        }
    }

    // 저장된 문장을 적용하는 함수
    function applySentences() {
        const sentences = JSON.parse(localStorage.getItem('sentences')) || [];

        $('#resultList .item').each(function (index) {
            if (sentences[index]) {
                const $this = $(this);

                // 텍스트 부드럽게 대체
                gsap.to($this, {
                    duration: 0.3,
                    opacity: 0,
                    onComplete: () => {
                        $this.text(sentences[index]);
                        gsap.to($this, { duration: 0.3, opacity: 1 });
                    },
                });
            }
        });
    }

    function stopItems() {
        items.forEach((item, index) => {
            // 각 .item을 원래 위치로 복귀시킴
            gsap.to(item, {
                duration: 1, // 복귀 시간
                x: initialPositions[index].x - item.getBoundingClientRect().left,
                y: initialPositions[index].y - item.getBoundingClientRect().top,
            });
        });
    
        // 애니메이션 중단 후 flag 설정
        isTitleDestroyed = true; // 애니메이션 종료 플래그 설정
        $('.btn-reset').addClass('on');
    }
    

    // .item 애니메이션 시작
    function startRandomMovement() {
        animationCompleteCount = 0; // 완료된 애니메이션 수 초기화
        items.forEach((item, index) => {
            const delay = Math.random() * 2; // 무작위 출발 시간
            const initialSpeed = baseSpeed + Math.random() * 1.5; // 무작위 초기 속도
            speeds.push(initialSpeed); // 각 item의 속도 배열에 추가
            moveItemToClosestEdge(item, delay, initialSpeed); // 각 .item을 개별적으로 출발
        });
    }

    $('.new').on('click', function () {
        startRandomMovement();
    });
});
