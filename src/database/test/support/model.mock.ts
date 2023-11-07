export abstract class ModelMock<T>{
    protected entityStubs: T;
    constructor(createEntityData: T) {
        this.contructorSpy(createEntityData)
    }
    contructorSpy(_createEntityData): void { }
    findOne(): { exec: () => T } {
        return {
            exec: (): T => this.entityStubs
        }
    }
    async find(): Promise<T[]> {
        return [this.entityStubs];
    }
    async save(): Promise<T> {
        return this.entityStubs;
    }
    async findOneAndUpdate(): Promise<T> {
        return this.entityStubs;
    }
} 