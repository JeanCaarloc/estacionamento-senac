document.addEventListener('DOMContentLoaded', function() {
    const smallWindow = document.getElementById('small-window');
    const optionButtons = document.querySelectorAll('.option-btn');
    const vehicles = document.querySelectorAll('.vehicle');
    const placaInput = document.getElementById('placa');
    const tarifaInput = document.getElementById('tarifa');
    const observacoesInput = document.getElementById('observacoes');
    const cadastrarButton = document.querySelector('.botao');
    const vagasInput = document.getElementById('vagas');
    const tabelaVeiculos = document.getElementById('tabelaVeiculos').getElementsByTagName('tbody')[0];
    const buscarInput = document.querySelector('.buscar');

    let currentId = 1;
    const maxId = 100;
    let totalVagas = 100;

    const pricing = {
        'carro': { hourly: 20, daily: 50, additional: 5 },
        'moto': { hourly: 10, daily: 35, additional: 5 },
        'van-bau': { hourly: 30, daily: 60, additional: 5 },
        'food-truck': { hourly: 30, daily: 60, additional: 5 }
    };

    vehicles.forEach(vehicle => {
        vehicle.addEventListener('click', function(event) {
            const rect = vehicle.getBoundingClientRect();
            smallWindow.style.top = `${rect.bottom + window.scrollY}px`;
            smallWindow.style.left = `${rect.left + window.scrollX}px`;
            smallWindow.style.display = 'block';
            smallWindow.dataset.vehicleType = vehicle.id;
        });
    });

    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedOption = this.getAttribute('data-value');
            const vehicleType = smallWindow.dataset.vehicleType;
            tarifaInput.value = selectedOption === 'daily' ? pricing[vehicleType].daily : pricing[vehicleType].hourly;
            tarifaInput.dataset.tarifaType = selectedOption;
            tarifaInput.dataset.vehicleType = vehicleType;
            smallWindow.style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (!smallWindow.contains(event.target) && !Array.from(vehicles).includes(event.target)) {
            smallWindow.style.display = 'none';
        }
    });

    cadastrarButton.addEventListener('click', function() {
        const placa = placaInput.value.trim();
        const tarifa = tarifaInput.value.trim();
        const observacoes = observacoesInput.value.trim();

        if (placa.length !== 7) {
            alert('A placa deve conter exatamente 7 caracteres.');
            return;
        }

        if (!placa || !tarifa || !observacoes) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (currentId > maxId) {
            alert('Limite máximo de registros atingido.');
            return;
        }

        const entrada = new Date();
        const entradaFormatada = `${entrada.toLocaleDateString()} ${entrada.toLocaleTimeString()}`;

        const newRow = tabelaVeiculos.insertRow(); // Inserir na parte inferior
        newRow.insertCell(0).innerText = currentId++;
        newRow.insertCell(1).innerText = placa;
        newRow.insertCell(2).innerText = entradaFormatada;
        newRow.insertCell(3).innerText = tarifa;
        newRow.insertCell(4).innerText = observacoes;
        const saidaCell = newRow.insertCell(5);
        const saidaButton = document.createElement('button');
        saidaButton.innerText = 'Sair';
        saidaButton.addEventListener('click', function() {
            registrarSaida(this, tarifaInput.dataset.vehicleType, entrada, tarifa);
        });
        saidaCell.appendChild(saidaButton);

        totalVagas--;
        vagasInput.value = totalVagas;

        placaInput.value = '';
        tarifaInput.value = '';
        observacoesInput.value = '';
    });

    buscarInput.addEventListener('input', function() {
        const filter = buscarInput.value.toUpperCase();
        const rows = tabelaVeiculos.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            const placaCell = rows[i].getElementsByTagName('td')[1];
            if (placaCell) {
                const txtValue = placaCell.textContent || placaCell.innerText;
                rows[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? '' : 'none';
            }
        }
    });

    function registrarSaida(button, vehicleType, entrada, tarifa) {
        const row = button.parentElement.parentElement;
        const saidaDate = new Date();
        const saidaFormatada = `${saidaDate.toLocaleDateString()} ${saidaDate.toLocaleTimeString()}`;
        const entradaDate = new Date(entrada);
        const diffHoras = Math.ceil((saidaDate - entradaDate) / (1000 * 60 * 60));
        let custoFinal = parseInt(tarifa);

        if (tarifaInput.dataset.tarifaType === 'hourly') {
            custoFinal += (diffHoras - 1) * pricing[vehicleType].additional;
        }

        // Criar a janela modal
        const modal = document.createElement('div');
        modal.classList.add('modal');

        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <h2>Informações do Veículo</h2>
                <p>Placa: ${row.cells[1].innerText}</p>
                <p>Entrada: ${row.cells[2].innerText}</p>
                <p>Saída: ${saidaFormatada}</p>
                <p>Custo Final: R$${custoFinal}</p>
                <label for="formaPagamento">Forma de Pagamento:</label>
                <select id="formaPagamento">
                    <option value="Cartão">Cartão</option>
                    <option value="Dinheiro">Dinheiro</option>
                </select>
                <button id="confirmarPagamento">Confirmar</button>
            </div>
        `;

        document.body.appendChild(modal);

        const closeButton = modal.querySelector('.close-button');
        const confirmarPagamentoButton = modal.querySelector('#confirmarPagamento');
        const formaPagamentoSelect = modal.querySelector('#formaPagamento');

        closeButton.addEventListener('click', function() {
            document.body.removeChild(modal);
        });

        confirmarPagamentoButton.addEventListener('click', function() {
            const pagamento = formaPagamentoSelect.value;
            row.cells[5].innerHTML = `${saidaFormatada} (${pagamento})`;
            document.body.removeChild(modal);
            totalVagas++;
            vagasInput.value = totalVagas;
        });

        modal.style.display = 'block';
    }
});
