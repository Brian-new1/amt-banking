// ----- FAQ Functions -----

// Toggle individual FAQ answers with smooth animation
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const answer = element.nextElementSibling;

  if (faqItem.classList.contains('open')) {
    faqItem.style.height = element.offsetHeight + "px"; // lock height
    requestAnimationFrame(() => {
      faqItem.style.height = element.offsetHeight + "px";
      faqItem.classList.remove('open');
      answer.style.display = "none";
      faqItem.style.height = "";
    });
  } else {
    faqItem.classList.add('open');
    answer.style.display = "block";
    faqItem.style.height = faqItem.scrollHeight + "px";
    faqItem.addEventListener('transitionend', () => {
      faqItem.style.height = "";
    }, { once: true });
  }
}

// Show FAQs for a selected category with highlight
function showCategory(category) {
  const faqs = document.querySelectorAll(".faq-item");
  const faqSection = document.getElementById("faqSection");
  const articlesSection = document.querySelector(".articles");
  const backButton = document.getElementById("backButton");
  const articles = document.querySelectorAll(".article");

  // Highlight selected category image
  articles.forEach(article => {
    article.classList.toggle('selected', article.onclick.toString().includes(category));
  });

  // Show only selected category FAQs
  faqs.forEach(faq => {
    faq.style.display = faq.dataset.category === category ? "block" : "none";
  });

  faqSection.style.display = "block";
  backButton.style.display = "block";
  articlesSection.style.display = "none";
}

// Return to category view
function showAllCategories() {
  const faqs = document.querySelectorAll(".faq-item");
  const faqSection = document.getElementById("faqSection");
  const articlesSection = document.querySelector(".articles");
  const backButton = document.getElementById("backButton");
  const articles = document.querySelectorAll(".article");

  faqs.forEach(faq => faq.style.display = "none");
  faqSection.style.display = "none";
  backButton.style.display = "none";
  articlesSection.style.display = "flex";

  // Remove highlights
  articles.forEach(article => article.classList.remove('selected'));
}

// Search FAQs
function searchFAQs() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const faqs = document.querySelectorAll(".faq-item");
  const articlesSection = document.querySelector('.articles');
  const faqSection = document.querySelector('.faq-section');

  let matchFound = false;

  faqs.forEach(faq => {
    const question = faq.querySelector("h3").textContent.toLowerCase();
    const answer = faq.querySelector("p").textContent.toLowerCase();
    faq.style.display = (query && (question.includes(query) || answer.includes(query))) ? "block" : "none";
    if (faq.style.display === "block") matchFound = true;
  });

  faqSection.style.display = query ? "block" : "none";
  articlesSection.style.display = query ? "none" : "flex";
}

// when Contact Support button is clicked
document.getElementById("contactSupportBtn").addEventListener("click", function() {
    if (window.fcWidget) { 
        window.fcWidget.open(); // Opens the chat
    }
  
});

