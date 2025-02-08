// obtendo os elementos principais do HTML

const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

// criando a funcionalidade que faz com que apenas os caracteres da calculadora possam ser inseridos no input

// criando array de teclas permitidas
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

// selecionando todos os botões da classe e adicionando um evento ao mesmo tempo para todos

document.querySelectorAll('.charKey').forEach(function (charKeyBtn) {
    charKeyBtn.addEventListener('click', function() {
        // constante value será igual ao valor de cada data-value informado no HTML para seu respectivo botão
        // dataset é utilizado para obter os atributos data (não é necessário digitar o data-...)
        const value = charKeyBtn.dataset.value
        // acrescentando no value do input o value criado acima, com o atributo informado em data-value
        input.value += value
    })
})

// criando a funcionalidade do botão Clear

document.getElementById('clear').addEventListener('click', function () {
    input.value = ''
    // focus serve para toda vez que o botão C for pressionado, o cursor fica atomaticamente de volta no input, evitando
    // que seja necessário clicar no input para inserir novos valores
    input.focus()
})

// criando um evento no input quando uma tecla é digitada nele
input.addEventListener('keydown', function (ev) {
    //previnindo comportamento padrão -> para evitar que a tecla seja digitada antes da tratativa da função abaixo
    ev.preventDefault()

    // condicional -> se allowedKey inclui a tecla de fato adicionada ao evento, faça...
    if (allowedKeys.includes(ev.key)) {
        // inclui no valor do input a tecla digitada
        input.value += ev.key
        return
    }
    // condicional -> se a tecla digitada for idêntica ao caractere padrão Backspace, faça...
    if (ev.key === 'Backspace') {
        // inserindo no input o valor como -> o próprio valor do input retirando os valores entre 0 e -1 (apenas o último)
        input.value = input.value.slice(0, -1)
    }
    // condicional -> se a tecla digitada for idêntica ao caractere padrão Enter, faça...
    if (ev.key === 'Enter') {
        // chama a função calculate() *ainda não foi criada
        calculate()
    }
})

// criando um evento para o botão ' = ' | adicionando o evento de chamar a função calculate quando clicar no botão
document.getElementById('equal').addEventListener('click', calculate) // essa chamada não requer os parênteses

// funcao calculate para calcular o resultado da operação matemática
function calculate() {
    resultInput.value = 'ERROR'
    resultInput.classList.add('error')
    // criando uma variável result
    const result = eval(input.value) // eval serve para avaliar o código e tentar fazer o cálculo matemático
    resultInput.value = result
    resultInput.classList.remove('error')
}

// botão para trocar tema

document.getElementById('themeSwitcher').addEventListener('click', function() {
    // na linha 3 adicionamos o main -> dentro dele está contido no HTML (linha 15 no HTML) o data-theme = 'dark'
    // se o tema atual for... -> altere para outro
    if (main.dataset.theme === 'dark') {
        // na linha 4 desse documento pegamos o elemento :root do CSS
        // setando a propriedade como -> (elemento, novo valor)
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#212529')
        root.style
        // verde um pouco mais escuro
        root.style.setProperty('--primary-color','#2471dd')
        // mudando o tema para light para, caso esteja no light, ser trocado para os novos parâmetros abaixo
        main.dataset.theme = 'light'
    }
    else {
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--primary-color','#285999')
        main.dataset.theme = 'dark'
    }
})

// botão de copiar 

document.getElementById('copyToClipboard').addEventListener('click', function (ev) {
    // criando a alteração visual ao clicar no botão copiar
    const button = ev.currentTarget
    // se o texto do botão (que é o evento do botão )
    if (button.innerText === 'Copy') {
        button.innerText = 'Copied'
        button.classList.add('success')
        window.navigator.clipboard.writeText(resultInput.value)
    }
    else {

    }
})