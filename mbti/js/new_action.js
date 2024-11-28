$(document).ready(function () {
    // 요소 선택
    const items = document.querySelectorAll('.item');
    const title = document.querySelector('.title');

    // 초기 설정
    let titleWidth = parseInt(getComputedStyle(title).width); // px 단위로 가져옴
    let titleHeight = parseInt(getComputedStyle(title).height); // px 단위로 가져옴
    const maxSize = 600; // 최소 크기(px)
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
                    if (!isTitleDestroyed) {
                        moveItemToClosestEdge(item, 0, speed); // 이동을 반복하면서 속도 증가
                    }
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
        // 현재 크기가 maxSize보다 작으면 크기를 증가시키고, 크기가 maxSize에 도달하면 멈춤
        if (titleWidth < maxSize && titleHeight < maxSize) {
            titleWidth *= 1.05; // 너비 5% 증가
            titleHeight *= 1.05; // 높이 5% 증가
        }

        // 크기가 maxSize 이상이면 멈추도록
        if (titleWidth >= maxSize && titleHeight >= maxSize && !isTitleDestroyed) {
            resetItems(); // .item들이 제자리로 돌아가도록 설정
            stopItems(); // 모든 .item을 제자리로 이동
            isTitleDestroyed = true; // 더 이상 크기 조정을 하지 않도록 설정
            applySentences(); // 저장된 문장 적용
        } else {
            gsap.to(title, {
                width: titleWidth + 'px',
                height: titleHeight + 'px',
            });
        }
    }


    // .title의 테두리를 점점 보이게 하고, 두께를 증가시키는 함수
    function revealTitleBorder() {
        gsap.to(title, {
            duration: 2,
            delay: 2,
            borderWidth: '4px', // 테두리 두께를 4px로 설정
            borderColor: '#000', // 테두리 색상을 검정으로 설정
            borderStyle: 'solid', // 테두리 스타일을 solid로 설정
        });
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

    $('.new').on('click', function () {
        startRandomMovement();
        revealTitleBorder(); // 테두리 보이게 하는 함수 호출
    });
});
