export type MemoryCodePage = {
    id?: number
    name?: string
    surname?: string
    patronym?: null
    birthday_at?: Date
    died_at?: Date
    epitaph?: string
    author_epitaph?: string
    video_links?: any[]
    external_links?: null
    published_page?: boolean
    accessible_by_password?: boolean
    access_password?: null
    user_id?: number
    master_id?: number
    page_type_id?: number
    created_at?: Date
    updated_at?: Date
    deleted_at?: null
    slug?: number
    burial_id?: null
    price?: number
    commission?: string
    video_images?: any[]
    payment_id?: null
    blank_id?: null
    is_blank?: boolean
    is_vip?: boolean
    views?: number
    visitors?: number
    lead_id?: number
    index_page?: boolean
    filled_fields?: string[]
    position?: null
    is_referral?: boolean
    banner_enabled?: boolean
    locale?: string
    was_indexed?: boolean
    qr_hidden?: boolean
    historical_status_id?: number
    count_filled_fields?: number
    parent_tree_id?: null
    custom_birthday_at?: null
    custom_died_at?: null
    pages?: any[]
    photos?: any[]
    audio_records?: any[]
    video_records?: any[]
    video_previews?: any[]
    itemComments?: ItemComment[]
    main_image?: string
    start?: End
    end?: End
    lastName?: string
    firstName?: string
    link?: string
    free_access?: boolean
    full_name?: string
    burial_place?: boolean
    page_type_name?: string
    count_fields?: number
    burial?: null
    media?: Media[]
    child_pages?: any[]
    comments_public?: any[]
    comments_not_public?: any[]
    place?: Place
    biographies?: Biography[]
    page_information?: PageInformation[]
    memorials?: any[]
}

export type Biography = {
    id?: number
    title?: null
    description?: null
    page_id?: number
    created_at?: Date
    updated_at?: Date
    order?: number
    checked?: boolean
    photos?: any[]
    media?: any[]
}

export type End = {
    day?: string
    month?: string
    year?: number
}

export type ItemComment = {
    title?: string
    comments?: any[]
}

export type Media = {
    id?: number
    model_type?: string
    model_id?: number
    uuid?: string
    collection_name?: string
    name?: string
    file_name?: string
    mime_type?: string
    disk?: string
    conversions_disk?: string
    size?: number
    manipulations?: any[]
    custom_properties?: any[]
    responsive_images?: any[]
    order_column?: number
    created_at?: Date
    updated_at?: Date
}

export type PageInformation = {
    id?: number
    page_id?: number
    title?: string
    is_system?: boolean
    description?: null | string
    created_at?: Date
    updated_at?: Date
}

export type Place = {
    id?: number
    cemetery_id?: null
    details?: null
    how_get?: null
    latitude?: null
    longitude?: null
    page_id?: number
}
