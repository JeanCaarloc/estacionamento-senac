document.addEventListener('DOMContentLoaded', function() {
    const smallWindow = document.getElementById('small-window');
    const optionButtons = document.querySelectorAll('.option-btn');
    const vehicles = document.querySelectorAll('.vehicle');
    
    vehicles.forEach(vehicle => {
        vehicle.addEventListener('click', function(event) {
            const rect = vehicle.getBoundingClientRect();
            smallWindow.style.top = `${rect.bottom + window.scrollY}px`;
            smallWindow.style.left = `${rect.left + window.scrollX}px`;
            smallWindow.style.display = 'block';
        });
    });

    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedOption = this.getAttribute('data-value');
            console.log(`Opção selecionada: ${selectedOption}`);
            // Aqui você pode armazenar a opção selecionada e redirecionar para outra tela ou atualizar a interface.
            smallWindow.style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (!smallWindow.contains(event.target) && !Array.from(vehicles).includes(event.target)) {
            smallWindow.style.display = 'none';
        }
    });
});
