(function () {
  if (window.__USTRA_HOME_HEADER_LOADED__) {
    return;
  }
  window.__USTRA_HOME_HEADER_LOADED__ = true;

  const config = window.ustraHeaderConfig || {};
  const mount = document.querySelector(config.mountSelector || ".app-container") || document.body;

  if (!mount) {
    return;
  }

  const defaultLocations = [
    "Hazratganj, Lucknow",
    "Gomti Nagar, Lucknow",
    "Aliganj, Lucknow",
    "Indira Nagar, Lucknow",
    "Jankipuram, Lucknow"
  ];

  if (!document.getElementById("ustra-home-header-style")) {
    const style = document.createElement("style");
    style.id = "ustra-home-header-style";
    style.textContent = `
:root {
  --bg-dark: #0f1014;
  --bg-darker: #08080a;
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.08);
  --accent-gold: #e2c275;
  --text-primary: #ffffff;
  --text-secondary: #9496a1;
  --error-color: #ff4d4d;
}

.ustra-home-shell-host {
  position: relative;
}

.ustra-home-header-offset {
  padding-top: 74px !important;
}

.app-header,
.notification-dropdown,
.partner-dropdown,
.location-dropdown {
  font-family: "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  z-index: 2000;
  background: rgba(13, 15, 20, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.app-logo {
  height: 40px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.8));
  transition: 0.3s;
  cursor: pointer;
  flex-shrink: 0;
}

.app-logo:hover {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
}

.location-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.05);
  padding: 6px 12px;
  border-radius: 14px;
  font-size: 12px;
  color: var(--text-primary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: 0.3s;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  max-width: 320px;
}

.location-pill:active {
  transform: scale(0.95);
}

.location-pill span {
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
}

.location-pill i[data-lucide="map-pin"] {
  color: var(--accent-gold);
  width: 14px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  position: relative;
}

.notification-trigger,
.more-trigger {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  cursor: pointer;
  transition: 0.25s ease;
  position: relative;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.35);
}

.notification-trigger {
  border-radius: 999px;
}

.more-trigger {
  border-radius: 14px;
}

.notification-trigger:hover,
.more-trigger:hover {
  border-color: rgba(212, 175, 55, 0.45);
  transform: translateY(-1px);
}

.notification-trigger svg,
.more-trigger svg,
.notification-trigger i,
.more-trigger i {
  width: 18px;
  height: 18px;
}

.notification-badge {
  position: absolute;
  top: 9px;
  right: 9px;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #ff4d4d;
  box-shadow: 0 0 0 4px rgba(255, 77, 77, 0.18);
}

.partner-dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  width: 220px;
  background: linear-gradient(145deg, rgba(15, 17, 23, 0.97), rgba(12, 13, 18, 0.92));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  padding: 10px;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.6);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2100;
}

.partner-dropdown.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.pd-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border-radius: 12px;
  transition: 0.3s;
}

.pd-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--accent-gold);
}

.pd-item i {
  width: 18px;
  color: var(--accent-gold);
}

.pd-label {
  font-size: 11px;
  text-transform: uppercase;
  color: rgba(212, 175, 55, 0.75);
  font-weight: 800;
  letter-spacing: 1.4px;
  padding: 6px 15px 2px;
}

.location-dropdown {
  position: absolute;
  top: 58px;
  left: 16px;
  width: min(260px, calc(100% - 32px));
  background: rgba(20, 20, 20, 0.98);
  backdrop-filter: blur(25px);
  border: 1px solid var(--glass-border);
  border-radius: 14px;
  z-index: 3000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.location-dropdown.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.location-list {
  max-height: 350px;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  scrollbar-width: none;
}

.location-list::-webkit-scrollbar {
  display: none;
}

.loc-item {
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s;
  font-size: 14px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.loc-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.loc-item.active {
  background: rgba(226, 194, 117, 0.1);
  color: var(--accent-gold);
  font-weight: 600;
}

.dropdown-header {
  padding: 12px 16px 8px;
  font-size: 11px;
  font-weight: 700;
  color: var(--accent-gold);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.notification-dropdown {
  position: absolute;
  top: 72px;
  right: 20px;
  width: calc(100% - 40px);
  max-width: 340px;
  background: rgba(15, 15, 20, 0.98);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: none;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-15px);
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: 5000;
  padding: 20px;
}

.notification-dropdown.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.notif-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.notif-title {
  font-size: 16px;
  font-weight: 800;
  color: #fff;
}

.notif-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: none;
}

.notif-list::-webkit-scrollbar {
  display: none;
}

.notif-item {
  background: rgba(255, 255, 255, 0.04);
  border: none;
  border-radius: 20px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.notif-item-top {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.notif-shop-img {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.notif-content {
  flex: 1;
}

.notif-shop-name {
  font-size: 14px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 2px;
}

.notif-msg {
  font-size: 11px;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 4px;
}

.notif-time {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.3);
}

.review-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.review-prompt {
  font-size: 11px;
  color: var(--text-secondary);
  font-weight: 500;
}

.star-rating {
  display: flex;
  gap: 4px;
  padding: 4px 0;
}

.star-rating i,
.star-rating svg {
  width: 24px;
  height: 24px;
  color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  fill: none;
}

.star-rating i:hover,
.star-rating svg:hover,
.star-rating i.active,
.star-rating svg.active {
  color: var(--accent-gold);
  transform: scale(1.2);
  filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.4));
}

.star-rating i.active,
.star-rating svg.active {
  fill: var(--accent-gold);
}

.review-textarea {
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 10px 12px;
  color: #fff;
  font-size: 11px;
  font-family: inherit;
  resize: none;
  outline: none;
  margin-top: 5px;
  transition: 0.3s;
}

.review-textarea:focus {
  border-color: var(--accent-gold);
  background: rgba(0, 0, 0, 0.5);
}

.review-textarea::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.review-btn {
  background: rgba(226, 194, 117, 0.1);
  color: var(--accent-gold);
  border: 1px solid rgba(226, 194, 117, 0.2);
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
  align-self: flex-start;
  margin-top: 4px;
  cursor: pointer;
  transition: 0.2s;
}

.review-btn:hover {
  background: var(--accent-gold);
  color: #000;
}

@media (max-width: 520px) {
  .app-header {
    max-width: 100%;
    padding: 10px 12px;
    gap: 8px;
  }

  .location-pill {
    max-width: 240px;
  }
}

@media (max-width: 390px) {
  .location-pill {
    max-width: 200px;
    font-size: 11px;
    padding: 6px 10px;
  }

  .notification-trigger,
  .more-trigger {
    width: 36px;
    height: 36px;
  }
}
`;
    document.head.appendChild(style);
  }

  const removeSelectors = [
    ".app-header",
    "#notifDropdown",
    ".overlay",
    ".sidebar"
  ];
  const extraRemoveSelectors = Array.isArray(config.removeSelectors) ? config.removeSelectors : [];

  removeSelectors.concat(extraRemoveSelectors).forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => node.remove());
  });

  if (config.removePageHeader !== false) {
    const directHeader = Array.from(mount.children).find((child) => child.tagName === "HEADER");
    if (directHeader) {
      directHeader.remove();
    }
  }

  mount.classList.add("ustra-home-shell-host");

  const targetForOffset = mount === document.body ? document.body : mount;
  if (config.addTopOffset) {
    targetForOffset.classList.add("ustra-home-header-offset");
  }

  const homeHref = config.homeHref || "home.html";
  const currentLocation = config.locationText || "Hazratganj, Lucknow";

  const shellMarkup = `
<div class="app-header">
  <div class="header-left">
    <a href="${homeHref}">
      <img src="image/High%20Qulity/Final-logo.png" alt="Ustra Logo" class="app-logo">
    </a>
    <div class="location-pill" id="location-trigger" onclick="toggleLocationDropdown()">
      <i data-lucide="map-pin"></i>
      <span id="current-location">${currentLocation}</span>
      <i data-lucide="chevron-down" style="width:14px; margin-left:2px; opacity:0.6;"></i>
    </div>
  </div>

  <div class="location-dropdown" id="locationDropdown">
    <div class="dropdown-header">Select Your City</div>
    <div class="location-list" id="location-list-container"></div>
  </div>

  <div class="header-right">
    <div class="notification-trigger" id="notif-trigger" onclick="toggleNotifications()">
      <i data-lucide="bell"></i>
      <div class="notification-badge"></div>
    </div>

    <div class="more-trigger" id="more-trigger" onclick="togglePartnerMenu()">
      <i data-lucide="more-vertical"></i>
    </div>

    <div class="partner-dropdown" id="partnerDropdown">
      <div class="pd-label">Join Ustra</div>
      <a href="gender-select.html" class="pd-item">
        <i data-lucide="scissors"></i>
        <span>Register Salon</span>
      </a>
      <a href="partner-login.html" class="pd-item">
        <i data-lucide="log-in"></i>
        <span>Salon Login</span>
      </a>
    </div>
  </div>
</div>

<div class="notification-dropdown" id="notifDropdown" onclick="event.stopPropagation()">
  <div class="notif-header">
    <span class="notif-title">Notifications</span>
  </div>
  <div class="notif-list">
    <div class="notif-item">
      <div class="notif-item-top">
        <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=150&q=80" class="notif-shop-img" alt="Salon">
        <div class="notif-content">
          <div class="notif-shop-name">Truefitt & Hill</div>
          <div class="notif-msg">Rate your experience!</div>
          <div class="notif-time">2 hours ago</div>
        </div>
      </div>
      <div class="review-box">
        <div class="review-prompt">How was your haircut at <b>Truefitt & Hill</b>?</div>
        <div class="star-rating">
          <i data-lucide="star" onclick="event.stopPropagation(); rate(this, 1)"></i>
          <i data-lucide="star" onclick="event.stopPropagation(); rate(this, 2)"></i>
          <i data-lucide="star" onclick="event.stopPropagation(); rate(this, 3)"></i>
          <i data-lucide="star" onclick="event.stopPropagation(); rate(this, 4)"></i>
          <i data-lucide="star" onclick="event.stopPropagation(); rate(this, 5)"></i>
        </div>
        <textarea class="review-textarea" placeholder="Tell us about your experience..." onclick="event.stopPropagation()"></textarea>
        <button class="review-btn" onclick="event.stopPropagation(); submitReview(this)">Submit Review</button>
      </div>
    </div>
  </div>
</div>
`;

  mount.insertAdjacentHTML("afterbegin", shellMarkup);

  function setOpenState(id, isOpen) {
    const element = document.getElementById(id);
    if (element) {
      element.classList.toggle("active", Boolean(isOpen));
    }
  }

  function renderLocations() {
    const container = document.getElementById("location-list-container");
    const current = document.getElementById("current-location")?.innerText || currentLocation;
    const locations = Array.isArray(config.locations) && config.locations.length
      ? config.locations
      : defaultLocations;

    if (!container) {
      return;
    }

    container.innerHTML = locations.map((name) => `
      <div class="loc-item ${name === current ? "active" : ""}" onclick="selectLocation('${name.replace(/'/g, "\\'")}')">
        <span>${name}</span>
        ${name === current ? '<i data-lucide="check" style="width:14px;"></i>' : ""}
      </div>
    `).join("");
  }

  window.toggleLocationDropdown = function () {
    const dropdown = document.getElementById("locationDropdown");
    if (!dropdown) {
      return;
    }

    const nextState = !dropdown.classList.contains("active");
    setOpenState("locationDropdown", nextState);
    if (nextState) {
      setOpenState("notifDropdown", false);
      setOpenState("partnerDropdown", false);
    }
  };

  window.selectLocation = function (name) {
    const locationNode = document.getElementById("current-location");
    if (locationNode) {
      locationNode.innerText = name;
    }
    renderLocations();
    setOpenState("locationDropdown", false);
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  };

  window.toggleNotifications = function () {
    const dropdown = document.getElementById("notifDropdown");
    if (!dropdown) {
      return;
    }

    const nextState = !dropdown.classList.contains("active");
    setOpenState("notifDropdown", nextState);
    setOpenState("partnerDropdown", false);
    setOpenState("locationDropdown", false);

    if (nextState) {
      document.querySelector(".notification-badge")?.remove();
    }
  };

  window.togglePartnerMenu = function () {
    const dropdown = document.getElementById("partnerDropdown");
    if (!dropdown) {
      return;
    }

    const nextState = !dropdown.classList.contains("active");
    setOpenState("partnerDropdown", nextState);
    setOpenState("notifDropdown", false);
    setOpenState("locationDropdown", false);
  };

  window.rate = function (star, value) {
    const container = star.parentElement;
    if (!container) {
      return;
    }

    const stars = container.querySelectorAll("i, svg");
    stars.forEach((icon, index) => {
      icon.classList.toggle("active", index < value);
    });
    container.setAttribute("data-rating", String(value));
  };

  window.submitReview = function (button) {
    const item = button.closest(".notif-item");
    if (!item) {
      return;
    }

    const rating = Number(item.querySelector(".star-rating")?.getAttribute("data-rating") || 0);
    if (!rating) {
      alert("Please select a star rating!");
      return;
    }

    item.style.opacity = "0.5";
    item.style.pointerEvents = "none";
    button.innerText = "Submitted!";

    setTimeout(() => {
      item.style.transform = "translateX(50px)";
      item.style.opacity = "0";
      setTimeout(() => {
        item.remove();
        const list = document.querySelector(".notif-list");
        if (list && !list.children.length) {
          list.innerHTML = '<p style="text-align:center; padding:20px; font-size:12px; color:var(--text-secondary);">All caught up!</p>';
        }
      }, 300);
      setOpenState("notifDropdown", false);
    }, 800);
  };

  document.addEventListener("click", function (event) {
    const locationDropdown = document.getElementById("locationDropdown");
    const locationTrigger = document.getElementById("location-trigger");
    if (
      locationDropdown &&
      locationTrigger &&
      locationDropdown.classList.contains("active") &&
      !locationDropdown.contains(event.target) &&
      !locationTrigger.contains(event.target)
    ) {
      setOpenState("locationDropdown", false);
    }

    const notifDropdown = document.getElementById("notifDropdown");
    const notifTrigger = document.getElementById("notif-trigger");
    if (
      notifDropdown &&
      notifTrigger &&
      notifDropdown.classList.contains("active") &&
      !notifDropdown.contains(event.target) &&
      !notifTrigger.contains(event.target)
    ) {
      setOpenState("notifDropdown", false);
    }

    const partnerDropdown = document.getElementById("partnerDropdown");
    const partnerTrigger = document.getElementById("more-trigger");
    if (
      partnerDropdown &&
      partnerTrigger &&
      partnerDropdown.classList.contains("active") &&
      !partnerDropdown.contains(event.target) &&
      !partnerTrigger.contains(event.target)
    ) {
      setOpenState("partnerDropdown", false);
    }
  });

  renderLocations();

  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
})();
