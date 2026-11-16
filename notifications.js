const ParadiseNotifications = {

  async requestPermission() {
    if (!("Notification" in window)) return false;

    const permission = await Notification.requestPermission();
    return permission === "granted";
  },

  send(title, message) {
    if (Notification.permission !== "granted") return;

    new Notification(title, {
      body: message,
      icon: "./icon-192.png",
      badge: "./icon-192.png",
      dir: "rtl",
      lang: "fa"
    });
  },

  propertyAdded(title) {
    this.send(
      "پارادایس",
      `فایل ملکی جدید ثبت شد: ${title}`
    );
  },

  propertyUpdated(title) {
    this.send(
      "پارادایس",
      `فایل ملکی ویرایش شد: ${title}`
    );
  },

  propertyDeleted(title) {
    this.send(
      "پارادایس",
      `فایل ملکی حذف شد: ${title}`
    );
  }

};
