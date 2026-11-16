const STORAGE_KEY = "paradise_properties";
const AGENTS_KEY = "paradise_agents";

let properties = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
let agents = JSON.parse(localStorage.getItem(AGENTS_KEY) || "[]");

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  localStorage.setItem(AGENTS_KEY, JSON.stringify(agents));
}

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const page = document.getElementById(pageId);

  if (page) page.classList.add("active");

  updateDashboard();
}

function updateDashboard() {
  document.getElementById("totalProperties").textContent =
    properties.length;

  document.getElementById("saleCount").textContent =
    properties.filter(p => p.type === "فروش").length;

  document.getElementById("rentCount").textContent =
    properties.filter(p =>
      ["اجاره", "رهن"].includes(p.type)
    ).length;

  document.getElementById("agentCount").textContent =
    agents.length;
}

function renderProperties(list = properties) {
  const container = document.getElementById("propertyList");

  container.innerHTML = "";

  list.forEach(property => {
    const card = document.createElement("div");

    card.className = "stat-card";

    const title = document.createElement("h3");
    title.textContent = property.title;

    const details = document.createElement("p");
    details.textContent =
      `${property.type} | ${property.category || "نامشخص"} | ${property.area || 0} متر`;

    const address = document.createElement("p");
    address.textContent = property.address || "آدرس ثبت نشده";

    const description = document.createElement("p");
    description.textContent = property.description || "";

    const edit = document.createElement("button");
    edit.textContent = "ویرایش";
    edit.onclick = () => editProperty(property.id);

    const remove = document.createElement("button");
    remove.textContent = "حذف";
    remove.onclick = () => deleteProperty(property.id);

    card.append(title, details, address, description, edit, remove);

    container.appendChild(card);
  });
}

document.getElementById("propertyForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  const property = Object.fromEntries(formData.entries());

  property.id = Date.now().toString();
  property.createdAt = new Date().toISOString();

  properties.push(property);

  saveData();

  this.reset();

  renderProperties();
  updateDashboard();

  showPage("properties");
});

function deleteProperty(id) {
  if (!confirm("آیا از حذف این فایل مطمئن هستید؟")) return;

  properties = properties.filter(p => p.id !== id);

  saveData();
  renderProperties();
  updateDashboard();
}

function editProperty(id) {
  const property = properties.find(p => p.id === id);

  if (!property) return;

  const newTitle = prompt("عنوان جدید ملک:", property.title);

  if (newTitle === null || !newTitle.trim()) return;

  property.title = newTitle.trim();

  saveData();
  renderProperties();
  updateDashboard();
}

document.getElementById("propertySearch").addEventListener("input", function() {
  const query = this.value.trim().toLowerCase();

  const filtered = properties.filter(p =>
    Object.values(p).some(value =>
      String(value).toLowerCase().includes(query)
    )
  );

  renderProperties(filtered);
});

document.getElementById("menuBtn").addEventListener("click", function() {
  showPage("settings");
});

renderProperties();
updateDashboard();
