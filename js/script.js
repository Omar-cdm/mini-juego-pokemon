const elegirCampoBatalla = document.getElementById('elegir-campo-batalla')
const contenedorCamposBatalla = document.getElementById('seleccion-campo-batalla')
const seleccionarCampoBatalla = document.getElementById('seleccionar-campo-batalla')

const elegirMascota = document.getElementById('elegir-mascota')
const contenedorTarjetas = document.getElementById('seleccion-mascota')
const seleccionarMascota = document.getElementById('seleccionar-mascota')

const seccionCombate = document.getElementById('combate')
const containerAtaquesJugador = document.getElementById('container-ataques-jugador')
const mascotaJugador = document.getElementById('mascota-jugador')
const mascotaEnemigo = document.getElementById('mascota-enemigo')
const ataqueJugador = document.getElementById('ataque-jugador')
const ataqueEnemigo = document.getElementById('ataque-enemigo')
const resultadoCombate = document.getElementById('resultado-combate')
const btnReiniciar = document.getElementById('reiniciar-juego')
const victoriasJugador = document.getElementById('victorias-jugador')
const potenciaJugador = document.getElementById('potencia-jugador')
const defensaJugador = document.getElementById('defensa-jugador')
const victoriasEnemigo = document.getElementById('victorias-enemigo')
const potenciaEnemigo = document.getElementById('potencia-enemigo')
const defensaEnemigo = document.getElementById('defensa-enemigo')
const batalla = document.getElementById('batalla')
const ctx = batalla.getContext("2d")
const ataques = document.getElementById('ataques')
const ctx2 = ataques.getContext("2d")

const seccionMostrarGanador = document.getElementById('mostrar-ganador')
const mensajeGanador = document.getElementById('mensaje-ganador')
const containerGanador = document.getElementById('ganador')

let camposDeBatalla = []
let arenas
let invierno
let electrico
let opcionDeCampo
let pokemones = []
let ataquesElegidoJugador = []
let ataquesElegidoEnemigo = []
let pikachu
let venusaur 
let meowth
let ataquesPikachu = []
let ataquesVenusaur = []
let ataquesMeowth = []
let opcionDePokemones
let ataquesPokemon
let botones = []
let mascotaElegida
let mascotaElegidaEnemigo
let turno = 2
let iAtaqueJugador
let iAtaqueEnemigo
let acomuladoVictoriasJugador = 0
let acomuladoVictoriasEnemigo = 0

class CampoDeBatalla{
    constructor(nombre,id, imagen) {
        this.nombre = nombre
        this.id = id
        this.imagen = imagen
    }
}

let campoArenas = new CampoDeBatalla('Campo Arenas', 'campo-arenas', './img/campo_batalla1.jpg')
let campoInvierno = new CampoDeBatalla('Campo Invierno', 'campo-invierno', './img/campo_batalla2.jpg')
let campoElectrico = new CampoDeBatalla('Campo Electrico', 'campo-electrico', './img/campo_batalla3.jpg')

camposDeBatalla.push(campoArenas, campoInvierno, campoElectrico)

class Ataque{
    constructor(nombre, id, categoria, daño, imagen) {
        this.nombre = nombre
        this.id = id
        this.categoria = categoria
        this.daño = daño
        this.imagen = imagen
    }
}

let Impactrueno = new Ataque('Impactrueno', 'btn-impactrueno', 'especial', 20, './img/impactrueno.png')
let Rayo = new Ataque('Rayo', 'btn-rayo', 'especial', 20, './img/rayo.png')
let OndaTrueno = new Ataque('Onda Trueno', 'btn-onda-trueno', 'fisico', 25, './img/onda trueno.png')
let TormentaFloral = new Ataque('Tormenta Floral', 'btn-tormenta-floral', 'especial', 20, './img/bomba-floral.png')
let BombaLodo = new Ataque('Bomba Lodo', 'btn-bomba-lodo', 'especial', 20, './img/bomba-lodo.png')
let Gigadreno = new Ataque('Gigadreno', 'btn-gigadreno', 'fisico', 25, './img/gigadreno.png')
let TajoUmbrio = new Ataque('Tajo Umbrio', 'btn-tajo-umbrio', 'especial', 20, './img/tajo-umbio.png')
let GarrasFuriosas = new Ataque('Garras Furiosas', 'btn-garras-furiosas', 'especial', 20, './img/garras-furiosas.png')
let Cosquillas = new Ataque('Cosquillas', 'btn-cosquillas', 'fisico', 25, './img/cosquilla.png')

ataquesPikachu.push(Rayo, Impactrueno, OndaTrueno)
ataquesVenusaur.push(BombaLodo, TormentaFloral, Gigadreno)
ataquesMeowth.push(TajoUmbrio, GarrasFuriosas, Cosquillas)

class Pokemon {
    constructor(nombre, imagen, vida, potencia, defensa, ataques) {
        this.nombre = nombre
        this.imagen = imagen
        this.vida = vida
        this.potencia = potencia
        this.defensa = defensa
        this.ataques = ataques
    }
}

