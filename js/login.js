history.replaceState(undefined, undefined, '/login')

const template = document.createElement('template')

template.innerHTML = `
<style>
    form {
        margin: 0;
        height: 100%;
        display: grid;
        justify-content: center;
        align-content: center;
        gap: 1em;
    }¡
</style>
<form>
    <h1>Log in</h1>
    <input name=username placeholder=Username minlength=3 maxlength=16 pattern=\\w{3,16} required>
    <input type=password name=password placeholder=Password minlength=8 maxlength=256 pattern=.{8,256} required>
    <input type=submit>
</form>
`

const element = template.content

const form = element.querySelector('form')

const submit = element.querySelector('input[type=submit]')

form.addEventListener('submit', event => {
    event.preventDefault()

    const {
        username: {value: username},
        password: {value: password}
    } = event.target.elements

    submit.disabled = true
    submit.value = 'Loading...'

    fetch('https://api.frienzy.app/me', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({username, password})
    })
        .then(response => response.ok && response.json())
        .then(data => {
            if (!data) {
                submit.disabled = false
                submit.removeAttribute('value')
                submit.setCustomValidity('Failed to log in')
                submit.reportValidity()
                return
            }
            history.replaceState(undefined, undefined, '/')
            import('/js/index.js')
        })
})

form.addEventListener('change', event => {
    if (!submit.checkValidity())
        submit.setCustomValidity('')
    if (!event.target.checkValidity())
        event.target.reportValidity()
})

document.body.replaceChildren(element)


