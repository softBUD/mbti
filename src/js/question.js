const form = document.querySelector('#question-form');

(()=> {
    fetch("../data/data.json")
    .then((response) => response.json())
    .then(data => { //data = fetch로 불러온 경로의 파일
        const questions = data.questions; //질문데이터 통으로 저장
        const answers = data.answers; //사용자가 선택할 응답값 통으로 저장

        questions.forEach(question => { //질문및 응답값 하나씩 꺼내기
            let questionNumber = question.pk;
            let answerArr = []; 
            answers.forEach(answer => { 
                if(questionNumber == answer.question) {
                    answerArr.push(answer);
                }
            });

            form.appendChild(setElement(question, answerArr));
        });
        const questionItem = document.querySelectorAll(".question-item");
        const firstQuestionItem = questionItem[0];
        firstQuestionItem.classList.add('on');

        const buttonBoxes = document.querySelectorAll(".button-box");
        const firstButtonBox = buttonBoxes[0];
        const lastButtonBox = buttonBoxes[buttonBoxes.length - 1]; //마지막요소

        firstButtonBox.innerHTML = '<button type="button" class="next-btn">다음</button>';
        firstButtonBox.classList.add('style-center');

        lastButtonBox.innerHTML = '<button type="button" class="previous-btn">이전</button><button type="submit" class="submit-btn">제출</button>';
    });
})();

function setElement (question, answerArr) {
    const questionItem = document.createElement("div");
    questionItem.classList.add("question-item");

    const tempContainer = document.createElement("div");

    for(let idx in answerArr) {
        let answer = answerArr[idx];
        tempContainer.innerHTML += `
        <li class="answer-item">
        <input type="radio" id="answer-${answer.pk}" name="answer-${question.pk}" value="${answer.breed}">
        <label for="answer-${answer.pk}">${Number(idx) + 1}. ${answer.content}</label>
        </li>
        `;
    }

    questionItem.innerHTML = `
        <div class="status-box">
        <div class="status-number">${question.pk}/10</div>
        <div class="status-bar"></div>
    </div>
    <div class="question-box">
        <h2>Q. ${question.content}</h2>
        <ol class="answer-list">
            ${tempContainer.innerHTML}
        </ol>
    </div>
    <div class="button-box">
        <button type="button" class="previous-btn">이전</button>
        <button type="button" class="next-btn">다음</button>
    </div>
    `

    tempContainer.remove();
    return questionItem;
}