let Pikachu = new Pokemon('Pikachu', './img/pikachu.png', 200, 50, 45, ataquesPikachu)
let Venusaur = new Pokemon('Venusaur', './img/venusaur.png', 200, 48, 42, ataquesVenusaur)
let Meowth = new Pokemon('Meowth', './img/meowth.png', 200, 46, 44, ataquesMeowth)

pokemones.push(Pikachu, Venusaur, Meowth)

function iniciarJuego() {

    elegirMascota.style.display = 'none'
    seccionCombate.style.display = 'none'
    seccionMostrarGanador.style.display = 'none'
    btnReiniciar.style.display = 'none'

    camposDeBatalla.forEach((campo) => {
        opcionDeCampo = `
        <input type="radio" id=${campo.id} name="mokepon">
        <label class="tarjeta-campo" for=${campo.id}>
            <p>${campo.nombre}</p>
        </label>
        `
        contenedorCamposBatalla.innerHTML += opcionDeCampo

        arenas = document.getElementById('campo-arenas')
        invierno = document.getElementById('campo-invierno')
        electrico = document.getElementById('campo-electrico')
    })

    seleccionarCampoBatalla.addEventListener('click', campoBatallaSeleccionado)

    btnReiniciar.addEventListener('click', reiniciarJuego)
}

function campoBatallaSeleccionado() {
    if (arenas.checked == true) {
        //campoBatallaElegido(camposDeBatalla[0])
        seccionElegirMascota()
    } else if (invierno.checked == true) {
        //campoBatallaElegido(camposDeBatalla[1])
        seccionElegirMascota()
    } else if (electrico.checked == true) {
        //campoBatallaElegido(camposDeBatalla[2])
        seccionElegirMascota()
    } else {
        alert('Selecciona El Campo De Batalla')
    }
}

// Funcion para modificar el fondo del Body
// Resive como parametro un objeto del array camposDeBatalla
function campoBatallaElegido(campo) {
    document.body.style.backgroundImage = `url(${campo.imagen})`
    document.body.style.backgroundSize = "cover"
    document.body.style.backgroundPosition = "center"
    document.body.style.backgroundRepeat = "no-repeat"
}

