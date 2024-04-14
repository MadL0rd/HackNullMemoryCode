import { UserHistoryEvent } from '../enums/user-history-event.enum'
import { _AgregationType } from '../enums/agregation-type.enum'

export import AgregationType = _AgregationType.Union

export class CreateStatisticTableDto {
    readonly event: UserHistoryEvent.EventTypeName
    agregationType: AgregationType
    readonly tableTitle: string
}

export type CreateStatisticGroupedByFieldDto<EventTypeName extends UserHistoryEvent.EventTypeName> =
    {
        readonly event: EventTypeName
        agregationType: AgregationType
        readonly groupByField: Exclude<keyof UserHistoryEvent.SomeEventType<EventTypeName>, 'type'>
    }

// export const jopa: CreateStatisticJopaDto<'start'> = {
//     event: 'start',
//     agregationType: AgregationType.uniqueUserActions,
//     groupByField: 'startParam',
// }
