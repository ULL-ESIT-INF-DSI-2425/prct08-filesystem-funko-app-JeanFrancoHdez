import { Tipo, Genero } from "./funko.js";
import { Funko } from "./funko.js";
import { FunkoCollection } from "./funkoCollection.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as fs from "fs";
import * as path from "path";

// Función para verificar si un directorio existe
const verificarDirectorio = (dir: string, callback: (err: NodeJS.ErrnoException | null) => void) => {
  fs.stat(dir, (err, stats) => {
    if (err) {
      if (err.code === "ENOENT") {
        // El directorio no existe, crearlo
        fs.mkdir(dir, { recursive: true }, callback);
      } else {
        callback(err);
      }
    } else if (!stats.isDirectory()) {
      callback(new Error(`${dir} no es un directorio válido.`));
    } else {
      callback(null);
    }
  });
};

// Función para obtener la colección de Funkos de un usuario
const obtenerColeccionUsuario = (user: string, callback: (err: NodeJS.ErrnoException | null, collection?: FunkoCollection) => void) => {
  const userDir = path.join(__dirname, "data", user);
  verificarDirectorio(userDir, (err) => {
    if (err) {
      callback(err);
    } else {
      const collection = new FunkoCollection();
      collection.setDirectory(userDir); // Assuming a method like this exists to set the directory
      collection.cargarFunkos((err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, collection);
        }
      });
    }
  });
};

// Comando para añadir un Funko
yargs(hideBin(process.argv))
  .command(
    "add",
    "Añadir un nuevo Funko a la colección",
    {
      user: { type: "string", demandOption: true, describe: "Nombre del usuario" },
      id: { type: "number", demandOption: true, describe: "ID único del Funko" },
      name: { type: "string", demandOption: true, describe: "Nombre del Funko" },
      desc: { type: "string", demandOption: true, describe: "Descripción del Funko" },
      type: { type: "string", demandOption: true, describe: "Tipo del Funko" },
      genre: { type: "string", demandOption: true, describe: "Género del Funko" },
      franchise: { type: "string", demandOption: true, describe: "Franquicia del Funko" },
      number: { type: "number", demandOption: true, describe: "Número del Funko en la franquicia" },
      exclusive: { type: "boolean", demandOption: true, describe: "Si el Funko es exclusivo" },
      special: { type: "string", demandOption: true, describe: "Características especiales del Funko" },
      value: { type: "number", demandOption: true, describe: "Valor de mercado del Funko" },
    },
    (argv) => {
      obtenerColeccionUsuario(argv.user, (err, funkoCollection) => {
        if (err) {
          console.error("Error al obtener la colección del usuario:", err.message);
        } else if (funkoCollection) {
          const nuevoFunko = new Funko(
            argv.id,
            argv.name,
            argv.desc,
            argv.type as Tipo,
            argv.genre as Genero,
            argv.franchise,
            argv.number,
            argv.exclusive,
            argv.special,
            argv.value
          );
          funkoCollection.agregarFunko(nuevoFunko, (err) => {
            if (err) {
              console.error("Error al agregar el Funko:", err.message);
            } else {
              console.log("Funko agregado exitosamente.");
            }
          });
        }
      });
    }
  )
  .command(
    "list",
    "Listar todos los Funkos de la colección",
    {
      user: { type: "string", demandOption: true, describe: "Nombre del usuario" },
    },
    (argv) => {
      obtenerColeccionUsuario(argv.user, (err, funkoCollection) => {
        if (err) {
          console.error("Error al obtener la colección del usuario:", err.message);
        } else if (funkoCollection) {
          funkoCollection.listarFunkos();
        }
      });
    }
  )
  .demandCommand(1, "Debes proporcionar al menos un comando.")
  .help()
  .parse();