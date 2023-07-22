
function validarCPF(cpf) {
    // Remover qualquer caractere não numérico da entrada
    cpf = cpf.replace(/\D/g, '');
  
    // Verificar se o CPF tem o tamanho correto
    if (cpf.length !== 11) {
      return false;
    }
  
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
  
    // Validar o primeiro dígito
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let primeiroDigito = resto >= 10 ? 0 : resto;
    if (parseInt(cpf.charAt(9)) !== primeiroDigito) {
      return false;
    }
  
    // Validar o segundo dígito
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let segundoDigito = resto >= 10 ? 0 : resto;
    if (parseInt(cpf.charAt(10)) !== segundoDigito) {
      return false;
    }
  
    return true;
  }
  
  module.exports = validarCPF;
  