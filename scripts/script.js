let textoAreaPrincipal = document.querySelector(
  ".conteudo__texto__principal__area"
);
let textoAreaSecundario = document.querySelector(
  ".conteudo__texto__secundario__area"
);
let imagemAlternativa = document.querySelector(
  ".conteudo__texto__secundario__imagem"
);
let botaoCopiar = document.querySelector(".conteudo__texto__secundario_botao");
textoAreaPrincipal.focus();

// MODAL ATENCAO
let modalAtencao = document.querySelector(".modal");
let modalAtencaoBotaoFechar = document.querySelector(
  ".modal__container__botao__fechar"
);
modalAtencaoBotaoFechar.addEventListener("click", () => {
  modalAtencao.style.display = "none";
});
modalAtencao.addEventListener("click", () => {
  modalAtencao.style.display = "none";
});

textoAreaPrincipal.addEventListener("input", () => {
  let regex = /[A-ZÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕÄËÏÖÜÇáéíóúàèìòùâêîôûãõäëïöüç@#$%^&*()_+]/;
  if (regex.test(textoAreaPrincipal.value)) {
    modalAtencao.style.display = "flex";
    // alert("Por favor, evite letras maiúsculas ou caracteres especiais.");
    textoAreaPrincipal.value = textoAreaPrincipal.value.replace(regex, "");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const switchToggle = document.getElementById("switchToggle");
  // const statusLabel = document.getElementById("status");

  switchToggle.addEventListener("change", function () {
    // statusLabel.innerText = switchToggle.checked ? "ON" : "OFF";
    let colorPrimary = switchToggle.checked ? "#030303" : "#fffafa";
    let colorSecondary = switchToggle.checked ? "#fafaff" : "#030303";
    let colorAlternativ = switchToggle.checked ? "#363c41" : "#b9babb";

    alterarCorVariavelCss("--color-primary", colorPrimary);
    alterarCorVariavelCss("--color-secondary", colorSecondary);
    alterarCorVariavelCss("--color-tertiary", colorSecondary);
    alterarCorVariavelCss("--color-alternativ", colorAlternativ);
  });
});

function alterarCorVariavelCss(variavel, cor) {
  document.body.style.setProperty(`${variavel}`, `${cor}`);
}

function criptografarTexto(texto) {
  const substituicoes = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };

  const textoCriptografado = texto.replace(
    /[eioua]/g,
    (char) => substituicoes[char] || char
  );
  return textoCriptografado;
}

function descriptografarTexto(textoCriptografado) {
  const substituicoesInversas = {
    enter: "e",
    imes: "i",
    ai: "a",
    ober: "o",
    ufat: "u",
  };

  const textoDescriptografado = textoCriptografado.replace(
    /(enter|imes|ai|ober|ufat)/g,
    (chave) => substituicoesInversas[chave] || chave
  );

  return textoDescriptografado;
}

const ocultarElementos = (elem, params) => {
  elem.style.display = params;
};

function processarTexto(operacao) {
  if (textoAreaPrincipal.value === "") {
    ocultarElementos(textoAreaSecundario, "none");
    ocultarElementos(botaoCopiar, "none");
    ocultarElementos(imagemAlternativa, "flex");
    return;
  }

  let textoOriginal = textoAreaPrincipal.value;
  ocultarElementos(imagemAlternativa, "none");
  ocultarElementos(textoAreaSecundario, "block");
  ocultarElementos(botaoCopiar, "flex");

  if (operacao === "criptografar") {
    textoAreaSecundario.value = criptografarTexto(textoOriginal);
  } else if (operacao === "descriptografar") {
    textoAreaSecundario.value = descriptografarTexto(textoOriginal);
  }

  textoAreaPrincipal.value = "";
}

// Exemplo de uso para criptografar
function botaoCriptografar() {
  processarTexto("criptografar");
}

// Exemplo de uso para descriptografar
function botaoDescriptografar() {
  processarTexto("descriptografar");
}

function copiarTexto() {
  textoAreaSecundario.select();
  document.execCommand("copy");
}
