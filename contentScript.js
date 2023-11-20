document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('applyFilter');
    if (button) {
      button.addEventListener('click', function () {
        const daltonismType = document.getElementById('daltonismType').value;
        const filter = getFilterForDaltonismType(daltonismType);
  
        // Adiciona uma classe ao body para representar o tipo de daltonismo
        document.body.classList.add(daltonismType);
  
        // Aplica estilos diretamente ao cabeçalho da página
        const style = document.createElement('style');
        style.textContent = `body.${daltonismType} { filter: ${filter}; }`;
        document.head.appendChild(style);
  
        chrome.runtime.sendMessage({ action: 'applyFilter', filter: filter });
      });
    }
  
    function getFilterForDaltonismType(daltonismType) {
      switch (daltonismType) {
        case 'acromatico':
          return 'grayscale(100%)'; // Exemplo de filtro para acromático
        case 'dicromatico':
          return 'protanopia'; // Exemplo de filtro para dicromático
        case 'tricromatico':
          return 'deuteranopia'; // Substitua isso com o filtro específico para tricromático
        default:
          return ''; // Se nenhum tipo válido for escolhido, não aplicar filtro
      }
    }
  });
  
  
  
  
