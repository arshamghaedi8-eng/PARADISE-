const ParadiseAgents = {

  async load() {
    try {
      const agents = await ParadiseDB.getAgents();
      this.render(agents);
    } catch (error) {
      console.error("خطا در دریافت همکاران:", error);
    }
  },

  render(agents) {
    const container = document.getElementById("agentsList");
    container.innerHTML = "";

    agents.forEach(agent => {
      const card = document.createElement("div");
      card.className = "stat-card";

      const name = document.createElement("h3");
      name.textContent = agent.full_name;

      const phone = document.createElement("p");
      phone.textContent = agent.phone || "شماره ثبت نشده";

      card.append(name, phone);
      container.appendChild(card);
    });
  },

  async add(fullName, phone) {
    const { data, error } = await paradiseSupabase
      .from("agents")
      .insert([{
        full_name: fullName,
        phone: phone
      }])
      .select();

    if (error) throw error;

    await this.load();
    return data;
  },

  async delete(id) {
    const { error } = await paradiseSupabase
      .from("agents")
      .delete()
      .eq("id", id);

    if (error) throw error;

    await this.load();
  }

};
