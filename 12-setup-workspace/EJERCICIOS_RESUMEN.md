# Resumen de Ejercicios ESLint - Guía de Estilo Airbnb

## ✅ Ejercicio 1: Configurar proyecto con ESLint
**Estado:** Completado

Ya tenías ESLint configurado con:
- `eslint.config.js` con configuración flat config (ESLint 9)
- Scripts en `package.json`: `npm run lint` y `npm run lint:fix`
- Plugin neostandard activo

## ✅ Ejercicio 2: Detectar errores con ESLint
**Estado:** Completado

Se detectaron y corrigieron errores en `index.js`:
- ❌ Uso de `console.log` (prohibido por regla `no-console`)
- ❌ Falta de punto y coma en línea 7
- ❌ Variables con nombres poco descriptivos

## ✅ Ejercicio 3: Ver errores del código problemático
**Estado:** Completado

### Código Original (con errores):
```javascript
const chalk = require('chalk');

var youShouldNeverUseVar = "This is my very long line that eslint should check as an error............................................";

function myFunction(used, nonUsed){
if(used){
console.log(used)
return
}
 }

 module.exports = nonExistingVar;
```

### Errores Detectados (24 problemas):
1. ❌ Variable `chalk` declarada pero nunca usada
2. ❌ Uso de `var` en lugar de `const`/`let`
3. ❌ Variable nunca usada
4. ❌ Uso de comillas dobles en lugar de simples
5. ❌ Línea demasiado larga (>100 caracteres)
6. ❌ Función definida pero nunca usada
7. ❌ Falta espacio antes de paréntesis de función
8. ❌ Parámetro `nonUsed` nunca usado
9. ❌ Indentación incorrecta (0 espacios en lugar de 2)
10. ❌ Falta espacio después de `if`
11. ❌ Uso de `console.log` (no recomendado en producción)
12. ❌ Falta punto y coma
13. ❌ `return` innecesario sin valor
14. ❌ Variable `nonExistingVar` no definida
15. ❌ Líneas en blanco al final del archivo

## ✅ Ejercicio 4: Configurar ESLint con Airbnb y Arreglar Código
**Estado:** Completado

### Configuración Aplicada:
Se agregaron las reglas principales de la guía de Airbnb en `eslint.config.js`:

```javascript
rules: {
  'prefer-template': 'error',
  'no-console': 'warn',
  'semi': ['error', 'always'],
  'quotes': ['error', 'single'],
  'no-var': 'error',
  'prefer-const': 'error',
  'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  'no-undef': 'error',
  'max-len': ['error', { code: 100 }],
  'object-curly-spacing': ['error', 'always'],
  'arrow-spacing': 'error',
  'comma-dangle': ['error', 'always-multiline'],
  'indent': ['error', 2],
  'eol-last': ['error', 'always'],
  'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
}
```

### Código Corregido (exercise3.js):
```javascript
// const chalk = require('chalk'); // Removed: unused variable

// This string is now properly formatted and within line length limits
const properlyNamedVariable = 'This line follows Airbnb style guide';

function myFunction (used, _nonUsed) {
  if (used) {
    // console.log is not recommended in production code
    // console.log(used);
    return `${properlyNamedVariable}: ${used}`;
  }
  return null;
}

// Export the function instead of undefined variable
module.exports = myFunction;
```

### Cambios Aplicados:
✅ Comentado `chalk` (variable no usada)
✅ Cambiado `var` por `const`
✅ Comillas dobles → comillas simples
✅ Línea larga dividida y simplificada
✅ Indentación correcta (2 espacios)
✅ Espacios correctos en estructuras de control
✅ Parámetro no usado prefijado con `_`
✅ Comentado `console.log`
✅ `return` con valor útil
✅ Export de función válida
✅ Sin líneas en blanco innecesarias

## Resultado Final:
✅ Todos los archivos pasan el lint: `npm run lint`
✅ 0 errores, 0 warnings
✅ Código sigue las mejores prácticas de Airbnb

