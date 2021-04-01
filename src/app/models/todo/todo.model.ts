import { ITodo } from "./itodo.interface";

export class Todo implements ITodo {
  id :number=0;
  titulo:string;
  descripcion: string;
  urgencia: number;
  responsable: string;
  fechaInicio: Date;
  fechaFin: Date;

  constructor(titulo: string, descripcion: string, urgencia: number, responsable: string,fechaInicio :Date,fechaFin :Date
    ) {
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.urgencia = urgencia;
      this.responsable = responsable;
      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;
    }

    completar(): void {

      //this.estado = !this.completada;
    }
}
