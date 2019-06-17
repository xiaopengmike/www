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
  // app_key: 'eeab85e7-c977-421d-a097-00d25b263bbd',
  //正式服
  app_key: '19f63523-1ff7-45df-9830-2a62873c8af3',
  //测试服
    user_id:1,
    wwid: ''
}


export default{
    API,
    userData,
    dominName,
}
