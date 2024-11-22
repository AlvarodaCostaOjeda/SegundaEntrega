//Usar en el login 
//usuario: profejs@gmail.com 
//contraseña: 123456

//Buenas profe, agregue algunas funciones como me pidió. Puede iniciar sesion con cualquiera de los usuarios del array usuarios de la linea 60.

//Una función filter() en la linea 469 que es un buscador de usuarios por nombre.

//Tambien agregue la posibilidad de editar los posts, comentar ,dar likes y un contador de likes. Si no inicia sesion no puede dar likes ni comentar.

//Una funcion includes() en la linea 393 para ver si el usuario ya le dio like a ese post.

//Tambien agregue bien arriba un boton para limpiar los posts de su localstorage ya que deben haber quedaron guardados desde la ultima entrega.

//Como todavia no se guardan los datos del usuario en una base de datos cuando se cierra la sesion y se vuelve a loguear se puede dar like
//a los posts que ya le habia dado like anteriormente. Porque los likes del usuario quedan guardados en un array dentro del objeto
//del usuario que se guarda en el localstorage cuando se inicia sesion. Entonces al salir y al volver a loguearse el array de likes del usuario
//comienza vacio.

class User {
    constructor(id, nombre, carrera, titulo, email, seUnio, rol, foto, password) {
        this.id = id
        this.nombre = nombre,
            this.carrera = carrera,
            this.titulo = titulo,
            this.email = email,
            this.seUnio = seUnio,
            this.rol = rol,
            this.foto = foto,
            this.password = password,
            this.likes = []
    }

    returnId() {
        return this.id
    }
    returnNombre() {
        return this.nombre
    }
}

class Post {
    constructor(postId, userId, content, nombreUsuario, fotoUsuario, fotoPost, comments) {
        this.id = postId.id
        this.postId = postId,
            this.userId = userId,
            this.content = content,
            this.nombreUsuario = nombreUsuario,
            this.fotoUsuario = fotoUsuario,
            this.fotoPost = fotoPost,
            this.comments = [],
            this.likes = 0
    }
}
//Pongo un link de una foto de usuarios en una variable para que sea mas leible en el codigo
let linkFotoUser = "https://img.freepik.com/vector-gratis/gradiente-azul-usuario_78370-4692.jpg?t=st=1730402439~exp=1730406039~hmac=9da2a8790c5cd22b802905215b3efcf41f3524921c8b5a5ed0210e159d913d9c&w=740"
let linkFotoPost = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.campustraining.es%2Fnoticias%2Fcomo-estudiar-con-calor%2F&psig=AOvVaw04k9bA1Z5q39aVVPEyvIEy&ust=1730479805027000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLDf1eSJuYkDFQAAAAAdAAAAABAE"

//array de usuarios
let usuarios = [
    {
        id: 1,
        nombre: "Pedro Martinez",
        carrera: "Medicina",
        titulo: "Estudiante",
        email: "pedromartinez@gmail.com",
        seUnio: "17/08/2024",
        rol: 0,
        foto: 'https://img.freepik.com/vector-gratis/gradiente-azul-usuario_78370-4692.jpg?t=st=1730397240~exp=1730400840~hmac=f376b1905df3e3fc44f4dca1c1b3f1e867a934b58bad996d426a7aa65436d1dc&w=740',
        password: "123456",
        likes: []
    },
    {
        id: 2,
        nombre: "Patricia Bilek",
        carrera: "Medicina",
        titulo: "Estudiante",
        email: "PatyBilek@gmail.com",
        seUnio: "04/02/2024",
        rol: 0,
        foto: "https://img.freepik.com/vector-gratis/gradiente-azul-usuario_78370-4692.jpg?t=st=1730397240~exp=1730400840~hmac=f376b1905df3e3fc44f4dca1c1b3f1e867a934b58bad996d426a7aa65436d1dc&w=740",
        password: "123456",
        likes: []
    },
    {
        id: 3,
        nombre: "Rodrigo Ojeda",
        carrera: "Medicina",
        titulo: "Estudiante",
        email: "ojota@gmail.com",
        seUnio: "24/03/2023",
        rol: 0,
        foto: "https://img.freepik.com/vector-gratis/gradiente-azul-usuario_78370-4692.jpg?t=st=1730397240~exp=1730400840~hmac=f376b1905df3e3fc44f4dca1c1b3f1e867a934b58bad996d426a7aa65436d1dc&w=740",
        password: "123456",
        likes: []
    },
    {
        id: 4,
        nombre: "Profe de js",
        carrera: "Programacion",
        titulo: "Javascript senior developer",
        email: "profejs@gmail.com",
        seUnio: "22/02/2024",
        rol: 1,
        foto: "https://img.freepik.com/vector-gratis/gradiente-azul-usuario_78370-4692.jpg?t=st=1730397240~exp=1730400840~hmac=f376b1905df3e3fc44f4dca1c1b3f1e867a934b58bad996d426a7aa65436d1dc&w=740",
        password: "123456",
        likes: []
    }
]

