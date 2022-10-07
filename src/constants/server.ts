/* const serverAddr = import.meta.env.MODE === 'development' ? 'localhost' : 'icloudmusic.top' */
const serverAddr = import.meta.env.MODE === 'development' ? '47.115.57.59' : 'https://netease-cloud-music-api-nxzt.vercel.app'
const port = import.meta.env.MODE === 'development' ? ':3000' : ''
// eslint-disable-next-line import/prefer-default-export
export const SERVER = `http://${serverAddr}${port}`
