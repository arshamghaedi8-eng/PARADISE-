const ParadiseSettings = {

  defaults: {
    appName: "PARADISE",
    language: "fa",
    direction: "rtl",
    theme: "lust-cherry-gray",
    primaryColor: "#8B1538",
    secondaryColor: "#808080"
  },

  get(key) {
    return localStorage.getItem("paradise_" + key);
  },

  set(key, value) {
    localStorage.setItem("paradise_" + key, value);
  },

  reset() {
    if (!confirm("تنظیمات به حالت اولیه برگردد؟")) return;

    Object.keys(localStorage)
      .filter(key => key.startsWith("paradise_"))
      .forEach(key => localStorage.removeItem(key));

    location.reload();
  }

};
