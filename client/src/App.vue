<template>
  <div>
    <div>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
      <a href="https://nodejs.org/en/" target="_blank">
        <img
          src="https://camo.githubusercontent.com/288cace72126df58aaeaa75627898785885858d54b03cb15ea3353a515642204/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f6e6f64656a732f6e6f64656a732d69636f6e2e737667"
          class="logo" alt="Vite logo" />
      </a>
    </div>
    <HelloWorld msg="Vue, Node.js JWT"></HelloWorld>
    <div v-if="state.account.id">
      <p>안녕하세요? {{ state.account.name }}님!</p>
      <button class="loginButton" @click="logout()">로그아웃</button>
    </div>
    <div v-else>
      <label for="loginId">
        <span>아이디</span>
        <input type="text" id="loginId" v-model="state.form.loginId" />
      </label>
      <label for="loginPw">
        <span>패스워드</span>
        <input type="password" id="loginPw" v-model="state.form.loginPw" />
      </label>
      <button class="loginButton" @click="submit()">로그인</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  components: {
    HelloWorld
  },
  setup() {
    const state = reactive({
      account: {
        id: null,
        name: "",
      },
      form: {
        loginId: "",
        loginPw: "",
      },
    });

    const submit = () => {
      const args = {
        loginId: state.form.loginId,
        loginPw: state.form.loginPw,
      };

      axios
        .post("/api/account", args)
        .then((res) => {
          alert("로그인에 성공했습니다.");
          state.account = res.data;
        })
        .catch(() => {
          alert("로그인에 실패했습니다. 계정 정보를 확인해주세요.");
        });
    };

    const logout = () => {
      axios.delete("/api/account").then(() => {
        alert("로그아웃하였습니다.");
        state.account.id = null;
        state.account.name = "";
      });
    };

    axios.get("/api/account").then((res) => {
      state.account = res.data;
    });

    return { state, submit, logout };
  },
};
</script>

<style lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;

  &:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}

label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  width: 300px;
  margin: 0 auto;
  margin-bottom: 15px;

  span {
    margin-bottom: 5px;
  }

  input {
    padding: 12.5px 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
}

.loginButton {
  background-color: #3fb883;
  color: #fff;
  margin-top: 15px;
}
</style>
