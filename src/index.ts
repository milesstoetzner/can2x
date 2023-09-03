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
        new Option('--source [string]', '')
            .default('can')
            .choices(['can', 'console', 'http', 'mqtt', 'socketio', 'ws'])
    )
    .option('--source-port [string]', '', '3000')
    .option('--source-host [string]', '', 'localhost')
    .option('--source-event [string]', '', 'can2x')
    .option('--source-topic [string]', '', 'can2x')
    .option('--source-name [string]', '', 'can2x')
    .option('--source-id [number]', '')
    .option('--source-data [numbers...]', '')
    .addOption(
        new Option('--target [string]', '')
            .default('console')
            .choices(['can', 'console', 'file', 'http', 'mqtt', 'socketio', 'ws'])
    )
    .option('--target-endpoint [string]', '')
    .option('--target-event [string]', '', 'can2x')
    .option('--target-topic [string]', '', 'can2x')
    .option('--target-name [string]', '', 'can2x')
    .option('--target-file [string]', '')
    .action(
        hae.exit(async options => {
            await actions.startBridge(options)
        })
    )

const vcan = program.command('vcan').description('manages a vcan')

vcan.command('start')
    .description('starts a vcan')
    .option('--name [string]', '', 'can2x')
    .action(
        hae.exit(async options => {
            await actions.startVCAN(options)
        })
    )

vcan.command('stop')
    .description('stops a vcan')
    .option('--name [string]', '', 'can2x')
    .action(
        hae.exit(async options => {
            await actions.stopVCAN(options)
        })
    )

program.parse()
