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
        
    }
})

app.listen(8080, ()=> {
    console.log("Server running");
});