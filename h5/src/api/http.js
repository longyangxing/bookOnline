import axios from 'axios';

// axios 配置
axios.defaults.timeout = 20000;
axios.defaults.baseURL = '/cmt/app/service/';

export default axios;