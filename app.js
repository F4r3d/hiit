
const movimentos = [
"gif/marcha.gif",
"gif/agachamento.gif",
"gif/escalador.gif",
"gif/polichinelo.gif"
];

const titulo = [
"Marcha",
"Agachamento",
"Escalador",
"Polichinelo"
];

const ativos = [
"Preparar Marcha",
"Preparar Agachamento",
"Preparar Escalador",
"Preparar Polichinelo"
];

const descansos = [
"Recupere o fôlego pelo nariz...",
"Não pare de vez, caminhe no lugar...",
"Solte os ombros e os braços...",
"Um gole pequeno de água agora...",   
];

const descanso = "gif/descanso.gif"

let iMovimento = 0;

const alerta = document.getElementById('alerta');

const botao = document.getElementById('btnIniciar');
const parar = document.getElementById('btnParar');
const display = document.getElementById('display');
const tabata = document.getElementById('tabata');

const displayT = document.getElementById('displayT');

let tTotal = 12 * 60;
let tTotalT = tTotal;
let tAtivo = 20;
let tDescanso = 40;
let timer;

let sRestantes = 15;
let gap = sRestantes;
let modo = "PREPARAR";

displayT.innerText = formatarTempo(tTotal)

botao.addEventListener('click', iniciarTemporizador);

parar.addEventListener('click', () => {
    clearInterval(timer); //
    sRestantes = 15;
    modo = "PREPARAR";
    display.innerText = "00:15";

    alerta.innerText = "Iniciar"
    
    document.querySelectorAll('.tabata').forEach(el => el.classList.add('none'));
    document.getElementById("tabata").classList.remove("none");
    iMovimento = 0

    botao.disabled = false;
    console.log("Treino interrompido e resetado.");
});


function iniciarTemporizador() {

alerta.innerText = ativos[0];
botao.disabled = true;


    timer = setInterval(() => {
    sRestantes--;


    display.innerText = formatarTempo(sRestantes);
    // displayT.innerText = formatarTempo(tTotal);

    if (modo === "ATIVO" || modo === "DESCANSO") {
    tTotal--;
    displayT.innerText = formatarTempo(tTotal);
    }
        
    if (tTotal <= 0) {
        clearInterval(timer);
        console.log("Temporizador Geral Finalizado!");
        alerta.innerText = "Iniciar"
        
        document.getElementById("descanso").classList.add("none");
        document.getElementById("tabata" + iMovimento).classList.add("none");
        document.getElementById("tabata").classList.remove("none");

        displayT.innerText = formatarTempo(tTotalT);
        botao.disabled = false;
        return;
    }

    if (sRestantes <= 0) {

        if (modo === "PREPARAR") {
            modo = "ATIVO";
            sRestantes = tAtivo;
            alerta.innerText = titulo[0]

            document.getElementById("tabata").classList.add("none");
            document.getElementById("tabata" + iMovimento).classList.remove("none");

            document.getElementById("display").innerText = "00:20";
        }
        else if (modo === "ATIVO") {
            display.classList.remove("cor");
            modo = "DESCANSO";
            sRestantes = tDescanso;

            document.getElementById("tabata" + iMovimento).classList.add("none");
            document.getElementById("descanso").classList.remove("none");

            iMovimento = (iMovimento + 1) % movimentos.length;

            const iDescansos = Math.floor(Math.random() * descansos.length);
            alerta.innerText = descansos[iDescansos]

            display.innerText = formatarTempo(sRestantes);
        } else {
            display.classList.remove("cor");
            modo = "ATIVO";
            sRestantes = tAtivo;
            
            document.getElementById("descanso").classList.add("none");
            document.getElementById("tabata" + iMovimento).classList.remove("none");
            
            alerta.innerText = titulo[iMovimento]
            display.innerText = formatarTempo(sRestantes);
            
        }
    }

    if (sRestantes <= 5 && modo === "DESCANSO") {
        if (tTotal <= 5) {
            alerta.innerText = "Finalizando...";
        } else {
            alerta.innerText = ativos[iMovimento];
            display.classList.add("cor");
            new Audio('audio/beep.mp3').play();
        }
    }

    if (sRestantes === 3 && modo === "ATIVO") {
        new Audio('audio/pop.mp3').play();
    }

}, 1000);

};

function formatarTempo(segundosTotais) {
    const minutos = Math.floor(segundosTotais / 60);
    
    const segundos = segundosTotais % 60;

    const minFormatado = minutos.toString().padStart(2, '0');
    const segFormatado = segundos.toString().padStart(2, '0');

    return `${minFormatado}:${segFormatado}`;
};
