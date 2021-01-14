import cookie from '@/lib/cookie';
import { userApi } from 'api/user';

/**
 * 此 mixin为登录以后的页面用的，因为所有的有效路由（排除登录、注册、404,500 这个几个特殊页面）都会走 other-main 或者 tabber-main两个父级组件。
 * 所以对于一些session的信息获取只能放到这个两个main组件上，故此mixin只用于两个main组件，起到全局的作用
 */
export default {
  created: function() {
    const token = cookie.getToken();
    // 如果登录过，获取token
    if (token && !this.$store.state.user.isHaveGotSessionInfo) {
      (async() => {
        try {
          console.debug(' request session info ');
          const res = await userApi.getSession();
          const loginInfo = res.data;
          this.$store.commit('user/updateSession', loginInfo);
        } catch (e) {
          this.$smartSentry.captureException(e);
        }
      })();
    }
  }
};
