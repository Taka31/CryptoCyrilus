export interface Movment {
	id?:number,
	price : number,
	amount : number,
	date : Date,
	id_user?:string,
	action:string,
	id_crypto?:string,
	isDeleted?:boolean;
}