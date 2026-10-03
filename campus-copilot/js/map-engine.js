/**
 * CAMPUS COPILOT - DYNAMIC VECTOR MAP ENGINE
 * High-performance SVG interactive map renderer supporting:
 * - Master Campus Overview (all buildings, gardens, pathways, gates)
 * - Detailed Architectural Floor Plans (rooms, hallways, doors, elevators, restrooms)
 * - Animated Glowing Route Overlay (multi-floor navigation steps)
 * - Pan, Zoom, Room Selection, and Real-Time Status Indicators
 */

class CampusMapEngine {
  constructor(containerElement, campusData, onRoomClick, onBuildingClick) {
    this.container = containerElement;
    this.data = campusData;
    this.onRoomClick = onRoomClick || (() => {});
    this.onBuildingClick = onBuildingClick || (() => {});

    this.currentViewMode = "overview"; // 'overview' | 'interior'
    this.currentBuildingId = "block-a";
    this.currentFloor = 0;
    this.selectedLocationId = null;
    this.activeRoute = null;
    this.activeRouteStepIndex = 0;

    // Viewport transform (Pan & Zoom)
    this.zoomLevel = 1;
    this.panX = 0;
    this.panY = 0;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;

    this.initDOM();
    this.attachEventListeners();
    this.render();
  }

  initDOM() {
    this.container.innerHTML = `
      <div class="map-viewport-wrapper" id="map-viewport">
        <svg id="campus-svg" viewBox="0 0 1000 750" preserveAspectRatio="xMidYMid meet">
          <defs>
            <!-- Gradients & Glow Filters -->
            <filter id="glow-route" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="drop-shadow-card" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.35" />
            </filter>
            
            <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8" />
              <stop offset="50%" stop-color="#818cf8" />
              <stop offset="100%" stop-color="#c084fc" />
            </linearGradient>

            <linearGradient id="grass-pattern" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0f2b1d" />
              <stop offset="100%" stop-color="#0b1e15" />
            </linearGradient>

            <!-- Marker Pins -->
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
            </marker>
          </defs>

          <!-- Dynamic Layers -->
          <g id="map-world-group">
            <g id="map-base-layer"></g>
            <g id="map-buildings-layer"></g>
            <g id="map-interior-layer"></g>
            <g id="map-route-layer"></g>
            <g id="map-markers-layer"></g>
          </g>
        </svg>

        <!-- Floating Map Controls -->
        <div class="map-floating-hud">
          <!-- View State Breadcrumb -->
          <div class="map-breadcrumb-pill" id="map-breadcrumb">
            <span class="hud-icon">🏛️</span>
            <span id="breadcrumb-text">Campus Grounds Overview</span>
          </div>

          <!-- Zoom & Reset -->
          <div class="map-controls-group">
            <button class="map-hud-btn" id="btn-zoom-in" title="Zoom In" aria-label="Zoom In">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <button class="map-hud-btn" id="btn-zoom-out" title="Zoom Out" aria-label="Zoom Out">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <button class="map-hud-btn" id="btn-reset-view" title="Reset View" aria-label="Reset View">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
            </button>
            <button class="map-hud-btn" id="btn-toggle-view" title="Toggle Overview / Interior" aria-label="Toggle View">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </button>
          </div>
        </div>

        <!-- Floor Switcher Bar (Visible in Interior Mode) -->
        <div class="map-floor-switcher" id="floor-switcher" style="display: none;">
          <span class="floor-label">LEVEL</span>
          <div class="floor-pill-buttons" id="floor-buttons-container"></div>
        </div>

        <!-- Route Stepper Banner (Visible during Active Route) -->
        <div class="route-stepper-banner" id="route-stepper" style="display: none;">
          <div class="stepper-left">
            <span class="stepper-badge" id="stepper-stage-badge">Stage 1 of 2</span>
            <span class="stepper-desc" id="stepper-desc-text">Campus Walk to Turing Hall</span>
          </div>
          <div class="stepper-controls">
            <button class="stepper-btn" id="btn-step-prev" title="Previous Step">◀</button>
            <button class="stepper-btn" id="btn-step-next" title="Next Step">▶</button>
            <button class="stepper-close-btn" id="btn-clear-route" title="Exit Route">✕</button>
          </div>
        </div>
      </div>
    `;

    this.svg = document.getElementById("campus-svg");
    this.worldGroup = document.getElementById("map-world-group");
    this.baseLayer = document.getElementById("map-base-layer");
    this.buildingsLayer = document.getElementById("map-buildings-layer");
    this.interiorLayer = document.getElementById("map-interior-layer");
    this.routeLayer = document.getElementById("map-route-layer");
    this.markersLayer = document.getElementById("map-markers-layer");
    this.breadcrumb = document.getElementById("breadcrumb-text");
    this.floorSwitcher = document.getElementById("floor-switcher");
    this.floorButtonsContainer = document.getElementById("floor-buttons-container");
    this.routeStepper = document.getElementById("route-stepper");
  }

