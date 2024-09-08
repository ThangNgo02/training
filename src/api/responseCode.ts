import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { type IDataResponse, type State } from './api.interface';
// eslint-disable-next-line @typescript-eslint/naming-convention
const REQUEST = {
  REQUEST_200: '200',
};
// eslint-disable-next-line @typescript-eslint/naming-convention
const REQUEST_PARSE = {
  [REQUEST.REQUEST_200]: 'handleRequestSuccess',
};

class ResponseCode {
  static get REQUEST() {
    return REQUEST;
  }

  static get REQUEST_PARSE() {
    return REQUEST_PARSE;
  }

  static find(response: IDataResponse, state: State) {
    try {
      LoggerService.debug('ResponseCode execute find receive response', response);
      LoggerService.debug('ResponseCode execute find receive state', state);
      LoggerService.debug('ResponseCode execute find receive funcName', state);
      const code = { ...REQUEST_PARSE };
      const funcName = code[response.code];
      if (Helper.isEmpty(funcName)) {
        throw new Error(`ResponseCode code ${response.code} with funcName not defined`);
      }
      const stateFunc: any = Helper.isEmpty(state) ? '' : state[funcName];
      if (Helper.isEmpty(stateFunc)) {
        throw new Error(`ResponseCode code ${response.code} key of funcRequest not defined`);
      }
      stateFunc(response.data);
    } catch (error: any) {
      LoggerService.error('ResponseCode execute find receive error', error.toString());
      throw error;
    }
  }
}

export default ResponseCode;
