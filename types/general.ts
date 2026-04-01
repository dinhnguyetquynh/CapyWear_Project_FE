export interface ApiRes<T>{
    code : number;
    message : string;
    result :T;
}