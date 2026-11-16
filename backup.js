const ParadiseBackup = {

  exportData() {
    const backup = {
      properties,
      agents,
      date: new Date().toISOString(),
      app: "PARADISE"
    };

    const blob = new Blob(
      [JSON.stringify(backup, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `PARADISE-Backup-${Date.now()}.json`;
    link.click();

    URL.revokeObjectURL(url);
  },

  importData(file) {
    const reader = new FileReader();

    reader.onload = event => {
      try {
        const backup = JSON.parse(event.target.result);

        if (
          backup.app !== "PARADISE" ||
          !Array.isArray(backup.properties) ||
          !Array.isArray(backup.agents)
        ) {
          throw new Error("فایل پشتیبان معتبر نیست.");
        }

        properties = backup.properties;
        agents = backup.agents;

        saveData();
        renderProperties();
        updateDashboard();

        alert("بازیابی اطلاعات با موفقیت انجام شد.");
      } catch (error) {
        alert(error.message);
      }
    };

    reader.readAsText(file);
  }

};
