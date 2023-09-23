import Target from '#/target/target'
import Message from '#core/message'
import * as files from '#files'
import std from '#std'

export type FileTargetOptions = {
    file: string
}

export class FileTarget extends Target {
    options: FileTargetOptions

    constructor(options: FileTargetOptions) {
        super()
        this.options = options
    }

    async start() {
        std.log('starting file target')
        this.setReady()
        std.log('file target started')
    }

    async stop() {
        std.log('stopping file target')
        std.log('file target stopped')
    }

    async send(message: Message) {
        std.log('file target sending', {message})
        message.clean()
        await files.appendFile(this.options.file, message.toString() + '\n')
        std.log('file target sent')
    }
}
