//Esto es una simulacion de una red social para la facultad de medicina. Donde se pueden generar posts a traves de un sistema de muro tipo facebook.
//Use dos prompts para simular un login para hacerlo un poco mas rapido.
//Usar en el login 
//usuario: profejs@gmail.com 
//contraseña: 123456

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
            this.password = password
    }

    returnId() {
        return this.id
    }
    returnNombre() {
        return this.nombre
    }
}

class Post {
    constructor(postId, userId, content, nombreUsuario, fotoUsuario, fotoPost) {
        this.id = postId.id
        this.postId = postId,
            this.userId = userId,
            this.content = content,
            this.nombreUsuario = nombreUsuario,
            this.fotoUsuario = fotoUsuario,
            this.fotoPost = fotoPost
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
        password: "123456"
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
        password: "123456"
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
        password: "123456"
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
        password: "123456"
    }
]

//array de posts
let posts = []
const post1 = new Post(1, 2, "Que caloor que hacee!", "Patricia Bilek", linkFotoUser, linkFotoPost)
const post2 = new Post(2, 1, "Hola soy Pedro Martinez soy estudiante de medicina y es mi primera vez en Umeds.", "Pedro Martinez", linkFotoUser, linkFotoPost)
const post3 = new Post(3, 4, "Hoy comenzamos el curso de anatomia en Udelar!!", "Rodrigo Ojeda", linkFotoUser, linkFotoPost)
posts.push(post1, post2, post3)

//-----------------------------------------------------------------Funciones declaradas-------------------------------------------//

const login = () => {
    let email = prompt("Ingresa tu email")
    usuarios.forEach(user => {
        if (email === user.email) {
            let pass = prompt("Ingresa tu contrasena")
            if (pass === user.password) {
                document.getElementById("posteador").style.display = 'flex'
                const usuario = new User(user.id, user.nombre, user.carrera, user.titulo, user.email, user.seUnio, user.rol, user.foto, user.password)
                localStorage.setItem("userUmeds", JSON.stringify(usuario))
                let bienvenida = document.getElementById("bienvenido")
                bienvenida.innerHTML = "Bienvenido " + user.nombre
                //Llamo a la funcion crear boton para salir
                crearUnBoton("barraNav", "Salir", "salir", "salir", salir)
            }
        }
    });
}

const printearPosts = (nombreUsuario, content, fotoUsuario, fotoPost, fecha) => {
    //Tomo la referencia del contenedor para posts en el html
    let postContainer = document.getElementById("posts")
    //se crean los elementos
    let propietarioDelPost = document.createElement("p")
    let contenido = document.createElement("p")
    let fotoDelUser = document.createElement("img")
    let div = document.createElement("div")
    let div2 = document.createElement("div")

    //se cambian sus propiedades
    div2.className = "div2"
    div.className = "infoUserPost"
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

const publicarPost = (contenido) => {
    //agarro la informacion del usuario para relacionarla con el post
    let user = JSON.parse(localStorage.getItem("userUmeds"))
    //Cada post tiene un id, como no tengo una base de datos que genere el id voy a sumarle 1 al lenght del array.
    const nuevoPost = new Post(posts.length + 1, user.id, contenido, user.nombre, user.foto)
    posts.push(nuevoPost);
    //Limpio el input donde escribimos el post
    document.getElementById("post").value = ""
    printearPosts(user.nombre,contenido, user.foto)
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

const salir = function(){
    localStorage.removeItem("userUmeds")
    location.reload()
}

//-------------------------------------------------------------Chequeo del localstorage, eventos y se recorren los posts -----------------------------------------------//

//Chequeo si el usuario esta en el localstorage.
if (localStorage.getItem('userUmeds')) {
    //Si estoy logueado muestro el input para generar los posts
    document.getElementById("posteador").style.display = 'flex'
    //Agarro la referencia al campo de bienvenida y lo cambio por el nombre del usuario
    let bienvenida = document.getElementById("bienvenido")
    let user = JSON.parse(localStorage.getItem("userUmeds"))
    bienvenida.innerHTML = user.nombre
    //Llamo a la funcion crear boton para salir
    crearUnBoton("barraNav", "Salir", "salir", "salir", salir)
} else {
    document.getElementById("posteador").style.display = 'none'
    console.log("No estas logueado")
}

//cargo los posts y usuarios de la plataforma al html
posts.forEach(post => {
    printearPosts(post.nombreUsuario, post.content, post.fotoUsuario)
    console.log(post.fotoUsuario)
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
        console.log("No has escrito nada!")
    }
}

const loginBtn = document.getElementById("login")
loginBtn.onclick = () => {
    login()
}

