document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var cep = document.getElementById('cep').value;
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('endereco').textContent = data.logradouro + ', ' + data.localidade + ' - ' + data.uf;
            return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.localidade}&appid=29036b8ae142eb39940f327abc474619`);
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('clima').textContent = 'Temperatura: ' + (data.main.temp - 273.15).toFixed(2) + '°C'; // Convertendo de Kelvin para Celsius
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});
