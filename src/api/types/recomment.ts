export interface IBanner {
    pic: string;
    exclusive: boolean
    imageUrl: string
    targetId: number
    targetType: number
    titleColor: string
    typeTitle: string
    url: string
}

export interface IRecommendList {
    id: number
    name: string
    copywriter: string
    playCount: number
    picUrl:string
}
