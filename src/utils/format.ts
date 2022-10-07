import dayjs from 'dayjs'
// 格式化热度
export function formatCount(count = 0):string {
    if (count < 0) {
        return `${0}`
    } 
    if (count < 100000) {
        return `${count}`
    } 
    if (count < 100000000) {
        return `${Math.floor(count / 10000)}万`
    }
    return `${Math.floor(count / 100000000)}亿`
}

/* 解析艺人名称 */
export function fommatArtist(artist: any): string {
   return artist?.map((item:any) => item.name).join(' / ')
}

export function formatTimer(time?:number): string {
  time = time ?? 0
  return `${dayjs.unix(time).format('mm:ss')}`
}

/* 解析歌词 */
type LyricLine = [number, string]

const formatLyricTime = (time: string): number => {
  const pattern = /(\d{2}):(\d{2}.\d{2,3})/
  const matchResult = time.match(pattern)

  if (matchResult) {
    const [, minute, second] = matchResult
    return Number(minute) * 60 + Number(second)
  }

  return 0
}

export const formatLyric = (lyric = '') => {
  const result: LyricLine[] = []
  const pattern = /(\[\d{2}:\d{2}.\d{2,3}\])(.*\s*)/g
  const matchResult = lyric.match(pattern)

  if (matchResult) {
    matchResult.forEach((str) => {
      const timeStr = str.match(/\[\d{2}:\d{2}.\d{2,3}\]/) as RegExpMatchArray
      const content = str.replace(timeStr[0], '')

      result.push([formatLyricTime(timeStr[0]), content])
    })
  }

  return result
}
