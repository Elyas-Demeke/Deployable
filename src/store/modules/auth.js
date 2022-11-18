import { HTTP }  from '../../plugins/axios'

const state = {
  userInfo : null,
  isLoggedIn: false,
};

const mutations = {
  setUserInfo: (state, userInfo) => state.userInfo = userInfo,
  setIsLoggedIn: (state, isLoggedIn) => state.isLoggedIn = isLoggedIn,
};

const actions = {

  async login({ commit, state }, userInfo) {
    const { data: loginInfo } = await HTTP.post('/user/login', {
      ...userInfo
    }) // returns a promise
    if(loginInfo.success){
      const { data: userInfo } = await HTTP.get('/user/info') // returns a promise
      if(userInfo.success){
        console.log(userInfo);
        commit('setUserInfo', userInfo.user)
        commit('setIsLoggedIn', userInfo.success)
      }
    }
  },

  async signUp({ commit, state }, userInfo) {
    const {data:createData} = await HTTP.post('/user/create', {
        ...userInfo
    }) // returns a promise
    commit('setUserInfo', createData)
    console.log(state.userInfo);
    const {data:getOTP} = await HTTP.post('/user/email/sendcode', {
        email : userInfo.email
      }) // returns a promise
      const res1 = await HTTP.get('/user/info') // returns a promise
    commit('setUserInfo', getOTP)
    
  },

};

const getters = {
  getUserInfo: state => state.userInfo
};


export default {
  state,
  getters,
  actions,
  mutations
};
      let getCookies = function(){
        var pairs = document.cookie.split(";");
        var cookies = {};
        for (var i=0; i<pairs.length; i++){
          var pair = pairs[i].split("=");
          cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
        }
        return cookies;
      }