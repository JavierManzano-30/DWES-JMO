const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const base = path.join(__dirname, '..', 'files');
const argv = process.argv.slice(2);
const action = argv[0];
const name = argv[1]; // nombre pasado como: npm run crear:js -- nombre

async function ensureBase() {
    try { await fsp.mkdir(base, { recursive: true }); } catch(e) {}
}

async function crear() {
    await ensureBase();
    console.log('Carpeta "files" creada (si no existía).', base);
}

async function crearJs(n) {
    if (!n) { console.error('Falta nombre. Uso: npm run crear:js -- nombre'); process.exit(1); }
    await ensureBase();
    const filename = n.endsWith('.js') ? n : `${n}.js`;
    const filePath = path.join(base, filename);
    await fsp.writeFile(filePath, `// ${filename} creado por script\n`, { flag: 'wx' }).catch(async err => {
        if (err.code === 'EEXIST') {
            console.error('El fichero ya existe:', filename);
            process.exit(1);
        } else throw err;
    });
    console.log('Fichero creado:', filePath);
}

async function crearCarpeta(n) {
    if (!n) { console.error('Falta nombre. Uso: npm run crear:carpeta -- nombre'); process.exit(1); }
    await ensureBase();
    const dirPath = path.join(base, n);
    await fsp.mkdir(dirPath, { recursive: true });
    console.log('Carpeta creada:', dirPath);
}

async function borrar() {
    // eliminar recursivamente la carpeta files
    try {
        if (fsp.rm) {
            await fsp.rm(base, { recursive: true, force: true });
        } else {
            // fallback para versiones antiguas
            const rimraf = async dir => {
                if (!fs.existsSync(dir)) return;
                const entries = await fsp.readdir(dir, { withFileTypes: true });
                await Promise.all(entries.map(entry => {
                    const p = path.join(dir, entry.name);
                    return entry.isDirectory() ? rimraf(p) : fsp.unlink(p);
                }));
                await fsp.rmdir(dir);
            };
            await rimraf(base);
        }
        console.log('Carpeta "files" borrada completamente.');
    } catch (e) {
        console.error('Error borrando carpeta:', e.message);
        process.exit(1);
    }
}

async function borrarJs() {
    try {
        const exists = fs.existsSync(base);
        if (!exists) { console.log('No existe la carpeta files. Nada que borrar.'); return; }
        const files = await fsp.readdir(base);
        const jsFiles = files.filter(f => f.endsWith('.js'));
        await Promise.all(jsFiles.map(f => fsp.unlink(path.join(base, f))));
        console.log(`Borrados ${jsFiles.length} ficheros .js de ${base}`);
    } catch (e) {
        console.error('Error borrando .js:', e.message);
        process.exit(1);
    }
}

(async () => {
    try {
        switch (action) {
            case 'crear': return await crear();
            case 'crear:js': return await crearJs(name);
            case 'crear:carpeta': return await crearCarpeta(name);
            case 'borrar': return await borrar();
            case 'borrar:js': return await borrarJs();
            default:
                console.log('Acciones disponibles: crear, crear:js, crear:carpeta, borrar, borrar:js');
                console.log('Ejemplo: npm run crear:js -- miArchivo');
        }
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();