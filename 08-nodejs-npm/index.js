import { faker } from '@faker-js/faker';
import chalk from 'chalk';

const nombre = faker.person.fullName();
const email = faker.internet.email();
const telefono = faker.phone.number();
const ciudad = faker.location.city();
const empresa = faker.company.name();

console.log(chalk.blue.bold("👋 Datos falsos generados:\n"));
console.log(`${chalk.green.bold("Nombre:")} ${chalk.red(nombre)}`);
console.log(`${chalk.green("Email:")} ${chalk.blue(email)}`);
console.log(`${chalk.green("Teléfono:")} ${chalk.white(telefono)}`);
console.log(`${chalk.green("Ciudad:")} ${chalk.red(ciudad)}`);
console.log(`${chalk.green("Empresa:")} ${chalk.black(empresa)}`);
