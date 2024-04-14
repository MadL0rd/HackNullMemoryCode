import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { internalConstants } from 'src/app/app.internal-constants'
import { logger } from 'src/app/app.logger'
import { Publication } from 'src/entities/publication'
import {
    Biography,
    GetAccessTokenResponse,
    MemoryCodePage,
    PageInformation,
} from './models/memory-code-page.type'
import { Survey } from 'src/entities/survey'
import { BotContent } from 'src/entities/bot-content'

@Injectable()
export class MemoryCodeApiService {
    private accessToken?: string

    constructor() {
        this.accessToken = undefined
    }

    async getAccessToken(forceUpdate: boolean = false): Promise<string | undefined> {
        if (!forceUpdate && this.accessToken) return this.accessToken

        const email = internalConstants.memoryCodeEmail
        const password = internalConstants.memoryCodePassword
        const device = internalConstants.memoryCodeDevice

        try {
            const response = await axios.request<GetAccessTokenResponse>({
                url: 'https://mc.dev.rand.agency/api/v1/get-access-token/',
                method: 'POST',
                data: {
                    email: email,
                    password: password,
                    device: device,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            this.accessToken = response.data.access_token
            return response.data.access_token
        } catch (error) {
            logger.error(error)
        }
        return undefined
    }

    async getPageWithId(pageId: number | string = 74862491): Promise<MemoryCodePage | undefined> {
        const accessToken = await this.getAccessToken()
        if (!accessToken) {
            logger.error('MemoryCodeApi: Fail to get acces token')
            return undefined
        }

        try {
            const response = await axios.request<MemoryCodePage>({
                method: 'GET',
                url: `https://mc.dev.rand.agency/api/page/${pageId}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            return response.data
        } catch (error) {
            logger.error(error)
        }
        return undefined
    }

    async updatePageWithPublicationContent(
        publication: Publication.BaseType,
        botContentText: BotContent.UniqueMessage,
        pageId: number | string = 74862491
    ): Promise<boolean> {
        const pageBaseData = await this.getPageWithId(pageId)
        if (!pageBaseData) {
            logger.error('MemoryCodeApi: Fail to get page data')
            return false
        }
        const publicationValuesObject = {} as any
        publication.answers
            .map((answer) => {
                return {
                    id: answer.question.id,
                    value: Survey.Helper.getAnswerStringValue(answer, botContentText),
                }
            })
            .filter((answer) => answer.value)
            .forEach((answer) => (publicationValuesObject[answer.id] = answer.value))

        pageBaseData.name = publicationValuesObject['fullName']
        pageBaseData.birthday_at = publicationValuesObject['birthDay']
        pageBaseData.died_at = publicationValuesObject['deathDay']
        pageBaseData.epitaph = publicationValuesObject['epitaph']
        pageBaseData.author_epitaph = publicationValuesObject['epitaphAuthor']

        // Page information
        const pageInformationList: PageInformation[] = [
            {
                title: 'pageInformation.placeOfBirth',
                description: publicationValuesObject['birthPlace'],
            },
            {
                title: 'pageInformation.placeOfDeath',
                description: publicationValuesObject['deathPlace'],
            },
            {
                title: 'pageInformation.children',
                description: publicationValuesObject['chidren'],
            },
            {
                title: 'pageInformation.citizenship',
                description: publicationValuesObject['citizenship'],
            },
            {
                title: 'pageInformation.education',
                description: publicationValuesObject['education'],
            },
            {
                title: 'pageInformation.occupation',
                description: publicationValuesObject['occupation'],
            },
            {
                title: 'pageInformation.awards',
                description: publicationValuesObject['awards'],
            },
            {
                title: 'pageInformation.husband',
                description: publicationValuesObject['partner'],
            },
        ].filter((info) => info.description)
        pageBaseData.page_information = pageInformationList

        // Biography
        const biographies: Biography[] = [
            {
                order: 1,
                title: publicationValuesObject['titleBio1'],
                description: publicationValuesObject['bio1'],
            },
            {
                order: 2,
                title: publicationValuesObject['titleBio2'],
                description: publicationValuesObject['bio2'],
            },
            {
                order: 3,
                title: publicationValuesObject['titleBio3'],
                description: publicationValuesObject['bio3'],
            },
            {
                order: 4,
                description: publicationValuesObject['bioConclusion'],
            },
        ]
        pageBaseData.biographies = biographies

        pageBaseData.comments_public = [
            {
                fio: 'Друг',
                relation_role: 'Друг',
                text: publicationValuesObject['wordsOfFriends'],
            },
        ]

        const accessToken = await this.getAccessToken()
        if (!accessToken) {
            logger.error('MemoryCodeApi: Fail to get acces token')
            return false
        }

        try {
            const response = await axios.request<MemoryCodePage>({
                method: 'PATCH',
                url: `https://mc.dev.rand.agency/api/page/${pageId}`,
                data: pageBaseData,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            return response.status == 200
        } catch (error) {
            logger.error(error)
        }
        return false
    }
}
