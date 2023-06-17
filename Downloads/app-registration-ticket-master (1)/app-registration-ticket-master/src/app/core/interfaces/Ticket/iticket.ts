export interface ITicket {

    _id?: string;       // opcional
    title: string;
    description: string;
    status: string;
    type: string;
    department: string;
    fullName?: string   // opcional
    createdAt: string;    

}