//array de posts
let posts = []
let users = []
const post1 = new Post(1, 2, "Que caloor que hacee!", "Patricia Bilek", linkFotoUser, linkFotoPost, [], 0)
const post2 = new Post(2, 1, "Hola soy Pedro Martinez soy estudiante de medicina y es mi primera vez en Umeds.", "Pedro Martinez", linkFotoUser, linkFotoPost, [], 0)
const post3 = new Post(3, 3, "Hoy comenzamos el curso de anatomia en Udelar!!", "Rodrigo Ojeda", linkFotoUser, linkFotoPost, [], 0)

//Tengo que hacer un fetch a users.json y utilizar esa informacion para hacer el login. Ahi ya van a quedar en el localstorage los users o deberia ponerlos.
//Tengo que hacer un fetch de los posts y printearlos
//Con promesas o try catch

//Si el localStorage posts esta vacio le cargo los tres posts. Luego al publicar un nuevo posts se lo añado al localStorage asi se mantienen siempre.
if (!localStorage.getItem("posts")) {
    posts.push(post1, post2, post3)
    localStorage.setItem("posts", JSON.stringify(posts))
}
//-----------------------------------------------------------------Funciones declaradas-------------------------------------------//

const login = function () {
    let email = document.getElementById("email").value
    let pass = document.getElementById("pass").value

    if (email && pass) {
        usuarios.forEach(user => {
            if (email === user.email) {
                if (pass === user.password) {
                    document.getElementById("entrar").style.display = 'none'
                    const usuario = new User(user.id, user.nombre, user.carrera, user.titulo, user.email, user.seUnio, user.rol, user.foto, user.password)
                    localStorage.setItem("userUmeds", JSON.stringify(usuario))
                    let bienvenida = document.getElementById("bienvenido")
                    bienvenida.innerHTML = "Bienvenido " + user.nombre
                    location.reload()
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Los datos ingresados no son correctos!",
                    footer: '<a href="#">No tienes un usuario?</a>'
                });
            }
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Falta completar alguno de los campos!!",
            footer: '<a href="#">No tienes un usuario?</a>'
        });
    }
}


const printearPosts = (nombreUsuario, content, fotoUsuario, postUserId, postId, postComments) => {
    //Tomo la referencia del contenedor para posts en el html
    let user = JSON.parse(localStorage.getItem("userUmeds"))
    let posts = JSON.parse(localStorage.getItem("posts"))
    let postContainer = document.getElementById("posts")
    let container = document.createElement("div")
    container.innerHTML = `
                               <div class="row">
                                <div class="col-md-1"><img src="${fotoUsuario}" class="fotoDelUser"></img></div>
                                <div class="col-md"><p>${nombreUsuario}${(user && user.id == postUserId) ? `<li class="editarPost" style="list-style-type: none" value="${postId}"><i class="fa-regular fa-pen-to-square"  ></i></li>` : ""}</p></div>               
                                </div>
                                <div>
                                    <div class="row">
                                        <div class="col-md post-contenido"><p class="lead">${content}<p/></div>
                                    </div>
                                    <div>   
                                        <li class="fa-regular fa-thumbs-up" value="${postId}">${contarLikes(postId)}</li>
                                        <li class="fa-regular fa-comment" value="${postId}"></li>
                                    </div>
                                </div>
    `
    postContainer.appendChild(container)

}

