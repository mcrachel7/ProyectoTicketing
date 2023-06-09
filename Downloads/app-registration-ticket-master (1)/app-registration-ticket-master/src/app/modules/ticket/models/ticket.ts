export class Ticket {
    _id?: number;
    idUser:string;
    title: string;
    description: string;
    status: string;
    type: string;
    FullName: string;
    department: string;
    createdAt?:string;

    constructor(idUser: string, titulo: string, descripcion: string, estado: string, tipo: string,
      nombre: string, departamento: string, createdAt:string ){
        this.idUser = idUser;
      this.title = titulo;
        this.description = descripcion;
        this.status = estado;
        this.type = tipo;
        this.FullName = nombre;
        this.department = departamento;
        this.createdAt = createdAt;
        }
}
