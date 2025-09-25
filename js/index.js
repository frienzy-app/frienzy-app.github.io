document.body.innerHTML = `
<style>
@import 'https://use.fontawesome.com/releases/v7.0.1/css/all.css';

body {
    display: flex;
    > header {
        > nav {
            > a {
                color: var(--color-c);
                > div {
                    
                    padding: 1em;
                }
                &:hover, &:focus {
                    text-decoration: none;
                    > div {
                        background-color: rgb(from var(--color-b) r g b / .1);
                    }
                }
            }
        }
    }
    > main {
        
    }
}
</style>
<header>
    <nav>
        <a href=/>
            <div>
                <i class='fa-solid fa-home'></i>
                <span>Home</span>
            </div>
        </a>
        <a href=/friends>
            <div>
                <i class='fa-solid fa-user'></i>
                <span>Friends</span>
            </div>
        </a>
        <a href=/settings>
            <div>
                <i class='fa-solid fa-gear'></i>
                <span>Settings</span>
            </div>
        </a>
    </nav>
    <nav>
        <a href=/me>
            <div>
                <i class='fa-solid fa-user'></i>
                <span>Profile</span>
            </div>
        </a>
    <nav>
</header>
<main></main>
`

const main = document.body.querySelector('main')

const settings_template = `
<style>
    form {
        display: grid;
        gap: .5em;
    }
</style>
<h1>Settings</h1>
<form>
    <h2>Username</h2>
    <input name=username placeholder=Username minlength=3 maxlength=16 pattern=\\w{3,16}>
    <h2>Password</h2>
    <input name=password placeholder=Password minlength=8 maxlength=256 pattern=.{8,256}>
    <input name=repeat-password placeholder='Repeat password' minlength=8 maxlength=256 pattern=.{8,256}>
    <br>
    <input type=submit>
</form>
`

const routes = {
    '/settings'() {
        main.innerHTML = settings_template
        main.querySelector('input[name=username]')
            .placeholder = sessionStorage.username

        const form = main.querySelector('form')

        const submit = form.querySelector('input[type=submit]')

        form.addEventListener('submit', event => {
            event.preventDefault()

            const {
                username: {value: username},
                password: {value: password},
                'repeat-password': {value: repeatPassword}
            } = event.target.elements

        })

        form.addEventListener('change', event => {
            if (!submit.checkValidity())
                submit.setCustomValidity('')
            if (!event.target.checkValidity())
                event.target.reportValidity()
        })

    }
}

function render(state) {
    return routes[location.pathname]?.(state)
}

window.addEventListener('popstate', ({state}) => render(state))

document.addEventListener('click', event => {
    const anchor = event.target.closest('a')
    if (!anchor) return
    const [href, protocol, host, pathname, search, hash] =
        anchor.href.match(/^(.+:)\/\/([^/]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?$/)
    if (host !== location.host) return
    event.preventDefault()
    if (href === location.href) return
    history.pushState(undefined, undefined, pathname)
    render()
})

render()
