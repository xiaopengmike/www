const janssenApi = 'http://janssen.ruyi.ai/adapter/janssen';
const ruyiApi = 'http://janssen.ruyi.ai/ruyi-api/v1';
const ruyiOriApi = 'http://api.ruyi.ai//v1';

const dominName = 'http://janssen.ruyi.ai';

const API = {
    recommendByUserLabel: janssenApi + '/v2/recommendByUserLabel',
    hotQuestion: janssenApi + '/v2/hotQuestion',
    message: ruyiOriApi + '/message',
    recommendByQuery: janssenApi + '/v2/recommendByQuery',
}
let userData = {
  app_key: 'eeab85e7-c977-421d-a097-00d25b263bbd',
    user_id:1,
    wwid: ''
}


export default{
    API,
    userData,
    dominName,
}
