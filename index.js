const searchInput = document.querySelector('.input');
const submenuPanel = document.querySelector('.submenu');
const repo =  document.querySelector('.repo');
const debounce = (fn, ms) => {
    let timeout;
    return function () {
        const fnCall = () => {fn.apply(this, arguments)}
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms)
    }
}
async function getResponse () {
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
    if (value === '')  submenuPanel.innerHTML = '';
}
let debounce2 = debounce(getResponse, 500)
searchInput.addEventListener('keyup', function (e)  {
    if (e.keyCode !== 32) debounce2();
})
function showRepo(user) {
                 const repoContainer = document.createElement('div');
                    repoContainer.classList.add('repo-container')
                    repo.appendChild(repoContainer)
                 const repoName = document.createElement('p');
                    repoName.classList.add('repo-container_name' );
                    repoName.textContent = `Name: ${user.name}`;
                    repoContainer.appendChild(repoName)
                 const repoLogin = document.createElement('p');
                    repoLogin.classList.add('repo-container_login' );
                    repoLogin.textContent = `Owner: ${user.owner.login}`;
                    repoContainer.appendChild(repoLogin)
                 const repoStars = document.createElement('p');
                    repoStars.classList.add('repo-container_stars' );
                    repoStars.textContent = `Stars: ${user.stargazers_count}`;
                    repoContainer.appendChild(repoStars)
                 const close = document.createElement('div');
                    close.classList.add('close')
                    repoContainer.appendChild(close)
                    close.onclick = function () {
                     repoContainer.remove()
                 }
        }






