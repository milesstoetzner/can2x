import {Message} from '#core/message'
import {Target} from '#/target/target'
import std from '#std'

export class ConsoleTarget extends Target {
    async send(message: Message) {
        std.log('console target sending', {message})
        std.out(message.id, message.data)
        std.log('console target sent')
    }
}