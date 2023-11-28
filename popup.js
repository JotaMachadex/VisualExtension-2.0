// popup.js
document.addEventListener('DOMContentLoaded', function () {
    var botaoAplicarFiltro = document.getElementById('aplicarFiltroButton');
  
    if (botaoAplicarFiltro) {
      botaoAplicarFiltro.addEventListener('click', function () {
        var tipoDaltonismo = document.getElementById('tipoDaltonismo').value;
  
        // Envia mensagem para o content.js com o tipo de daltonismo
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'aplicarFiltro', tipoDaltonismo: tipoDaltonismo }, function (response) {
            if (response) {
              console.log(response.status);
            } else {
              console.error("Resposta indefinida ou sem a propriedade 'status'.");
            }
          });
        });
      });
    } else {
      console.error("Elemento com ID 'aplicarFiltroButton' não encontrado no DOM.");
    }
  });
  