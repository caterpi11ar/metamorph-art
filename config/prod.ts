import type { UserConfigExport } from '@tarojs/cli'

export default {
  env: {
    API_BASE_URL: '"https://api.metamorphart.cn"',
  },
  mini: {},
  h5: {},
} satisfies UserConfigExport<'vite'>
