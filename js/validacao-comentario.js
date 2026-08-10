/**
 * Validação em arquivo separado (JavaScript externo).
 * Responsável por: comentário (50–100 caracteres) e nota (0–10 com decimais).
 */

function validarComentario(texto) {
    const valor = String(texto ?? "").trim();

    if (valor === "") {
        return { valido: false, mensagem: "O comentário é obrigatório." };
    }

    if (valor.length < 50) {
        return {
            valido: false,
            mensagem: "O comentário deve ter no mínimo 50 caracteres.",
        };
    }

    if (valor.length > 100) {
        return {
            valido: false,
            mensagem: "O comentário deve ter no máximo 100 caracteres.",
        };
    }

    return { valido: true, mensagem: "" };
}

function validarNota(valorNota) {
    const valor = String(valorNota ?? "").trim();

    if (valor === "") {
        return { valido: false, mensagem: "A nota é obrigatória." };
    }

    // Aceita apenas dígitos e um ponto decimal (ex.: 7, 8.5, 9.1, 10)
    if (!/^\d+(\.\d+)?$/.test(valor)) {
        return {
            valido: false,
            mensagem: "A nota deve conter apenas números e ponto decimal (ex.: 8.5).",
        };
    }

    const numero = Number(valor);

    if (Number.isNaN(numero) || numero < 0 || numero > 10) {
        return {
            valido: false,
            mensagem: "A nota deve estar entre 0 e 10.",
        };
    }

    return { valido: true, mensagem: "" };
}

function atualizarContadorCaracteres(textarea, elementoContador) {
    if (!textarea || !elementoContador) return;

    const quantidade = textarea.value.length;
    elementoContador.textContent = `${quantidade}/100 caracteres (mínimo: 50)`;

    if (quantidade < 50) {
        elementoContador.className = "contador-comentario contador-baixo";
    } else if (quantidade > 100) {
        elementoContador.className = "contador-comentario contador-erro";
    } else {
        elementoContador.className = "contador-comentario contador-ok";
    }
}

function exibirMensagemCampo(elementoMensagem, resultado) {
    if (!elementoMensagem) return;

    elementoMensagem.textContent = resultado.mensagem;
    elementoMensagem.hidden = resultado.valido;
}

function validarCamposExternos(comentario, nota) {
    const resultadoComentario = validarComentario(comentario);
    const resultadoNota = validarNota(nota);

    return {
        comentario: resultadoComentario,
        nota: resultadoNota,
        valido: resultadoComentario.valido && resultadoNota.valido,
    };
}
