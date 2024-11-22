class Post {
    constructor(postId, userId, content, nombreUsuario, fotoUsuario, fotoPost, comments) {
        this.postId = postId,
            this.userId = userId,
            this.content = content,
            this.nombreUsuario = nombreUsuario,
            this.fotoUsuario = fotoUsuario,
            this.fotoPost = fotoPost,
            this.comments = [],
            this.likes = 0,
            this.shares = 0
    }
}

let usersUrl = "./db/posts.json"
let posts = []

const user = JSON.parse(localStorage.getItem("userUmeds"))
const stuf = JSON.parse(localStorage.getItem("umedsUsers"))
const sitePosts = JSON.parse(localStorage.getItem("posts"))

const printearPosts = (nombreUsuario, content, fotoUsuario, postUserId, postId, postFoto) => {
    const checkIfuserLikes = (postId) => {
        if (user && user.likes.includes(postId)) {
            return `<li class="fa-regular fa-heart" style="color: red" value="${postId}">${contarLikes(postId)}</li>`
        } else {
            return `<li class="fa-regular fa-heart" value="${postId}">${contarLikes(postId)}</li>`
        }
    }
    //Tomo la referencia del contenedor para posts en el html
    let user = JSON.parse(localStorage.getItem("userUmeds"))
    let postContainer = document.getElementById("posts")
    let container = document.createElement("div")
    container.innerHTML = `
                               <div class="row">
                                <div class="col-md-1"><img src="${fotoUsuario}" class="fotoDelUser"></img></div>
                                <div class="col-md">
                                <li style="list-style-type: none" class="refUserProfile" value="${postUserId}"><p class="nombreUserLink">${nombreUsuario + " "}${(user && user.id == postUserId) ? `<li class="editarPost" style="list-style-type: none" value="${postId}"><i class="fa-regular fa-pen-to-square"  ></i></li>` : ""}</p></li></div>               
                                </div>
                                <div>
                                    <div class="row">
                                        ${(postFoto != "") ? `<img style="width=200px; height=200px" src=${postFoto}></img>` : ""}
                                        <div class="col-md post-contenido"><p class="lead">${content}<p/></div>
                                    </div>
                                    <div class="row"> 
                                        <div class="col-md">  
                                        <li style="list-style-type: none" value="${postId}">${checkIfuserLikes(postId)}</li><li class="fa-regular fa-comment" value="${postId}"></li>
                                        </div>
                                        </div>
                                </div>
    `
    postContainer.appendChild(container)
}

const checkPosts = async () => {
    resp = await fetch(usersUrl)
    const data = await resp.json()

    data.forEach(post => {
        const postToPush = new Post(post.postId, post.userId, post.content, post.nombreUsuario, post.fotoUsuario, post.fotoPost, post.comments, post.likes, post.shares)
        posts.push(postToPush)
        localStorage.setItem("posts", JSON.stringify(posts))
        printearPosts(post.nombreUsuario, post.content, post.fotoUsuario, post.userId, post.postId, post.fotoPost)
    });

}

const contarLikes = (postId) => {
    let posts = JSON.parse(localStorage.getItem("posts"))
    return posts[postId - 1].likes
}

function removeElement(array, elementToRemove) {
    array.forEach((item, index) => {
        if (item === elementToRemove) {
            array.splice(index, 1);
        }
    });
    return array;
}

console.log(user)
console.log(stuf)
console.log("posts:")
console.log(sitePosts)

const darLike = (postId) => {
    let posts = JSON.parse(localStorage.getItem("posts"))
    let users = JSON.parse(localStorage.getItem("umedsUsers"))

    if (localStorage.getItem("userUmeds") && !user.likes.includes(postId)) {
        user.likes.push(postId)
        posts[postId - 1].likes = parseInt(posts[postId - 1].likes + 1)
        localStorage.setItem("posts", JSON.stringify(posts))
        localStorage.setItem("userUmeds", JSON.stringify(user))

        users.forEach(ref => {
            saveUserLikes = ref.find((el) => el.nombre === user.nombre)
            saveUserLikes.likes.push(postId)
        });
        localStorage.setItem("umedsUsers", JSON.stringify(users))


        updateLikes(postId, posts[postId - 1].likes = posts[postId - 1].likes, "red")
    } else if (localStorage.getItem("userUmeds") && user.likes.includes(postId)) {
        posts[postId - 1].likes = posts[postId - 1].likes - 1

        removeElement(user.likes, postId)
        users.forEach(ref => {
            saveUserLikes = ref.find((el) => el.nombre === user.nombre)
            removeElement(saveUserLikes.likes, postId);
        });

        localStorage.setItem("umedsUsers", JSON.stringify(users))
        localStorage.setItem("posts", JSON.stringify(posts))
        localStorage.setItem("userUmeds", JSON.stringify(user))
        updateLikes(postId, posts[postId - 1].likes = posts[postId - 1].likes, "black")
    }
}

const updateLikes = (postId, likes, color) => {
    let referencia = document.querySelectorAll(".fa-regular.fa-heart")
    for (let i = 0; i < likeBotones.length; i++) {
        if (referencia[i].value == postId) {
            referencia[i].style.color = color
            referencia[i].innerHTML = likes
        }
    }
}

if (localStorage.getItem("posts")) {
    const localStoragePosts = JSON.parse(localStorage.getItem("posts"))
    localStoragePosts.forEach(post => {
        const postToPush = new Post(post.postId, post.userId, post.content, post.nombreUsuario, post.fotoUsuario, post.fotoPost, post.comments, post.likes, post.shares)
        posts.push(postToPush)
        printearPosts(post.nombreUsuario, post.content, post.fotoUsuario, post.userId, post.postId, post.fotoPost)
    });
} else {
    checkPosts()
}

