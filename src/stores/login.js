import { defineStore } from "pinia";

export const useLoginStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false
  }),

  getters: {
    getAuthenticated: (state) => {
      return state.isAuthenticated;
    }
  },

  actions: {
    setAuthenticated(isAuth) {
      if (isAuth) {
        this.isAuthenticated = isAuth;
      } else {
        this.isAuthenticated = false;
      }
    }
  }
});
