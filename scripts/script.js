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

    // if (switchToggle.checked) {
    //   alterarCorVariavelCss("--color-primary", "#030303");
    //   alterarCorVariavelCss("--color-secondary", "#fafaff");
    //   alterarCorVariavelCss("--color-tertiary", "#fafaff");
    //   alterarCorVariavelCss("--color-alternativ", "#363c41");
    // } else {
    //   document.body.style.setProperty("--color-primary", "#fffafa");
    //   document.body.style.setProperty("--color-secondary", "#030303");
    //   document.body.style.setProperty("--color-tertiary", "#030303");
    //   document.body.style.setProperty("--color-alternativ", "#b9babb");
    // }

    // if (switchToggle.checked) {
    //   console.log(colorDarkMode);
    //   document.body.style.setProperty("--color-primary", colorDarkMode);
    // } else {
    //   console.log(colorDarkMode);
    //   document.body.style.setProperty("--color-secondary", colorDarkMode);
    // }
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
