import * as mockTypeormConfig from './test/__mocks__/config/typeorm.config.mock'
jest.mock('@config/typeorm.config', () => mockTypeormConfig)
