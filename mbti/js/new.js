$(document).ready(function () {
    // MBTI 항목에 대한 설명 데이터
    var items = {
        'istj': ['감정 표현이 부족하다', '변화에 저항한다', '융통성이 없다', '사교적이지 않다'],
        'isfj': ['변화를 싫어한다', '지나치게 신중하다', '너무 남을 챙긴다', '개인적인 시간 부족하다'],
        'infj': ['너무 고집이 세다', '감정에 휘둘린다', '자기만의 세계에 갇혀있다', '타인의 감정을 지나치게 고려한다'],
        'intj': ['다소 냉정하다', '사람을 잘 믿지 않는다', '계획에 집착한다', '소통이 부족하다'],
        'istp': ['즉흥적이다', '감정을 잘 표현하지 않는다', '예상 밖의 행동을 한다', '사람들과 잘 어울리지 않는다'],
        'isfp': ['조용하다', '감정에 지나치게 예민하다', '타인에게 지나치게 의존한다', '대체로 내성적이다'],
        'infp': ['이상적이다', '너무 신중하다', '감정적이다', '타인에게 너무 민감하다'],
        'intp': ['혼자 있는 걸 좋아한다', '사람들과 어울리기 힘들다', '너무 분석적이다', '감정을 잘 표현하지 않는다'],
        'estp': ['무모하다', '계획 없이 행동한다', '주의가 산만하다', '타인을 쉽게 신뢰하지 않는다'],
        'esfp': ['즉흥적이다', '사람들에게 지나치게 의존한다', '변덕스럽다', '감정적으로 반응한다'],
        'enfp': ['변덕스럽다', '지나치게 이상적이다', '주의가 산만하다', '타인을 너무 의지한다'],
        'entp': ['과도하게 논리적이다', '감정을 무시한다', '계획을 세우지 않는다', '결정을 미룬다'],
        'estj': ['고집이 세다', '규칙을 지나치게 중시한다', '융통성이 없다', '타인의 의견을 잘 받아들이지 않는다'],
        'esfj': ['너무 사교적이다', '타인의 평가에 민감하다', '감정적으로 반응한다', '의견을 강요한다'],
        'enfj': ['너무 이타적이다', '감정을 지나치게 고려한다', '남의 의견에 너무 휘둘린다', '지나치게 친절하다'],
        'entj': ['너무 목표 지향적이다', '강압적이다', '자기주장이 강하다', '타인의 감정을 무시할 때가 있다']
    };

    // localStorage에서 MBTI 값을 가져오기
    var mbtiType = localStorage.getItem('mbtiType');

    // .title .click 업데이트
    if (mbtiType) {
        $('.title .click').text(mbtiType.toUpperCase());
        $('.title .click').attr('href', '../index.html');
    } else {
        $('.title .click').text('Unknown');
    }

    // 초기 MBTI 데이터 출력
    function displayMBTI() {
        var listHtml = '';

        if (mbtiType && items[mbtiType.toLowerCase()]) {
            // MBTI 데이터 추가
            items[mbtiType.toLowerCase()].forEach(function (item, index) {
                listHtml += '<li class="item item' + (index + 1) + '">' + item + '</li>';
            });
        } else {
            listHtml += '<li class="item">MBTI 정보를 불러올 수 없습니다.</li>';
        }

        // 리스트 초기화 및 MBTI 데이터 추가
        $('#resultList').html(listHtml);
    }

    // 페이지 로드 시 MBTI 데이터 출력
    displayMBTI();
});
