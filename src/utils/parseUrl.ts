import { musicUrl } from '~/constants/url'

// eslint-disable-next-line import/prefer-default-export
export function parseMusicUrl(id:number):string {
    return `${musicUrl}${id}.mp3`
}
