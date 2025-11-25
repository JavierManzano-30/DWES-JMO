function sumaSync(a, b) {
    return a + b;
}

console.log(sumaSync(1, 5));

function sumaAsync(a, b) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(a, b), 1000);
    });
}

sumaAsync(5, 7).then(resultado => {
    console.log("Asincrona: ", resultado);
});

console.log("Esperando...");