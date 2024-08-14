document.addEventListener('DOMContentLoaded', () => {
    const tabela = document.querySelector('#tabela-relatorio tbody');

    // Simulação de dados armazenados
    const registros = JSON.parse(localStorage.getItem('registrosVeiculos')) || [];

    registros.forEach(registro => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${registro.placa}</td>
            <td>${registro.tipoVeiculo}</td>
            <td>${registro.tipoTarifa}</td>
            <td>${registro.dataEntrada}</td>
            <td>${registro.dataSaida || 'Ainda no estacionamento'}</td>
            <td>${registro.observacoes}</td>
        `;
        
        tabela.appendChild(row);
    });
});