async function nuevoPost() {
    const modalItem = document.getElementById('userModal');

    modalItem.innerHTML = '';

    modalItem.innerHTML = ` <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h5>Nuevo post</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <textarea type="text" placeholder="Escribe aqui tu post" class="form-control" id="text"></textarea>
                                    <div class="modal-footer">
                                      <input type="file" id="upLoader">
                                        <br />
                                        <strong>
                                            <p id="url"></p>
                                        </strong>
                                    <button type="button" class="btn btn-primary" id="publicarPost">Publicar</button>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                          `;

    new bootstrap.Modal(modalItem).show();
    let button = document.getElementById("publicarPost")
    let text = document.getElementById("text")
    const fileInput = document.getElementById('upLoader');
    let ref = JSON.parse(localStorage.getItem("posts"))

    const handleFiles = () => {
        const selectedFiles = [...fileInput.files];
        if (selectedFiles[0]) {
            console.log(selectedFiles[0]);
            const formdata = new FormData()
            formdata.append("image", selectedFiles[0])
            fetch("https://api.imgur.com/3/image/", {
                method: "post",
                headers: {
                    Authorization: "Client-ID 0e95e513f32844d"
                },
                body: formdata
            }).then(data => data.json()).then(data => {
                const nuevoPost = new Post(posts.length + 1, user.id, text.value, user.nombre, user.foto, data.data.link)
                ref.push(nuevoPost);
                localStorage.setItem("posts", JSON.stringify(ref))
                printearPosts(user.nombre, text.value, user.foto, user.id, posts.length, data.data.link)
                location.reload()
            })
        } else {
            const nuevoPost = new Post(posts.length + 1, user.id, text.value, user.nombre, user.foto, "")
            ref.push(nuevoPost);
            localStorage.setItem("posts", JSON.stringify(ref))
            printearPosts(user.nombre, text.value, user.foto, user.id, posts.length, "")
            location.reload()
        }

    }

    button.addEventListener("click", handleFiles);

}

async function comentarPost(postId) {
    const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: posts[postId - 1].content,
        inputPlaceholder: "Tu comentario aqui...",
        inputAttributes: {
            "aria-label": "Digita tu nuevo comentario aqui"
        },
        showCancelButton: true
    });
    if (text) {
        let posts = JSON.parse(localStorage.getItem("posts"))
        posts[postId - 1].comments.push({ nombre: user.nombre, comment: text, img: user.foto })
        localStorage.setItem("posts", JSON.stringify(posts))
        location.reload()
    }
}

async function editarPost(postId) {
    const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: "Nuevo post",
        inputPlaceholder: "Digita tu nuevo post aqui...",
        inputAttributes: {
            "aria-label": "Digita tu nuevo post aqui"
        },
        showCancelButton: true
    });
    if (text) {
        posts[postId - 1].content = text
        localStorage.setItem("posts", JSON.stringify(posts))
        location.reload()
    }
}

const mostrarComments = (contenedor, comments) => {
    let reference = document.querySelectorAll(".row.comments")
    if (comments && reference.length == 0) {
        comments.forEach(comment => {
            let div = document.createElement("div")
            div.innerHTML = `
                            <div class="row comments" id="comments">
                                <div class="col-md-1">
                                    <img src="${comment.img}" style="width: 30px; margin-left: 40px; border-radius: 50%;"></img>
                                </div>
                                <div class="col-md">
                                    <p>${comment.nombre}: ${comment.comment}</p>
                                </div>                            
                            </div>
                            `
            contenedor.append(div)
        })
    } else {
        comments.forEach(comment => {
            document.getElementById("comments").remove()
        });
    }
}

async function editPost(postId) {
    let ref = JSON.parse(localStorage.getItem("posts"))
    const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: "Nuevo post",
        inputPlaceholder: "Digita tu nuevo post aqui...",
        inputAttributes: {
            "aria-label": "Digita tu nuevo post aqui"
        },
        showCancelButton: true
    });
    if (text) {
        ref.find((el) => el.postId == postId).content = text
        localStorage.setItem("posts", JSON.stringify(ref))
        location.reload()
    }
}

let abrirPosteador = document.getElementById("abrirPosteador")
abrirPosteador.onclick = () => {
    if (user) {
        nuevoPost()
    }
}

let likeBotones = document.querySelectorAll(".fa-regular.fa-heart")
for (let i = 0; i < likeBotones.length; i++) {
    likeBotones[i].addEventListener('click', function () {
        if (user) {

            darLike(likeBotones[i].value)
        }
    });
}

let comentarBotones = document.querySelectorAll(".fa-regular.fa-comment")
for (let i = 0; i < comentarBotones.length; i++) {
    comentarBotones[i].addEventListener('click', function () {
        if (user) {
            comentarPost(comentarBotones[i].value)
        }
    });
}

let postEditBotones = document.querySelectorAll(".editarPost")
for (let i = 0; i < postEditBotones.length; i++) {
    postEditBotones[i].addEventListener('click', function () {
        if (user) {

            editPost(postEditBotones[i].value)
        }
    });
}

let comments = document.querySelectorAll(".col-md.post-contenido")
for (let i = 0; i < comments.length; i++) {
    let posts = JSON.parse(localStorage.getItem("posts"))
    comments[i].addEventListener('click', function () {
        mostrarComments(comments[i], posts[i].comments)

    });
}

