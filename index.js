const express= require("express");
//모듈 로드
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//쿼리스트링
app.use(express.static(path.join(__dirname,"src")));
//현재경로의 폴더의미

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/index.html"));
});
app.get("/question", (req, res) => {
    res.sendFile(path.join(__dirname, "src/component/question.html"));
});
app.get("/result/[1-5]", (req, res) => {
    res.sendFile(path.join(__dirname, "src/component/result.html"));
});
//"/"를 요청시에 index.html을 가져온다.

app.post("/submit", (req, res) => {
    const data = req.body;
    let numberArr = [0, 0, 0, 0, 0];

    for(let i = 1; i < 11; i++) {
        let developerNUM = Number(data[`question-${i}`]);
        numberArr[developerNUM - 1 ] = numberArr[developerNUM - 1 ] + 1;

    }

    let maxValue = 0;
    let maxValueIdx = 0;

    for(let i = 0; i< numberArr.length; i++) {
        if(numberArr[i] > maxValue) {
            maxValue = numberArr[i];
            maxValueIdx = i;
        }
    }

    res.redirect("/result/" + (maxValueIdx + 1));
})

app.listen(8080, ()=> {
    console.log("Server running");
});