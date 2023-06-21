export interface ITicket {

    _id?: string;       // opcional
    title: string;
    description: string;
    status: string;
    type: string;
    idUser?:string;
    department: string;
    fullName?: string   // opcional
    createdAt: string;    

}
