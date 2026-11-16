const ParadiseMap = {
  map: null,
  markers: [],

  init() {
    if (this.map) return;

    this.map = L.map("propertyMap").setView(
      [35.6892, 51.3890],
      13
    );

    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "&copy; OpenStreetMap"
      }
    ).addTo(this.map);
  },

  addMarker(property) {
    if (!property.latitude || !property.longitude) return;

    const marker = L.marker([
      property.latitude,
      property.longitude
    ]).addTo(this.map);

    marker.bindPopup(`
      <b>${property.title}</b><br>
      ${property.type}<br>
      ${property.area || 0} متر
    `);

    this.markers.push(marker);
  },

  clearMarkers
