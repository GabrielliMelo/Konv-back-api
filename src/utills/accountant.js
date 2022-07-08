function accountant(valor, opcao) {
    const opcoes = [{
        nota: 2
    }, {
        nota: 5
    }, {
        nota: 10
    }, {
        nota: 20
    }, {
        nota: 50
    }, {
        nota: 100
    }, ]

    switch (opcao) {
        case 2:
            let ordenado2 = opcoes.sort((a, b) => {
                return b.nota - a.nota
            })
            let msg2 = [];
            for (let i = 5; i < ordenado2.length; i++) {
                let cedula = ordenado2[i];
                let qtdCedulas = parseInt(valor / cedula.nota);
                msg2.push(`NOTA: ${qtdCedulas} nota(s) de R$ ${cedula.nota},00`)
                valor = valor % cedula.nota;
            }
            return (msg2 + (valor % 2 === 0 ? " " : (` NOTA: Mude valor do saque - Em Falta R$1,00`)));
        case 3:
            let ordenado3 = opcoes.sort((a, b) => {
                return b.nota - a.nota
            })
            let mag3 = [];
            for (let i = 4; i < ordenado3.length; i++) {
                let cedula = ordenado3[i];
                let qtdCedulas = parseInt(valor / cedula.nota);
                mag3.push(`NOTA:${qtdCedulas} nota(s) de R$ ${cedula.nota},00`)
                valor = valor % cedula.nota;
            }
            return (mag3 + (valor % 2 === 0 ? "" : (` NOTA: Mude valor do saque - Em falta: R$1,00`)));
        case 4:
            let ordenado4 = opcoes.sort((a, b) => {
                return b.nota - a.nota
            })
            let mag4 = [];
            for (let i = 3; i < ordenado4.length; i++) {
                let cedula = ordenado4[i];
                let qtdCedulas = parseInt(valor / cedula.nota);
                mag4.push(`NOTA:${qtdCedulas} nota(s) de R$ ${cedula.nota},00`)
                valor = valor % cedula.nota;
            }
            return (mag4 + (valor % 2 === 0 ? "" : (` NOTA: Mude o valor do saque - Em falta: R$1,00`)));
        case 5:
            let ordenado5 = opcoes.sort((a, b) => {
                return b.nota - a.nota
            })
            let msg5 = [];
            for (let i = 2; i < ordenado5.length; i++) {
                let cedula = ordenado5[i];
                let qtdCedulas = parseInt(valor / cedula.nota);
                msg5.push(`NOTA:${qtdCedulas} nota(s) de R$ ${cedula.nota},00`)
                valor = valor % cedula.nota;
            }
            return (msg5 + (valor % 2 === 0 ? "" : (` NOTA: Mude o valor do saque - Em falta: R$1,00`)));
        case 6:
            let ordenado6 = opcoes.sort((a, b) => {
                return b.nota - a.nota
            })
            let msg6 = [];
            for (let i = 1; i < ordenado6.length; i++) {
                let cedula = ordenado6[i];
                let qtdCedulas = parseInt(valor / cedula.nota);
                msg6.push(`NOTA:${qtdCedulas} nota(s) de R$ ${cedula.nota},00`)
                valor = valor % cedula.nota;
            }
            return (msg6 + (valor % 2 === 0 ? "" : (` NOTA: Mude o valor do saque - Em falta: R$1,00 `)));
        case 7:
            let ordenado = opcoes.sort((a, b) => {
                return b.nota - a.nota
            })
            let msg7 = [];
            for (let i = 0; i < ordenado.length; i++) {
                let cedula = ordenado[i];
                let qtdCedulas = parseInt(valor / cedula.nota);
                msg7.push(`NOTA:${qtdCedulas} nota(s) de R$ ${cedula.nota},00`)
                valor = valor % cedula.nota;
            }
            return (msg7  + (valor % 2 === 0 ? "" : (` NOTA: Mude o valor do saque - Em falta: R$1,00 `)));
        default:
            break;
    }
}

module.exports = accountant;