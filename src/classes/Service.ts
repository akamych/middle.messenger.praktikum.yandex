import { PropType } from '../utils/types/propType.ts';

export default class Service {
  _createResponse(response: PropType) : PropType {
    const { status, responseText } = response;
    const data = responseText.substring(0, 1) === '{' ? JSON.parse(responseText) : responseText;
    return { status, data };
  }
}
