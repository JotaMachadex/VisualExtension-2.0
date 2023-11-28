// Adicionando funcionalidades do código compartilhado
function adicionarMenuSuspenso() {
  var select = document.createElement('select');
  select.id = 'tipoDaltonismoDropdown';
  select.innerHTML = '<option value="normal">Normal</option>' +
    '<option value="protanopia">Protanopia</option>' +
    '<option value="deuteranopia">Deuteranopia</option>' +
    '<option value="tritanopia">Tritanopia</option>';

  select.addEventListener('change', function () {
    var selectedValue = this.value;
    aplicarFiltro(selectedValue);
  });

  var label = document.createElement('label');
  label.for = 'tipoDaltonismoDropdown';
  label.innerText = 'Escolha o tipo de daltonismo:';

  // Adiciona o menu suspenso e a label à página
  document.body.insertBefore(label, document.body.firstChild);
  document.body.insertBefore(select, document.body.firstChild);
}

// Chama a função para adicionar o menu suspenso
adicionarMenuSuspenso();

// Seu código atual

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'aplicarFiltro') {
    var tipoDaltonismo = message.tipoDaltonismo;
    aplicarFiltro(tipoDaltonismo);
    sendResponse({ status: 'Filtro aplicado com sucesso.' });
  }
});

function aplicarFiltro(tipoDaltonismo) {
  var corretorDaltonismo = obterCorretorDaltonismo(tipoDaltonismo);

  // Aplica o filtro de cor visualmente a todos os elementos da página
  var elementos = document.querySelectorAll('*');
  elementos.forEach(function (elemento) {
    corrigirCoresElemento(elemento, corretorDaltonismo);
  });

  console.log('Aplicando filtro de cor para ' + tipoDaltonismo);
}

function obterCorretorDaltonismo(tipoDaltonismo) {
  switch (tipoDaltonismo) {
    case 'protanopia':
      return function (cor) {
        // Simulação de Protanopia
        var r = parseInt(cor.substring(1, 3), 16);
        var g = parseInt(cor.substring(3, 5), 16);
        var b = parseInt(cor.substring(5, 7), 16);
        var novoR = 0.567 * r + 0.433 * g + 0;
        var novoG = 0.558 * r + 0.442 * g + 0;
        var novoB = 0;
        return '#' + Math.round(novoR).toString(16).padStart(2, '0') +
          Math.round(novoG).toString(16).padStart(2, '0') +
          Math.round(novoB).toString(16).padStart(2, '0');
      };
    case 'deuteranopia':
      return function (cor) {
        // Simulação de Deuteranopia
        var r = parseInt(cor.substring(1, 3), 16);
        var g = parseInt(cor.substring(3, 5), 16);
        var b = parseInt(cor.substring(5, 7), 16);
        var novoR = 0.625 * r + 0.375 * g + 0;
        var novoG = 0.7 * r + 0.3 * g + 0;
        var novoB = 0;
        return '#' + Math.round(novoR).toString(16).padStart(2, '0') +
          Math.round(novoG).toString(16).padStart(2, '0') +
          Math.round(novoB).toString(16).padStart(2, '0');
      };
    case 'tritanopia':
      return function (cor) {
        // Simulação de Tritanopia
        var r = parseInt(cor.substring(1, 3), 16);
        var g = parseInt(cor.substring(3, 5), 16);
        var b = parseInt(cor.substring(5, 7), 16);
        var novoR = 0.95 * r + 0.05 * g + 0;
        var novoG = 0;
        var novoB = 0.433 * r + 0.567 * g + 0;
        return '#' + Math.round(novoR).toString(16).padStart(2, '0') +
          Math.round(novoG).toString(16).padStart(2, '0') +
          Math.round(novoB).toString(16).padStart(2, '0');
      };
    default:
      return function (cor) {
        return cor;
      };
  }
}

function corrigirCoresElemento(elemento, corretorDaltonismo) {
  var corAtual = getComputedStyle(elemento).color;
  var corFundoAtual = getComputedStyle(elemento).backgroundColor;

  var corCorrigida = corretorDaltonismo(corAtual);
  var corFundoCorrigida = corretorDaltonismo(corFundoAtual);

  elemento.style.color = corCorrigida;
  elemento.style.backgroundColor = corFundoCorrigida;
}
