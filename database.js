const ParadiseDB = {

  async getProperties() {
    const { data, error } = await paradiseSupabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async addProperty(property) {
    const { data, error } = await paradiseSupabase
      .from("properties")
      .insert([property])
      .select();

    if (error) throw error;
    return data;
  },

  async updateProperty(id, changes) {
    const { data, error } = await paradiseSupabase
      .from("properties")
      .update(changes)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data;
  },

  async deleteProperty(id) {
    const { error } = await paradiseSupabase
      .from("properties")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  },

  async getAgents() {
    const { data, error } = await paradiseSupabase
      .from("agents")
      .select("*");

    if (error) throw error;
    return data;
  }

};
