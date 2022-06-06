import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state () {
    return {
      token: localStorage.authToken || '',
      username: ''
    }
  },
  mutations: {
    auth_success (state, authToken) {
      state.token = authToken
    },
    auth_error (state) {
      state.token = ''
    },
    logout (state) {
      delete localStorage.authToken
      state.token = ''
      state.username = ''
    }
  },
  actions: {
    async login ({ commit }, data) {
      try {
        const response = await axios.post('/api/v1/login', data)

        if (response.data.success) {
          localStorage.authToken = response.data.token
          commit('auth_success', response.data.token)
        } else {
          commit('auth_error')
        }

        return response
      } catch (err) {
        commit('auth_error')
        return err
      }
    },
    async verifyToken ({ commit }) {
      try {
        const response = await axios.post('/api/v1/verifyToken', { token: this.getters.token })

        if (!response.data.success) { commit('auth_error') }

        return response.data.success
      } catch (err) {
        commit('auth_error')
        return false
      }
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    token: state => state.token
  }
})

// export default createStore({
//   state() {
//     return {
//       status: '',
//       token: localStorage.authToken || '',
//       adminToken: localStorage.adminAuthToken || '',
//       user: {}
//     };
//   },
//   mutations: {
//     auth_request(state) {
//       state.status = 'loading';
//     },
//     auth_verify(state) {
//       state.status = 'verify';
//     },
//     auth_success(state/*, user*/, authToken) {
//       state.status = 'success';
//       state.token = authToken;
//       // state.user = user.user;
//     },
//     admin_auth_success(state/*, user*/, adminAuthToken) {
//       state.status = 'success';
//       state.adminToken = adminAuthToken;
//       // state.user = user.user;
//     },
//     auth_error(state) {
//       state.status = 'error';
//     },
//     logout(state) {
//       state.status = '';
//       state.token = '';
//       state.adminToken = '';
//     },
//     logoutAdmin(state) {
//       state.status = '';
//       state.adminToken = '';
//     },
//     updateUserInfo(state, user) {
//       state.user = user.user;
//     }
//   },
//   actions: {
//     async login({ commit }, data) {
//       try {
//         commit('auth_request');
//         const response = await axios.post('auth', data);

//         if (response.data.success) {
//           // console.log(response)
//           // const authToken = response.data.authToken;
//           const authToken = response.data.token;
//           // const user = response.data;
//           localStorage.authToken = authToken;
//           // localStorage.userInfo = JSON.stringify(response.data.user);

//           // axios.defaults.headers.common['Authorization'] = authToken;
//           commit('auth_success'/*, user*/, authToken);
//         } else {
//           commit('auth_error');
//         }

//         return response;
//       } catch (err) {
//         commit('auth_error');
//         delete localStorage.authToken;
//         throw new Error(err);
//       }
//     },

//     async adminlogin({ commit }, data) {
//       try {
//         commit('auth_request');
//         const response = await axios.post('adminauth', data);

//         if (response.data.success) {
//           // console.log(response)
//           // console.log('lorem')
//           // const authToken = response.data.authToken;
//           const authToken = response.data.token;
//           // const user = response.data;
//           localStorage.adminAuthToken = authToken;
//           // localStorage.userInfo = JSON.stringify(response.data.user);

//           // axios.defaults.headers.common['Authorization'] = authToken;
//           commit('admin_auth_success'/*, user*/, authToken);
//         } else {
//           commit('auth_error');
//         }

//         return response;
//       } catch (err) {
//         commit('auth_error');
//         delete localStorage.adminAuthToken;
//         throw new Error(err);
//       }
//     },

//     async register({ commit }, data) {
//       try {
//         commit('auth_verify');
//         return await axios.post('reg', data);
//       } catch (err) {
//         commit('auth_error');
//         delete localStorage.authToken;
//         throw new Error(err);
//       }
//     },

//     async restorePassword({ commit }, data) {
//       try {
//         commit('auth_verify');
//         return await axios.post('restore', data);
//       } catch (err) {
//         commit('auth_error');
//         delete localStorage.authToken;
//         throw new Error(err);
//       }
//     },

//     async verify({ commit }, data) {
//       try {
//         commit('auth_verify');
//         const response = await axios.post('verify', data);

//         if (response.data.success) {
//           const authToken = response.data.authToken;
//           const user = response.data;
//           localStorage.authToken = authToken;
//           localStorage.userInfo = JSON.stringify(response.data.user);

//           user.user.password = response.data.password;

//           axios.defaults.headers.common['Authorization'] = authToken;
//           commit('auth_success', user);
//         }

//         return response;
//       } catch (err) {
//         commit('auth_error');
//         delete localStorage.authToken;
//         throw new Error(err);
//       }
//     },

//     logout({ commit }) {
//       commit('logout');
//       delete localStorage.authToken;
//       delete localStorage.userInfo;
//       delete axios.defaults.headers.common['Authorization'];
//     },

//     logoutAdmin({ commit }) {
//       commit('logoutAdmin');
//       delete localStorage.adminAuthToken;
//       delete axios.defaults.headers.common['Authorization'];
//     },

//     updateUserInfo({ commit }) {
//       return new Promise(resolve => {
//         axios.get('user/me').then(resp => {
//           const user = resp.data.user;
//           localStorage.userInfo = JSON.stringify(user);
//           commit('updateUserInfo', user);
//           resolve();
//         });
//       });
//     },

//     async verifyToken(token) {
//       try {

//         const response = await axios.post('verifyAdminToken', token);

//         return response.data.success

//       } catch (err) {
//         delete localStorage.adminAuthToken;
//         return false;
//       }
//     },
//   },
//   getters: {
//     isLoggedIn: state => !!state.token,
//     authStatus: state => state.status,
//     userInfo: state => state.user,
//     isAdminLoggedIn: state => !!state.adminToken
//   }
// });
