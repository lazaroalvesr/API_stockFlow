export interface Register {
    nome: string;
    email: string;
    senha: string;
}
export interface Login {
    email: string;
    senha: string;
}
export interface Folder {
    nome: string;
    usuarioId: string;
}
export interface Tarefas {
    nome: string;
    text: string;
    pastaId: string;
}