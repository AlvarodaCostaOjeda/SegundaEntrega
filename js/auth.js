class User {
    constructor(id, nombre, carrera, titulo, email, seUnio, rol, foto, password, likes, seguidores, seguidos, mensajes) {
        this.id = id
        this.nombre = nombre,
            this.carrera = carrera,
            this.titulo = titulo,
            this.email = email,
            this.seUnio = seUnio,
            this.rol = rol,
            this.foto = foto,
            this.password = password,
            this.likes = likes,
            this.seguidores = seguidores,
            this.seguidos = seguidos,
            this.mensajes = mensajes
    }

    returnId() {
        return this.id
    }
    returnNombre() {
        return this.nombre
    }
}

let users = []
let url = "./db/users.json"

const checkUsers = async () => {
    let resp
    let data

    if(!localStorage.getItem("umedsUsers")){
        resp = await fetch(url)
        data = await resp.json()
     
    }else{
        let ref2 = JSON.parse(localStorage.getItem("umedsUsers"))
        ref2.forEach(element => {
            data = element 
        });
       
    }

    let email = document.getElementById("email").value
    let pass = document.getElementById("pass").value

    data.forEach(user => {
        if(email == user.email && pass == user.password){
          
            const usuario = new User(user.id, user.nombre, user.carrera, user.titulo, user.email, user.seUnio, user.rol, user.foto, user.password, user.likes, user.seguidores, user.seguidos, user.mensajes)
            localStorage.setItem("userUmeds", JSON.stringify(usuario))
            users.push(data)
            localStorage.setItem("umedsUsers", JSON.stringify(users))
            document.getElementById("login").remove()
            document.getElementById("loginForm").remove()
            crearUnBoton("barraNav", "Salir", "btn btn-danger", "salir", salir)
            location.reload()
        }
    });
}

const crearUnBoton = (contenedor, botonInnerText, botonClassName, botonId, funcion) => {
    let botonContainer = document.getElementById(contenedor)
    let boton = document.createElement("button")

    boton.innerText = botonInnerText
    boton.className = botonClassName
    boton.id = botonId

    boton.onclick = funcion

    botonContainer.append(boton)
}

const mostrarMensajeEror = () => {
    return console.error("Algo ha salido mal, intentalo nuevamente")
}

const salir = function () {
    //localStorage.removeItem("umedsUsers")
    localStorage.removeItem("userUmeds")
    //localStorage.removeItem("posts")
    location.reload()
}

const login = () => {
    try {
        checkUsers()
    } catch (error) {
        mostrarMensajeEror()
    }
}

const crearForm = () => {
    document.getElementById("login").style.display = "none"
    let div = document.getElementById("loginForm")
    div.innerHTML = `
                    <input placeholder="email" type="email" id="email" required></input>
                    <input placeholder="password" type="password" id="pass" required></input>
                    <button class="btn btn-primary" id="entrar">Entrar</button>
    `
    let entrar = document.getElementById("entrar")
    entrar.onclick = () => {
        login()
    }
}

const loginBtn = document.getElementById("login")
loginBtn.onclick = () => {
    crearForm()
}

if (localStorage.getItem('userUmeds')) {
    document.getElementById("bienvenido").innerText = "Bienvenido " + JSON.parse(localStorage.getItem("userUmeds")).nombre
    document.getElementById("login").remove()
    document.getElementById("loginForm").remove()
    crearUnBoton("barraNav", "Salir", "btn btn-danger", "salir", salir)
} else {
    
}

