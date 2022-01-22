let seuVotoPara = document.querySelector('.d1-1 span')
let cargo = document.querySelector('.d1-2 span')
let descricao = document.querySelector('.d1-4')
let aviso = document.querySelector('.d2')
let imagens = document.querySelector('.d1--right')
let numeros = document.querySelector('.d1-3')

let etapaAtual = 0
let numero = ''
let branco = false
let nulo = false
let votos = []

function comecar(){
  let etapa = etapas[etapaAtual]
  let numeroHTML = ''
  numero = ''
  branco = false
  nulo = false
  
  for (let i=0; i<etapa.numeros; i++){
    if (i === 0) {
      numeroHTML += '<div class="numero pisca"></div>'
    } else {
      numeroHTML += '<div class="numero"></div>'
    }
  }

  seuVotoPara.style.display = 'none'
  cargo.innerHTML = etapa.titulo
  numeros.innerHTML = numeroHTML
  descricao.innerHTML = ''
  aviso.style.display = 'none'
  imagens.innerHTML = ''
}

function atualizar(){
  let etapa = etapas[etapaAtual]
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero === numero){
      return true
    } else {
      return false
    }
  })
  if (candidato.length > 0) {
    candidato = candidato[0]
    let desc = `
    Nome: ${candidato.nome}<br>
    Partido: ${candidato.partido}`

    let prefeito = `
    <div class="d1--img">
      <img src="src/images/${candidato.fotos[0].url}" alt="${candidato.fotos[0].legenda}">
      ${candidato.fotos[0].legenda}
    </div>`
    
    let vice = ''
    if (candidato.fotos.length > 1){
      vice = `
      <div class="d1--img small">
        <img src="src/images/${candidato.fotos[1].url}" alt="${candidato.fotos[1].legenda}">
        ${candidato.fotos[1].legenda}
      </div>`
    }

    seuVotoPara.style.display = 'block'
    descricao.innerHTML = desc
    aviso.style.display = 'block'
    imagens.innerHTML = `${prefeito}${vice}`
  } else {
    nulo = true
    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block'
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
  }
}

function clicou(n){
  let elNumero = document.querySelector('.numero.pisca')
  if (elNumero !== null){
    elNumero.innerHTML = n
    numero = `${numero}${n}`

    elNumero.classList.remove('pisca')
    let proximo = elNumero.nextElementSibling
    if (proximo !== null){
      proximo.classList.add('pisca')
    } else {
      atualizar()
    }
  }
}

function votoBranco(){
  if (numero === ''){
    branco = true
    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block'
    numeros.innerHTML = ''
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
  }
}

function corrige(){
  comecar()
}

function confirma(){
  let etapa = etapas[etapaAtual]
  let votoConfirmado = false

  if (branco === true){
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: 'branco'
    })
    votoConfirmado = true
  } else if (numero.length === etapa.numeros){
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numero
    })
    votoConfirmado = true
  }

  if (votoConfirmado){
    etapaAtual++
    if(etapas[etapaAtual] !== undefined){
      comecar()
    } else {
      document.querySelector('.tela').innerHTML = '<span class="aviso--gigante">FIM</span>'
      console.log(votos)
    }
  }
}

comecar()