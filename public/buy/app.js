this.cepInputField = document.getElementById('cep')
this.cepInputField.addEventListener('input', async function() {
  this.value = this.value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})$/, '$1-$2')
  if (this.value.length === 9) {
    this.response = await fetch(`https://viacep.com.br/ws/${this.value.replace(/\D/g, '')}/json/`)
    this.data = await this.response.json()
    document.getElementById('address').value = this.data.logradouro
    document.getElementById('complemento').value = this.data.complemento
    document.getElementById('cidade').value = this.data.localidade
    document.getElementById('bairro').value = this.data.bairro
  }
})
