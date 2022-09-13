fetch('https://jsonplaceholder.typicode.com/users/')
    .then(X => X.json())
    .then(json => {
        let menu = document.getElementById('mnuUsers');
        let OPCIONES = '';
        for (let P = 0; P < json.length; P++) {
            OPCIONES += `<Option value='${json[P].id}'>${json[P].username}</Option>`;
        }
        menu.innerHTML = OPCIONES;

    })

const menu = document.getElementById('mnuUsers');
menu.addEventListener("change", () => {
    fetch('https://jsonplaceholder.typicode.com/users/' + menu.value)
        .then(X => X.json())
        .then(json => {
            console.log(json);
        })



})
const btnPost = document.getElementById("btnPosts");
btnPost.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts?userId=' + menu.value)
        .then((X) => X.json())
        .then((json) => {
            let POST = document.getElementById('posts');
            let DATOS = '';
            json.forEach(pub => {
                DATOS += `
                    <div class="POST" id="pub${pub.id}">
                    <h2>${pub.Title}</h2>
                    <p>${pub.body}</p>
                    <BUTTON type="button" class="btnMostrar" onclick="MOSTRAR(${pub.id})">MOSTRAR COMENTARIOS</button>
                    <div class="pcomes" id="PCOM${pub.id}"></div> 
                `;

            })
            POST.innerHTML = DATOS;
        })
});

const info = document.getElementById("infoUsers");
info.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/users/' + menu.value)
        .then((X) => X.json())
        .then((json) => {
            let b = document.getElementById("infos");
            let DATOS = '';

            DATOS += ` 
            
              <div><p>${json.name}</p>
              <p>${json.email}</p>
              <p>${json.username}</p>
              <p>${json.address.suite}</p>
              <p>${json.address.street}</p>
              <p>${json.phone}</p>
              <p>${json.website}</p>
              <p>${json.company.name}</p>
              </div>
          `;

            b.innerHTML = DATOS;

        });

});

const btnNoPosts = document.getElementById('btnNoPosts');
btnNoPosts.addEventListener('click', () => {
    let posts = document.getElementById('posts');
    posts.innerHTML = "";
});

function MOSTRAR(id) {
    fetch('https://jsonplaceholder.typicode.com/posts/' + id + '/comments')
        .then(X => X.json())
        .then(json => {
            let DIVCOM = document.getElementById('PCOM' + id);
            let COMENTS = '';
            json.forEach(COMMENT => {
                COMENTS += `<h5>${COMMENT.name}</h5><p>${COMMENT.body}</p>`;
            });
            DIVCOM.innerHTML = `${COMENTS} <BUTTON type="button" class="BTNOCULTAR" onclick="OCULTAR(${id})">OCULTAR COMENTARIOS</button>`;
        });
};

function OCULTAR(id) {
    let DIVCOM = document.getElementById('PCOM' + id);
    DIVCOM.innerHTML = "";
}