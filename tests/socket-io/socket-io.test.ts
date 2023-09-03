import {Message} from '#/types'
import * as actions from '#actions'
import * as files from '#files'
import std from '#std'
import * as utils from '#utils'
import {expect} from 'chai'

describe('socket-io', () => {
    it('sender-receiver', async () => {
        const message: Message = {id: 69, data: [1, 2, 3]}
        const output = files.temporary()

        // Start socket-io receiver with file sender
        // TODO: if an error is thrown then the test does not abort ...
        const receiver = await actions.bridge({
            receiver: 'socket-io',
            sender: 'file',
            senderFile: output,
        })

        // Send message using console receiver and socket-io sender
        const sender = await actions.bridge({
            receiver: 'console',
            receiverId: String(message.id),
            receiverData: message.data.map(String),
            sender: 'socket-io',
            senderEndpoint: 'http://localhost:3000',
        })

        std.log('waiting for message being bridged')
        await utils.sleep(25)

        expect(files.loadFile(output).trim()).to.equal(JSON.stringify(message))

        await files.deleteFile(output)
        await sender.stop()
        await receiver.stop()
    })
})
