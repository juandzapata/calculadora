'use strict'

// @author Juan David Zapata López
console.log("Calculadora \nBy: Juan David Zapata López")
const objButtons = [
    { class: 'btn-memory mc', value: 'mc'},
    { class: 'btn-memory mr', value: 'mr'},
    { class: 'btn-memory ms', value: 'ms'},
    { class: 'btn-memory mAdd', value: 'm+'},
    { class: 'btn-memory mRest', value: 'm-'},
    { class: 'btn-memory ce', value: 'ce'},
    { class: 'btn-operand', value: '1' },
    { class: 'btn-operand', value: '2' },
    { class: 'btn-operand', value: '3' },
    { class: 'btn-operator add', value: '+' },
    { class: 'btn-operand', value: '4' },
    { class: 'btn-operand', value: '5' },
    { class: 'btn-operand', value: '6' },
    { class: 'btn-operator rest', value: '-' },
    { class: 'btn-operand', value: '7' },
    { class: 'btn-operand', value: '8' },
    { class: 'btn-operand', value: '9' },
    { class: 'btn-operator mult', value: '*' },
    { class: 'btn-operand', value: '0' },
    { class: 'btn-operand point', value: '.' },
    { class: 'btn-clear', value: 'C' },
    { class: 'btn-operator divs', value: '/' },
    { class: 'btn-clean-last', value: '⌫' },
    { class: 'btn-operator open', value: '(' },
    { class: 'btn-operator close', value: ')' },
    { class: 'btn-equals', value: '=' }
]

let number = '' // Puede requerirse como una variable auxiliar para guardar números
let displayData = '' // La expresión aritmética que se irá mostrando 
let error = false // Puede requerirse para controlar estados de error

document.addEventListener('DOMContentLoaded', event => {
    const divButtons = document.querySelector('.buttons')
    const display = document.querySelector('.display')

    objButtons.forEach(objButton => {
        const item = `<button class="${objButton.class}">${objButton.value}</button>`
        divButtons.insertAdjacentHTML('beforeend', item)
    })

    const buttons = document.querySelectorAll('.btn-operand, .btn-operator')

    //Ciclo para tomar el dato por medio de un "listener" del evento 'click'
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            const item = event.target.innerText;
            displayData += item
            display.value = displayData
        })
    });

    // Variables que determinan los operadores 
    const openP = document.querySelector('.open')
    const closeP = document.querySelector('.close')

    const add = document.querySelector('.add')
    const rest = document.querySelector('.rest')
    const mult = document.querySelector('.mult')
    const divs = document.querySelector('.divs')

    const point = document.querySelector('.point')

    let memory = null


    //Validaciones
    buttons.forEach(buttons => {
        buttons.addEventListener('click', event => {

            const item = event.target.innerText

            // - Valicadiones para no poder abrir parentesis sin operandos (01) -
            if ("0123456789.".includes(item)) {
                openP.disabled = true
            }

            if ("+-/*".includes(item)) {
                openP.disabled = false
            }

            // - Validaciones impedir el cierre de parentesis después de un operando (02) -
            if ("0123456789".includes(item)) {
                closeP.disabled = false
            }

            if ("+-/*.(".includes(item)) {
                closeP.disabled = true
            }

            // - Validación para inabilitar al consecutividad de operandos (03) -
            if ("+-/*.".includes(item)) {
                add.disabled = true
                // rest.disabled = true
                mult.disabled = true
                divs.disabled = true
            }

            if ("0123456789".includes(item)) {
                add.disabled = false
                rest.disabled = false
                mult.disabled = false
                divs.disabled = false
            }

            // - Validacion de no poder colocar 2 puntos en el mismo número (04) -
            if (item == ".") {
                point.disabled = true
            }

            if ("+-/*".includes(item)) {
                point.disabled = false
            }

            display.value = displayData
        })
    })


    //Botón "Equals" para realizar las operaciones
    document.querySelector('.btn-equals').addEventListener('click', event => {
        try {
            // - parseFloat(eval(displayData).toFixed(8)) - "Para limitar los décimales"
            display.value = parseFloat(eval(displayData).toFixed(8))
            displayData = display.value
        } catch (e) {
            display.value = "Error"
            displayData = ""
        }

    })

    //Botón para limpiar la ultima instrucción
    document.querySelector('.btn-clean-last').addEventListener('click', event => {
        displayData = displayData.slice(0, -1)
        display.value = displayData
    })

    //Botón "C" para limpiar el display
    document.querySelector('.btn-clear').addEventListener('click', event => {
        displayData = ""
        display.value = displayData
    })

    //Botón MS almacena en memoria el número mostrado
    document.querySelector('.ms').addEventListener('click', event =>{
        memory = displayData
    })

    // Botón MR recupera el número almacenado en memoria sin borrarlo de ésta
    document.querySelector('.mr').addEventListener('click', event =>{
        displayData = memory
        display.value = displayData
        
    })

    // Botón MC elimina cualquier número almacenado en memoria
    document.querySelector('.mc').addEventListener('click', event =>{
        memory = null
    })
    
    // Botón suma el número mostrado a otro número que se encuentre en memoria
    document.querySelector('.mAdd').addEventListener('click', event =>{
        memory = parseFloat(memory)
        memory += parseFloat(displayData)
    })

    // Botón resta el número mostrado a otro número que se encuentre en memoria
    document.querySelector('.mRest').addEventListener('click', event =>{
        memory = parseFloat(memory)
        memory -= parseFloat(displayData)
    })
})