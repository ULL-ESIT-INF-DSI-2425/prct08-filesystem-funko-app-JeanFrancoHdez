import { Tipo, Genero } from "./funko.js";
import { Funko } from "./funko.js";
import { FunkoCollection } from "./funkoCollection.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Instancia de la colección de Funkos
const funkoCollection = new FunkoCollection();

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
      funkoCollection.agregarFunko(nuevoFunko);
    }
  )
  .command(
    "modify",
    "Modificar un Funko existente en la colección",
    {
      id: { type: "number", demandOption: true, describe: "ID del Funko a modificar" },
      name: { type: "string", describe: "Nuevo nombre del Funko" },
      desc: { type: "string", describe: "Nueva descripción del Funko" },
      type: { type: "string", describe: "Nuevo tipo del Funko" },
      genre: { type: "string", describe: "Nuevo género del Funko" },
      franchise: { type: "string", describe: "Nueva franquicia del Funko" },
      number: { type: "number", describe: "Nuevo número del Funko en la franquicia" },
      exclusive: { type: "boolean", describe: "Si el Funko es exclusivo" },
      special: { type: "string", describe: "Nuevas características especiales del Funko" },
      value: { type: "number", describe: "Nuevo valor de mercado del Funko" },
    },
    (argv) => {
      const funkoExistente = funkoCollection.obtenerFunko(argv.id);
      if (funkoExistente) {
        if (argv.name) funkoExistente.nombre = argv.name;
        if (argv.desc) funkoExistente.descripcion = argv.desc;
        if (argv.type) funkoExistente.tipo = argv.type as Tipo;
        if (argv.genre) funkoExistente.genero = argv.genre as Genero;
        if (argv.franchise) funkoExistente.franquicia = argv.franchise;
        if (argv.number) funkoExistente.numero = argv.number;
        if (argv.exclusive !== undefined) funkoExistente.exclusivo = argv.exclusive;
        if (argv.special) funkoExistente.caracteristicasEspeciales = argv.special;
        if (argv.value) funkoExistente.valorMercado = argv.value;
        funkoCollection.modificarFunko(funkoExistente);
      } else {
        console.log("Error: No existe un Funko con ese ID.");
      }
    }
  )
  .command(
    "remove",
    "Eliminar un Funko de la colección",
    {
      id: { type: "number", demandOption: true, describe: "ID del Funko a eliminar" },
    },
    (argv) => {
      funkoCollection.eliminarFunko(argv.id);
    }
  )
  .command(
    "list",
    "Listar todos los Funkos de la colección",
    {},
    () => {
      funkoCollection.listarFunkos();
    }
  )
  .command(
    "show",
    "Mostrar información de un Funko específico",
    {
      id: { type: "number", demandOption: true, describe: "ID del Funko a mostrar" },
    },
    (argv) => {
      funkoCollection.mostrarFunko(argv.id);
    }
  )
  .demandCommand(1, "Debes proporcionar al menos un comando.")
  .help()
  .argv;