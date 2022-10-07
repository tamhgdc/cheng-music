/* const serverAddr = import.meta.env.MODE === 'development' ? 'localhost' : 'icloudmusic.top' */
const serverAddr = import.meta.env.MODE === 'development' ? '47.115.57.59' : '182.92.81.247/'
const port = import.meta.env.MODE === 'development' ? ':3000' : ''
// eslint-disable-next-line import/prefer-default-export
export const SERVER = `http://${serverAddr}${port}`
