export class TodoResponse {
  id :number=0;
  titulo:string;
  descripcion: string;
  urgencia: number;
  responsable: string;
  fechaInicio: Date;
  fechaFin: Date;
  updatedAt: string;

constructor(titulo: string, descripcion: string, urgencia: number, responsable: string,fechaInicio :Date,fechaFin :Date
  ,  updatedAt: string) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.urgencia = urgencia;
    this.responsable = responsable;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.updatedAt=updatedAt;
  }
}
