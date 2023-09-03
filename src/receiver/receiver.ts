import {Message} from '#/types'

export type Processor = (message: Message) => Promise<void>

export abstract class Receiver {
    processor?: Processor
    options = {}

    async start() {
        this.resolveReady()
    }

    // TODO: call resolve everywhere
    protected readyPromise = new Promise<void>((resolve, reject) => {
        this.resolveReady = resolve
        this.rejectReady = reject
    })
    protected resolveReady!: (value: void | PromiseLike<void>) => void
    protected rejectReady!: (reason?: any) => void
    async ready() {
        return this.readyPromise
    }

    async stop() {
        // nil
    }

    async receive(processor: Processor) {
        this.processor = processor
    }
}