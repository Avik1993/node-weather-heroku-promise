const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messasgeOne = document.querySelector('#message-1')
const messasgeTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messasgeTwo.textContent = 'LOADING....'
    messasgeOne.textContent = ""
    
    fetch('/weather?search='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messasgeOne.textContent = data.error
                messasgeTwo.textContent = ""
            } else {
                messasgeTwo.textContent = data.data
                messasgeOne.textContent = ""
            }
        })
    })
})
