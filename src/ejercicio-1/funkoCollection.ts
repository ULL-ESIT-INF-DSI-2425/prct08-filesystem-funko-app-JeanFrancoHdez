import { Funko } from './funko.js';
import chalk from 'chalk';

export class FunkoCollection {
  private _funkos: Funko[] = [];

  // Getter para _funkos
  get funkos(): Funko[] {
    return this._funkos;
  }

  // Setter para _funkos
  set funkos(_funkos: Funko[]) {
    this._funkos = _funkos;
  }

  public obtenerFunko(id: number): Funko | undefined {
    return this.funkos.find((funko) => funko.id === id);
  }

  // Añadir un Funko
  public agregarFunko(funko: Funko): void {
    if (this._funkos.some((f) => f.id === funko.id)) {
      console.log(chalk.red("Error: Ya existe un Funko con el mismo ID."));
    } else {
      this._funkos.push(funko);
      console.log(chalk.green("Funko añadido correctamente."));
    }
  }

  // Modificar un Funko
  public modificarFunko(funko: Funko): void {
    const index = this._funkos.findIndex((f) => f.id === funko.id);
    if (index !== -1) {
      this._funkos[index] = funko;
      console.log(chalk.green("Funko modificado correctamente."));
    } else {
      console.log(chalk.red("Error: No existe un Funko con ese ID."));
    }
  }

  // Eliminar un Funko
  public eliminarFunko(id: number): void {
    const index = this._funkos.findIndex((f) => f.id === id);
    if (index !== -1) {
      this._funkos.splice(index, 1);
      console.log(chalk.green("Funko eliminado correctamente."));
    } else {
      console.log(chalk.red("Error: No existe un Funko con ese ID."));
    }
  }

  // Listar _Funkos
  public listarFunkos(): void {
    if (this._funkos.length === 0) {
      console.log(chalk.red("No hay _Funkos en la lista."));
      return;
    }

    this._funkos.forEach((funko) => {
      const color = this.obtenerColorValorMercado(funko.valorMercado);
      console.log(`--------------------------------`)
      console.log(`
        ID: ${funko.id}
        Nombre: ${funko.nombre}
        Descripción: ${funko.descripcion}
        Tipo: ${funko.tipo}
        Género: ${funko.genero}
        Franquicia: ${funko.franquicia}
        Número: ${funko.numero}
        Exclusivo: ${funko.exclusivo ? "Sí" : "No"}
        Características Especiales: ${funko.caracteristicasEspeciales}
        Valor de Mercado: ${color(funko.valorMercado.toString())}
      `);
    });
  }

  // Mostrar información de un Funko
  public mostrarFunko(id: number): void {
    const funko = this._funkos.find((f) => f.id === id);
    if (funko) {
      const color = this.obtenerColorValorMercado(funko.valorMercado);
      console.log(`
        ID: ${funko.id}
        Nombre: ${funko.nombre}
        Descripción: ${funko.descripcion}
        Tipo: ${funko.tipo}
        Género: ${funko.genero}
        Franquicia: ${funko.franquicia}
        Número: ${funko.numero}
        Exclusivo: ${funko.exclusivo ? "Sí" : "No"}
        Características Especiales: ${funko.caracteristicasEspeciales}
        Valor de Mercado: ${color(funko.valorMercado.toString())}
      `);
    } else {
      console.log(chalk.red("Error: No existe un Funko con ese ID."));
    }
  }

  // Obtener color según el valor de mercado
  private obtenerColorValorMercado(valor: number): (text: string) => string {
    if (valor > 100) {
      return chalk.green;
    } else if (valor > 50) {
      return chalk.yellow;
    } else if (valor > 20) {
      return chalk.blue;
    } else {
      return chalk.red;
    }
  }
}