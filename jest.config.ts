import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}

export default config
