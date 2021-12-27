// API URL
let urlEasy = `https://opentdb.com/api.php?amount=3&category=9&difficulty=easy&type=multiple`;
let urlMedium = `https://opentdb.com/api.php?amount=3&category=9&difficulty=medium&type=multiple`;
let urlHard = `https://opentdb.com/api.php?amount=4&category=9&difficulty=hard&type=multiple`;
let url = urlEasy;


//Element
let questionText = document.querySelector('.question-text')
let answersList = document.querySelector('.answers-list')
let containterQuestion = document.querySelector('.container-question')
let containterFinish = document.querySelector('.container-finish')
let containerPrice = document.querySelector('.container-price')
let difficulty = document.querySelector('.difficulty')
let currentQuestion = document.querySelector('.currentQuestion')
let timer = document.querySelector('.timer')
let LiPriceList = document.querySelectorAll('.LiPriceList div.option-price-list')
let CurrentPriceText = document.querySelector('.CurrentPriceText')
let LastPrice = document.querySelector('.LastPrice')

let checkAnswerFill = false
let checkCorrectAnswer = false


//variable 
let lengthQuestion = 0
let timequestionEasy = 60
let timequestionMedium = 90
let timequestionHard = 120
let timequestion = timequestionEasy
let timerId = setInterval(countdown, 1000)


getQuestion(0,url)
difficulty.innerText = "EASY"

function getQuestion(index,url) {
    fetch(url)
    .then(response => response.json())
    .then(response => {
        
        //Question
        let question = response["results"][index]["question"]
        const h5 = document.createElement('h5')
        h5.innerHTML = question
        questionText.appendChild(h5)

        //Option
        let incorrectoption = response["results"][index]["incorrect_answers"]
        let corectoption = response["results"][index]["correct_answer"]
        let choiseOption = []
        
        choiseOption.push(corectoption)
        for (let data in incorrectoption)
            choiseOption.push(incorrectoption[data])

        shuffle(choiseOption)

        for (let answerOption in choiseOption) {
            const label = document.createElement('label')
            label.classList.add("option")

            const radio = document.createElement("INPUT")
            radio.setAttribute("type", "radio")
            radio.setAttribute("name", "radioAnswer")
            radio.setAttribute("class", "radioOption")
            radio.setAttribute("value", choiseOption[answerOption])
            
            const divAnswer = document.createElement("div")
        
            if (corectoption == choiseOption[answerOption])
                radio.classList.add("correct")

            divAnswer.innerHTML = choiseOption[answerOption]
            label.appendChild(radio)
            label.appendChild(divAnswer)
            answersList.appendChild(label)
        }

        const radioOption = document.querySelectorAll(".radioOption")
        radioOption.forEach(radio => {
            radio.addEventListener('click',function(){
                checkAnswerFill = true
                const check = this.classList.contains("correct")
                check == true ? checkCorrectAnswer = true : checkCorrectAnswer = false
            })
        })

    })
}


let countsoal = 1
let indexQuestion = 1
nextQuestion.addEventListener('click', function () {  
    
    if (checkAnswerFill == false)
    {
        alert("Pilih Salah Satu Jawaban")
        return;
    }else{

        if (!checkCorrectAnswer)
        {
            console.log("jawaban Salah")
            alert("Jawaban Anda Salah, Anda Kalah")
            closeall()

        }else{
            LiPriceList.forEach(li => {
                const currentprice = li.classList.contains("current")
                if (currentprice == true) {
                    
                    CurrentPriceText.innerText = li.firstChild.nextSibling.innerText
                    
                    const checkpoint = li.classList.contains("checkPoint")
                    if (checkpoint == true)
                        LastPrice.innerHTML = li.firstChild.nextSibling.innerText
                    
                    li.classList.remove('current')
                    let iddataprice = li.getAttribute('id')
                    
                    iddataprice++
                    if (iddataprice <= 10)
                    {
                        let NextPrice = document.getElementById(iddataprice);
                        NextPrice.classList.add("current")
                    }
                }
            })

            countsoal++
            currentQuestion.innerText = countsoal

            if (countsoal >= 1 && countsoal <= 3) {
                timequestion = timequestionEasy
                resetQuestion()

            } else if (countsoal >= 4 && countsoal <= 6) {
                url = urlMedium
                indexQuestion = 1
                difficulty.innerText = "MEDIUM"
                timequestion = timequestionMedium
                resetQuestion()

            } else if (countsoal >= 7 && countsoal <= 10) {
                url = urlHard
                indexQuestion = 1
                difficulty.innerText = "HARD"
                timequestion = timequestionHard
                resetQuestion()

            } else {
                console.log("soal Habis")
                closeall()
            }
            checkAnswerFill = false
        }
    }
})


function countdown()
{
    if (timequestion == -1) {
        clearTimeout(timerId);
        closeall();
    } else {
        timer.innerHTML = timequestion + ' seconds remaining';
        timequestion--;
    }
}


function resetQuestion()
{
    questionText.innerHTML = ''
    answersList.innerHTML = ''
    getQuestion(indexQuestion++, url)
}

function closeall() {
    containterFinish.classList.remove('hide')
    containterQuestion.classList.add('hide')
    containerPrice.classList.add('hide')
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
    }
    return array
}