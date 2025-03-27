import * as fs from "fs";
import * as path from "path";
import { watch } from "node:fs";

function verificarDirectorio(dir: string, callback: (err: NodeJS.ErrnoException | null) => void): void {
  fs.stat(dir, (err, stats) => {
    if (err) {
      if (err.code === "ENOENT") {
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
}

function watchMonitor(dirObserved: string, dirCopies: string): void {
  verificarDirectorio(dirObserved, (err) => {
    if (err) {
      console.error(`Error al verificar el directorio observado: ${err.message}`);
      return;
    }

    verificarDirectorio(dirCopies, (err) => {
      if (err) {
        console.error(`Error al verificar el directorio de copias: ${err.message}`);
        return;
      }

      console.log(`Monitorizando cambios en: ${dirObserved}`);
      watch(dirObserved, (eventType, filename) => {
        if (filename) {
          const filePath = path.join(dirObserved, filename);

          fs.stat(filePath, (err, stats) => {
            if (err) {
              if (err.code === "ENOENT") {
                console.log(`El archivo ${filename} fue eliminado.`);
              } else {
                console.error(`Error al acceder al archivo ${filename}: ${err.message}`);
              }
              return;
            }

            if (stats.isDirectory()) {
              commit(filePath, dirCopies, (err) => {
                if (err) {
                  console.error(`Error al realizar la copia de seguridad de ${filename}: ${err.message}`);
                }
              });
            }
          });
        } else {
          console.log("No se proporcionó el nombre del archivo.");
        }
      });
    });
  });
}

export const commit = (filePath: string, dirCopies: string, callback: (err: NodeJS.ErrnoException | null) => void): void => {
  const filename = path.basename(filePath);
  const timestamp = Date.now();
  const backupFilename = `${filename}.${timestamp}.bak`;
  const backupPath = path.join(dirCopies, backupFilename);

  fs.copyFile(filePath, backupPath, (err) => {
    if (err) {
      callback(err);
    } else {
      console.log(`Archivo ${filename} respaldado como ${backupFilename}`);
      callback(null);
    }
  });
};

watchMonitor("./observado", "./.versions");