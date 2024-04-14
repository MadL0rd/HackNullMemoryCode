import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserService } from './user.service'
import { StatisticService } from './statistic.service'
import { UserProfileSchema, userProfileSchema } from './schemas/user.schema'
import {
    UserEventsHistorySchema,
    userEventsHistorySchema,
} from './schemas/user-history-event.schema'
import { BotContentModule } from '../bot-content/bot-content.module'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: UserProfileSchema.name,
                schema: userProfileSchema,
            },
        ]),
        MongooseModule.forFeature([
            {
                name: UserEventsHistorySchema.name,
                schema: userEventsHistorySchema,
            },
        ]),
        BotContentModule,
    ],
    providers: [UserService, StatisticService],
    exports: [UserService, StatisticService],
})
export class UserModule {}
