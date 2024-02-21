export interface IAddContato {
    nome: string;
    email: string;
}
export interface IUpdContato {
    id: string;
    nome: string;
    email: string;
}
export interface IViewContato {
    id: string;
    nome: string;
    email: string;
    dataCadastro: string;
}
export interface ISearchContato {
    nome: string;
    email: string;
    dataCadastroInicio: string;
    dataCadastroFim: string;
}