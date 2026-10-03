/**
 * CAMPUS COPILOT - AI ASSISTANT ENGINE
 * Natural language intent parser, campus knowledge query engine,
 * interactive conversation manager, and speech synthesis/recognition integration.
 */

class CampusCopilot {
  constructor(campusData, pathfinder, onAction) {
    this.data = campusData;
    this.pathfinder = pathfinder;
    this.onAction = onAction || (() => {});
    this.conversationHistory = [];
    this.speechSynthesis = window.speechSynthesis;
    this.voiceEnabled = true;
    this.currentVoice = null;
    this.recognition = null;
    this.isListening = false;

    this.initVoice();
    this.initSpeechRecognition();
  }

  initVoice() {
    if (!this.speechSynthesis) return;
    const loadVoices = () => {
      const voices = this.speechSynthesis.getVoices();
      // Prefer friendly English voice (Google, Natural, Samantha, Alex)
      this.currentVoice = voices.find(v => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha"))) 
        || voices.find(v => v.lang.startsWith("en")) 
        || voices[0];
    };
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  speak(text) {
    if (!this.voiceEnabled || !this.speechSynthesis) return;
    try {
      this.speechSynthesis.cancel(); // Stop any pending utterance
      // Strip markdown asterisks and URLs for cleaner speech
      const cleanText = text.replace(/[*_#`[\]()]/g, " ").replace(/\s+/g, " ").trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      if (this.currentVoice) utterance.voice = this.currentVoice;
      utterance.rate = 1.0;
      utterance.pitch = 1.02;
      this.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  }

  stopSpeaking() {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.recognitionSupported = false;
      return;
    }
    this.recognitionSupported = true;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = "en-US";
  }

  startListening(onResult, onStatusChange) {
    if (!this.recognition) return false;
    try {
      this.isListening = true;
      if (onStatusChange) onStatusChange(true);

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.isListening = false;
        if (onStatusChange) onStatusChange(false);
        if (onResult) onResult(transcript);
      };

      this.recognition.onerror = (err) => {
        console.warn("Speech recognition error:", err);
        this.isListening = false;
        if (onStatusChange) onStatusChange(false);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (onStatusChange) onStatusChange(false);
      };

      this.recognition.start();
      return true;
    } catch (e) {
      console.warn("Error starting speech recognition:", e);
      this.isListening = false;
      if (onStatusChange) onStatusChange(false);
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  /**
   * Main query processor
   */
  processQuery(rawQuery, context = {}) {
    const query = rawQuery.trim().toLowerCase();
    this.conversationHistory.push({ role: "user", text: rawQuery });

    // 1. Direct Directions / Route Request: "from X to Y", "how to reach Y from X", "directions to Y"
    const routeMatch = this.detectRouteIntent(query, context);
    if (routeMatch) {
      return this.handleRouteIntent(routeMatch, rawQuery);
    }

    // 1b. Lecture Timing & Timetable queries: "timing of the lectures", "what time is class", "lecture timings"
    if (query.includes("timing") || query.includes("timetable") || query.includes("lecture time") || query.includes("lecture timing") || query.includes("class timing") || query.includes("schedule of") || (query.includes("when is") && (query.includes("class") || query.includes("lecture") || query.includes("lab")))) {
      return this.handleTimetableQuery(query);
    }

    // 2. Specific Room / Location queries: "where is AI lab", "find A-201", "locate seminar hall"
    const locationMatch = this.detectLocationQuery(query);
    if (locationMatch) {
      return this.handleLocationQuery(locationMatch, query);
    }

    // 3. Category Queries: "where to eat", "find labs", "seminar halls", "restrooms", "quiet study", "wifi"
    const categoryMatch = this.detectCategoryQuery(query);
    if (categoryMatch) {
      return this.handleCategoryQuery(categoryMatch, query);
    }

    // 4. Live Events / Schedule Queries: "what events are on", "is kalam auditorium busy", "schedule"
    if (query.includes("event") || query.includes("schedule") || query.includes("happening") || query.includes("busy") || query.includes("hackathon")) {
      return this.handleEventsQuery(query);
    }

    // 5. Faculty / Staff inquiries: "who is in charge of robotics", "dr sarah mitchell", "faculty"
    const facultyMatch = this.detectFacultyQuery(query);
    if (facultyMatch) {
      return this.handleFacultyQuery(facultyMatch);
    }

    // 6. Emergency / Medical / Urgent queries
    if (query.includes("emergency") || query.includes("doctor") || query.includes("sick") || query.includes("first aid") || query.includes("clinic") || query.includes("hurt") || query.includes("ambulance")) {
      return this.handleEmergencyQuery();
    }

    // 7. General Campus Questions / Greeting
    if (query.match(/^(hi|hello|hey|help|who are you|what can you do)/i)) {
      return this.handleGreeting();
    }

    // Fallback: Fuzzy search across all locations
    return this.handleFuzzySearch(query, rawQuery);
  }

  detectRouteIntent(query, context) {
    // Pattern 1: "from A to B" or "how to get from A to B"
    const fromToRegex = /(?:from|between)\s+([a-z0-9\s\-]+?)\s+(?:to|and)\s+([a-z0-9\s\-]+)/i;
    let m = query.match(fromToRegex);
    if (m) {
      return { from: m[1].trim(), to: m[2].trim() };
    }

    // Pattern 2: "how to (reach|go to|get to|reach) B" or "directions to B"
    const toOnlyRegex = /(?:directions to|navigate to|route to|how to reach|how to get to|take me to|path to)\s+([a-z0-9\s\-]+)/i;
    m = query.match(toOnlyRegex);
    if (m) {
      const destination = m[1].trim();
      const currentOrigin = context.userLocation || "gate-1"; // Default start at Main Gate
      return { from: currentOrigin, to: destination };
    }

    return null;
  }

  handleRouteIntent(routeReq, originalQuery) {
    const loc1 = this.resolveLocationOrLandmark(routeReq.from);
    const loc2 = this.resolveLocationOrLandmark(routeReq.to);

    if (!loc1 || !loc2) {
      const missing = !loc1 ? `"${routeReq.from}"` : `"${routeReq.to}"`;
      const reply = `I couldn't pinpoint the location ${missing} on campus. Try searching for specific spots like **Gate 1**, **Robotics Lab**, **AI Lab (A-201)**, or **Curie Seminar Hall**.`;
      return { text: reply, suggestions: ["Route from Gate 1 to AI Lab", "Route to Kalam Auditorium", "Explore Campus Map"] };
    }

    const isWheelchair = originalQuery.includes("accessible") || originalQuery.includes("wheelchair") || originalQuery.includes("ramp");
    const route = this.pathfinder.findRoute(loc1.id, loc2.id, isWheelchair);

    if (!route.success) {
      return {
        text: `Sorry, I couldn't compute a route between **${loc1.name}** and **${loc2.name}**: ${route.error}`,
        suggestions: ["Check standard route", "Show both locations on map"]
      };
    }

    const bldgName = loc2.building !== "outdoor" ? this.getBuildingName(loc2.building) : "Campus Grounds";
    const text = `Here is your navigation route from **${loc1.name}** to **${loc2.name}** (${bldgName}):
- **Distance:** ~${route.totalDistance} meters
- **Est. Walking Time:** ~${route.estimatedTimeMinutes} minute(s)
${isWheelchair ? "- **Mode:** ♿ Wheelchair Accessible (Elevators & Ramps only)" : "- **Mode:** Standard Pedestrian Walkway"}

Follow the step-by-step path illuminated on your map!`;

    // Action to trigger in main UI
    const action = {
      type: "SHOW_ROUTE",
      route,
      start: loc1,
      destination: loc2
    };

    return {
      text,
      action,
      speakText: `I found a route from ${loc1.name} to ${loc2.name}. It is about ${route.totalDistance} meters, roughly ${route.estimatedTimeMinutes} minutes walk.`,
      suggestions: [
        `What equipment is in ${loc2.shortName || loc2.name}?`,
        `Find nearest restrooms to ${loc2.name}`,
        "Clear current route"
      ]
    };
  }

  detectLocationQuery(query) {
    // Check direct room code match (e.g. "a-201", "c-101", "e-001")
    const codeMatch = query.match(/\b([a-e])-?([0-3][0-9]{2})\b/i);
    if (codeMatch) {
      const standardId = `${codeMatch[1].toUpperCase()}-${codeMatch[2]}`;
      const loc = this.data.locations.find(l => l.id === standardId);
      if (loc) return loc;
    }

    // Match keywords like "ai lab", "robotics lab", "kalam auditorium", "food court"
    const cleaned = query.replace(/(where is|where's|locate|find|show me|take me to|about|details of|room)\s+/gi, "").trim();
    return this.resolveLocationOrLandmark(cleaned);
  }

  handleLocationQuery(loc, query) {
    const bldg = this.data.buildings.find(b => b.id === loc.building);
    const floorLabel = bldg ? bldg.floorLabels[loc.floor] : `Floor ${loc.floor}`;
    const statusPill = loc.status === "Available" ? "🟢 Available" : "🔴 " + loc.status;

    let timetableMarkdown = "";
    if (loc.timetable && loc.timetable.length > 0) {
      timetableMarkdown = `\n\n#### ⏰ Today's Lecture Timings:\n`;
      loc.timetable.forEach(slot => {
        const isLive = slot.status === "Live Now" || slot.isCurrent;
        const icon = isLive ? "🟢 **[LIVE NOW]**" : (slot.status === "Upcoming" ? "⏳" : "✓");
        timetableMarkdown += `- ${icon} **${slot.time}**: \`${slot.code}\` ${slot.title} *(${slot.instructor})*\n`;
      });
    }

    const text = `### 📍 ${loc.name} (${loc.id})
- **Building:** ${bldg ? bldg.name : 'Campus'}
- **Floor:** ${floorLabel} | **Room:** ${loc.roomNumber}
- **Current Status:** ${statusPill} (${loc.currentEvent || 'Regular hours'})
- **Capacity:** ~${loc.capacity} people
- **Faculty In-Charge:** ${loc.inCharge}
- **Directions Hint:** ${loc.directionsHint}${timetableMarkdown}

Would you like turn-by-turn walking directions to this spot?`;

    const action = {
      type: "HIGHLIGHT_LOCATION",
      location: loc
    };

    return {
      text,
      action,
      speakText: `${loc.name} is on ${floorLabel} in ${bldg ? bldg.name : 'campus'}. Current status is ${loc.status}. ${loc.currentEvent || ''}`,
      suggestions: [
        `Directions to ${loc.shortName || loc.id}`,
        `Show equipment in ${loc.id}`,
        `Find nearby places on ${floorLabel}`
      ]
    };
  }

  detectCategoryQuery(query) {
    if (query.match(/\b(lab|labs|laboratory|laboratories)\b/)) return "lab";
    if (query.match(/\b(classroom|classrooms|lecture hall|theater|classes)\b/)) return "classroom";
    if (query.match(/\b(seminar|seminars|auditorium|conference hall|symposium)\b/)) return "seminar";
    if (query.match(/\b(library|books|reading|study room|silent study)\b/)) return "library";
    if (query.match(/\b(food|eat|canteen|cafeteria|cafe|coffee|lunch|dining|snacks)\b/)) return "food";
    if (query.match(/\b(admin|administration|dean|registrar|fees|admission|placement)\b/)) return "admin";
    if (query.match(/\b(gym|sports|fitness|badminton|workout|stadium)\b/)) return "sports";
    if (query.match(/\b(restroom|toilet|washroom|water|bathroom)\b/)) return "amenity";
    return null;
  }

  handleCategoryQuery(category, query) {
    const matches = this.data.locations.filter(l => l.category === category);
    const categoryTitles = {
      lab: "Laboratories & Research Centers",
      classroom: "Lecture Classrooms & Theaters",
      seminar: "Seminar Halls & Auditoriums",
      library: "Library & Study Zones",
      food: "Cafeteria & Dining Spots",
      admin: "Administrative Offices & Services",
      sports: "Gymnasium & Athletic Facilities",
      amenity: "Student Amenities & Services"
    };

    const title = categoryTitles[category] || "Campus Locations";
    let text = `Here are the key **${title}** across campus:\n\n`;

    matches.slice(0, 6).forEach(loc => {
      const bldg = this.data.buildings.find(b => b.id === loc.building);
      text += `- **${loc.name}** (\`${loc.id}\`) — ${bldg ? bldg.name : ''} (${loc.status})\n`;
    });

    if (matches.length > 6) {
      text += `\n*...plus ${matches.length - 6} more locations available in the filter menu.*`;
    }

    const action = {
      type: "FILTER_CATEGORY",
      category
    };

    return {
      text,
      action,
      speakText: `I found ${matches.length} ${title.toLowerCase()} on campus. I have highlighted them on your screen.`,
      suggestions: [
        `Where is ${matches[0]?.name}?`,
        "Show all on map",
        "Clear filter"
      ]
    };
  }

  handleTimetableQuery(query) {
    // Check if a specific location was referenced
    const locMatch = this.detectLocationQuery(query);
    if (locMatch && locMatch.timetable && locMatch.timetable.length > 0) {
      const bldg = this.data.buildings.find(b => b.id === locMatch.building);
      let text = `### ⏰ Lecture Timetable for ${locMatch.name} (${locMatch.id})\n`;
      text += `📍 **Location:** ${bldg ? bldg.name : ''} • Floor ${locMatch.floor} • Room ${locMatch.roomNumber}\n\n`;

      locMatch.timetable.forEach(slot => {
        const isLive = slot.status === "Live Now" || slot.isCurrent;
        const icon = isLive ? "🟢 **[LIVE NOW]**" : (slot.status === "Upcoming" ? "⏳" : "✓");
        text += `- ${icon} **${slot.time}**: \`${slot.code}\` — **${slot.title}** (*${slot.instructor}*)\n`;
      });

      const liveSlot = locMatch.timetable.find(s => s.status === "Live Now" || s.isCurrent);
      const speakText = liveSlot 
        ? `In ${locMatch.name}, the current ongoing lecture is ${liveSlot.title} until ${liveSlot.time.split('-')[1]?.trim()}.`
        : `Here are today's scheduled lecture timings for ${locMatch.name}.`;

      return {
        text,
        action: { type: "HIGHLIGHT_LOCATION", location: locMatch },
        speakText,
        suggestions: [
          `Directions to ${locMatch.shortName || locMatch.id}`,
          "What lectures are happening now?",
          "Show all lecture timings"
        ]
      };
    }

    // Otherwise show campus-wide active lecture overview
    let text = `### ⏰ Live Campus Lecture Timetable & Current Sessions:\n\n`;
    const liveLocations = this.data.locations.filter(l => l.timetable && l.timetable.some(s => s.status === "Live Now" || s.isCurrent));

    liveLocations.slice(0, 8).forEach(loc => {
      const slot = loc.timetable.find(s => s.status === "Live Now" || s.isCurrent);
      const bldg = this.data.buildings.find(b => b.id === loc.building);
      text += `🔹 **${loc.shortName || loc.id}** (${bldg ? bldg.code + ' Block' : ''}):\n`;
      text += `  - ⏰ **${slot.time}**: \`${slot.code}\` — ${slot.title}\n`;
      text += `  - 👨‍🏫 *${slot.instructor}* • Status: 🟢 **Live Now**\n\n`;
    });

    text += `*Tip: Ask for any specific classroom or lab (e.g. "Lecture timings for A-002" or "When is AI Lab free?") to view full daily schedules.*`;

    return {
      text,
      speakText: `Here are the currently active lectures across campus, including sessions in Classroom A-002, Systems Lab, and Alan Turing Seminar Hall.`,
      suggestions: [
        "Timings for Classroom A-002",
        "Timings for AI Lab (A-201)",
        "Timings for Turing Seminar Hall",
        "When is Physics Lab free?"
      ]
    };
  }

  handleEventsQuery(query) {
    const events = this.data.liveEvents;
    let text = "### 📅 Live & Upcoming Campus Events Today:\n\n";

    events.forEach(ev => {
      const loc = this.data.locations.find(l => l.id === ev.locationId);
      text += `🔹 **${ev.title}**\n  - **Venue:** ${loc ? loc.name : ev.locationId} (\`${ev.locationId}\`)\n  - **Time:** ${ev.time}\n  - **Speaker/Lead:** ${ev.speaker}\n\n`;
    });

    return {
      text,
      action: { type: "SHOW_EVENTS" },
      speakText: `There are ${events.length} major live events scheduled today, including the Apex GenAI and Robotics Hackathon in Kalam Grand Auditorium.`,
      suggestions: [
        "Take me to Kalam Grand Auditorium",
        "Directions to Turing Seminar Hall",
        "View Schedule on Calendar"
      ]
    };
  }

  detectFacultyQuery(query) {
    for (const loc of this.data.locations) {
      if (loc.inCharge && query.includes(loc.inCharge.toLowerCase())) {
        return loc;
      }
      // Check last names
      const lastName = loc.inCharge.split(" ").pop()?.toLowerCase();
      if (lastName && query.includes(lastName)) {
        return loc;
      }
    }
    return null;
  }

  handleFacultyQuery(loc) {
    const text = `### 👤 Faculty Contact Info
- **Faculty / In-Charge:** **${loc.inCharge}**
- **Location:** ${loc.name} (\`${loc.id}\`)
- **Building:** ${this.getBuildingName(loc.building)} (Floor ${loc.floor})
- **Contact:** ${loc.contact}
- **Operating Hours:** ${loc.hours}

Would you like me to map the route to their office or laboratory?`;

    return {
      text,
      action: { type: "HIGHLIGHT_LOCATION", location: loc },
      suggestions: [
        `Directions to ${loc.name}`,
        `Call or Email ${loc.inCharge.split(" ")[0]}`,
        "Search another professor"
      ]
    };
  }

  handleEmergencyQuery() {
    const clinic = this.data.locations.find(l => l.id === "D-102");
    const text = `### 🚨 Urgent Campus Health & First-Aid Info
If this is a critical medical emergency, immediately notify campus security or dial **911** / Campus Helpline **Ext: 999**!

- **Campus Clinic:** **${clinic ? clinic.name : 'Health & Urgent Wellness Clinic'}**
- **Location:** Kalam Convention Center (Block D), Floor 1, Room D-102
- **Hours:** 24/7 On-Call Medical & Nursing Staff
- **Equipped with:** AED Defibrillator, Oxygen, Emergency Trauma Cot, Prescription Dispensary

I have automatically marked the quickest route to the Clinic on your screen.`;

    return {
      text,
      action: clinic ? { type: "HIGHLIGHT_LOCATION", location: clinic } : null,
      speakText: "For medical assistance, the Campus Health Clinic is located on Floor 1 of Kalam Center, Block D. Campus emergency helpline is extension 999.",
      suggestions: [
        "Route to Health Clinic now",
        "Campus Security Helpline",
        "Nearest First Aid Station"
      ]
    };
  }

  handleGreeting() {
    const text = `👋 **Hello! I'm your Campus Copilot.**

I can help you navigate and discover everything across the university:
- 🧭 **Find any classroom, lab, or seminar hall** (e.g. *"Where is the AI Lab?"* or *"Locate A-201"*)
- 🚶 **Step-by-step Walking Routes** (e.g. *"Directions from Gate 1 to Grand Auditorium"*)
- ♿ **Wheelchair & Accessible Navigation** (avoids stairs automatically)
- 🍔 **Find Amenities** (Cafeterias, quiet reading halls, ATMs, gyms, restrooms)
- 📅 **Check Real-Time Status** & live events schedule

What are you looking for today?`;

    return {
      text,
      speakText: "Hello! I am your Campus Copilot. Ask me for any classroom, lab, seminar hall, or walking directions across the university campus.",
      suggestions: [
        "Find AI Lab (A-201)",
        "Directions to Kalam Grand Auditorium",
        "Where is the Central Cafeteria?",
        "Quiet places to study"
      ]
    };
  }

  handleFuzzySearch(query, originalQuery) {
    const qTokens = query.split(/\s+/).filter(t => t.length > 2);
    const results = [];

    this.data.locations.forEach(loc => {
      let score = 0;
      const haystack = `${loc.name} ${loc.id} ${loc.category} ${loc.tags.join(" ")} ${loc.description}`.toLowerCase();
      qTokens.forEach(token => {
        if (haystack.includes(token)) score += 10;
        if (loc.id.toLowerCase() === token) score += 50;
        if (loc.name.toLowerCase().includes(token)) score += 20;
      });
      if (score > 0) results.push({ loc, score });
    });

    results.sort((a, b) => b.score - a.score);

    if (results.length > 0) {
      const top = results[0].loc;
      const otherMatches = results.slice(1, 4).map(r => r.loc.name).join(", ");

      const text = `I found **${top.name}** (\`${top.id}\` in ${this.getBuildingName(top.building)}, Floor ${top.floor}).

${top.description}

${otherMatches ? `*Other related places:* ${otherMatches}` : ''}`;

      return {
        text,
        action: { type: "HIGHLIGHT_LOCATION", location: top },
        suggestions: [
          `Directions to ${top.shortName || top.id}`,
          `Equipment in ${top.id}`,
          "Explore other campus spots"
        ]
      };
    }

    return {
      text: `I couldn't find a direct match for *"${originalQuery}"*. Try asking with a room code (like **A-201**), a building name (**Turing Hall**), or category (**Labs**, **Seminar Halls**, **Food Court**).`,
      suggestions: [
        "Show all Seminar Halls",
        "Show all Computer Labs",
        "Campus Map Overview"
      ]
    };
  }

  resolveLocationOrLandmark(targetStr) {
    if (!targetStr) return null;
    const clean = targetStr.trim().toLowerCase();

    // Check exact room IDs
    for (const loc of this.data.locations) {
      if (loc.id.toLowerCase() === clean) return loc;
    }

    // Check outdoor landmarks
    for (const lm of this.data.outdoorLandmarks) {
      if (lm.id.toLowerCase() === clean || lm.name.toLowerCase().includes(clean)) {
        return {
          id: lm.id,
          name: lm.name,
          building: "outdoor",
          floor: 0,
          category: lm.type,
          description: lm.desc
        };
      }
    }

    // Check building IDs
    for (const bldg of this.data.buildings) {
      if (bldg.id.toLowerCase() === clean || bldg.name.toLowerCase().includes(clean) || clean.includes(bldg.code.toLowerCase() + " block")) {
        return {
          id: `ent-${bldg.id}`,
          name: `${bldg.name} Entrance`,
          building: bldg.id,
          floor: 0,
          category: "building",
          description: bldg.description
        };
      }
    }

    // Check location names and tags
    let bestMatch = null;
    let maxScore = 0;

    for (const loc of this.data.locations) {
      let score = 0;
      const lowerName = loc.name.toLowerCase();
      if (lowerName === clean) score += 100;
      else if (lowerName.includes(clean)) score += 50;
      else if (clean.includes(lowerName)) score += 40;

      loc.tags.forEach(t => {
        if (clean.includes(t)) score += 15;
      });

      if (score > maxScore) {
        maxScore = score;
        bestMatch = loc;
      }
    }

    return bestMatch;
  }

  getBuildingName(bldgId) {
    const b = this.data.buildings.find(b => b.id === bldgId);
    return b ? b.name : bldgId;
  }
}

// Export to window
if (typeof window !== "undefined") {
  window.CampusCopilot = CampusCopilot;
}
