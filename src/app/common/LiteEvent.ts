// http://stackoverflow.com/questions/12881212/does-typescript-support-events-on-classes#answer-14657922

interface ILiteEventHandler<T> {
    (data?: T): void;
}

interface ILiteEvent<T> {
    on(handler: ILiteEventHandler<T>): void;
    off(handler: ILiteEventHandler<T>): void;
}

class LiteEvent<T> implements ILiteEvent<T> {
    private handlers: ILiteEventHandler<T>[] = [];

    public on(handler: ILiteEventHandler<T>): void {
        this.handlers.push(handler);
    }

    public off(handler: ILiteEventHandler<T>): void {
        this.handlers = this.handlers.filter((h: ILiteEventHandler<T>) => h !== handler);
    }

    public trigger(data?: T): void {
        if (this.handlers) {
            this.handlers.slice(0).forEach((h: ILiteEventHandler<T>) => h(data));
        }
    }

    public clear(): void{
        this.handlers = [];
    }
}

export {LiteEvent, ILiteEvent, ILiteEventHandler}