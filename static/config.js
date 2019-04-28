const janssenApi = 'http://janssenprod.vinfol.com/adapter/janssen';
const ruyiApi = 'http://janssenprod.vinfol.com/ruyi-api/v1';
const ruyiOriApi = 'http://api.ruyi.ai//v1';

const dominName = 'http://janssenprod.vinfol.com';

const API = {
    recommendByUserLabel: janssenApi + '/v2/recommendByUserLabel',
    hotQuestion: janssenApi + '/v2/hotQuestion',
    message: ruyiOriApi + '/message',
    recommendByQuery: janssenApi + '/v2/recommendByQuery',
}
let userData = {
    app_key: '19f63523-1ff7-45df-9830-2a62873c8af3',
    user_id:1,
    wwid: ''
}


export default{
    API,
    userData,
    dominName,
}
