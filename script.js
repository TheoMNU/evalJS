const btn = document.querySelector('#btn')
const form = document.querySelector("form");
const questionsContainer = document.querySelector(".questions-container")




async function fetchQuestions() {
    const questionsResponse = await fetch('http://138.68.173.105/api/questions', {
        method: 'GET',
        // body: JSON.stringify(),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
            // 'userKey': "c2f202b5-19df-44c4-a296-ed8a552bb434"
        },
    })
    // Déstructuration (pour recherche google)
    const { questions } = await questionsResponse.json()
    createQuestion(questions)
}

function createQuestion(arr) {
    for (let i = 0; i < arr.length; i++) {

        const questionDisplay = document.createElement('div')
        questionsContainer.classList.add('py-10')
        questionsContainer.innerHTML += `
        
        <div class='pb-10'>
        <h2>${arr[i].question}</h2>
        <input type="radio" id="reponse${i}.1" name="reponse${i + 1}" value="${arr[i].choices[0]}" checked />
        <label for="reponse${i}.1">${arr[i].choices[0]}</label>
        
        <input type="radio" id="reponse${i}.2" name="reponse${i + 1}" value="${arr[i].choices[1]}" />
        <label for="reponse${i}.2">${arr[i].choices[1]}</label>
        
        <input type="radio" id="reponse${i}.3" name="reponse${i + 1}" value="${arr[i].choices[2]}" />
        <label for="reponse${i}.3">${arr[i].choices[2]}</label>
        
        <input type="radio" id="reponse${i}.4" name="reponse${i + 1}" value="${arr[i].choices[4]}" />
        <label for="reponse${i}.4">${arr[i].choices[3]}</label>
        </div>
		`
        questionsContainer.appendChild(questionDisplay)
    }
}

fetchQuestions()

function transformInput() {
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries())
    const formDataJsonString = JSON.stringify(plainFormData)

    return formDataJsonString
}

const reponseValue = transformInput()



async function pushReponse(json) {
    try {
        const response = await fetch('http://138.68.173.105/api/questions/answers', {
            method: 'POST',
            body: json,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error(
                "Une erreur est survenue lors de la récupération des réponses"
            );
        }
    } catch (e) {
        console.error(e);
    }
}

// // pushReponse(reponseValue)
// function newReponse(e) {
//     e.preventDefault()
//     const reponseValue = transformInput()
//     pushReponse(reponseValue)
// }

// form.addEventListener("submit", (e) => newReponse(e))
// console.log(pushReponse(todoInputValue));

// // createQuestion(questions)
