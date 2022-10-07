export interface IMv {
    id: number
    type: number
    name: string
    artists: Artists[]
    picUrl: string
    duration: number
    playCount: number
    artistId: number
    artistName: string
    copywriter: string
}

interface Artists {
    id: number
    name: string
}