  attachEventListeners() {
    const viewport = document.getElementById("map-viewport");

    // Pan interactions
    viewport.addEventListener("mousedown", (e) => {
      if (e.target.closest(".map-floating-hud") || e.target.closest(".map-floor-switcher") || e.target.closest(".route-stepper-banner")) return;
      this.isDragging = true;
      this.dragStartX = e.clientX - this.panX;
      this.dragStartY = e.clientY - this.panY;
      viewport.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      this.panX = e.clientX - this.dragStartX;
      this.panY = e.clientY - this.dragStartY;
      this.applyTransform();
    });

    window.addEventListener("mouseup", () => {
      this.isDragging = false;
      viewport.style.cursor = "grab";
    });

    // Zoom on wheel
    viewport.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.88;
      this.zoom(zoomFactor);
    }, { passive: false });

    // Touch support for mobile pinch & pan
    let touchStartDist = 0;
    viewport.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.dragStartX = e.touches[0].clientX - this.panX;
        this.dragStartY = e.touches[0].clientY - this.panY;
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    });

    viewport.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1 && this.isDragging) {
        this.panX = e.touches[0].clientX - this.dragStartX;
        this.panY = e.touches[0].clientY - this.dragStartY;
        this.applyTransform();
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = dist / touchStartDist;
        this.zoom(factor > 1 ? 1.05 : 0.95);
        touchStartDist = dist;
      }
    });

    viewport.addEventListener("touchend", () => {
      this.isDragging = false;
    });

    // Control buttons
    document.getElementById("btn-zoom-in").addEventListener("click", () => this.zoom(1.2));
    document.getElementById("btn-zoom-out").addEventListener("click", () => this.zoom(0.83));
    document.getElementById("btn-reset-view").addEventListener("click", () => this.resetTransform());
    document.getElementById("btn-toggle-view").addEventListener("click", () => {
      if (this.currentViewMode === "overview") {
        this.switchView("interior", this.currentBuildingId, this.currentFloor);
      } else {
        this.switchView("overview");
      }
    });

    document.getElementById("btn-clear-route").addEventListener("click", () => this.clearRoute());
    document.getElementById("btn-step-prev").addEventListener("click", () => this.prevRouteStep());
    document.getElementById("btn-step-next").addEventListener("click", () => this.nextRouteStep());
  }

  zoom(factor) {
    const newZoom = Math.min(Math.max(this.zoomLevel * factor, 0.6), 4.5);
    this.zoomLevel = newZoom;
    this.applyTransform();
  }

  resetTransform() {
    this.zoomLevel = 1;
    this.panX = 0;
    this.panY = 0;
    this.applyTransform();
  }

  applyTransform() {
    this.worldGroup.setAttribute(
      "transform",
      `translate(${this.panX}, ${this.panY}) scale(${this.zoomLevel})`
    );
  }

  switchView(mode, buildingId = null, floor = 0) {
    this.currentViewMode = mode;
    if (buildingId) this.currentBuildingId = buildingId;
    this.currentFloor = floor;

    if (mode === "overview") {
      this.floorSwitcher.style.display = "none";
      this.breadcrumb.textContent = "Campus Grounds Overview";
      this.resetTransform();
    } else {
      const bldg = this.data.buildings.find(b => b.id === this.currentBuildingId);
      this.floorSwitcher.style.display = "flex";
      this.updateFloorButtons(bldg);
      const floorLabel = bldg ? bldg.floorLabels[this.currentFloor] : `Floor ${this.currentFloor}`;
      this.breadcrumb.textContent = `${bldg ? bldg.name : ''} • ${floorLabel}`;
      this.resetTransform();
    }

    this.render();
  }

  updateFloorButtons(building) {
    if (!building) return;
    this.floorButtonsContainer.innerHTML = "";
    building.floors.forEach(f => {
      const btn = document.createElement("button");
      btn.className = `floor-pill-btn ${f === this.currentFloor ? 'active' : ''}`;
      btn.textContent = f === 0 ? "G" : `L${f}`;
      btn.title = building.floorLabels[f] || `Floor ${f}`;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.currentFloor = f;
        this.switchView("interior", this.currentBuildingId, f);
      });
      this.floorButtonsContainer.appendChild(btn);
    });
  }

  render() {
    this.baseLayer.innerHTML = "";
    this.buildingsLayer.innerHTML = "";
    this.interiorLayer.innerHTML = "";
    this.markersLayer.innerHTML = "";

    if (this.currentViewMode === "overview") {
      this.renderCampusOverview();
    } else {
      this.renderInteriorView();
    }

    // Render active route if present
    this.renderRoute();
  }

  /**
   * Render Master Campus Overview View
   */
  renderCampusOverview() {
    // 1. Campus Grounds Base (Green grass, perimeter boundary, roads)
    const baseSvg = `
      <!-- Grass Lawn Background -->
      <rect x="0" y="0" width="1000" height="750" fill="url(#grass-pattern)" rx="20" />
      
      <!-- Perimeter Campus Boundary Fence -->
      <rect x="20" y="20" width="960" height="710" fill="none" stroke="#1e293b" stroke-width="3" stroke-dasharray="10,6" rx="16" />

      <!-- Roads & Paved Pedestrian Boulevards -->
      <!-- Central North-South Avenue -->
      <path d="M 500,40 L 500,710" stroke="#334155" stroke-width="38" stroke-linecap="round" />
      <path d="M 500,40 L 500,710" stroke="#475569" stroke-width="2" stroke-dasharray="8,8" />

      <!-- East-West Cross Boulevard -->
      <path d="M 180,390 L 820,390" stroke="#334155" stroke-width="30" stroke-linecap="round" />

      <!-- Circular Quadrangle Promenade -->
      <circle cx="500" cy="220" r="85" fill="#132a21" stroke="#334155" stroke-width="26" />
      
      <!-- Central Decorative Fountain & Pool -->
      <circle cx="500" cy="220" r="42" fill="#0284c7" stroke="#38bdf8" stroke-width="4" filter="url(#glow-route)" />
      <circle cx="500" cy="220" r="24" fill="#38bdf8" opacity="0.6">
        <animate attributeName="r" values="18;32;18" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="500" y="224" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif">FOUNTAIN</text>

      <!-- Diagonal Pedestrian Walkways -->
      <path d="M 340,140 L 500,220 L 660,140" stroke="#334155" stroke-width="14" fill="none" stroke-linejoin="round" />
      <path d="M 340,620 L 500,560 L 660,620" stroke="#334155" stroke-width="14" fill="none" stroke-linejoin="round" />
      <path d="M 500,220 L 500,390 L 500,560" stroke="#334155" stroke-width="20" fill="none" />

      <!-- Campus Athletic Stadium (East) -->
      <g id="stadium-group" transform="translate(860, 310)">
        <rect x="0" y="0" width="90" height="150" rx="45" fill="#15803d" stroke="#ca8a04" stroke-width="3" />
        <line x1="0" y1="75" x2="90" y2="75" stroke="#ffffff" stroke-width="2" opacity="0.8" />
        <circle cx="45" cy="75" r="20" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.8" />
        <text x="45" y="172" font-size="11" font-weight="600" fill="#94a3b8" text-anchor="middle">Stadium</text>
      </g>

      <!-- North Visitor Parking P1 -->
      <g transform="translate(60, 60)">
        <rect x="0" y="0" width="90" height="50" rx="6" fill="#1e293b" stroke="#475569" stroke-width="2" />
        <text x="45" y="28" font-size="11" font-weight="600" fill="#e2e8f0" text-anchor="middle">PARKING P1</text>
        <text x="45" y="42" font-size="9" fill="#38bdf8" text-anchor="middle">⚡ EV Ready</text>
      </g>

      <!-- Main Gate 1 (North) -->
      <g class="campus-gate" transform="translate(500, 38)">
        <circle cx="0" cy="0" r="16" fill="#2563eb" stroke="#60a5fa" stroke-width="2" />
        <text x="0" y="4" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="800">G1</text>
        <text x="0" y="-22" font-size="12" font-weight="700" fill="#93c5fd" text-anchor="middle">Main Gate (North)</text>
      </g>

      <!-- South Metro Gate 2 -->
      <g class="campus-gate" transform="translate(500, 712)">
        <circle cx="0" cy="0" r="16" fill="#059669" stroke="#34d399" stroke-width="2" />
        <text x="0" y="4" font-size="11" fill="#ffffff" text-anchor="middle" font-weight="800">G2</text>
        <text x="0" y="32" font-size="12" font-weight="700" fill="#6ee7b7" text-anchor="middle">South Gate (Metro Station)</text>
      </g>

      <!-- Open-Air Amphitheater -->
      <g transform="translate(500, 560)">
        <circle cx="0" cy="0" r="28" fill="#312e81" stroke="#818cf8" stroke-width="3" />
        <circle cx="0" cy="0" r="18" fill="none" stroke="#a5b4fc" stroke-width="1.5" stroke-dasharray="3,3" />
        <text x="0" y="4" font-size="9" font-weight="700" fill="#e0e7ff" text-anchor="middle">STAGE</text>
        <text x="0" y="44" font-size="11" font-weight="600" fill="#c7d2fe" text-anchor="middle">Amphitheater</text>
      </g>
    `;
    this.baseLayer.innerHTML = baseSvg;

    // 2. Buildings (Glassmorphic cards with isometric elevation)
    this.data.buildings.forEach(bldg => {
      const rect = bldg.overviewRect;
      const isSelected = (this.currentBuildingId === bldg.id);
      const roomCount = this.data.locations.filter(l => l.building === bldg.id).length;

      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", `campus-building-card ${isSelected ? 'selected' : ''}`);
      g.setAttribute("data-building-id", bldg.id);
      g.style.cursor = "pointer";

      g.innerHTML = `
        <!-- Elevation Base Drop Shadow -->
        <rect x="${rect.x + 6}" y="${rect.y + 8}" width="${rect.w}" height="${rect.h}" rx="${rect.rx}" fill="#000000" opacity="0.4" />
        
        <!-- Building Main Shell -->
        <rect class="bldg-shell" x="${rect.x}" y="${rect.y}" width="${rect.w}" height="${rect.h}" rx="${rect.rx}" 
              fill="#1e2235" stroke="${bldg.color}" stroke-width="${isSelected ? 3.5 : 2}" />
        
        <!-- Top Accent Band -->
        <path d="M ${rect.x} ${rect.y + 12} A ${rect.rx} ${rect.rx} 0 0 1 ${rect.x + 12} ${rect.y} L ${rect.x + rect.w - 12} ${rect.y} A ${rect.rx} ${rect.rx} 0 0 1 ${rect.x + rect.w} ${rect.y + 12} L ${rect.x + rect.w} ${rect.y + 44} L ${rect.x} ${rect.y + 44} Z" fill="${bldg.color}" opacity="0.25" />
        
        <!-- Block Letter Badge -->
        <circle cx="${rect.x + 30}" cy="${rect.y + 22}" r="14" fill="${bldg.color}" />
        <text x="${rect.x + 30}" y="${rect.y + 27}" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif">${bldg.code}</text>

        <!-- Building Name -->
        <text x="${rect.x + 52}" y="${rect.y + 26}" font-size="12" font-weight="700" fill="#f8fafc" font-family="'Plus Jakarta Sans', sans-serif">${bldg.name.split('(')[0]}</text>
        
        <!-- Building Tagline -->
        <text x="${rect.x + 16}" y="${rect.y + 68}" font-size="9.5" fill="#94a3b8" font-family="'Plus Jakarta Sans', sans-serif">
          ${this.truncate(bldg.tagline, 26)}
        </text>

        <!-- Floor Count & Room Count Pills -->
        <g transform="translate(${rect.x + 16}, ${rect.y + 90})">
          <rect x="0" y="0" width="58" height="20" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1" />
          <text x="29" y="14" font-size="9" font-weight="600" fill="#cbd5e1" text-anchor="middle">${bldg.floors.length} Levels</text>

          <rect x="66" y="0" width="62" height="20" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1" />
          <text x="97" y="14" font-size="9" font-weight="600" fill="#38bdf8" text-anchor="middle">${roomCount} Rooms</text>
        </g>

        <!-- Action Prompt: Click to Inspect Interior -->
        <g class="bldg-hover-action" transform="translate(${rect.x + 16}, ${rect.y + 124})">
          <rect x="0" y="0" width="${rect.w - 32}" height="24" rx="6" fill="${bldg.color}" opacity="0.9" />
          <text x="${(rect.w - 32) / 2}" y="16" font-size="10.5" font-weight="700" fill="#ffffff" text-anchor="middle">Explore Floors ➔</text>
        </g>
      `;

      g.addEventListener("click", () => {
        this.currentBuildingId = bldg.id;
        this.currentFloor = 0;
        this.switchView("interior", bldg.id, 0);
        this.onBuildingClick(bldg);
      });

      this.buildingsLayer.appendChild(g);
    });
  }

  /**
   * Render Architectural Interior Floor Plan View
   */
  renderInteriorView() {
    const bldg = this.data.buildings.find(b => b.id === this.currentBuildingId);
    if (!bldg) return;

    // Filter locations for current building & current floor
    const rooms = this.data.locations.filter(
      l => l.building === this.currentBuildingId && l.floor === this.currentFloor
    );

    // Floor Plan Frame
    const frameSvg = `
      <!-- Building Floor Outer Container Background -->
      <rect x="180" y="80" width="640" height="580" rx="20" fill="#0f172a" stroke="${bldg.color}" stroke-width="3" filter="url(#drop-shadow-card)" />
      
      <!-- Blueprint Grid Background Pattern -->
      <g opacity="0.08" stroke="#38bdf8" stroke-width="0.8">
        ${this.generateGridLines(180, 80, 640, 580, 40)}
      </g>

      <!-- Floor Plan Header -->
      <g transform="translate(200, 115)">
        <text x="0" y="0" font-size="20" font-weight="800" fill="#f8fafc" font-family="'Plus Jakarta Sans', sans-serif">${bldg.name}</text>
        <text x="0" y="20" font-size="12" font-weight="600" fill="${bldg.color}">${bldg.floorLabels[this.currentFloor]} Architecture</text>
      </g>

      <!-- Hallways Network (Corridors) -->
      <!-- Central Horizontal Corridor -->
      <rect x="220" y="340" width="560" height="50" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
      <text x="500" y="370" font-size="11" font-weight="700" fill="#64748b" text-anchor="middle" letter-spacing="2">MAIN CORRIDOR</text>

      <!-- Central Vertical Crossway -->
      <rect x="475" y="160" width="50" height="420" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1.5" />

      <!-- Central Vertical Transit Bank (Elevator, Stairs, Restrooms) -->
      <!-- Elevator -->
      <g class="facility-icon" transform="translate(485, 175)">
        <rect x="0" y="0" width="30" height="30" rx="6" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />
        <text x="15" y="19" font-size="13" fill="#ffffff" text-anchor="middle">🛗</text>
        <text x="15" y="42" font-size="8.5" font-weight="700" fill="#38bdf8" text-anchor="middle">LIFT</text>
      </g>

      <!-- Stairs -->
      <g class="facility-icon" transform="translate(485, 520)">
        <rect x="0" y="0" width="30" height="30" rx="6" fill="#475569" stroke="#94a3b8" stroke-width="1.5" />
        <text x="15" y="19" font-size="13" fill="#ffffff" text-anchor="middle">🪜</text>
        <text x="15" y="42" font-size="8.5" font-weight="700" fill="#cbd5e1" text-anchor="middle">STAIRS</text>
      </g>

      <!-- Restroom -->
      <g class="facility-icon" transform="translate(485, 350)">
        <rect x="0" y="0" width="30" height="30" rx="6" fill="#059669" stroke="#34d399" stroke-width="1.5" />
        <text x="15" y="19" font-size="13" fill="#ffffff" text-anchor="middle">🚻</text>
        <text x="15" y="42" font-size="8.5" font-weight="700" fill="#6ee7b7" text-anchor="middle">WC</text>
      </g>
    `;
    this.interiorLayer.innerHTML = frameSvg;

    // Render individual room spaces
    // Calculate offsets within the 640x580 container
    const offsetX = 180;
    const offsetY = 80;

    rooms.forEach(room => {
      const rx = offsetX + (room.rect ? room.rect.x : 40);
      const ry = offsetY + (room.rect ? room.rect.y : 40);
      const rw = room.rect ? room.rect.w : 180;
      const rh = room.rect ? room.rect.h : 140;

      const isSelected = (this.selectedLocationId === room.id);
      const catColor = this.getCategoryColor(room.category);
      const statusColor = room.status === "Available" ? "#10b981" : "#f59e0b";

      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", `floor-room-cell ${isSelected ? 'selected' : ''}`);
      g.setAttribute("data-room-id", room.id);
      g.style.cursor = "pointer";

      g.innerHTML = `
        <!-- Room Base Fill -->
        <rect class="room-rect" x="${rx}" y="${ry}" width="${rw}" height="${rh}" rx="10"
              fill="#182234" stroke="${isSelected ? '#38bdf8' : catColor}" stroke-width="${isSelected ? 3.5 : 1.8}" />
        
        <!-- Category Top Accent Bar -->
        <rect x="${rx}" y="${ry}" width="${rw}" height="6" rx="3" fill="${catColor}" />

        <!-- Room Code Pill (e.g. A-201) -->
        <g transform="translate(${rx + 12}, ${ry + 16})">
          <rect x="0" y="0" width="56" height="20" rx="4" fill="#0f172a" stroke="${catColor}" stroke-width="1" />
          <text x="28" y="14" font-size="10.5" font-weight="800" fill="#ffffff" text-anchor="middle">${room.id}</text>
        </g>

        <!-- Status Dot Pill -->
        <g transform="translate(${rx + rw - 70}, ${ry + 16})">
          <circle cx="6" cy="10" r="4" fill="${statusColor}" />
          <text x="14" y="13" font-size="9" font-weight="600" fill="#cbd5e1">${room.status.split(' ')[0]}</text>
        </g>

        <!-- Room Full Name -->
        <text x="${rx + 12}" y="${ry + 58}" font-size="11.5" font-weight="700" fill="#f8fafc" font-family="'Plus Jakarta Sans', sans-serif">
          ${this.truncate(room.name, 22)}
        </text>

        <!-- In-charge or Capacity -->
        <text x="${rx + 12}" y="${ry + 78}" font-size="9.5" fill="#94a3b8">
          👥 Cap: ${room.capacity} | ${this.truncate(room.inCharge || '', 18)}
        </text>

        <!-- Current Event / Activity & Timing -->
        <text x="${rx + 12}" y="${ry + 98}" font-size="9" fill="#38bdf8" font-weight="600">
          ⏰ ${this.truncate(room.currentEvent || 'Open Access', 26)}
        </text>
        ${room.nextLecture ? `
          <text x="${rx + 12}" y="${ry + 114}" font-size="8.5" fill="#94a3b8">
            ⏳ ${this.truncate(room.nextLecture, 26)}
          </text>
        ` : ''}

        <!-- Door Indicator (Hole into corridor) -->
        <circle cx="${offsetX + (room.door ? room.door.x : rx + rw/2)}" 
                cy="${offsetY + (room.door ? room.door.y : ry + rh)}" 
                r="5" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />
      `;

      g.addEventListener("click", (e) => {
        e.stopPropagation();
        this.selectLocation(room.id);
        this.onRoomClick(room);
      });

      this.interiorLayer.appendChild(g);
    });
  }

  generateGridLines(x, y, w, h, step) {
    let lines = "";
    for (let cx = x; cx <= x + w; cx += step) {
      lines += `<line x1="${cx}" y1="${y}" x2="${cx}" y2="${y + h}" />`;
    }
    for (let cy = y; cy <= y + h; cy += step) {
      lines += `<line x1="${x}" y1="${cy}" x2="${x + w}" y2="${cy}" />`;
    }
    return lines;
  }

  getCategoryColor(cat) {
    const map = {
      lab: "#8b5cf6",        // Purple
      classroom: "#3b82f6",  // Blue
      seminar: "#f59e0b",    // Amber/Gold
      library: "#10b981",    // Green
      food: "#ec4899",       // Pink
      admin: "#06b6d4",      // Cyan
      sports: "#14b8a6",     // Teal
      amenity: "#64748b"     // Slate
    };
    return map[cat] || "#94a3b8";
  }

  selectLocation(locationId) {
    this.selectedLocationId = locationId;
    const loc = this.data.locations.find(l => l.id === locationId);
    if (!loc) return;

    // If currently in overview or wrong floor, switch view
    if (this.currentViewMode !== "interior" || this.currentBuildingId !== loc.building || this.currentFloor !== loc.floor) {
      this.switchView("interior", loc.building, loc.floor);
    } else {
      this.render();
    }
  }

  /**
   * Set and render an active route computed by Pathfinder
   */
  setRoute(routeObj) {
    this.activeRoute = routeObj;
    this.activeRouteStepIndex = 0;
    this.routeStepper.style.display = "flex";
    this.updateRouteStepUI();
  }

  clearRoute() {
    this.activeRoute = null;
    this.routeStepper.style.display = "none";
    this.render();
  }

  updateRouteStepUI() {
    if (!this.activeRoute || !this.activeRoute.segments || this.activeRoute.segments.length === 0) return;

    const totalSteps = this.activeRoute.segments.length;
    const currentSegment = this.activeRoute.segments[this.activeRouteStepIndex];

    document.getElementById("stepper-stage-badge").textContent = `Stage ${this.activeRouteStepIndex + 1} of ${totalSteps}`;
    
    let desc = "";
    if (currentSegment.building === "outdoor") {
      desc = "Campus Grounds Walkway";
      if (this.currentViewMode !== "overview") {
        this.switchView("overview");
      }
    } else {
      const bldg = this.data.buildings.find(b => b.id === currentSegment.building);
      desc = `${bldg ? bldg.name : ''} (Floor ${currentSegment.floor})`;
      if (this.currentViewMode !== "interior" || this.currentBuildingId !== currentSegment.building || this.currentFloor !== currentSegment.floor) {
        this.switchView("interior", currentSegment.building, currentSegment.floor);
      }
    }

    document.getElementById("stepper-desc-text").textContent = desc;
    this.renderRoute();
  }

  nextRouteStep() {
    if (!this.activeRoute) return;
    if (this.activeRouteStepIndex < this.activeRoute.segments.length - 1) {
      this.activeRouteStepIndex++;
      this.updateRouteStepUI();
    }
  }

  prevRouteStep() {
    if (!this.activeRoute) return;
    if (this.activeRouteStepIndex > 0) {
      this.activeRouteStepIndex--;
      this.updateRouteStepUI();
    }
  }

  /**
   * Draw the glowing route path across the active view
   */
  renderRoute() {
    this.routeLayer.innerHTML = "";
    this.markersLayer.innerHTML = "";
    if (!this.activeRoute || !this.activeRoute.path || this.activeRoute.path.length === 0) return;

    const currentSegment = this.activeRoute.segments[this.activeRouteStepIndex];
    if (!currentSegment) return;

    // Filter nodes for the current view
    const segmentNodes = currentSegment.nodes.map(id => this.data.navigationGraph.nodes[id]).filter(Boolean);
    if (segmentNodes.length < 2) return;

    // Build SVG path data
    let d = "";
    const isOverview = (this.currentViewMode === "overview");

    segmentNodes.forEach((node, i) => {
      let x = node.x;
      let y = node.y;

      if (!isOverview) {
        // Offset by interior container
        x = 180 + node.x;
        y = 80 + node.y;
      }

      if (i === 0) {
        d += `M ${x} ${y} `;
      } else {
        d += `L ${x} ${y} `;
      }
    });

    // Glowing Animated Path
    const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathEl.setAttribute("d", d);
    pathEl.setAttribute("fill", "none");
    pathEl.setAttribute("stroke", "url(#route-gradient)");
    pathEl.setAttribute("stroke-width", "5");
    pathEl.setAttribute("stroke-linecap", "round");
    pathEl.setAttribute("stroke-linejoin", "round");
    pathEl.setAttribute("filter", "url(#glow-route)");
    pathEl.setAttribute("class", "animated-route-line");
    this.routeLayer.appendChild(pathEl);

    // Starting Point Pulse Beacon
    const startNode = segmentNodes[0];
    const startX = isOverview ? startNode.x : 180 + startNode.x;
    const startY = isOverview ? startNode.y : 80 + startNode.y;

    const startMarker = document.createElementNS("http://www.w3.org/2000/svg", "g");
    startMarker.innerHTML = `
      <circle cx="${startX}" cy="${startY}" r="14" fill="#38bdf8" opacity="0.3">
        <animate attributeName="r" values="8;20;8" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="${startX}" cy="${startY}" r="7" fill="#38bdf8" stroke="#ffffff" stroke-width="2" />
    `;
    this.markersLayer.appendChild(startMarker);

    // Destination Point Pin
    const endNode = segmentNodes[segmentNodes.length - 1];
    const endX = isOverview ? endNode.x : 180 + endNode.x;
    const endY = isOverview ? endNode.y : 80 + endNode.y;

    const endMarker = document.createElementNS("http://www.w3.org/2000/svg", "g");
    endMarker.innerHTML = `
      <circle cx="${endX}" cy="${endY}" r="16" fill="#ec4899" opacity="0.3">
        <animate attributeName="r" values="10;24;10" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.1;0.7" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="${endX}" cy="${endY}" r="8" fill="#ec4899" stroke="#ffffff" stroke-width="2.5" />
      <text x="${endX}" y="${endY - 14}" font-size="11" font-weight="800" fill="#ec4899" text-anchor="middle">🎯 DESTINATION</text>
    `;
    this.markersLayer.appendChild(endMarker);
  }

  truncate(str, max) {
    if (!str) return "";
    return str.length > max ? str.substring(0, max - 1) + "…" : str;
  }
}

// Export to window
if (typeof window !== "undefined") {
  window.CampusMapEngine = CampusMapEngine;
}
