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

// ----- Chatbot Functions -----

const chatWidget = document.getElementById('chatWidget');
const contactBtn = document.getElementById('contactSupportBtn');
const closeBtn = document.getElementById('closeChatBtn');
const sendBtn = document.getElementById('sendChatBtn');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const chatFallback = document.getElementById('chatFallback');
const submitFallbackBtn = document.getElementById('submitFallbackBtn');
const fallbackMessage = document.getElementById('fallbackMessage');
const fallbackConfirmation = document.getElementById('fallbackConfirmation');
const clearChatBtn = document.getElementById('clearChatBtn');

contactBtn.onclick = () => chatWidget.style.display = 'flex';
closeBtn.onclick = () => chatWidget.style.display = 'none';

// Add a chat message
function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle FAQ bot reply
function handleBotReply(query) {
  const faqs = document.querySelectorAll(".faq-item");
  for (let faq of faqs) {
    const question = faq.querySelector("h3").textContent.toLowerCase();
    const answer = faq.querySelector("p").textContent.toLowerCase();
    if (query && (question.includes(query) || answer.includes(query))) {
      addMessage(answer, 'bot');
      return;
    }
  }
  // If no answer, show fallback form
  chatFallback.style.display = 'block';
}

// Send chat message
sendBtn.onclick = () => {
  const query = chatInput.value.trim();
  if (!query) return;
  addMessage(query, 'user');
  chatInput.value = '';
  handleBotReply(query.toLowerCase());
};

// Press Enter to send
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendBtn.click();
});

// Clear chat
clearChatBtn.onclick = () => {
  chatMessages.innerHTML = '';
};

// Fallback form submission
submitFallbackBtn.onclick = () => {
  if (!fallbackMessage.value.trim()) return;
  fallbackConfirmation.style.display = 'block';
  fallbackMessage.value = '';
  chatFallback.style.display = 'none';
};

// ----- Draggable Chat -----
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

const chatHeader = chatWidget.querySelector('.chat-header');

chatHeader.addEventListener('mousedown', (e) => {
  isDragging = true;
  const rect = chatWidget.getBoundingClientRect();
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;
  chatWidget.style.transition = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  let left = e.clientX - dragOffsetX;
  let top = e.clientY - dragOffsetY;

  const maxLeft = window.innerWidth - chatWidget.offsetWidth;
  const maxTop = window.innerHeight - chatWidget.offsetHeight;
  left = Math.min(Math.max(0, left), maxLeft);
  top = Math.min(Math.max(0, top), maxTop);

  chatWidget.style.left = left + 'px';
  chatWidget.style.top = top + 'px';
  chatWidget.style.bottom = 'auto';
  chatWidget.style.right = 'auto';
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    chatWidget.style.transition = '';
  }
});

// ----- Resizable Chat -----
const resizeHandle = chatWidget.querySelector('.resize-handle');
let isResizing = false;
let startWidth, startHeight, startX, startY;

resizeHandle.addEventListener('mousedown', (e) => {
  isResizing = true;
  startWidth = chatWidget.offsetWidth;
  startHeight = chatWidget.offsetHeight;
  startX = e.clientX;
  startY = e.clientY;
  e.preventDefault(); // prevent text selection
});

document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;
  const newWidth = startWidth + (e.clientX - startX);
  const newHeight = startHeight + (e.clientY - startY);

  chatWidget.style.width = Math.max(200, newWidth) + 'px'; // minimum width
  chatWidget.style.height = Math.max(200, newHeight) + 'px'; // minimum height
});

document.addEventListener('mouseup', () => {
  isResizing = false;
});
