// ================= PARTNER MODAL ================= //
const modal = document.getElementById("partnerModal");
const openBtn = document.querySelector(".cta-button");
const closeBtn = document.getElementById("closeModal");
const iframe = document.getElementById("formFrame");

openBtn.addEventListener("click", () => {
  iframe.src = "partnershipform.html"; // ✅ Path to form
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  iframe.src = ""; // clear form
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    iframe.src = "";
  }
});

// ================= FORM LOGIC ================= //
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("fieldset");
  const steps = document.querySelectorAll(".step");

  // Show first section by default
  sections[0].classList.add("active");

  // -------- Navigation --------
  document.querySelectorAll(".next-section").forEach((button) => {
    button.addEventListener("click", function () {
      const currentSection = this.closest("fieldset");
      const nextSectionId = this.dataset.next;

      if (validateSection(currentSection.id)) {
        currentSection.classList.remove("active");
        document
          .getElementById(`section-${nextSectionId}`)
          .classList.add("active");
        updateProgressSteps(nextSectionId);
      }
    });
  });

  document.querySelectorAll(".prev-section").forEach((button) => {
    button.addEventListener("click", function () {
      const currentSection = this.closest("fieldset");
      const prevSectionId = this.dataset.prev;

      currentSection.classList.remove("active");
      document
        .getElementById(`section-${prevSectionId}`)
        .classList.add("active");
      updateProgressSteps(prevSectionId);
    });
  });

  // -------- Conditional Fields --------
  document
    .querySelectorAll('input[name="aml-kyc"]')
    .forEach((radio) => {
      radio.addEventListener("change", function () {
        document.getElementById("aml-details").style.display =
          this.value === "yes" ? "block" : "none";
      });
    });

  document
    .querySelector('input[name="licenses"][value="other"]')
    .addEventListener("change", function () {
      document.getElementById("other-license").style.display = this.checked
        ? "block"
        : "none";
    });

  // -------- File Upload (click + drop) --------
  document.querySelectorAll(".dropzone").forEach((dropzone) => {
    dropzone.addEventListener("click", function () {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".pdf,.jpg,.jpeg,.png";
      input.multiple = this.id === "product-screenshots";

      input.onchange = function (e) {
        showFiles(dropzone, e.target.files);
        showApprovalPopup(); // ✅ Show popup after selecting
      };

      input.click();
    });

    dropzone.addEventListener("dragover", function (e) {
      e.preventDefault();
      this.classList.add("dragging");
    });

    dropzone.addEventListener("dragleave", function () {
      this.classList.remove("dragging");
    });

    dropzone.addEventListener("drop", function (e) {
      e.preventDefault();
      this.classList.remove("dragging");
      showFiles(this, e.dataTransfer.files);
      showApprovalPopup(); // ✅ Show popup after dropping
    });
  });

  // -------- Form Submission --------
  document
    .getElementById("partner-application")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      if (validateSection("section-5")) {
        showApprovalPopup(); // ✅ Final popup
        this.reset();

        // Reset form view
        sections.forEach((section) => section.classList.remove("active"));
        sections[0].classList.add("active");
        updateProgressSteps(1);
      }
    });
});

// ================= HELPER FUNCTIONS ================= //
function updateProgressSteps(currentStep) {
  const steps = document.querySelectorAll(".step");
  steps.forEach((step, index) => {
    step.classList.remove("active", "complete");

    if (index < currentStep - 1) {
      step.classList.add("complete");
    } else if (index === currentStep - 1) {
      step.classList.add("active");
    }
  });
}

function validateSection(sectionId) {
  const section = document.getElementById(sectionId);
  let isValid = true;

  const requiredFields = section.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    if (!field.value) {
      field.classList.add("error");
      isValid = false;
    } else {
      field.classList.remove("error");
    }
  });

  return isValid;
}

function showFiles(dropzone, files) {
  const fileListId = `${dropzone.id}-files`;
  const fileList = document.getElementById(fileListId);

  fileList.innerHTML = "";

  for (let file of files) {
    const fileItem = document.createElement("div");
    fileItem.className = "file-item";
    fileItem.innerHTML = `
      <i class="fas fa-file-alt"></i>
      <span>${file.name}</span>
    `;
    fileList.appendChild(fileItem);
  }
}

function showApprovalPopup() {
  document.getElementById("approval-popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("approval-popup").style.display = "none";
}

// ================= BADGE ANIMATION ================= //
document.addEventListener("DOMContentLoaded", function () {
  const badges = document.querySelectorAll(".badge");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  badges.forEach((badge) => {
    badge.style.opacity = 0;
    badge.style.transform = "translateY(20px)";
    badge.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(badge);
  });
});

