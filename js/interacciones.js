let userLinkProfile = document.querySelectorAll(".refUserProfile")
for (let i = 0; i < userLinkProfile.length; i++) {
    userLinkProfile[i].addEventListener('click', function () {
        showModal(userLinkProfile[i].value)
    });
}

const showModal = (data) => {
    let users = JSON.parse(localStorage.getItem("umedsUsers"))
    let resultado
    for (usuario of users) {
        resultado = usuario.find((el) => el.id === data)
    }

    const modalItem = document.getElementById('userModal');

    modalItem.innerHTML = '';

    modalItem.innerHTML = ` <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">${resultado.nombre}</h5>${(user.seguidos.includes(data)) ? `<li id="addFollow" class="addFollow" style="list-style-type: none" value="${data}"><i style="margin: 10px" class="fa-solid fa-user-minus"></i></li>` : `<li id="addFollow" class="addFollow" style="list-style-type: none" value="${data}"><i style="margin: 10px" class="fa-solid fa-user-plus"></i></li>`}
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body" id="modal-body">
                                    <img src="${resultado.foto}" style="width: 100px; height: 100px"></img>
                                    ${resultado.email}
                                    </div>
                                    <div id="userPostsPrint"></div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                          `;

    new bootstrap.Modal(modalItem).show();
    printUserPosts(data)

    let follow = document.getElementById("addFollow")
    follow.onclick = () => {
        if (user && !user.seguidos.includes(data)) {
            let usuarios = JSON.parse(localStorage.getItem("umedsUsers"))
            usuarios.forEach(usuario => {
                    let ref = usuario.find((usuario) => usuario.id === data)
                    ref.seguidores.push(user.id)
                    let ref2 = usuario.find((usuario) => usuario.id === user.id)
                    ref2.seguidos.push(data)
            });
            localStorage.setItem("umedsUsers", JSON.stringify(usuarios))
            user.seguidos.push(data)
            localStorage.setItem("userUmeds", JSON.stringify(user))
            location.reload()
        }else{
            let index = user.seguidos.indexOf(data)
            user.seguidos.splice(index, 1)
            localStorage.setItem("userUmeds", JSON.stringify(user))
            location.reload()
        }
    }
};

const printUserPosts = (userId) => {
    let div = document.getElementById("userPostsPrint")
    let posts = JSON.parse(localStorage.getItem("posts"))
    let userPosts = posts.filter((post) => post.userId === userId)
  
    userPosts.forEach(post => {
        let contenedor = document.createElement("div")
        contenedor.style.backgroundColor = "#f2f2f2"
        contenedor.innerHTML = `       
                            ${(post.fotoPost) ? `<img style="max-width: 100%" src="${post.fotoPost}"></img>` : ""}
                            <p style="margin: 10px">${post.content}</p>             
        `
        div.append(contenedor)
    });

}
