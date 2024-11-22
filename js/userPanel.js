const buildUserPanel = (user) => {
    let ref = JSON.parse(user)
    let div = document.getElementById("panelUserInfo")
    div.innerHTML = ` <img src="${ref.foto}" style="width: 100px; height: 100px"> </img>
                    <p>${ref.nombre}</p>
                    <p>${ref.email}</p>
                    <p>Seguidores: ${countFollowers(ref.seguidores)}</p>
                    <p>Seguidos: ${countFollowers(ref.seguidos)}</p>
                    <button class="btn btn-light">Editar mi perfil</button>
    `
}

const countFollowers = (seguidores) => {
    return seguidores.length
}

const countFollows = (seguidores) => {
    return seguidores.length
}

buildUserPanel(localStorage.getItem("userUmeds"))

