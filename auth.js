const ParadiseAuth = {

  async signUp(email, password, fullName) {
    const { data, error } = await paradiseSupabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    if (error) throw error;
    return data;
  },

  async signIn(email, password) {
    const { data, error } = await paradiseSupabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await paradiseSupabase.auth.signOut();

    if (error) throw error;
  },

  async getUser() {
    const { data, error } = await paradiseSupabase.auth.getUser();

    if (error) throw error;
    return data.user;
  },

  async isLoggedIn() {
    const { data } = await paradiseSupabase.auth.getSession();
    return !!data.session;
  }

};