//Funcion crear boton, le paso por parametro contenedor la div donde va a agregarse. botonInnerText es su texto. BotonClassName es la clase, botonID es la id del boton
//para poder usarlo despues, y el ultimo parametro es la funcion que va a ejecutar el boton en el caso del boton Salir llama a la funcion salir que elimina el usuario del localsotarge.
const crearUnBoton = (contenedor, botonInnerText, botonClassName, botonId, funcion) => {
    let botonContainer = document.getElementById(contenedor)
    let boton = document.createElement("button")

    boton.innerText = botonInnerText
    boton.className = botonClassName
    boton.id = botonId

    boton.onclick = funcion

    botonContainer.append(boton)
}

const salir = function () {
    localStorage.removeItem("userUmeds")
    location.reload()
}

const crearForm = () => {
    document.getElementById("login").style.display = "none"
    let div = document.getElementById("loginForm")
    div.innerHTML = `
                    <input placeholder="email" type="email" id="email"></input>
                    <input placeholder="password" type="password" id="pass"></input>
                    <button class="btn btn-primary" id="entrar">Entrar</button>
    `
    let entrar = document.getElementById("entrar")
    entrar.onclick = () => {
        login()
    }
}

const mostrarBusqueda = (resultado) => {
    let div = document.getElementById("resultados")
    let divBusqueda = document.createElement("div")
    divBusqueda.className = "divBusqueda"
    let nombre = document.createElement("p")
    let img = document.createElement("img")
    nombre.innerText = resultado.nombre
    img.src = resultado.foto
    img.style.width = "30px"
    img.style.height = "30px"
    divBusqueda.append(img)
    divBusqueda.append(nombre)
    div.append(divBusqueda)
}

