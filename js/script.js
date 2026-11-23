// CarePoint website interactions
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Prevent selecting a date in the past.
const dateInput = document.getElementById("appointmentDate");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];
dateInput.min = localToday;

// Front-end demonstration only. No data is transmitted or stored.
const form = document.getElementById("appointmentForm");
const statusMessage = document.getElementById("formStatus");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const patientName = String(formData.get("name")).trim();
  statusMessage.textContent =
    `Thank you, ${patientName}. Your demo appointment request is ready. In a real hospital website, reception would confirm your appointment.`;
  statusMessage.className = "form-status success";
  form.reset();
  dateInput.min = localToday;
});
