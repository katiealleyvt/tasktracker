export class Task {
constructor(
    public name: string,
    public points: number,
    public status: Status,
    public id: string
){

}
}

export enum Status {
    Daily = "Daily",
    Todo = "Todo",
    Done = "Done"
}