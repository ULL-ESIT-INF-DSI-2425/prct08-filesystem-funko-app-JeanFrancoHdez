import { Funko } from "./funko.js";
import * as fs from "fs";
import * as path from "path";

export class FunkoCollection {
  private funkos: Funko[] = [];
  private directory: string = "";

  // Establecer el directorio donde se almacenarán los Funkos
  setDirectory(dir: string): void {
    this.directory = dir;
  }

  // Cargar Funkos desde los archivos JSON en el directorio
  cargarFunkos(callback: (err: NodeJS.ErrnoException | null) => void): void {
    fs.readdir(this.directory, (err, files) => {
      if (err) {
        callback(err);
      } else {
        this.funkos = [];
        let pending = files.length;
        if (pending === 0) {
          callback(null);
          return;
        }
        files.forEach((file) => {
          const filePath = path.join(this.directory, file);
          fs.readFile(filePath, "utf-8", (err, data) => {
            if (!err) {
              try {
                const funko = JSON.parse(data) as Funko;
                this.funkos.push(funko);
              } catch (parseErr) {
                console.error(`Error al parsear el archivo ${file}:`, parseErr.message);
              }
            }
            pending -= 1;
            if (pending === 0) {
              callback(null);
            }
          });
        });
      }
    });
  }

  // Agregar un Funko a la colección y guardarlo en un archivo JSON
  agregarFunko(funko: Funko, callback: (err: NodeJS.ErrnoException | null) => void): void {
    this.funkos.push(funko);
    const filePath = path.join(this.directory, `${funko.id}.json`);
    fs.writeFile(filePath, JSON.stringify(funko, null, 2), (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  // Listar todos los Funkos de la colección
  listarFunkos(): void {
    this.funkos.forEach((funko) => {
      console.log(funko);
    });
  }
}