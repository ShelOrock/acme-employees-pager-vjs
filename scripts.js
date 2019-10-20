const fetchData = () => new Promise((res, rej) => { 
    const idx = window.location.hash ? Number(window.location.hash.slice(1)) : 0;

        return fetch(`https://acme-users-api-rev.herokuapp.com/api/users/${idx > 0 ? idx : ''}`)
        .then(response => response.json())
        .then(data => {
            let {users, count} = data;
            renderUsers(users)
            renderPager(count, idx);
            })
            .catch(e => rej(e));
});


    // while (count > 0) {
    //     count -= 50;
    //     let pgNum = 1;
    //     response = await fetch((`https://acme-users-api-rev.herokuapp.com/api/users/${pgNum}`));
    //     pgNum++;
    // }

const userList = document.querySelector('#user-list')
const pager = document.querySelector('#pager');


const renderUsers = (userData) => {
    let html = userData.map(user => {
        return `<div class='user'>
        <ul>
            <li>${user.firstName}</li>
            <li>${user.lastName}</li>
            <li class='user-email'>${user.email}</li>
            <li>${user.title}</li>
        </ul>
    </div>`
        
    }).join('')

    userList.innerHTML = `<div class='subheader'><ul><li>First Name</li><li>Last Name</li><li>Email</li><li>Title</li></ul></div>${html}`;
}

// const html = `<ul>
// <li><a href="${window.location.href}#">First</a></li>
// <li><a href="${window.location.href}#${location++}"></a>Next</li>
// <li>${location}</li>
// <li><a href="${window.location.href}#${location--}"></a>Previous</li>
// <li><a href="${window.location.href}#${Math.ceil(count / 50)}"></a></li>
// </ul>`

// pager.innerHTML = html;

const renderPager = (num, idx) => {
    // add eventlistener for change in hash

    const html = `<ul>
    ${idx > 0 ? `<li><a href="${window.location.toString().split('#')[0]}">First</a></li>` : ''}
    ${idx > 0 ? `<li><a href="${window.location.toString().split('#')[0]}#${idx - 1}">Previous</a></li>` : ''}
    <li>${idx + 1}</li>
    ${idx < Math.floor(num / 50) ? `<li><a href="${window.location.toString().split('#')[0]}#${idx + 1}">Next</a></li>` : ''}
    ${idx < Math.floor(num / 50) ? `<li><a href="${window.location.toString().split('#')[0]}#${Math.floor(num / 50)}">Last</a></li>` : ''}
    </ul>`

    pager.innerHTML = html;

    
    // const response = await fetch(`https://acme-users-api-rev.herokuapp.com/api/users/${location}`)
    // const data = await response.json();
    // const {users, count} = data;

    // renderUsers(users);
}

window.addEventListener('hashchange', ev => {
    fetchData();
});

fetchData()