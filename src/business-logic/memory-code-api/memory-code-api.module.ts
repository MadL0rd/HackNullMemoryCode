import { Module } from '@nestjs/common'
import { MemoryCodeApiService } from './memory-code-api.service'

@Module({
    providers: [MemoryCodeApiService],
    exports: [MemoryCodeApiService],
})
export class MemoryCodeApiModule {}
