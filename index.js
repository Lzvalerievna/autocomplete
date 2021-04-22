const searchInput = document.querySelector('.input');
const submenuPanel = document.querySelector('.submenu');
const repo = document.querySelector('.repo');
const debounce = (fn, ms) => {
    let timeout;
    return function () {
        const fnCall = () => {
            fn.apply(this, arguments)
        }
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms)
    }
}
async function getResponse() {
    submenuPanel.innerHTML = '';
    const value = searchInput.value
    const response = await fetch(`https://api.github.com/search/repositories?q=${value}&per_page=5`)
    const result = await response.json()
    console.log(result.items)
    let listItems = result.items
    listItems.forEach(function (user) {
        const submenuName = document.createElement('div');
        submenuName.classList.add('submenu_name')
        submenuPanel.appendChild(submenuName)
        submenuName.textContent = user.name;
        submenuName.addEventListener('click', e => {
            showRepo(user);
            submenuPanel.innerHTML = '';
            searchInput.value = '';
        })
    })
    if (value === '') submenuPanel.innerHTML = '';
}

let debounce2 = debounce(getResponse, 500)
searchInput.addEventListener('keyup', function (e) {
    if (e.keyCode !== 32) debounce2();
})
function showRepo(user) {
    let repoList =  createElementP ('div', 'repo-container', repo)

    createElementP ('p','repo-container_name', repoList, `Name: ${user.name}`)
    createElementP ('p','repo-container_login', repoList, `Owner: ${user.owner.login}`)
    createElementP ('p','repo-container_stars', repoList,`Stars: ${user.stargazers_count}`)

    const close = createElementP('div', 'close', repoList);
    close.onclick = function () {
        repoList.remove()
    }
}
function createElementP (tagName, className, rodEl,text) {
    const repoName = document.createElement(tagName);
    repoName.classList.add(className);
    repoName.textContent = text;
    rodEl.appendChild(repoName);
    return repoName;
}
