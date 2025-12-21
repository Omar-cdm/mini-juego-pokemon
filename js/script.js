const elegirCampoBatalla = document.getElementById('elegir-campo-batalla')
const contenedorCamposBatalla = document.getElementById('seleccion-campo-batalla')
const seleccionarCampoBatalla = document.getElementById('seleccionar-campo-batalla')

const elegirMascota = document.querySelector('.elegir-mascota')
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

let campoArenas = new CampoDeBatalla('Campo Arenas', 'campo-arenas', './img/campo_batalla1.webp')
let campoInvierno = new CampoDeBatalla('Campo Invierno', 'campo-invierno', './img/campo_batalla2.webp')
let campoElectrico = new CampoDeBatalla('Campo Electrico', 'campo-electrico', './img/campo_batalla3.webp')

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

let Impactrueno = new Ataque('Impactrueno', 'btn-impactrueno', 'especial', 20, './img/impactrueno.webp')
let Rayo = new Ataque('Rayo', 'btn-rayo', 'especial', 20, './img/rayo.webp')
let OndaTrueno = new Ataque('Onda Trueno', 'btn-onda-trueno', 'fisico', 25, './img/onda trueno.webp')
let TormentaFloral = new Ataque('Tormenta Floral', 'btn-tormenta-floral', 'especial', 20, './img/bomba-floral.webp')
let BombaLodo = new Ataque('Bomba Lodo', 'btn-bomba-lodo', 'especial', 20, './img/bomba-lodo.webp')
let Gigadreno = new Ataque('Gigadreno', 'btn-gigadreno', 'fisico', 25, './img/gigadreno.webp')
let TajoUmbrio = new Ataque('Tajo Umbrio', 'btn-tajo-umbrio', 'especial', 20, './img/tajo-umbio.webp')
let GarrasFuriosas = new Ataque('Garras Furiosas', 'btn-garras-furiosas', 'especial', 20, './img/garras-furiosas.webp')
let Cosquillas = new Ataque('Cosquillas', 'btn-cosquillas', 'fisico', 25, './img/cosquilla.webp')

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

let Pikachu = new Pokemon('Pikachu', './img/pikachu.webp', 200, 50, 45, ataquesPikachu)
let Venusaur = new Pokemon('Venusaur', './img/venusaur.webp', 200, 48, 42, ataquesVenusaur)
let Meowth = new Pokemon('Meowth', './img/meowth.webp', 200, 46, 44, ataquesMeowth)

pokemones.push(Pikachu, Venusaur, Meowth)

function iniciarJuego() {
    elegirCampoBatalla.style.display = 'none'
    seccionCombate.style.display = 'none'
    btnReiniciar.style.display = 'none'

    seccionElegirMascota()

    btnReiniciar.addEventListener('click', reiniciarJuego)
}

function sectionElegirCampo() {
    elegirMascota.style.display = 'none'
    elegirCampoBatalla.style.display = 'flex'

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
}

function campoBatallaSeleccionado() {
    if (arenas.checked == true) {
        campoBatallaElegido(camposDeBatalla[0])
    } else if (invierno.checked == true) {
        campoBatallaElegido(camposDeBatalla[1])
    } else if (electrico.checked == true) {
        campoBatallaElegido(camposDeBatalla[2])
    } else {
        alert('Selecciona El Campo De Batalla')
    }
}

// Funcion para modificar el fondo del Body
// Resive como parametro un objeto del array camposDeBatalla
function campoBatallaElegido(campo) {
    batalla.style.backgroundImage = `url(${campo.imagen})`
    batalla.style.backgroundSize = "cover"

    elegirCampoBatalla.style.display = 'none'
    seccionCombate.style.display = 'flex'
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
        sectionElegirCampo()
    } else if (venusaur.checked == true) {
        mascotaJugador.innerHTML = venusaur.id
        mascotaElegida = JSON.parse(JSON.stringify(pokemones[1]))
        sectionElegirCampo()
    } else if (meowth.checked == true) {
        mascotaJugador.innerHTML = meowth.id
        mascotaElegida = JSON.parse(JSON.stringify(pokemones[2]))
        sectionElegirCampo()
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
            ctx.imageSmoothingEnabled = true
            //high para maxima calidad al renderizar
            ctx.imageSmoothingQuality = 'high'
            ctx.drawImage(imagenJugador, Math.floor(20), Math.floor(120), 50, 50)
        }
    } else if (mascota === mascotaElegidaEnemigo) {
        let imagenEnemigo = new Image()
        imagenEnemigo.src = mascota.imagen
        imagenEnemigo.onload = () => {
            ctx.imageSmoothingEnabled = true
            //high para maxima calidad al renderizar
            ctx.imageSmoothingQuality = 'high'
            ctx.drawImage(imagenEnemigo, Math.floor(290), Math.floor(120), 50, 50)
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
                    lanzarAtaque(mascotaElegida, ataque, mascotaElegidaEnemigo)
                    elegirAtaqueEnemigo() 
                }
            }, 50)     
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

                if (i < ataques.width - 300) {
                    clearInterval(mover)
                    desactivarBotones(false)
                    lanzarAtaque(mascotaElegidaEnemigo, ataque, mascotaElegida)
                    verificarVida()
                }
            }, 50)
        }
    } 
} 

function verificarVida() {
    if (mascotaElegida.vida <= 0 && mascotaElegidaEnemigo.vida > mascotaElegida.vida) {
        containerAtaquesJugador.style.display = 'none'
        btnReiniciar.style.display = 'block'
        desactivarBotones(true)
        mostrarGanador(mascotaElegidaEnemigo)
    } else if(mascotaElegidaEnemigo.vida <= 0 && mascotaElegidaEnemigo.vida < mascotaElegida.vida) {
        containerAtaquesJugador.style.display = 'none'
        btnReiniciar.style.display = 'block'
        desactivarBotones(true)
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
        ctx.drawImage(imagen, 152, 90, 60, 60)
    }
    if (ganador === mascotaElegida) {
        let imagenGanador = new Image()
        imagenGanador.src = "./img/victoria-jugador1.webp"
        imagenGanador.onload = () => {
            ctx.drawImage(imagenGanador, 110, -20, 140, 140)
        }
    } else {
        let imagenGanador = new Image()
        imagenGanador.src = "./img/victoria-enemigo-1.webp"
        imagenGanador.onload = () => {
            ctx.drawImage(imagenGanador, 110, -20, 140, 140)
        }
    }
    
}

function reiniciarJuego() {
    window.location.reload()
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

window.addEventListener('load', iniciarJuego)
