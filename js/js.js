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
            this.comments = [{}],
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
const post1 = new Post(1, 2, "Que caloor que hacee!", "Patricia Bilek", linkFotoUser, linkFotoPost, [{}], 0)
const post2 = new Post(2, 1, "Hola soy Pedro Martinez soy estudiante de medicina y es mi primera vez en Umeds.", "Pedro Martinez", linkFotoUser, linkFotoPost, [{}], 0)
const post3 = new Post(3, 3, "Hoy comenzamos el curso de anatomia en Udelar!!", "Rodrigo Ojeda", linkFotoUser, linkFotoPost, [{}], 0)

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
                    document.getElementById("posteador").style.display = 'flex'
                    document.getElementById("loginForm").style.display = 'none'
                    document.getElementById("entrar").style.display = 'none'
                    const usuario = new User(user.id, user.nombre, user.carrera, user.titulo, user.email, user.seUnio, user.rol, user.foto, user.password)
                    localStorage.setItem("userUmeds", JSON.stringify(usuario))
                    let bienvenida = document.getElementById("bienvenido")
                    bienvenida.innerHTML = "Bienvenido " + user.nombre
                    //Llamo a la funcion crear boton para salir
                    crearUnBoton("barraNav", "Salir", "salir", "salir", salir)
                    location.reload()
                }
            }
        });
    } else {
        //console.log("debes completar los campos!")
    }
}

const printearUsuarios = (nombreUsuario, foto) => {
    //Tomo la referencia del contenedor para usuarios en el html
    let usersContainer = document.getElementById("usuarios")
    //se crean los elementos
    let nombre = document.createElement("h6")
    let userImagen = document.createElement("img")
    //se cambian sus propiedades
    userImagen.className = "slideDeUsers"
    userImagen.src = foto
    nombre.innerHTML = nombreUsuario
    //se agregan al html
    usersContainer.append(userImagen)
    usersContainer.append(nombre)
}

const printearPosts = (nombreUsuario, content, fotoUsuario, postUserId, postId, postComments) => {
    //Tomo la referencia del contenedor para posts en el html

    let postContainer = document.getElementById("posts")
    postContainer.style.margin = "auto"
    postContainer.style.width = "50%"

    //se crean los elementos
    let propietarioDelPost = document.createElement("p")
    let contenido = document.createElement("p")
    let fotoDelUser = document.createElement("img")
    let div = document.createElement("div")
    let div2 = document.createElement("div")

    //se cambian sus propiedades
    div.className = "infoUserPost"
    div.id = "div1"
    div2.className = "div2"
    div2.id = "div2" + postId
    div2.style.marginTop = "50px"
    fotoDelUser.src = fotoUsuario
    fotoDelUser.className = "fotoDelUser"
    propietarioDelPost.innerHTML = nombreUsuario
    contenido.innerHTML = content

    //se agregan al html
    div2.append(contenido)
    div.append(fotoDelUser)
    div.append(propietarioDelPost)
    div.append(div2)
    postContainer.append(div)
    div2.append(crearBarraPosts(postId, postComments))

    let user = JSON.parse(localStorage.getItem("userUmeds"))
    let posts = JSON.parse(localStorage.getItem("posts"))

    if (user && user.id == postUserId) {
        let div3 = document.createElement("div")
        div3.id = "editButton" + postId
        div.append(div3)

        crearUnBoton(div3.id, "Editar", "editar", "editar", abrirInputParaEditar = () => {
            let cerrar = document.createElement("li")
            cerrar.className = "fa-regular fa-circle-xmark"
            let div4 = document.createElement("div")
            div4.id = "div4"
            let input = document.createElement("input")
            input.placeholder = "Ingresa otro post"
            div4.append(input)
            div2.append(div4)
            div4.append(cerrar)
            div3.style.display = "none"

            cerrar.addEventListener('click', function (e) {
                div4.remove();
                div3.style.display = "block"
            })

            crearUnBoton(div4.id, "Aceptar", "aceptar", "aceptar", editarPost = () => {
                //posts[postId - 1].likes = posts[postId - 1].likes + 1
                posts[postId - 1].content = input.value
                console.log(posts)
                localStorage.setItem("posts", JSON.stringify(posts))
                location.reload()
            })
        })
    }

}

