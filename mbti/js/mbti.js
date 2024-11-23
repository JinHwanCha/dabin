$(document).ready(function() {
    // 각 MBTI 항목에 대한 링크 자동 생성
    $('.smooth-link').each(function() {
        var titleText = $(this).find('.title-mbti').text().toLowerCase();  // 텍스트를 소문자로 변환
        var hrefValue = './' + titleText + '.html';  // 링크 주소 자동 생성
        $(this).attr('href', hrefValue);  // href 속성 업데이트
    });

    // 현재 페이지의 제목 설정
    var pageTitle = $('h1.title').text().toLowerCase();  // 페이지의 h1.title에서 텍스트 가져오기
    $('h1.title a').text(pageTitle.toUpperCase());  // 링크 텍스트를 대문자로 설정

    // MBTI 항목에 맞는 리스트 동적 생성
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
    
    

    // 현재 페이지의 MBTI 타입에 맞는 항목을 찾아 리스트로 추가
    if (items[pageTitle]) {
        var listHtml = '';
        items[pageTitle].forEach(function(item, index) {
            listHtml += '<li class="item item' + (index + 1) + '">' + item + '</li>';
        });
        $('.list').html(listHtml);  // .list에 동적으로 추가된 항목들
    }
    
    // .title .click 요소에서 텍스트를 가져옵니다
    var mbtiType = $('.title .click').text().toLowerCase(); // 예: 'ISTJ' -> 'istj'

    // .click 요소의 href 속성을 동적으로 변경
    var newHref = '../find/find.html'; // 예: '../find/istj_find.html'
    // var newHref = '../find/' + mbtiType + '_find.html'; // 예: '../find/istj_find.html'

    // href 속성 업데이트
    $('.title .click').attr('href', newHref);
});
