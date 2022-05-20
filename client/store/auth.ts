import { ActionTree, GetterTree, MutationTree } from "vuex";

export interface AuthState {
  token: string | null;
}

export const state = () =>
  ({
    token: null,
  } as AuthState);

export const getters: GetterTree<AuthState, AuthState> = {
  token: (store) => store.token,
};

export const mutations: MutationTree<AuthState> = {
  SET_TOKEN: (store, token) => (store.token = token),
};

export const actions: ActionTree<AuthState, AuthState> = {
  register(_context, payload) {
    return this.$axios.$post("/users", payload);
  },
  async authenticate({ commit }, payload) {
    const data = await this.$axios.$post("/auth/token", payload);
    commit("SET_TOKEN", data.access_token);
    return data;
  },
};
