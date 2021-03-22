export abstract class Event {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public abstract exec(data: any): boolean
}
