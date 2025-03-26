import chalk from 'chalk';

// Enumerados para Tipo y Género
export enum Tipo {
  Pop = "Pop!",
  PopRides = "Pop! Rides",
  VynilSoda = "Vynil Soda",
  VynilGold = "Vynil Gold",
}

export enum Genero {
  Animacion = "Animación",
  PeliculasTV = "Películas y TV",
  Videojuegos = "Videojuegos",
  Deportes = "Deportes",
  Musica = "Música",
  Anime = "Anime",
}

// Clase Funko
export class Funko {
  constructor(
    private _id: number,
    private _nombre: string,
    private _descripcion: string,
    private _tipo: Tipo,
    private _genero: Genero,
    private _franquicia: string,
    private _numero: number,
    private _exclusivo: boolean,
    private _caracteristicasEspeciales: string,
    private _valorMercado: number
  ) {}

  // Getters y Setters
  get id(): number {
    return this.id;
  }

  set id(id: number) {
    this._id = id;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(nombre: string) {
    this._nombre = nombre;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  set descripcion(descripcion: string) {
    this._descripcion = descripcion;
  }

  get tipo(): Tipo {
    return this._tipo;
  }

  set tipo(tipo: Tipo) {
    this._tipo = tipo;
  }

  get genero(): Genero {
    return this._genero;
  }

  set genero(genero: Genero) {
    this._genero = genero;
  }

  get franquicia(): string {
    return this._franquicia;
  }

  set franquicia(franquicia: string) {
    this._franquicia = franquicia;
  }

  get numero(): number {
    return this._numero;
  }

  set numero(numero: number) {
    this._numero = numero;
  }

  get exclusivo(): boolean {
    return this._exclusivo;
  }

  set exclusivo(exclusivo: boolean) {
    this._exclusivo = exclusivo;
  }

  get caracteristicasEspeciales(): string {
    return this._caracteristicasEspeciales;
  }

  set caracteristicasEspeciales(caracteristicasEspeciales: string) {
    this._caracteristicasEspeciales = caracteristicasEspeciales;
  }

  get valorMercado(): number {
    return this._valorMercado;
  }

  set valorMercado(valorMercado: number) {
    if (valorMercado < 0) {
      console.log(chalk.red(("El valor de mercado debe ser un número positivo.")));
    }
    this._valorMercado = valorMercado;
  }
}