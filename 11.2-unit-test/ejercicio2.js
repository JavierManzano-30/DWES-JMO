/**
 * Ejercicio 2: Comparación de fechas
 * Función dateCompare para comparar fechas
 */

/**
 * Compara dos fechas y devuelve cuál es anterior y cuál es posterior
 * @param {Date|string} date1 - Primera fecha (Date o string ISO)
 * @param {Date|string} [date2] - Segunda fecha (Date o string ISO). Si no se proporciona, se compara con la fecha actual
 * @returns {{startDate: string, endDate: string}} Objeto con las fechas ordenadas (startDate anterior, endDate posterior)
 */
export function dateCompare(date1, date2) {
    // Validar que date1 existe
    if (!date1) {
        throw new Error('Debe proporcionar al menos una fecha');
    }

    // Convertir fechas a objetos Date
    const date1Obj = date1 instanceof Date ? date1 : new Date(date1);
    const date2Obj = date2 ? (date2 instanceof Date ? date2 : new Date(date2)) : new Date();

    // Validar que las fechas son válidas
    if (isNaN(date1Obj.getTime())) {
        throw new Error('La primera fecha no es válida');
    }

    if (isNaN(date2Obj.getTime())) {
        throw new Error('La segunda fecha no es válida');
    }

    // Comparar fechas
    const startDate = date1Obj <= date2Obj ? date1Obj : date2Obj;
    const endDate = date1Obj > date2Obj ? date1Obj : date2Obj;

    // Retornar en formato ISO string
    return {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
    };
}

/**
 * Obtiene la diferencia en milisegundos entre dos fechas
 * @param {Date|string} date1 - Primera fecha
 * @param {Date|string} [date2] - Segunda fecha (por defecto fecha actual)
 * @returns {number} Diferencia en milisegundos
 */
export function dateDifference(date1, date2) {
    const comparison = dateCompare(date1, date2);
    const start = new Date(comparison.startDate);
    const end = new Date(comparison.endDate);
    return end.getTime() - start.getTime();
}

/**
 * Obtiene la diferencia en días entre dos fechas
 * @param {Date|string} date1 - Primera fecha
 * @param {Date|string} [date2] - Segunda fecha (por defecto fecha actual)
 * @returns {number} Diferencia en días
 */
export function dateDifferenceInDays(date1, date2) {
    const diffMs = dateDifference(date1, date2);
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
