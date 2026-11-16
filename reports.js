const ParadiseReports = {

  generate() {
    const total = properties.length;

    const sales = properties.filter(
      p => p.type === "فروش"
    ).length;

    const rentals = properties.filter(
      p => p.type === "اجاره"
    ).length;

    const mortgages = properties.filter(
      p => p.type === "رهن"
    ).length;

    const totalArea = properties.reduce(
      (sum, p) => sum + Number(p.area || 0), 0
    );

    return {
      totalProperties: total,
      sales,
      rentals,
      mortgages,
      totalArea,
      totalAgents: agents.length,
      generatedAt: new Date().toISOString()
    };
  },

  export() {
    const report = this.generate();

    const blob = new Blob(
      [JSON.stringify(report, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "PARADISE-Report.json";
    link.click();

    URL.revokeObjectURL(url);
  }

};