function seccionElegirMascota() {
    elegirCampoBatalla.style.display = 'none'
    elegirMascota.style.display = 'flex'

    pokemones.forEach((pokemon) => {
        opcionDePokemones = `
        <input type="radio" id=${pokemon.nombre} name="mokepon">
        <label class="tarjeta-mokepon" for=${pokemon.nombre}>
            <p>${pokemon.nombre}</p>
            <img class="img-mokepon" src=${pokemon.imagen} alt=${pokemon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDePokemones

        pikachu = document.getElementById('Pikachu')
        venusaur = document.getElementById('Venusaur')
        meowth = document.getElementById('Meowth')
    })

    seleccionarMascota.addEventListener('click', mascotaSeleccionada)
}

function mascotaSeleccionada() {
    if (pikachu.checked == true) {
        mascotaJugador.innerHTML = pikachu.id
        mascotaElegida = JSON.parse(JSON.stringify(pokemones[0]))
    } else if (venusaur.checked == true) {
        mascotaJugador.innerHTML = venusaur.id
        mascotaElegida = JSON.parse(JSON.stringify(pokemones[1]))
    } else if (meowth.checked == true) {
        mascotaJugador.innerHTML = meowth.id
        mascotaElegida = JSON.parse(JSON.stringify(pokemones[2]))
    } else {
        alert('Selecciona tu mascota')
    }

    mostrarAtaques(mascotaElegida.ataques)
    elegirMascotaEnemigo()
    mostrarAtributos(mascotaElegida)
}

function mostrarAtributos(mascota) {
    victoriasJugador.innerHTML = mascota.vida
    potenciaJugador.innerHTML = mascota.potencia
    defensaJugador.innerHTML = mascota.defensa
    dibujarMascota(mascotaElegida)
}

function mostrarAtaques(ataquesPokemonJugador) {
    ataquesPokemonJugador.forEach((ataque) => {
        ataquesPokemon = `
        <button class="btn-ataque" id=${ataque.id}>${ataque.nombre}</button>        
        `
        containerAtaquesJugador.innerHTML += ataquesPokemon
        
        botones = document.querySelectorAll('.btn-ataque')
    })
}

function secuenciaAtaques() {
    botones.forEach((boton) => {
        boton.addEventListener(('click'), (e) => {
            if (e.target.textContent === mascotaElegida.ataques[0].nombre) {
                ataqueJugador.textContent = mascotaElegida.ataques[0].nombre
                desactivarBotones(true)
                animacionAtaque(mascotaElegida, mascotaElegida.ataques[0]) 
            } else if (e.target.textContent === mascotaElegida.ataques[1].nombre) {
                ataqueJugador.textContent = mascotaElegida.ataques[1].nombre
                desactivarBotones(true)
                animacionAtaque(mascotaElegida, mascotaElegida.ataques[1])
            } else {
                ataqueJugador.textContent = mascotaElegida.ataques[2].nombre
                desactivarBotones(true)
                animacionAtaque(mascotaElegida, mascotaElegida.ataques[2])
            }
        })
    })
}

function elegirMascotaEnemigo() {
    elegirMascota.style.display = 'none'
    seccionCombate.style.display = 'flex'

    let mascota = random(0, pokemones.length -1)
    mascotaElegidaEnemigo = JSON.parse(JSON.stringify(pokemones[mascota]))
    
    mascotaEnemigo.textContent = mascotaElegidaEnemigo.nombre 
    
    mostrarAtributosEnemigo(mascotaElegidaEnemigo)
    secuenciaAtaques()
}

//Funcion para mostar en etiquetas span de la tarjeta enemigo
//Resive como parametros los valores de los atributos de la mascota enemiga
function mostrarAtributosEnemigo(mascota) {
    victoriasEnemigo.innerHTML = mascota.vida
    potenciaEnemigo.innerHTML = mascota.potencia
    defensaEnemigo.innerHTML = mascota.defensa
    dibujarMascota(mascotaElegidaEnemigo)
}

function dibujarMascota(mascota) {
    if (mascota === mascotaElegida) {
        let imagenJugador = new Image()
        imagenJugador.src = mascota.imagen
        imagenJugador.onload = () => {
            ctx.drawImage(imagenJugador, 10, 120, 40, 40)
        }
    } else if (mascota === mascotaElegidaEnemigo) {
        let imagenEnemigo = new Image()
        imagenEnemigo.src = mascota.imagen
        imagenEnemigo.onload = () => {
            ctx.drawImage(imagenEnemigo, 310, 120, 40, 40)
        }
    }
}

function elegirAtaqueEnemigo() {
    let ataqueAleatorio = random(0, mascotaElegidaEnemigo.ataques.length -1)
    animacionAtaque(mascotaElegidaEnemigo, mascotaElegidaEnemigo.ataques[ataqueAleatorio])
    ataqueEnemigo.textContent = mascotaElegidaEnemigo.ataques[ataqueAleatorio].nombre 
}

function lanzarAtaque(jugador, ataque, enemigo) {
    enemigo.vida -= (jugador.potencia + ataque.daño) - enemigo.defensa
    if (ataque.categoria === "fisico") {
        enemigo.potencia -= 5
        enemigo.defensa -= 4
    }
    if (enemigo === mascotaElegida) {
        mostrarAtributos(mascotaElegida)
    } else if (enemigo === mascotaElegidaEnemigo) {
        mostrarAtributosEnemigo(mascotaElegidaEnemigo) 
    }  
}

function animacionAtaque(mascota, ataque) {
    if (mascota === mascotaElegida) {
        let imagen = new Image()
        imagen.src = ataque.imagen
        let x = 0
        imagen.onload = () => {
            let mover = setInterval(() => {
                ctx2.clearRect(0, 0, ataques.width, ataques.height)
                ctx2.drawImage(imagen, x, 15, 20, 20)
                x += 15

                if (x > ataques.width + 10) {
                    clearInterval(mover)
                }
            }, 50)
            setTimeout(() => {
                lanzarAtaque(mascotaElegida, ataque, mascotaElegidaEnemigo)
                elegirAtaqueEnemigo() 
            }, 1200)       
        }
    } else if (mascota === mascotaElegidaEnemigo) {
        let imagenAtaqueEnemigo = new Image()
        imagenAtaqueEnemigo.src = ataque.imagen
        let i = 240
        imagenAtaqueEnemigo.onload = () => {
            let mover = setInterval(() => {
                ctx2.clearRect(0, 0, ataques.width, ataques.height)
                ctx2.drawImage(imagenAtaqueEnemigo, i, 15, 20, 20)
                i -= 15

                if (i < ataques.width - 650) {
                    clearInterval(mover)
                }
            }, 50)
            setTimeout(() => { 
                desactivarBotones(false)
                lanzarAtaque(mascotaElegidaEnemigo, ataque, mascotaElegida)
                verificarVida()
            }, 1200)
        }
    }
} 

function verificarVida() {
    if (mascotaElegida.vida <= 0) {
        desactivarBotones(true)
        mensajeGanador.textContent = 'Pokemon Enemigo Ha Ganado'
        mostrarGanador(mascotaElegidaEnemigo)
    } else if(mascotaElegidaEnemigo.vida <= 0) {
        desactivarBotones(true)
        mensajeGanador.textContent = 'Pokemon Jugador Ha Ganado'
        mostrarGanador(mascotaElegida)
    } 
}

function desactivarBotones(estado) {
    if(estado === false) {
        botones.forEach((boton) => {
            boton.disabled = false
        })
    } else if (estado === true) {
        botones.forEach((boton) => {
            boton.disabled = true
        })
    }
}

function mostrarGanador(ganador) {
    let imagen = new Image()
    imagen.src = ganador.imagen
    imagen.onload = () => {
        ctx.clearRect(0, 0, batalla.width, batalla.height)
        ctx.drawImage(imagen, 150, 60, 60, 60)
    }
}

function reiniciarJuego() {
    window.location.reload()
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

window.addEventListener('load', iniciarJuego)