const publicarPost = (contenido) => {
    //agarro la informacion del usuario para relacionarla con el post
    let user = JSON.parse(localStorage.getItem("userUmeds"))
    //Cada post tiene un id, como no tengo una base de datos que genere el id voy a sumarle 1 al lenght del array.
    const nuevoPost = new Post(posts.length + 1, user.id, contenido, user.nombre, user.foto)

    posts.push(nuevoPost);
    localStorage.setItem("posts", JSON.stringify(posts))
    //Limpio el input donde escribimos el post
    document.getElementById("post").value = ""
    printearPosts(user.nombre, contenido, user.foto, user.id, posts.length)
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
    let emailInput = document.createElement("input")
    emailInput.id = "email"
    emailInput.placeholder = "Email"

    let passInput = document.createElement("input")
    passInput.id = "pass"
    passInput.placeholder = "Contraseña"
    passInput.type = "password"

    div.append(emailInput)
    div.append(passInput)

    crearUnBoton("loginForm", "Entrar", "entrar", "entrar", login)
}

const crearBarraPosts = (postId, comments) => {
    let div = document.createElement("div")
    let liLikes = document.createElement("li")
    let liComments = document.createElement("li")
    liLikes.id = "liLikes" + postId
    liComments.id = "liComments" + postId

    liLikes.append(contarLikes(postId))

    liComments.addEventListener('click', function (e) {
        document.getElementById("liComments" + postId).style.display = "none"
        mostrarComments(postId, comments)
    })


    liLikes.addEventListener('click', function (e) {
            darLike(postId)
    })

    if (!localStorage.getItem('userUmeds')) {
        liLikes.style.pointerEvents = "none";
        liComments.style.pointerEvents = "none";
    }

    liLikes.className = "fa-regular fa-thumbs-up"
    liComments.className = "fa-regular fa-comment"
    div.className = "barraLikes"

    div.append(liLikes)
    div.append(liComments)
    return div
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

const mostrarComments = (postId, comments) => {
    let contenedor = document.getElementById("div2" + postId)
    let div = document.createElement("div")
    let input = document.createElement("input")
    let button = document.createElement("button")
    let cerrar = document.createElement("li")
    let contenedorComment = document.createElement("div")

    button.innerText = "Comentar"
    input.placeholder = "Comentario"
    cerrar.className = "fa-regular fa-circle-xmark"

    contenedor.append(cerrar)

    cerrar.addEventListener('click', function (e) {
        contenedorComment.remove();
        input.remove();
        button.remove();
        cerrar.style.display = "none"
        document.getElementById("liComments" + postId).style.display = "contents"
    })

    button.onclick = () => {
        crearComment(postId, retornarUser(), input.value)
    }

    div.append(input)
    div.append(button)
    contenedor.append(div)

    if (comments) {
        comments.forEach(comment => {
            if (comment.comment != undefined && comment.nombre != undefined) {
                let nombre = document.createElement("p")
                let p = document.createElement("p")
                nombre.innerText = comment.nombre
                p.innerText = comment.comment
                contenedorComment.append(nombre)
                contenedorComment.append(p)
                contenedor.append(contenedorComment)
            }
        })
    }
}

const crearComment = (postId, nombreUser, comment) => {
    let posts = JSON.parse(localStorage.getItem("posts"))

    posts[postId - 1].comments.push({ nombre: nombreUser, comment: comment })
    localStorage.setItem("posts", JSON.stringify(posts))
    location.reload()
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
    document.getElementById("liLikes" + postId).innerText = likes
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
    crearUnBoton("barraNav", "Salir", "salir", "salir", salir)
} else {
    document.getElementById("posteador").style.display = 'none'
    //console.log("No estas logueado")
}

//cargo los posts y usuarios de la plataforma al html
posts = JSON.parse(localStorage.getItem("posts"))
//let user = JSON.parse(localStorage.getItem("userUmeds"))

posts.forEach(post => {
    console.log(post)
    printearPosts(post.nombreUsuario, post.content, post.fotoUsuario, post.userId, post.postId, post.comments)
});

usuarios.forEach(user => {
    printearUsuarios(user.nombre, user.foto)
});

//Boton Publicar
const publicarBtn = document.getElementById("publicar")
publicarBtn.onclick = () => {
    //agarro el contenido del input del html
    let contenido = document.getElementById("post").value
    if (contenido.length > 0) {
        publicarPost(contenido)
    } else {
        //console.log("No has escrito nada!")
    }
}

const loginBtn = document.getElementById("login")
loginBtn.onclick = () => {
    crearForm()
}

//Agregada una funcion de orden superior con el metodo filter() para buscar entre los usuarios un nombre.
let botonBuscar = document.getElementById("buscar")
botonBuscar.onclick = () => {
    let palabra = document.getElementById("buscadorInput").value
    const resultado = usuarios.filter((usuario) => usuario.nombre.includes(palabra))
    resultado.forEach(user => {
        mostrarBusqueda(user)
    })
}

let limpiarPosts = document.getElementById("limpiarPosts")
limpiarPosts.onclick = () => {
    localStorage.removeItem("posts")
    location.reload()
}