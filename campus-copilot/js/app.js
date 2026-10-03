/**
 * CAMPUS COPILOT - MAIN APPLICATION CONTROLLER
 * Orchestrates Map Engine, AI Assistant, Pathfinder, Search, Modals, and User Interface.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Global App State
  const state = {
    selectedCategory: "all",
    selectedBuilding: null,
    selectedLocation: null,
    theme: localStorage.getItem("campus_theme") || "dark",
    voiceMuted: false
  };

  // Apply Theme
  document.documentElement.setAttribute("data-theme", state.theme);

  // Initialize Engines
  const pathfinder = new CampusPathfinder(CAMPUS_DATA);

  let mapEngine = null;
  let copilot = null;

  // Initialize Map Engine
  const mapContainer = document.getElementById("map-container");
  mapEngine = new CampusMapEngine(
    mapContainer,
    CAMPUS_DATA,
    // On Room Click
    (room) => {
      openLocationModal(room);
    },
    // On Building Click
    (bldg) => {
      showToast(`Exploring ${bldg.name}`);
    }
  );

  // Initialize Copilot AI Assistant
  copilot = new CampusCopilot(
    CAMPUS_DATA,
    pathfinder,
    (action) => {
      handleCopilotAction(action);
    }
  );

  // Initialize UI Elements & Event Listeners
  initSearch();
  initCategoryFilters();
  initSidebarTabs();
  initCopilotChat();
  initDirectory();
  initRoutePlanner();
  initLiveEvents();
  initModal();
  initThemeAndHeader();

  // Check URL parameters for direct link sharing (e.g. ?loc=A-201)
  handleUrlParams();

  /**
   * Search Bar & Autocomplete
   */
  function initSearch() {
    const searchInput = document.getElementById("global-search-input");
    const searchDropdown = document.getElementById("search-dropdown");
    const micBtn = document.getElementById("search-mic-btn");

    // Keyboard shortcut: Ctrl + K or '/'
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      } else if (e.key === "/" && document.activeElement !== searchInput && document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        searchInput.focus();
      } else if (e.key === "Escape") {
        searchDropdown.style.display = "none";
        closeLocationModal();
      }
    });

    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        searchDropdown.style.display = "none";
        return;
      }

      const matches = CAMPUS_DATA.locations.filter(loc => {
        return loc.name.toLowerCase().includes(q) ||
               loc.id.toLowerCase().includes(q) ||
               loc.category.toLowerCase().includes(q) ||
               (loc.currentEvent && loc.currentEvent.toLowerCase().includes(q)) ||
               (loc.timetable && loc.timetable.some(s => s.code.toLowerCase().includes(q) || s.title.toLowerCase().includes(q) || s.time.toLowerCase().includes(q))) ||
               (loc.inCharge && loc.inCharge.toLowerCase().includes(q)) ||
               loc.tags.some(t => t.toLowerCase().includes(q));
      }).slice(0, 7);

      if (matches.length === 0) {
        searchDropdown.innerHTML = `
          <div style="padding: 16px; text-align: center; color: var(--text-dim); font-size: 0.85rem;">
            No campus spots matching "<strong>${q}</strong>". Try asking Copilot!
          </div>
        `;
        searchDropdown.style.display = "block";
        return;
      }

      searchDropdown.innerHTML = matches.map(loc => {
        const bldg = CAMPUS_DATA.buildings.find(b => b.id === loc.building);
        const catColor = mapEngine.getCategoryColor(loc.category);
        return `
          <div class="search-item" data-id="${loc.id}">
            <div class="search-item-info">
              <span class="search-item-name">${loc.name}</span>
              <span class="search-item-meta">${bldg ? bldg.name : ''} • Floor ${loc.floor} • Room ${loc.roomNumber}</span>
              ${loc.currentEvent ? `<span class="dir-lecture-time">⏰ ${loc.currentEvent}</span>` : ''}
            </div>
            <span class="search-item-badge" style="background: ${catColor}20; color: ${catColor}; border: 1px solid ${catColor}40;">
              ${loc.id}
            </span>
          </div>
        `;
      }).join("");

      searchDropdown.style.display = "block";

      searchDropdown.querySelectorAll(".search-item").forEach(item => {
        item.addEventListener("click", () => {
          const locId = item.getAttribute("data-id");
          const targetLoc = CAMPUS_DATA.locations.find(l => l.id === locId);
          if (targetLoc) {
            mapEngine.selectLocation(targetLoc.id);
            openLocationModal(targetLoc);
            searchDropdown.style.display = "none";
            searchInput.value = "";
          }
        });
      });
    });

    // Close dropdown on outside click
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".header-search")) {
        searchDropdown.style.display = "none";
      }
    });

    // Voice Input Mic Button
    micBtn.addEventListener("click", () => {
      if (!copilot.recognitionSupported) {
        showToast("Voice speech recognition not supported in this browser.");
        return;
      }

      if (copilot.isListening) {
        copilot.stopListening();
        micBtn.classList.remove("listening");
      } else {
        copilot.startListening(
          (text) => {
            searchInput.value = text;
            searchInput.dispatchEvent(new Event("input"));
            showToast(`Heard: "${text}"`);
          },
          (isListening) => {
            if (isListening) micBtn.classList.add("listening");
            else micBtn.classList.remove("listening");
          }
        );
      }
    });
  }

  /**
   * Category Filter Pills Bar
   */
  function initCategoryFilters() {
    const filterChips = document.querySelectorAll(".filter-chip");
    filterChips.forEach(chip => {
      chip.addEventListener("click", () => {
        filterChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const category = chip.getAttribute("data-category");
        state.selectedCategory = category;

        if (category === "all") {
          mapEngine.switchView("overview");
          renderDirectoryList(CAMPUS_DATA.locations);
          showToast("Viewing all campus buildings");
        } else {
          const filtered = CAMPUS_DATA.locations.filter(l => l.category === category);
          renderDirectoryList(filtered);
          showToast(`Filtered ${filtered.length} ${category} locations`);
          
          // If first result exists, jump to building
          if (filtered.length > 0) {
            mapEngine.selectLocation(filtered[0].id);
          }
        }
      });
    });
  }

  /**
   * Sidebar Tab Switcher
   */
  function initSidebarTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        tabContents.forEach(c => c.classList.remove("active"));

        btn.classList.add("active");
        const targetTab = btn.getAttribute("data-tab");
        const content = document.getElementById(`tab-${targetTab}`);
        if (content) content.classList.add("active");
      });
    });
  }

  /**
   * Copilot AI Chat Stream
   */
  function initCopilotChat() {
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("chat-send-btn");
    const micBtn = document.getElementById("chat-mic-btn");
    const messagesContainer = document.getElementById("chat-messages");
    const suggestionChips = document.querySelectorAll(".chip-suggestion");

    function sendMessage(text) {
      if (!text || !text.trim()) return;
      const userText = text.trim();

      // Render user bubble
      appendChatMessage("user", userText);
      chatInput.value = "";

      // Process query through Copilot
      setTimeout(() => {
        const response = copilot.processQuery(userText, {
          userLocation: state.selectedLocation ? state.selectedLocation.id : "gate-1"
        });

        appendChatMessage("bot", response.text, response.suggestions, response.action);

        // Execute action if provided
        if (response.action) {
          handleCopilotAction(response.action);
        }

        // Voice output
        if (response.speakText && !state.voiceMuted) {
          copilot.speak(response.speakText);
        }
      }, 300);
    }

    sendBtn.addEventListener("click", () => sendMessage(chatInput.value));
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage(chatInput.value);
    });

    suggestionChips.forEach(chip => {
      chip.addEventListener("click", () => {
        sendMessage(chip.textContent.replace(/^[^\w\s]+/, '').trim());
      });
    });

    // Chat Mic Button
    micBtn.addEventListener("click", () => {
      if (!copilot.recognitionSupported) {
        showToast("Voice speech recognition is not supported in this browser.");
        return;
      }

      if (copilot.isListening) {
        copilot.stopListening();
        micBtn.classList.remove("active");
      } else {
        copilot.startListening(
          (text) => {
            chatInput.value = text;
            sendMessage(text);
          },
          (isListening) => {
            if (isListening) micBtn.classList.add("active");
            else micBtn.classList.remove("active");
          }
        );
      }
    });

    // Default welcome message
    appendChatMessage(
      "bot",
      `👋 **Hello! I'm your Campus Copilot.**\n\nAsk me anything! For example:\n- *"Where is the AI Lab?"*\n- *"Directions from Gate 1 to Kalam Auditorium"*\n- *"Find quiet study places"*\n- *"What live events are happening today?"*`,
      ["Find AI Lab (A-201)", "Route to Kalam Auditorium", "Nearest Cafeteria", "Quiet Study Hall"]
    );
  }

  function appendChatMessage(role, text, suggestions = [], action = null) {
    const messagesContainer = document.getElementById("chat-messages");
    const msgEl = document.createElement("div");
    msgEl.className = `message ${role}`;

    // Parse simple markdown: **bold**, *italic*, `code`, # headers, - lists
    let formattedText = text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>');

    if (formattedText.includes('<li>')) {
      formattedText = formattedText.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    }
    formattedText = formattedText.replace(/\n/g, '<br/>');

    msgEl.innerHTML = `
      <div class="message-avatar">${role === 'bot' ? '🤖' : '👤'}</div>
      <div class="message-bubble">
        <div class="bubble-content">${formattedText}</div>
        ${suggestions && suggestions.length > 0 ? `
          <div class="message-actions">
            ${suggestions.map(s => `<button class="msg-action-btn" data-query="${s}">${s}</button>`).join("")}
          </div>
        ` : ''}
      </div>
    `;

    messagesContainer.appendChild(msgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Attach click listeners to suggested action buttons
    msgEl.querySelectorAll(".msg-action-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const query = btn.getAttribute("data-query");
        const chatInput = document.getElementById("chat-input");
        chatInput.value = query;
        document.getElementById("chat-send-btn").click();
      });
    });
  }

  function handleCopilotAction(action) {
    if (!action) return;

    if (action.type === "HIGHLIGHT_LOCATION" && action.location) {
      mapEngine.selectLocation(action.location.id);
      openLocationModal(action.location);
      showToast(`Viewing ${action.location.name}`);
    } else if (action.type === "SHOW_ROUTE" && action.route) {
      mapEngine.setRoute(action.route);
      populateRouteInstructions(action.route);
      // Switch to route tab in sidebar
      document.querySelector('[data-tab="route"]').click();
      showToast(`Route mapped: ${action.route.totalDistance}m (~${action.route.estimatedTimeMinutes} min)`);
    } else if (action.type === "FILTER_CATEGORY") {
      const chip = document.querySelector(`[data-category="${action.category}"]`);
      if (chip) chip.click();
    } else if (action.type === "SHOW_EVENTS") {
      document.querySelector('[data-tab="events"]').click();
    }
  }

  /**
   * Directory Tab
   */
  function initDirectory() {
    renderDirectoryList(CAMPUS_DATA.locations);
  }

  function renderDirectoryList(locations) {
    const listContainer = document.getElementById("directory-list");
    document.getElementById("directory-count-badge").textContent = `${locations.length} Locations`;

    listContainer.innerHTML = locations.map(loc => {
      const bldg = CAMPUS_DATA.buildings.find(b => b.id === loc.building);
      const catColor = mapEngine.getCategoryColor(loc.category);
      const statusDot = loc.status === "Available" ? "🟢" : "🔴";

      return `
        <div class="directory-card" data-id="${loc.id}">
          <div class="dir-card-top">
            <span class="dir-room-code" style="background: ${catColor}20; color: ${catColor}; border: 1px solid ${catColor}40;">
              ${loc.id}
            </span>
            <span class="dir-status-dot">${statusDot} ${loc.status}</span>
          </div>
          <div class="dir-card-title">${loc.name}</div>
          <div class="dir-card-meta">${bldg ? bldg.name : ''} • Level ${loc.floor} • Cap: ${loc.capacity}</div>
          ${loc.currentEvent ? `<div class="dir-lecture-time">⏰ ${loc.currentEvent}</div>` : ''}
        </div>
      `;
    }).join("");

    listContainer.querySelectorAll(".directory-card").forEach(card => {
      card.addEventListener("click", () => {
        const locId = card.getAttribute("data-id");
        const loc = CAMPUS_DATA.locations.find(l => l.id === locId);
        if (loc) {
          mapEngine.selectLocation(loc.id);
          openLocationModal(loc);
        }
      });
    });
  }

  /**
   * Route Planner Tab
   */
  function initRoutePlanner() {
    const startSelect = document.getElementById("route-start-select");
    const endSelect = document.getElementById("route-end-select");
    const computeBtn = document.getElementById("btn-calculate-route");
    const accessibleCheckbox = document.getElementById("route-accessible-toggle");

    // Populate dropdown options
    const options = [
      { group: "Campus Entry Points", items: CAMPUS_DATA.outdoorLandmarks },
      { group: "Buildings & Facilities", items: CAMPUS_DATA.locations }
    ];

    let startHtml = `<option value="gate-1">Main Campus Gate (North Gate)</option>`;
    let endHtml = `<option value="A-201">AI & Deep Learning Lab (A-201)</option>`;

    options.forEach(optGroup => {
      startHtml += `<optgroup label="${optGroup.group}">`;
      endHtml += `<optgroup label="${optGroup.group}">`;
      optGroup.items.forEach(item => {
        const label = item.roomNumber ? `${item.name} (${item.id})` : item.name;
        startHtml += `<option value="${item.id}">${label}</option>`;
        endHtml += `<option value="${item.id}">${label}</option>`;
      });
      startHtml += `</optgroup>`;
      endHtml += `</optgroup>`;
    });

    startSelect.innerHTML = startHtml;
    endSelect.innerHTML = endHtml;

    computeBtn.addEventListener("click", () => {
      const start = startSelect.value;
      const end = endSelect.value;
      const accessible = accessibleCheckbox.checked;

      const route = pathfinder.findRoute(start, end, accessible);
      if (!route.success) {
        showToast(route.error);
        return;
      }

      mapEngine.setRoute(route);
      populateRouteInstructions(route);
      showToast(`Route mapped: ${route.totalDistance}m (${route.estimatedTimeMinutes} min)`);
    });
  }

  function populateRouteInstructions(route) {
    const list = document.getElementById("route-directions-list");
    list.innerHTML = `
      <div style="padding: 10px 0; font-size: 0.82rem; color: var(--text-dim); display: flex; justify-content: space-between;">
        <span>📏 <strong>${route.totalDistance}m</strong> total distance</span>
        <span>⏱️ <strong>~${route.estimatedTimeMinutes} min</strong> walk</span>
      </div>
    ` + route.instructions.map((ins, i) => {
      return `
        <div class="route-direction-step">
          <div class="step-num-badge">${ins.step || (i + 1)}</div>
          <div class="step-info">
            <span class="step-title">${ins.text}</span>
            ${ins.dist ? `<span class="step-dist">${ins.dist}m</span>` : ''}
          </div>
        </div>
      `;
    }).join("");
  }

  /**
   * Live Events Tab
   */
  function initLiveEvents() {
    const eventsContainer = document.getElementById("events-list");
    eventsContainer.innerHTML = CAMPUS_DATA.liveEvents.map(ev => {
      const loc = CAMPUS_DATA.locations.find(l => l.id === ev.locationId);
      return `
        <div class="event-item-card">
          <div class="event-title">${ev.title}</div>
          <div class="event-details">
            <span>📍 <strong>Venue:</strong> ${loc ? loc.name : ev.locationId} (${ev.locationId})</span>
            <span>⏰ <strong>Time:</strong> ${ev.time}</span>
            <span>🎙️ <strong>Speaker:</strong> ${ev.speaker}</span>
          </div>
          <button class="event-action-btn" data-loc-id="${ev.locationId}">Navigate to Event ➔</button>
        </div>
      `;
    }).join("");

    eventsContainer.querySelectorAll(".event-action-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const locId = btn.getAttribute("data-loc-id");
        const loc = CAMPUS_DATA.locations.find(l => l.id === locId);
        if (loc) {
          mapEngine.selectLocation(loc.id);
          openLocationModal(loc);
        }
      });
    });
  }

  /**
   * Location Details Modal / Drawer
   */
  function initModal() {
    const overlay = document.getElementById("location-modal-overlay");
    const closeBtn = document.getElementById("modal-close-btn");
    const btnDirections = document.getElementById("modal-btn-directions");
    const btnShare = document.getElementById("modal-btn-share");
    const btnSpeak = document.getElementById("modal-btn-speak");

    closeBtn.addEventListener("click", closeLocationModal);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeLocationModal();
    });

    btnDirections.addEventListener("click", () => {
      if (!state.selectedLocation) return;
      const endSelect = document.getElementById("route-end-select");
      endSelect.value = state.selectedLocation.id;
      document.querySelector('[data-tab="route"]').click();
      document.getElementById("btn-calculate-route").click();
      closeLocationModal();
    });

    btnShare.addEventListener("click", () => {
      if (!state.selectedLocation) return;
      const url = `${window.location.origin}${window.location.pathname}?loc=${state.selectedLocation.id}`;
      navigator.clipboard.writeText(url).then(() => {
        showToast("📍 Location link copied to clipboard!");
      }).catch(() => {
        prompt("Copy this campus location link:", url);
      });
    });

    btnSpeak.addEventListener("click", () => {
      if (!state.selectedLocation) return;
      const loc = state.selectedLocation;
      const bldg = CAMPUS_DATA.buildings.find(b => b.id === loc.building);
      const text = `${loc.name}, room code ${loc.id}, located on Floor ${loc.floor} in ${bldg ? bldg.name : 'Campus'}. Status is ${loc.status}. ${loc.directionsHint}`;
      copilot.speak(text);
      showToast("🔊 Playing voice location announcement");
    });
  }

  function openLocationModal(loc) {
    state.selectedLocation = loc;
    const overlay = document.getElementById("location-modal-overlay");
    const bldg = CAMPUS_DATA.buildings.find(b => b.id === loc.building);
    const catColor = mapEngine.getCategoryColor(loc.category);

    document.getElementById("modal-code-pill").textContent = loc.id;
    document.getElementById("modal-code-pill").style.background = `${catColor}25`;
    document.getElementById("modal-code-pill").style.color = catColor;
    document.getElementById("modal-code-pill").style.border = `1px solid ${catColor}50`;

    document.getElementById("modal-cat-pill").textContent = loc.category.toUpperCase();
    document.getElementById("modal-cat-pill").style.background = "var(--bg-surface-elevated)";
    document.getElementById("modal-cat-pill").style.color = "var(--text-muted)";

    document.getElementById("modal-room-title").textContent = loc.name;
    document.getElementById("modal-room-address").innerHTML = `
      🏛️ ${bldg ? bldg.name : ''} • Floor ${loc.floor} • Room ${loc.roomNumber}
    `;

    document.getElementById("modal-room-desc").textContent = loc.description || "Official campus academic and research facility.";
    document.getElementById("modal-val-status").textContent = loc.status;
    document.getElementById("modal-val-status").style.color = loc.status === "Available" ? "var(--accent-emerald)" : "var(--accent-amber)";
    document.getElementById("modal-val-capacity").textContent = `~${loc.capacity} Occupants`;
    document.getElementById("modal-val-incharge").textContent = loc.inCharge || "Department Office";
    document.getElementById("modal-val-hours").textContent = loc.hours || "Standard Campus Hours";

    // Equipment chips
    const eqContainer = document.getElementById("modal-equipment-chips");
    if (loc.equipment && loc.equipment.length > 0) {
      eqContainer.innerHTML = loc.equipment.map(eq => `<span class="equipment-chip">⚙️ ${eq}</span>`).join("");
    } else {
      eqContainer.innerHTML = `<span class="equipment-chip">Standard Campus Infrastructure</span>`;
    }

    // Timetable & Lecture Timings
    const timetableContainer = document.getElementById("modal-timetable-container");
    const timetableList = document.getElementById("modal-timetable-list");
    if (timetableContainer && timetableList) {
      if (loc.timetable && loc.timetable.length > 0) {
        timetableContainer.style.display = "block";
        timetableList.innerHTML = loc.timetable.map(slot => {
          const isLive = slot.status === "Live Now" || slot.isCurrent;
          const badgeClass = isLive ? "slot-badge-live" : (slot.status === "Upcoming" ? "slot-badge-upcoming" : "slot-badge-completed");
          const badgeText = isLive ? "🟢 LIVE NOW" : (slot.status === "Upcoming" ? "⏳ UPCOMING" : "✓ COMPLETED");
          return `
            <div class="timetable-slot-card ${isLive ? 'live' : ''}">
              <div class="slot-left">
                <div class="slot-time-pill">
                  <span>⏰</span> ${slot.time}
                </div>
                <div class="slot-title-row">
                  <span class="slot-code">${slot.code || 'CLS'}</span>
                  <span class="slot-title">${slot.title}</span>
                </div>
                <div class="slot-meta">👨‍🏫 ${slot.instructor || 'Faculty'} • 🏷️ ${slot.type || 'Lecture'}</div>
              </div>
              <div class="slot-right">
                <span class="${badgeClass}">${badgeText}</span>
              </div>
            </div>
          `;
        }).join("");
      } else {
        timetableContainer.style.display = "none";
      }
    }

    // Directions Hint
    document.getElementById("modal-directions-hint").textContent = loc.directionsHint || "Proceed to building entrance and follow directional signage.";

    overlay.classList.add("active");
  }

  function closeLocationModal() {
    const overlay = document.getElementById("location-modal-overlay");
    overlay.classList.remove("active");
  }

  /**
   * Theme & Voice Settings
   */
  function initThemeAndHeader() {
    const themeBtn = document.getElementById("btn-toggle-theme");
    const voiceBtn = document.getElementById("btn-toggle-voice");

    themeBtn.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("campus_theme", state.theme);
      showToast(`${state.theme === 'dark' ? '🌙 Dark' : '☀️ Light'} theme enabled`);
    });

    voiceBtn.addEventListener("click", () => {
      state.voiceMuted = !state.voiceMuted;
      copilot.voiceEnabled = !state.voiceMuted;
      if (state.voiceMuted) {
        copilot.stopSpeaking();
        voiceBtn.style.color = "var(--text-dim)";
        showToast("🔇 Voice synthesis muted");
      } else {
        voiceBtn.style.color = "var(--accent-cyan)";
        showToast("🔊 Voice synthesis enabled");
      }
    });

    // Overview reset button in header brand
    document.getElementById("header-brand").addEventListener("click", () => {
      mapEngine.switchView("overview");
      mapEngine.clearRoute();
      showToast("Returned to Campus Grounds Overview");
    });
  }

  /**
   * Parse query parameters for deep linking
   */
  function handleUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const locParam = params.get("loc");
    if (locParam) {
      const loc = CAMPUS_DATA.locations.find(l => l.id.toLowerCase() === locParam.toLowerCase());
      if (loc) {
        setTimeout(() => {
          mapEngine.selectLocation(loc.id);
          openLocationModal(loc);
        }, 400);
      }
    }
  }

  /**
   * Toast notification helper
   */
  function showToast(message) {
    let toast = document.getElementById("campus-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "campus-toast";
      toast.className = "campus-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }
});
