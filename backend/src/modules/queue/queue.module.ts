import {
  ConfigurableModuleClass,
  OPTIONS_TYPE
} from './queue.module-definition'
import { DynamicModule, Module } from '@nestjs/common'

import { BullModule } from '@nestjs/bullmq'

@Module({})
export class QueueModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const bullModules = options.queues.map((name) =>
      BullModule.registerQueue({ name })
    )

    const flowProducers = (options.flows || []).map((flow) =>
      BullModule.registerFlowProducer({
        name: flow
      })
    )

    return {
      ...super.register(options),
      imports: [...bullModules, ...flowProducers],
      exports: [...bullModules, ...flowProducers]
    }
  }
}