const mostrarComments = (postId, contenedor, comments) => {
    let reference = document.querySelectorAll(".row.comments")
    let div = document.createElement("div")
    if (comments && reference.length == 0) {
        comments.forEach(comment => {
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
        document.getElementById("comments").remove()

    }
}

const retornarUser = () => {
    let user = JSON.parse(localStorage.getItem("userUmeds"))
    return user.nombre
}

const darLike = (postId) => {
    let user = JSON.parse(localStorage.getItem('userUmeds'))
    if (!user.likes.includes(postId)) {
        let posts = JSON.parse(localStorage.getItem("posts"))
        let user = JSON.parse(localStorage.getItem('userUmeds'))
        user.likes.push(postId)

        posts[postId - 1].likes = posts[postId - 1].likes + 1
        //console.log(posts)
        localStorage.setItem("posts", JSON.stringify(posts))
        localStorage.setItem("userUmeds", JSON.stringify(user))
        // console.log(user)
        updateLikes(postId, posts[postId - 1].likes = posts[postId - 1].likes)
    } else {
        //console.log("ya le diste like")
    }
}

const contarLikes = (postId) => {
    let posts = JSON.parse(localStorage.getItem("posts"))
    return posts[postId - 1].likes
}

const updateLikes = (postId, likes) => {
    let referencia = document.querySelectorAll(".fa-regular.fa-thumbs-up")
    for (let i = 0; i < likeBotones.length; i++) {
        if (referencia[i].value == postId) {
            referencia[i].innerHTML = likes
        }
    }
}

async function sweetAlertEditPost(postId) {
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

async function sweetAlertCommentPost(postId) {
    let user = JSON.parse(localStorage.getItem("userUmeds"))
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

async function sweetAlertAbrirPosteador() {
    const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: "Nuevo post",
        inputPlaceholder: "Escribe tu post aqui...",
        inputAttributes: {
            "aria-label": "Escribe tu post aqui"
        },
        showCancelButton: true
    });
    if (text) {
        //agarro la informacion del usuario para relacionarla con el post
        let user = JSON.parse(localStorage.getItem("userUmeds"))
        //Cada post tiene un id, como no tengo una base de datos que genere el id voy a sumarle 1 al lenght del array.
        const nuevoPost = new Post(posts.length + 1, user.id, text, user.nombre, user.foto)
        posts.push(nuevoPost);
        localStorage.setItem("posts", JSON.stringify(posts))
        //Limpio el input donde escribimos el post
        printearPosts(user.nombre, text, user.foto, user.id, posts.length)
        location.reload()
    }
}

async function sweetAlertAbrirBuscador(){
    const { value: name } = await Swal.fire({
        title: "A quien estas buscando?",
        input: "text",
        inputLabel: "Nombre",
        inputPlaceholder: "Digita el nombre de la persona que buscas"
      });
      if (name) {
        const resultado = usuarios.filter((usuario) => usuario.nombre.includes(name))
        resultado.forEach(user => {
            mostrarBusqueda(user)
        })
      }
}
//-------------------------------------------------------------Chequeo del localstorage, eventos y se recorren los posts -----------------------------------------------//

//Chequeo si el usuario esta en el localstorage.
if (localStorage.getItem('userUmeds')) {
    //Si estoy logueado muestro el input para generar los posts
    document.getElementById("posteador").style.display = 'flex'
    document.getElementById("login").style.display = "none"
    //Agarro la referencia al campo de bienvenida y lo cambio por el nombre del usuario
    let bienvenida = document.getElementById("bienvenido")
    let user = JSON.parse(localStorage.getItem("userUmeds"))
    bienvenida.innerHTML = user.nombre
    //Llamo a la funcion crear boton para salir
    crearUnBoton("barraNav", "Salir", "btn btn-light", "salir", salir)
} else {
    document.getElementById("posteador").style.display = 'none'
    document.getElementById("abrirPosteador").style.pointerEvents = "none"
    document.getElementById("abrirBuscador").style.pointerEvents = "none"
    //console.log("No estas logueado")
}

//cargo los posts y usuarios de la plataforma al html
posts = JSON.parse(localStorage.getItem("posts"))
//let user = JSON.parse(localStorage.getItem("userUmeds"))

posts.forEach(post => {
    console.log(post)
    printearPosts(post.nombreUsuario, post.content, post.fotoUsuario, post.userId, post.postId, post.comments)
});

const loginBtn = document.getElementById("login")
loginBtn.onclick = () => {
    crearForm()
}

let limpiarPosts = document.getElementById("limpiarPosts")
limpiarPosts.onclick = () => {
    localStorage.removeItem("posts")
    location.reload()
}

let postEditBotones = document.querySelectorAll(".editarPost")
for (let i = 0; i < postEditBotones.length; i++) {
    postEditBotones[i].addEventListener('click', function () {
        sweetAlertEditPost(postEditBotones[i].value)
    });
}

let likeBotones = document.querySelectorAll(".fa-regular.fa-thumbs-up")
for (let i = 0; i < likeBotones.length; i++) {
    likeBotones[i].addEventListener('click', function () {
        darLike(likeBotones[i].value)
    });
}

let comentarBotones = document.querySelectorAll(".fa-regular.fa-comment")
for (let i = 0; i < comentarBotones.length; i++) {
    comentarBotones[i].addEventListener('click', function () {
        sweetAlertCommentPost(comentarBotones[i].value)
    });
}

let comments = document.querySelectorAll(".col-md.post-contenido")
for (let i = 0; i < comments.length; i++) {
    comments[i].addEventListener('click', function () {
        mostrarComments(i, comments[i], posts[i].comments)
    });
}

let abrirPosteador = document.getElementById("abrirPosteador")
abrirPosteador.onclick = () => {
    sweetAlertAbrirPosteador()
}

let abrirBuscador = document.getElementById("abrirBuscador")
abrirBuscador.onclick = () => {
    sweetAlertAbrirBuscador()
}
