/* 播放模式 */
// eslint-disable-next-line no-shadow
export enum MODE {
    PLAY_IN_ORDER = 'PLAY_IN_ORDER',
    SINGLE_CYCLE = 'SINGLE_CYCLE',
    SHUFFLE_PLAYBACK = 'SHUFFLE_PLAYBACK',
}

export const MODE_TYPE = {
    [MODE.PLAY_IN_ORDER]: {
        mode: '顺序播放',
        icon: 'OrderedListOutlined',
    },
    [MODE.SINGLE_CYCLE]: {
        mode: '单曲循环',
        icon: 'RedoOutlined',
    },
    [MODE.SHUFFLE_PLAYBACK]: {
        mode: '随机播放',
        icon: 'RetweetOutlined',
    },
}
