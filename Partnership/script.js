 //partner button starts//

  const modal = document.getElementById("partnerModal");
  const openBtn = document.querySelector(".cta-button");
  const closeBtn = document.getElementById("closeModal");
  const iframe = document.getElementById("formFrame");

  openBtn.addEventListener("click", () => {
    iframe.src = "partnershipform.html"; // ✅ Corrected path
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    iframe.src = ""; // ✅ Clears the iframe
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      iframe.src = "";
    }
  });


// Partner button ends //

        document.addEventListener('DOMContentLoaded', function() {
            // Form navigation
            const sections = document.querySelectorAll('fieldset');
            const steps = document.querySelectorAll('.step');
            
            // Show first section by default
            sections[0].classList.add('active');
            
            // Next/prev section navigation
            document.querySelectorAll('.next-section').forEach(button => {
                button.addEventListener('click', function() {
                    const currentSection = this.closest('fieldset');
                    const nextSectionId = this.dataset.next;
                    
                    // Validate current section before proceeding
                    if (validateSection(currentSection.id)) {
                        currentSection.classList.remove('active');
                        document.getElementById(`section-${nextSectionId}`).classList.add('active');
                        
                        // Update progress steps
                        updateProgressSteps(nextSectionId);
                    }
                });
            });
            
            document.querySelectorAll('.prev-section').forEach(button => {
                button.addEventListener('click', function() {
                    const currentSection = this.closest('fieldset');
                    const prevSectionId = this.dataset.prev;
                    
                    currentSection.classList.remove('active');
                    document.getElementById(`section-${prevSectionId}`).classList.add('active');
                    
                    // Update progress steps
                    updateProgressSteps(prevSectionId);
                });
            });
            
            // Update progress steps
            function updateProgressSteps(currentStep) {
                steps.forEach((step, index) => {
                    step.classList.remove('active', 'complete');
                    
                    if (index < currentStep - 1) {
                        step.classList.add('complete');
                    } else if (index === currentStep - 1) {
                        step.classList.add('active');
                    }
                });
            }
            
            // Section validation
            function validateSection(sectionId) {
                const section = document.getElementById(sectionId);
                let isValid = true;
                
                // Check all required fields in this section
                const requiredFields = section.querySelectorAll('[required]');
                requiredFields.forEach(field => {
                    if (!field.value) {
                        field.classList.add('error');
                        isValid = false;
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                return isValid;
            }
            
            // Conditional fields
            document.querySelectorAll('input[name="aml-kyc"]').forEach(radio => {
                radio.addEventListener('change', function() {
                    document.getElementById('aml-details').style.display = 
                        this.value === 'yes' ? 'block' : 'none';
                });
            });
            
            document.querySelector('input[name="licenses"][value="other"]').addEventListener('change', function() {
                document.getElementById('other-license').style.display = 
                    this.checked ? 'block' : 'none';
            });
            
            // File upload simulation (in a real app, use proper file upload handling)
            document.querySelectorAll('.dropzone').forEach(dropzone => {
                dropzone.addEventListener('click', function() {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.pdf,.jpg,.jpeg,.png';
                    input.multiple = this.id === 'product-screenshots';
                    
                    input.onchange = function(e) {
                        const files = e.target.files;
                        const fileListId = `${this.parentElement.id}-files`;
                        const fileList = document.getElementById(fileListId);
                        
                        fileList.innerHTML = '';
                        
                        for (let file of files) {
                            const fileItem = document.createElement('div');
                            fileItem.className = 'file-item';
                            fileItem.innerHTML = `
                                <i class="fas fa-file-alt"></i>
                                <span>${file.name}</span>
                            `;
                            fileList.appendChild(fileItem);
                        }
                    };
                    
                    input.click();
                });
            });
            const dropArea = document.getElementById("dropzone");
const fileInput = document.getElementById("certificateFile");

dropArea.addEventListener("click", () => fileInput.click());

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  fileInput.files = e.dataTransfer.files;
});

            
            // Form submission
            document.getElementById('partner-application').addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateSection('section-5')) {
                    // In a real app, you would submit the form data to your server
                    alert('Application submitted successfully! Our team will review your information and contact you within 5-7 business days.');
                    this.reset();
                    
                    // Reset form view
                    sections.forEach(section => section.classList.remove('active'));
                    sections[0].classList.add('active');
                    updateProgressSteps(1);
                }
            });
        });
function showApprovalPopup() {
    document.getElementById('approval-popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('approval-popup').style.display = 'none';
}


        // Show approval popup after form submission
document.getElementById('partner-application').addEventListener('submit', function(e) {
    e.preventDefault();

    if (validateSection('section-5')) {
        // In a real app, you would submit the form data to your server

        // Show approval popup
        document.getElementById('approval-popup').style.display = 'flex';

        // Optionally reset the form
        this.reset();

        // Reset form view
        const sections = document.querySelectorAll('fieldset');
        sections.forEach(section => section.classList.remove('active'));
        sections[0].classList.add('active');
        updateProgressSteps(1);
    }
});

// Close popup function
function closePopup() {
    document.getElementById('approval-popup').style.display = 'none';
}
document.querySelectorAll('.dropzone').forEach(dropzone => {
    dropzone.addEventListener('click', function () {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.jpg,.jpeg,.png';
        input.multiple = this.id === 'product-screenshots';

        input.onchange = function (e) {
            const files = e.target.files;
            const fileListId = `${dropzone.id}-files`;
            const fileList = document.getElementById(fileListId);

            fileList.innerHTML = '';

            for (let file of files) {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.innerHTML = `
                    <i class="fas fa-file-alt"></i>
                    <span>${file.name}</span>
                `;
                fileList.appendChild(fileItem);
            }

            // ✅ Show approval popup after file is selected
            showApprovalPopup();
        };

        input.click();
    });

    // Optional: handle drag-and-drop too
    dropzone.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.classList.add('dragging');
    });

    dropzone.addEventListener('dragleave', function () {
        this.classList.remove('dragging');
    });

    dropzone.addEventListener('drop', function (e) {
        e.preventDefault();
        this.classList.remove('dragging');

        const files = e.dataTransfer.files;
        const fileListId = `${this.id}-files`;
        const fileList = document.getElementById(fileListId);

        fileList.innerHTML = '';

        for (let file of files) {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <i class="fas fa-file-alt"></i>
                <span>${file.name}</span>
            `;
            fileList.appendChild(fileItem);
        }

        // ✅ Show approval popup after dropping file
        showApprovalPopup();
    });
});

    