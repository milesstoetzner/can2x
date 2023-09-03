import * as actions from '#actions'
import hae from '#utils/hae'
import {Command, Option} from 'commander'

export const program = new Command()

const can2x = program.name('can2x')

const bridge = can2x.command('bridge').description('manages a can2x bridge')

bridge
    .command('start')
    .description('starts a can2x bridge')
    .addOption(
        new Option('--receiver [string]', '')
            .default('can')
            .choices(['can', 'console', 'http', 'mqtt', 'socket-io', 'ws'])
    )
    .option('--receiver-port [string]', '', '3000')
    .option('--receiver-host [string]', '', 'localhost')
    .option('--receiver-event [string]', '', 'can2x')
    .option('--receiver-topic [string]', '', 'can2x')
    .option('--receiver-name [string]', '', 'vcan0')
    .option('--receiver-id [number]', '')
    .option('--receiver-data [numbers...]', '')
    .addOption(
        new Option('--sender [string]', '')
            .default('console')
            .choices(['can', 'console', 'file', 'http', 'mqtt', 'socket-io', 'ws'])
    )
    .option('--sender-endpoint [string]', '')
    .option('--sender-event [string]', '', 'can2x')
    .option('--sender-topic [string]', '', 'can2x')
    .option('--sender-name [string]', '', 'vcan0')
    .option('--sender-file [string]', '')
    .action(
        hae.exit(async options => {
            await actions.createBridge(options)
        })
    )

const vcan = program.command('vcan').description('manages vcan')

vcan.command('start')
    .description('starts a vcan')
    .option('--name', '', 'vcan0')
    .action(
        hae.exit(async options => {
            await actions.startVCAN(options)
        })
    )

vcan.command('stop')
    .description('stops a vcan')
    .option('--name', '', 'vcan0')
    .action(
        hae.exit(async options => {
            await actions.stopVCAN(options)
        })
    )

program.parse()
