new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [],     //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },

        empezarPartida: function () {       // PDF
            this.hayUnaPartidaEnJuego = true;
            this.saludMonstruo = 100;
            this.saludJugador = 100;
            this.turnos = [];
        },

        atacar: function () {           // TOCADO
            var danio = this.calcularHeridas(this.rangoAtaque)
            var salud = this.saludMonstruo - danio
            if(salud > 0)
                this.saludMonstruo = salud
            else
                this.saludMonstruo = 0

            if(this.verificarGanador())
                return;

            this.turnoMsj('El jugador golpea al monstrou por ', danio, true)

            this.ataqueDelMonstruo()
        },

        ataqueEspecial: function () {           // TOCADO
            var danio = this.calcularHeridas(this.rangoAtaqueEspecial)
            var salud = this.saludMonstruo - danio
            if(salud > 0)
                this.saludMonstruo = salud
            else
                this.saludMonstruo = 0

            if(this.verificarGanador())
                return;
            console.log("antes turnoMsj")
            this.turnoMsj('El jugador usa ataque especial y lastima al mostruo por ', danio, true)
            
            this.ataqueDelMonstruo()
        },

        curar: function () {
            if( this.saludJugador <= 90)
                this.saludJugador += 10;
            else
                this.saludJugador = 100;
            
            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
        },

        terminarPartida: function () {      // RENDIRSE
            this.hayUnaPartidaEnJuego = false; 
        },

        ataqueDelMonstruo: function () {
            var danio = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
            var salud = this.saludJugador - danio
            console.log("1")
            if(salud > 0)
                this.saludJugador = salud
            else
                this.saludJugador = 0

            this.turnoMsj('El monstruo lastima al jugador en ', danio, false)

            this.verificarGanador()
        },

        calcularHeridas: function (rango) {
            return Math.max(Math.floor(Math.random() * rango[0]) + 1, rango[1]);
        },

        verificarGanador: function () {
            if ( this.saludMonstruo <= 0 ) {
                if(this.confirm('¡Ganaste! ¿Deseas jugar de nuevo?'))
                    this.empezarPartida()
                else
                    this.hayUnaPartidaEnJuego = false
            } else if ( this.saludJugador <= 0 ) {
                if(this.confirm('¡Perdiste x_x ! ¿Deseas intentar de nuevo?'))
                    this.empezarPartida()
                else
                    this.hayUnaPartidaEnJuego = false
                return true;
            }
            return false;
        },

        turnoMsj: function (msj, danio, jugador) {
            console.log("turnoMsj")
            this.turnos.unshift({
                esJugador: jugador,
                text: msj + danio
            })
        },

        cssEvento(turno) {
            //Este return de un objeto es porque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});