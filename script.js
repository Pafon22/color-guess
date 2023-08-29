const resetGame = 'reset-game';
const criarElemento = (elemento, pai, id) => {
  const element = document.createElement(elemento);
  if (pai) pai.appendChild(element);
  if (id) element.id = id;
  return element;
};

const criarHeader = () => {
  const headerTag = criarElemento('header', document.body, 'header');
  const h1Tag = criarElemento('h1', headerTag, 'title');
  h1Tag.innerText = 'BEM-VINDO AO COLORPLAY - "SEM RGB, SEM FPS!"';
  h1Tag.style.textAlign = 'center';
  const pTag = criarElemento('p', headerTag, 'rgb-color');
  pTag.style.textAlign = 'center';
  pTag.style.fontSize = '30px';
};

const criarCirculo = () => {
  const circulo = criarElemento('li');
  circulo.classList.add('ball');
  circulo.style.border = '1px solid black';
  circulo.style.width = '70px';
  circulo.style.height = '70px';
  circulo.style.borderRadius = '50%';
  circulo.style.display = 'inline-block';
  circulo.style.margin = '0 0 0 15px';
  return circulo;
};

const estilizarButton = (button) => {
  const buttonTag = button;
  buttonTag.style.height = '60px';
  buttonTag.innerText = 'Reiniciar';
  buttonTag.style.borderRadius = '10%';
  buttonTag.style.fontSize = '30px';
};

const estilizarUl = (ul) => {
  const ulTag = ul;
  ulTag.style.listStyle = 'none';
  ulTag.style.textAlign = 'center';
};

const estilizarP = (p) => {
  const pTag = p;
  pTag.innerText = 'Escolha uma cor';
  pTag.style.fontSize = '30px';
};

const estilizarScore = (p) => {
  const pTag = p;
  pTag.style.color = 'red';
  pTag.style.fontSize = '50px';
  pTag.innerText = '0';
};

const estilizarMain = (ulTag, pTag, buttonTag) => {
  estilizarUl(ulTag);
  estilizarP(pTag);
  estilizarButton(buttonTag);
};

const criarMain = () => {
  const mainTag = criarElemento('main', document.body, 'main');
  const ulTag = criarElemento('ul', mainTag, 'circulos');
  for (let index = 0; index < 6; index += 1) {
    ulTag.appendChild(criarCirculo());
  }
  const pTag = criarElemento('p', ulTag, 'answer');
  const buttonTag = criarElemento('button', ulTag, resetGame);
  const pTagScore = criarElemento('p', ulTag, 'score');
  estilizarMain(ulTag, pTag, buttonTag);
  estilizarScore(pTagScore);
};

const randomNumber = (quantidadeTotal) => Math.floor(Math.random() * quantidadeTotal);

const inserirCoresNosCirculos = (cores) => {
  const circulos = document.getElementsByClassName('ball');
  for (let index = 0; index < circulos.length; index += 1) {
    circulos[index].style.backgroundColor = cores[index];
  }
};
const gerarCores = () => {
  const cores = [];
  let r = 0;
  let g = 0;
  let b = 0;
  const rgbTexto = document.getElementById('rgb-color');
  for (let index = 0; index < 6; index += 1) {
    r = randomNumber(256);
    g = randomNumber(256);
    b = randomNumber(256);
    cores.push(`rgb(${r}, ${g}, ${b})`);
  }
  rgbTexto.innerText = cores[randomNumber(6)];
  inserirCoresNosCirculos(cores);
};

const responder = (event) => {
  const { target } = event;
  const pTagAnswer = document.getElementById('answer');
  const pTagRGB = document.getElementById('rgb-color');
  const pTagScore = document.getElementById('score');
  if (target.id === resetGame) {
    pTagAnswer.innerText = 'Escolha uma cor';
    gerarCores();
    return;
  }
  if (target.style.backgroundColor === pTagRGB.innerText) {
    pTagAnswer.innerText = 'Acertou!';
    pTagScore.innerText = Number(pTagScore.innerText) + 3;
    gerarCores();
  } else {
    pTagAnswer.innerText = 'Errou! Tente novamente!';
    pTagScore.innerText = 0;
  }
};

const paginaCarregada = () => {
  criarHeader();
  criarMain();
  gerarCores();
  const circulos = document.getElementsByClassName('ball');
  for (let index = 0; index < circulos.length; index += 1) {
    circulos[index].addEventListener('click', responder);
  }
  const pTag = document.getElementById('answer');
  pTag.addEventListener('click', responder);
  const buttonTag = document.getElementById(resetGame);
  buttonTag.addEventListener('click', responder);
};

window.addEventListener('load', paginaCarregada);
