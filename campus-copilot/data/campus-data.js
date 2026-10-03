/**
 * CAMPUS COPILOT - CAMPUS MASTER DATABASE
 * Comprehensive location directory, building layouts, graph topology for navigation,
 * real-time schedule simulation, and equipment directory.
 */

const CAMPUS_DATA = {
  meta: {
    campusName: "Apex Institute of Science & Technology",
    campusShort: "Apex Campus",
    version: "2.4.0",
    totalBuildings: 5,
    totalLocations: 48,
    mapBounds: { width: 1000, height: 750 }
  },

  buildings: [
    {
      id: "block-a",
      name: "Turing Hall (Block A)",
      code: "A",
      tagline: "Computing, Artificial Intelligence & Robotics",
      color: "#3b82f6", // Blue
      floors: [0, 1, 2, 3],
      floorLabels: { 0: "Ground Floor", 1: "Floor 1", 2: "Floor 2", 3: "Floor 3" },
      center: { x: 260, y: 220 },
      overviewRect: { x: 180, y: 140, w: 160, h: 160, rx: 12 },
      description: "Home of Computer Science, AI, Cyber Security, and state-of-the-art computational hardware."
    },
    {
      id: "block-b",
      name: "Curie Complex (Block B)",
      code: "B",
      tagline: "Sciences, Nanotech & Bioengineering",
      color: "#8b5cf6", // Purple
      floors: [0, 1, 2],
      floorLabels: { 0: "Ground Floor", 1: "Floor 1", 2: "Floor 2" },
      center: { x: 740, y: 220 },
      overviewRect: { x: 660, y: 140, w: 160, h: 160, rx: 12 },
      description: "Equipped with advanced wet labs, physics optics suites, clean rooms, and biotechnology research."
    },
    {
      id: "block-c",
      name: "Aryabhata Library & Innovation Hub (Block C)",
      code: "C",
      tagline: "Central Library, Startup Incubator & Maker Labs",
      color: "#10b981", // Emerald Green
      floors: [0, 1, 2],
      floorLabels: { 0: "Ground Floor", 1: "Floor 1", 2: "Floor 2" },
      center: { x: 500, y: 390 },
      overviewRect: { x: 420, y: 310, w: 160, h: 160, rx: 12 },
      description: "300,000+ volumes, 24/7 digital reading carrels, 3D printing maker labs, and venture incubation suites."
    },
    {
      id: "block-d",
      name: "Kalam Convention & Student Center (Block D)",
      code: "D",
      tagline: "Grand Auditorium, Food Court, Sports & Health Center",
      color: "#f59e0b", // Amber/Gold
      floors: [0, 1],
      floorLabels: { 0: "Ground Floor", 1: "Floor 1" },
      center: { x: 260, y: 560 },
      overviewRect: { x: 180, y: 480, w: 160, h: 160, rx: 12 },
      description: "Major auditorium hosting convocations and symposiums, multi-cuisine cafeteria, sports pavilion, and wellness."
    },
    {
      id: "block-e",
      name: "Chanakya Administrative Block (Block E)",
      code: "E",
      tagline: "Admissions, Dean's Office, Exam Wing & Placements",
      color: "#06b6d4", // Cyan
      floors: [0, 1],
      floorLabels: { 0: "Ground Floor", 1: "Floor 1" },
      center: { x: 740, y: 560 },
      overviewRect: { x: 660, y: 480, w: 160, h: 160, rx: 12 },
      description: "University administration, student grievance desk, registrar, financial aid, and placement interview pods."
    }
  ],

  // Outdoor Campus Landmarks
  outdoorLandmarks: [
    { id: "gate-1", name: "Main Campus Gate (North Gate)", type: "entry", coords: { x: 500, y: 40 }, desc: "Primary security checkpoint and transit bus stop." },
    { id: "gate-2", name: "South Gate (Metro Access)", type: "entry", coords: { x: 500, y: 710 }, desc: "Pedestrian entrance connected directly to Metro Line 3." },
    { id: "fountain", name: "Central Quadrangle & Fountain", type: "amenity", coords: { x: 500, y: 220 }, desc: "Central open garden with seating, Wi-Fi canopy, and fountain." },
    { id: "sports-ground", name: "University Athletic Stadium", type: "sports", coords: { x: 920, y: 390 }, desc: "400m synthetic running track, soccer pitch, and spectator stands." },
    { id: "parking-north", name: "Faculty & Visitor Parking P1", type: "parking", coords: { x: 100, y: 80 }, desc: "EV charging bays and multi-tier parking lot." },
    { id: "amphitheater", name: "Open-Air Amphitheater", type: "seminar", coords: { x: 500, y: 560 }, desc: "Stage for acoustic music festivals, debates, and club meetups." }
  ],

  // Complete Directory of all Rooms, Labs, Halls & Amenities
  locations: [
    // ===================================================
    // BLOCK A - TURING HALL (Computing & Robotics)
    // ===================================================
    // Ground Floor
    {
      id: "A-001",
      name: "Robotics & Autonomous Systems Lab",
      shortName: "Robotics Lab (A-001)",
      category: "lab",
      building: "block-a",
      floor: 0,
      roomNumber: "A-001",
      capacity: 45,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): ROB402 - Autonomous Drone Navigation",
      nextLecture: "Next (04:00 PM - 06:00 PM): CLUB - Apex Robotics Team Build Session",
      timetable: [
      {
            "time": "09:00 AM - 11:00 AM",
            "code": "ROB201",
            "title": "Manipulator Kinematics Lab",
            "instructor": "Prof. Kenneth Zhao",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "11:30 AM - 01:00 PM",
            "code": "OPEN",
            "title": "Hardware Diagnostics & Testing",
            "instructor": "Lab Assistant Maya",
            "type": "Open Lab",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "ROB402",
            "title": "Autonomous Drone Navigation",
            "instructor": "Prof. Kenneth Zhao",
            "type": "Lab Practical",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 06:00 PM",
            "code": "CLUB",
            "title": "Apex Robotics Team Build Session",
            "instructor": "Student Robotics Lead",
            "type": "Workshop",
            "status": "Upcoming"
      },
      {
            "time": "06:30 PM - 08:00 PM",
            "code": "MAINT",
            "title": "Manipulator Calibration & Sync",
            "instructor": "Lab Tech Marcus",
            "type": "Maintenance",
            "status": "Upcoming"
      }
],
      equipment: ["Universal Robot Arms", "LIDAR Sensors", "ROS2 Testbed", "Soldering Stations", "Oscilloscopes"],
      inCharge: "Prof. Kenneth Zhao",
      contact: "kzhao@apex.edu | Ph: +1 (555) 019-4401",
      hours: "08:30 AM - 08:00 PM",
      tags: ["robotics", "automation", "hardware", "lab", "ros", "electronics", "block a", "ground"],
      description: "Advanced experimentation facility for industrial manipulators, AGVs, autonomous rovers, and sensor telemetry.",
      directionsHint: "Enter Block A main glass entrance, proceed straight past reception; it is the double-door glass lab directly on your left.",
      rect: { x: 40, y: 40, w: 180, h: 140 },
      door: { x: 220, y: 110 }
    },
    {
      id: "A-002",
      name: "Smart Lecture Classroom 002",
      shortName: "Classroom A-002",
      category: "classroom",
      building: "block-a",
      floor: 0,
      roomNumber: "A-002",
      capacity: 75,
      status: "Class in Session",
      currentEvent: "Live (01:00 PM - 02:30 PM): CS101-B - Algorithmic Thinking (Section B)",
      nextLecture: "Next (02:45 PM - 04:15 PM): CS305 - Automata & Formal Languages",
      timetable: [
      {
            "time": "08:30 AM - 10:00 AM",
            "code": "CS101",
            "title": "Intro to Algorithmic Problem Solving",
            "instructor": "Dr. Elena Rostov",
            "type": "Lecture",
            "status": "Completed"
      },
      {
            "time": "10:15 AM - 11:45 AM",
            "code": "CS204",
            "title": "Discrete Structures & Logic",
            "instructor": "Prof. Kenneth Zhao",
            "type": "Lecture",
            "status": "Completed"
      },
      {
            "time": "01:00 PM - 02:30 PM",
            "code": "CS101-B",
            "title": "Algorithmic Thinking (Section B)",
            "instructor": "Dr. Elena Rostov",
            "type": "Lecture",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "02:45 PM - 04:15 PM",
            "code": "CS305",
            "title": "Automata & Formal Languages",
            "instructor": "Dr. Ananya Roy",
            "type": "Lecture",
            "status": "Upcoming"
      },
      {
            "time": "04:30 PM - 06:00 PM",
            "code": "TUT",
            "title": "Peer Mentorship & Doubts Solving",
            "instructor": "TA Alex Chen",
            "type": "Tutorial",
            "status": "Upcoming"
      }
],
      equipment: ["Dual Laser Projectors", "Interactive Smart Podium", "Surround Microphones", "Ergonomic Tiered Seating"],
      inCharge: "Dr. Elena Rostov",
      contact: "erostov@apex.edu | Ext: 4402",
      hours: "08:00 AM - 06:00 PM",
      tags: ["classroom", "lecture", "cs101", "theory", "first year", "block a"],
      description: "Tiered multimedia lecture hall optimized for foundational computer science courses and active student Q&A.",
      directionsHint: "From Block A lobby, head down the north corridor; A-002 is on the right side across from the elevator.",
      rect: { x: 280, y: 40, w: 180, h: 140 },
      door: { x: 280, y: 110 }
    },
    {
      id: "A-003",
      name: "Central Computing Center 1",
      shortName: "Computer Center 1 (A-003)",
      category: "lab",
      building: "block-a",
      floor: 0,
      roomNumber: "A-003",
      capacity: 90,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): CS302L - Database Systems & SQL Lab",
      nextLecture: "Next (04:00 PM - 06:00 PM): COMP - Campus ICPC Competitive Coding",
      timetable: [
      {
            "time": "08:30 AM - 10:30 AM",
            "code": "CS101L",
            "title": "C++ Programming Fundamentals Lab",
            "instructor": "TA Samantha & Liam",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "11:00 AM - 01:00 PM",
            "code": "CS202L",
            "title": "Object-Oriented Programming (Java)",
            "instructor": "Prof. Devante Brooks",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "CS302L",
            "title": "Database Systems & SQL Lab",
            "instructor": "Dr. Ananya Roy",
            "type": "Lab Practical",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 06:00 PM",
            "code": "COMP",
            "title": "Campus ICPC Competitive Coding",
            "instructor": "SysAdmin Marcus Vance",
            "type": "Open Lab",
            "status": "Upcoming"
      },
      {
            "time": "06:30 PM - 09:30 PM",
            "code": "OPEN",
            "title": "Evening Open Coding Access",
            "instructor": "Duty Proctor",
            "type": "Open Lab",
            "status": "Upcoming"
      }
],
      equipment: ["90 All-in-One Dell Precision Desktops", "Dual 4K Monitors", "Linux/Windows Dual Boot", "Gigabit LAN"],
      inCharge: "SysAdmin Marcus Vance",
      contact: "computing-lab1@apex.edu | Ext: 4403",
      hours: "07:30 AM - 10:00 PM",
      tags: ["computer lab", "coding", "workstations", "linux", "coding test", "block a"],
      description: "High-density coding environment for competitive programming, online coding examinations, and software laboratories.",
      directionsHint: "Turn south from the central foyer of Block A; enter through the fingerprint scanner turnstile.",
      rect: { x: 40, y: 220, w: 180, h: 140 },
      door: { x: 220, y: 290 }
    },
    {
      id: "A-004",
      name: "Turing Student Lounge & Hack Space",
      shortName: "Student Lounge (A-004)",
      category: "amenity",
      building: "block-a",
      floor: 0,
      roomNumber: "A-004",
      capacity: 50,
      status: "Available",
      currentEvent: "Live (01:00 PM - 03:30 PM): HACK - Hackathon Brainstorming & Scrum",
      nextLecture: "Next (04:00 PM - 07:00 PM): MEET - Open Source Club Weekly Meetup",
      timetable: [
      {
            "time": "09:00 AM - 12:00 PM",
            "code": "CO-WORK",
            "title": "Morning Study & Peer Networking",
            "instructor": "Open Access",
            "type": "Study",
            "status": "Completed"
      },
      {
            "time": "01:00 PM - 03:30 PM",
            "code": "HACK",
            "title": "Hackathon Brainstorming & Scrum",
            "instructor": "Student Tech Council",
            "type": "Collaboration",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 07:00 PM",
            "code": "MEET",
            "title": "Open Source Club Weekly Meetup",
            "instructor": "Dev Community Leads",
            "type": "Club Meet",
            "status": "Upcoming"
      }
],
      equipment: ["Bean Bags & Booths", "Whiteboard Walls", "Espresso Bar", "High-Speed Wi-Fi 6E", "Device Fast Chargers"],
      inCharge: "Student Tech Council",
      contact: "techcouncil@apex.edu",
      hours: "24 Hours (Swipe Access)",
      tags: ["lounge", "relax", "coffee", "study", "hackathon", "amenity", "block a"],
      description: "Co-working community zone designed for student brainstorming, peer discussions, and team project reviews.",
      directionsHint: "Opposite Computer Center 1 on the ground floor, right next to the outdoor patio.",
      rect: { x: 280, y: 220, w: 180, h: 140 },
      door: { x: 280, y: 290 }
    },

    // Floor 1
    {
      id: "A-101",
      name: "Data Structures & Systems Programming Lab",
      shortName: "Systems Lab (A-101)",
      category: "lab",
      building: "block-a",
      floor: 1,
      roomNumber: "A-101",
      capacity: 60,
      status: "Class in Session",
      currentEvent: "Live (01:30 PM - 03:30 PM): CS210 - Operating Systems Concurrency Lab",
      nextLecture: "Next (04:00 PM - 06:00 PM): SYS401 - Distributed Systems & Raft Consensus",
      timetable: [
      {
            "time": "08:30 AM - 10:30 AM",
            "code": "CS210",
            "title": "Linux Kernel Architecture Lab",
            "instructor": "Prof. Devante Brooks",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "11:00 AM - 01:00 PM",
            "code": "CS315",
            "title": "Socket Programming & Networking",
            "instructor": "Prof. Viktor Stone",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "CS210",
            "title": "Operating Systems Concurrency Lab",
            "instructor": "Prof. Devante Brooks",
            "type": "Lab Practical",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 06:00 PM",
            "code": "SYS401",
            "title": "Distributed Systems & Raft Consensus",
            "instructor": "Dr. Wei Chen",
            "type": "Lab Practical",
            "status": "Upcoming"
      }
],
      equipment: ["60 Ubuntu Xeon Workstations", "Hardware Debuggers", "Wireshark Packet Analyzers"],
      inCharge: "Prof. Devante Brooks",
      contact: "dbrooks@apex.edu | Ext: 4411",
      hours: "08:30 AM - 07:00 PM",
      tags: ["operating systems", "c++", "linux", "kernel", "lab", "block a", "floor 1"],
      description: "Dedicated to low-level systems programming, concurrent systems, operating systems, and computer architecture.",
      directionsHint: "Climb staircase 1 or take elevator to Floor 1; A-101 is immediately to the west of the central corridor.",
      rect: { x: 40, y: 40, w: 180, h: 140 },
      door: { x: 220, y: 110 }
    },
    {
      id: "A-102",
      name: "Tiered Lecture Theater 1 (Auditorium Style)",
      shortName: "Lecture Theater A-102",
      category: "classroom",
      building: "block-a",
      floor: 1,
      roomNumber: "A-102",
      capacity: 140,
      status: "Occupied",
      currentEvent: "Live (01:30 PM - 03:00 PM): CS302 - Distributed Transactions & ACID",
      nextLecture: "Next (03:15 PM - 04:45 PM): CS420 - Cloud Native Architecture & Kubernetes",
      timetable: [
      {
            "time": "09:00 AM - 10:30 AM",
            "code": "CS302",
            "title": "Database Engineering & Storage Engines",
            "instructor": "Dr. Ananya Roy",
            "type": "Lecture",
            "status": "Completed"
      },
      {
            "time": "10:45 AM - 12:15 PM",
            "code": "CS401",
            "title": "Compiler Design & Code Generation",
            "instructor": "Prof. Kenneth Zhao",
            "type": "Lecture",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:00 PM",
            "code": "CS302",
            "title": "Distributed Transactions & ACID",
            "instructor": "Dr. Ananya Roy",
            "type": "Lecture",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "03:15 PM - 04:45 PM",
            "code": "CS420",
            "title": "Cloud Native Architecture & Kubernetes",
            "instructor": "Prof. Chloe Dubois",
            "type": "Lecture",
            "status": "Upcoming"
      }
],
      equipment: ["Triple High-Lumen 4K Projectors", "Acoustic Wall Paneling", "Wireless Lapel Mics", "Lecture Capture Cameras"],
      inCharge: "Dr. Ananya Roy",
      contact: "aroy@apex.edu | Ext: 4412",
      hours: "08:00 AM - 07:00 PM",
      tags: ["lecture hall", "large classroom", "database", "theater", "block a", "floor 1"],
      description: "Premier academic lecture theater featuring stadium seating and automated multi-camera broadcast capture.",
      directionsHint: "Floor 1 east wing; look for the arched double acoustic doors marked LT-1.",
      rect: { x: 280, y: 40, w: 180, h: 140 },
      door: { x: 280, y: 110 }
    },
    {
      id: "A-103",
      name: "Cyber Security & Defensive Operations Lab",
      shortName: "CyberSec Lab (A-103)",
      category: "lab",
      building: "block-a",
      floor: 1,
      roomNumber: "A-103",
      capacity: 50,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): SEC402 - Threat Hunting & SIEM Analytics",
      nextLecture: "Next (04:00 PM - 06:00 PM): CTF - Apex CTF Cyber Defense Drills",
      timetable: [
      {
            "time": "09:00 AM - 11:00 AM",
            "code": "SEC201",
            "title": "Network Penetration Testing Lab",
            "instructor": "Prof. Viktor Stone",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "11:30 AM - 01:00 PM",
            "code": "SEC305",
            "title": "Applied Cryptography & ZK Proofs",
            "instructor": "Prof. Viktor Stone",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "SEC402",
            "title": "Threat Hunting & SIEM Analytics",
            "instructor": "Prof. Viktor Stone",
            "type": "Lab Practical",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 06:00 PM",
            "code": "CTF",
            "title": "Apex CTF Cyber Defense Drills",
            "instructor": "Cyber Club Leads",
            "type": "Practice",
            "status": "Upcoming"
      }
],
      equipment: ["Air-gapped Cyber Range Network", "Hardware Token Readers", "Splunk SIEM Console", "Physical Firewalls"],
      inCharge: "Prof. Viktor Stone",
      contact: "cyberlab@apex.edu | Ext: 4413",
      hours: "09:00 AM - 09:00 PM",
      tags: ["security", "cyber", "hacking", "ctf", "firewall", "lab", "block a"],
      description: "Isolated cyber range environment for ethical hacking, digital forensics, threat simulation, and network defense.",
      directionsHint: "Proceed south down Floor 1 hallway; past the faculty offices on the left.",
      rect: { x: 40, y: 220, w: 180, h: 140 },
      door: { x: 220, y: 290 }
    },
    {
      id: "A-104",
      name: "Department of Computer Science - Faculty Cabins",
      shortName: "CSE Faculty Wing (A-104)",
      category: "admin",
      building: "block-a",
      floor: 1,
      roomNumber: "A-104",
      capacity: 25,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): OFFICE - Undergraduate Walk-in Advising",
      nextLecture: "Next (04:00 PM - 05:30 PM): FACULTY - Department Curriculum Council",
      timetable: [
      {
            "time": "09:00 AM - 11:00 AM",
            "code": "OFFICE",
            "title": "HOD Academic Advisory Hours",
            "instructor": "Prof. Kenneth Zhao",
            "type": "Office Hours",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "OFFICE",
            "title": "Undergraduate Walk-in Advising",
            "instructor": "Dr. Elena Rostov",
            "type": "Office Hours",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 05:30 PM",
            "code": "FACULTY",
            "title": "Department Curriculum Council",
            "instructor": "CS Faculty Board",
            "type": "Meeting",
            "status": "Upcoming"
      }
],
      equipment: ["HOD Office", "12 Faculty Cubicles", "Private Consultation Pod", "Department Archives"],
      inCharge: "Prof. Kenneth Zhao (Head of Dept)",
      contact: "cs.dept@apex.edu | Ext: 4410",
      hours: "09:00 AM - 05:00 PM",
      tags: ["faculty", "hod", "professors", "office hours", "consultation", "admin", "block a"],
      description: "Administrative suite for CS professors, undergraduate advisors, and head of computer science department.",
      directionsHint: "South-east corner of Floor 1; ring bell at the department coordinator's front desk.",
      rect: { x: 280, y: 220, w: 180, h: 140 },
      door: { x: 280, y: 290 }
    },

    // Floor 2
    {
      id: "A-201",
      name: "Artificial Intelligence & Deep Learning Lab",
      shortName: "AI Lab (A-201)",
      category: "lab",
      building: "block-a",
      floor: 2,
      roomNumber: "A-201",
      capacity: 55,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): AI405L - Generative Diffusion Models Workshop",
      nextLecture: "Next (04:00 PM - 06:00 PM): AI-RES - Apex AI Research Group Sync",
      timetable: [
      {
            "time": "09:00 AM - 11:00 AM",
            "code": "AI301L",
            "title": "Computer Vision & PyTorch Training",
            "instructor": "Dr. Sarah Mitchell",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "11:30 AM - 01:00 PM",
            "code": "AI402L",
            "title": "Transformer Attention Mechanisms",
            "instructor": "Dr. Sarah Mitchell",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "AI405L",
            "title": "Generative Diffusion Models Workshop",
            "instructor": "Dr. Sarah Mitchell",
            "type": "Lab Practical",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 06:00 PM",
            "code": "AI-RES",
            "title": "Apex AI Research Group Sync",
            "instructor": "PhD Scholars",
            "type": "Research",
            "status": "Upcoming"
      },
      {
            "time": "06:30 PM - 08:30 PM",
            "code": "GPU-RUN",
            "title": "Overnight Model Training Setup",
            "instructor": "GPU Admin",
            "type": "Lab Access",
            "status": "Upcoming"
      }
],
      equipment: ["55 NVIDIA RTX 4090 Workstations", "Direct NVLink Cluster Hookup", "Interactive 86-inch 4K Touchpanel", "Dual A/C"],
      inCharge: "Dr. Sarah Mitchell",
      contact: "smitchell@apex.edu | Ext: 4421",
      hours: "08:00 AM - 09:30 PM",
      tags: ["ai", "machine learning", "deep learning", "gpu", "neural networks", "pytorch", "lab", "block a", "floor 2"],
      description: "Flagship AI laboratory featuring high-throughput compute for training large transformers, computer vision, and NLP models.",
      directionsHint: "Take elevator to Floor 2, turn right at the illuminated AI showcase; second glass door on your left.",
      rect: { x: 40, y: 40, w: 180, h: 140 },
      door: { x: 220, y: 110 }
    },
    {
      id: "A-202",
      name: "Software Engineering Studio 202",
      shortName: "Dev Studio (A-202)",
      category: "classroom",
      building: "block-a",
      floor: 2,
      roomNumber: "A-202",
      capacity: 65,
      status: "Class in Session",
      currentEvent: "Live (01:30 PM - 03:00 PM): SE410 - Microservices & Docker Deployment",
      nextLecture: "Next (03:30 PM - 05:00 PM): CAPSTONE - Senior Capstone Design Reviews",
      timetable: [
      {
            "time": "09:00 AM - 10:30 AM",
            "code": "SE301",
            "title": "Fullstack Web & API Architecture",
            "instructor": "Prof. Chloe Dubois",
            "type": "Studio",
            "status": "Completed"
      },
      {
            "time": "10:45 AM - 12:15 PM",
            "code": "SE402",
            "title": "Agile Scrum & CI/CD Pipelines",
            "instructor": "Prof. Chloe Dubois",
            "type": "Studio",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:00 PM",
            "code": "SE410",
            "title": "Microservices & Docker Deployment",
            "instructor": "Prof. Chloe Dubois",
            "type": "Studio",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "03:30 PM - 05:00 PM",
            "code": "CAPSTONE",
            "title": "Senior Capstone Design Reviews",
            "instructor": "Faculty Reviewers",
            "type": "Review",
            "status": "Upcoming"
      }
],
      equipment: ["Modular Pod Desks", "4 Wall Mount Collaboration Displays", "Retractable Power Drops"],
      inCharge: "Prof. Chloe Dubois",
      contact: "cdubois@apex.edu | Ext: 4422",
      hours: "08:30 AM - 06:30 PM",
      tags: ["software engineering", "agile", "web dev", "cloud", "classroom", "block a", "floor 2"],
      description: "Dynamic studio environment configured for group agile scrums, code reviews, and capstone project design.",
      directionsHint: "Across the central skyway on Floor 2, directly opposite the Alan Turing Seminar Hall entrance.",
      rect: { x: 280, y: 40, w: 180, h: 140 },
      door: { x: 280, y: 110 }
    },
    {
      id: "A-203",
      name: "Alan Turing Memorial Seminar Hall",
      shortName: "Turing Seminar Hall (A-203)",
      category: "seminar",
      building: "block-a",
      floor: 2,
      roomNumber: "A-203",
      capacity: 180,
      status: "Available",
      currentEvent: "Live (02:00 PM - 04:00 PM): SYMPOSIUM - Symposium: Generative Agents in 2026",
      nextLecture: "Next (04:30 PM - 06:00 PM): TECH-TALK - Building Scalable Cloud Infrastructure",
      timetable: [
      {
            "time": "10:00 AM - 11:30 AM",
            "code": "KEYNOTE",
            "title": "Distinguished Talk: Quantum Frontiers",
            "instructor": "Dr. Elena Rostov",
            "type": "Keynote",
            "status": "Completed"
      },
      {
            "time": "02:00 PM - 04:00 PM",
            "code": "SYMPOSIUM",
            "title": "Symposium: Generative Agents in 2026",
            "instructor": "Guest Speaker Dr. Alan Croft",
            "type": "Symposium",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:30 PM - 06:00 PM",
            "code": "TECH-TALK",
            "title": "Building Scalable Cloud Infrastructure",
            "instructor": "Google Research Team",
            "type": "Industry Talk",
            "status": "Upcoming"
      }
],
      equipment: ["Stage with Dual Lecterns", "JBL Line Array Sound", "Wireless Handheld & Collar Mics", "Full HD Webcast System"],
      inCharge: "Event Coordinator Ryan Kelly",
      contact: "seminars-a@apex.edu | Ext: 4423",
      hours: "08:00 AM - 09:00 PM",
      tags: ["seminar", "hall", "conference", "guest lecture", "turing", "presentation", "block a", "floor 2"],
      description: "Premier 180-seat auditorium for academic symposiums, tech keynote lectures, thesis defenses, and industry speaker summits.",
      directionsHint: "Center-south on Floor 2; features large wood-finished double entrance with digital event agenda sign.",
      rect: { x: 40, y: 220, w: 180, h: 140 },
      door: { x: 220, y: 290 }
    },
    {
      id: "A-204",
      name: "Internet of Things & Embedded Hardware Lab",
      shortName: "IoT Lab (A-204)",
      category: "lab",
      building: "block-a",
      floor: 2,
      roomNumber: "A-204",
      capacity: 45,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): IOT401 - Smart Campus LoRaWAN Sensor Mesh",
      nextLecture: "Next (04:00 PM - 06:00 PM): OPEN - Hardware Soldering & PCB Assembly",
      timetable: [
      {
            "time": "09:00 AM - 11:00 AM",
            "code": "IOT201",
            "title": "Microcontroller Interfacing (ESP32)",
            "instructor": "Prof. Tariq Al-Mansoor",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "11:30 AM - 01:00 PM",
            "code": "IOT304",
            "title": "Edge AI & TinyML Quantization",
            "instructor": "Prof. Tariq Al-Mansoor",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "IOT401",
            "title": "Smart Campus LoRaWAN Sensor Mesh",
            "instructor": "Prof. Tariq Al-Mansoor",
            "type": "Lab Practical",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 06:00 PM",
            "code": "OPEN",
            "title": "Hardware Soldering & PCB Assembly",
            "instructor": "Lab Assistant",
            "type": "Open Lab",
            "status": "Upcoming"
      }
],
      equipment: ["ESP32 & Raspberry Pi 5 Kits", "Spectrum Analyzers", "3D Printers", "Soldering & Desoldering Stations"],
      inCharge: "Prof. Tariq Al-Mansoor",
      contact: "talmansoor@apex.edu | Ext: 4424",
      hours: "09:00 AM - 08:00 PM",
      tags: ["iot", "embedded", "sensors", "arduino", "hardware", "lab", "block a"],
      description: "Hands-on laboratory for microcontroller firmware development, wireless sensor networks, and edge computing prototyping.",
      directionsHint: "South-east wing of Floor 2; next to the research elevator.",
      rect: { x: 280, y: 220, w: 180, h: 140 },
      door: { x: 280, y: 290 }
    },

    // Floor 3
    {
      id: "A-301",
      name: "Advanced GPU Supercomputing Research Wing",
      shortName: "Supercomputing Cluster (A-301)",
      category: "lab",
      building: "block-a",
      floor: 3,
      roomNumber: "A-301",
      capacity: 30,
      status: "Occupied",
      currentEvent: "Live (01:00 PM - 04:00 PM): HPC-2 - Molecular Dynamics Simulation Run",
      nextLecture: "Next (04:30 PM - 07:00 PM): MAINT - Cooling System Diagnostic Check",
      timetable: [
      {
            "time": "09:00 AM - 12:00 PM",
            "code": "HPC-1",
            "title": "Large Language Model Pretraining Cluster Run",
            "instructor": "Dr. Wei Chen",
            "type": "High Performance",
            "status": "Completed"
      },
      {
            "time": "01:00 PM - 04:00 PM",
            "code": "HPC-2",
            "title": "Molecular Dynamics Simulation Run",
            "instructor": "Dr. Wei Chen",
            "type": "High Performance",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:30 PM - 07:00 PM",
            "code": "MAINT",
            "title": "Cooling System Diagnostic Check",
            "instructor": "Cluster Operations",
            "type": "System Task",
            "status": "Upcoming"
      }
],
      equipment: ["Liquid-Cooled Server Racks", "NVIDIA H100 Tensor Core Pod", "Authorized Biometric Lock", "Clean Power UPS"],
      inCharge: "Chief Scientist Dr. Wei Chen",
      contact: "hpc@apex.edu | Ext: 4431",
      hours: "Restricted Access (PhD & Faculty)",
      tags: ["supercomputer", "hpc", "cluster", "gpu", "research", "lab", "block a", "floor 3"],
      description: "University centralized HPC cluster facility supporting extreme-scale simulation, climate modeling, and deep learning training.",
      directionsHint: "Floor 3 penthouse suite; requires biometric research clearance card at entry.",
      rect: { x: 40, y: 40, w: 180, h: 140 },
      door: { x: 220, y: 110 }
    },
    {
      id: "A-302",
      name: "Virtual Reality & Metaverse Immersion Studio",
      shortName: "VR Lab (A-302)",
      category: "lab",
      building: "block-a",
      floor: 3,
      roomNumber: "A-302",
      capacity: 35,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): VR405 - Haptic Feedback & Spatial Audio Design",
      nextLecture: "Next (04:00 PM - 06:00 PM): STUDIO - Metaverse Medical Anatomy Simulation",
      timetable: [
      {
            "time": "09:30 AM - 11:30 AM",
            "code": "VR201",
            "title": "Unity 3D Spatial Computing Basics",
            "instructor": "Prof. Maya Lin",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "VR405",
            "title": "Haptic Feedback & Spatial Audio Design",
            "instructor": "Prof. Maya Lin",
            "type": "Lab Practical",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 06:00 PM",
            "code": "STUDIO",
            "title": "Metaverse Medical Anatomy Simulation",
            "instructor": "VR Research Scholars",
            "type": "Project Lab",
            "status": "Upcoming"
      }
],
      equipment: ["25 Meta Quest Pro & Apple Vision Pro", "Motion Tracking Rig", "Haptic Gloves", "Green Screen Cyclorama"],
      inCharge: "Prof. Maya Lin",
      contact: "mlin@apex.edu | Ext: 4432",
      hours: "09:30 AM - 07:30 PM",
      tags: ["vr", "virtual reality", "metaverse", "unity", "game design", "ar", "lab", "block a"],
      description: "Specialized spatial computing studio for virtual anatomy simulations, interactive architectural walkthroughs, and game engine tech.",
      directionsHint: "Floor 3 east wing, opposite the rooftop solar garden access doorway.",
      rect: { x: 280, y: 40, w: 180, h: 140 },
      door: { x: 280, y: 110 }
    },
    {
      id: "A-303",
      name: "Postgraduate Research Seminar Room 303",
      shortName: "Seminar Room A-303",
      category: "seminar",
      building: "block-a",
      floor: 3,
      roomNumber: "A-303",
      capacity: 50,
      status: "Available",
      currentEvent: "Live (02:00 PM - 04:00 PM): ROUNDTABLE - Graduate Research Methodology Seminar",
      nextLecture: "Next (04:30 PM - 06:00 PM): MEET - Postgraduate Scholars Forum",
      timetable: [
      {
            "time": "10:00 AM - 12:00 PM",
            "code": "DEFENSE",
            "title": "Doctoral Dissertation Proposal Defense",
            "instructor": "PhD Candidate & Committee",
            "type": "Academic Defense",
            "status": "Completed"
      },
      {
            "time": "02:00 PM - 04:00 PM",
            "code": "ROUNDTABLE",
            "title": "Graduate Research Methodology Seminar",
            "instructor": "Graduate School Dean",
            "type": "Seminar",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:30 PM - 06:00 PM",
            "code": "MEET",
            "title": "Postgraduate Scholars Forum",
            "instructor": "Dean Academic Affairs",
            "type": "Meeting",
            "status": "Upcoming"
      }
],
      equipment: ["Conference Video Telepresence", "Motorized Smart Board", "Polycom Ceiling Microphone Array"],
      inCharge: "Graduate School Dean's Office",
      contact: "gradstudies@apex.edu | Ext: 4433",
      hours: "08:00 AM - 07:00 PM",
      tags: ["seminar", "postgrad", "phd", "defense", "meeting", "block a"],
      description: "Intimate seminar room tailored for master's and doctoral dissertation defenses, committee reviews, and board roundtables.",
      directionsHint: "Floor 3 south corridor, right beside the quiet study veranda.",
      rect: { x: 160, y: 220, w: 180, h: 140 },
      door: { x: 250, y: 220 }
    },

    // ===================================================
    // BLOCK B - CURIE COMPLEX (Sciences & Biotech)
    // ===================================================
    // Ground Floor
    {
      id: "B-001",
      name: "Advanced Optics & Laser Physics Lab",
      shortName: "Physics Optics Lab (B-001)",
      category: "lab",
      building: "block-b",
      floor: 0,
      roomNumber: "B-001",
      capacity: 40,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): PHY305 - Quantum Optics & Entanglement",
      nextLecture: "Next (04:00 PM - 05:30 PM): SPEC - Spectrophotometric Precision Analysis",
      timetable: [
      {
            "time": "09:00 AM - 11:00 AM",
            "code": "PHY201",
            "title": "Laser Interferometry & Diffraction",
            "instructor": "Prof. Arthur Pendelton",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "PHY305",
            "title": "Quantum Optics & Entanglement",
            "instructor": "Prof. Arthur Pendelton",
            "type": "Lab Practical",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 05:30 PM",
            "code": "SPEC",
            "title": "Spectrophotometric Precision Analysis",
            "instructor": "Lab Officer",
            "type": "Lab Session",
            "status": "Upcoming"
      }
],
      equipment: ["Vibration-Isolated Optical Tables", "Helium-Neon Lasers", "Spectrophotometers", "Darkroom Enclosure"],
      inCharge: "Prof. Arthur Pendelton",
      contact: "apendelton@apex.edu | Ext: 5101",
      hours: "08:30 AM - 06:30 PM",
      tags: ["physics", "optics", "laser", "science", "lab", "block b", "ground"],
      description: "Precision laser optics research lab outfitted with optical isolation tables and interferometric diagnostic tools.",
      directionsHint: "Enter Block B ground floor via the Science Atrium; first wing on the left through safety airlock 1.",
      rect: { x: 40, y: 40, w: 180, h: 140 },
      door: { x: 220, y: 110 }
    },
    {
      id: "B-002",
      name: "General & Organic Chemistry Synthesis Lab",
      shortName: "Chemistry Lab (B-002)",
      category: "lab",
      building: "block-b",
      floor: 0,
      roomNumber: "B-002",
      capacity: 50,
      status: "Class in Session",
      currentEvent: "Live (01:30 PM - 03:30 PM): CH302 - Spectroscopic Kinetics & Catalysis",
      nextLecture: "Next (04:00 PM - 05:30 PM): SAFETY - Chemical Safety Protocols & Washdown",
      timetable: [
      {
            "time": "08:30 AM - 10:30 AM",
            "code": "CH101",
            "title": "Analytical Chemistry Titrations",
            "instructor": "Dr. Evelyn Ward",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "11:00 AM - 01:00 PM",
            "code": "CH205",
            "title": "Organic Synthesis & Separation",
            "instructor": "Dr. Evelyn Ward",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "CH302",
            "title": "Spectroscopic Kinetics & Catalysis",
            "instructor": "Dr. Evelyn Ward",
            "type": "Lab Practical",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 05:30 PM",
            "code": "SAFETY",
            "title": "Chemical Safety Protocols & Washdown",
            "instructor": "Safety Officer",
            "type": "Safety Inspection",
            "status": "Upcoming"
      }
],
      equipment: ["16 Fume Hoods", "Rotary Evaporators", "Emergency Eyewash & Deluge Showers", "Chemical Spill Vaults"],
      inCharge: "Dr. Evelyn Ward",
      contact: "eward@apex.edu | Ext: 5102",
      hours: "08:00 AM - 06:00 PM",
      tags: ["chemistry", "organic", "synthesis", "fume hood", "wet lab", "block b"],
      description: "Fully compliant chemical synthesis facility featuring exhaust fume hoods and safety instrumentation.",
      directionsHint: "Ground floor north-east wing; lab coat and safety goggles required past the preparation vestibule.",
      rect: { x: 280, y: 40, w: 180, h: 140 },
      door: { x: 280, y: 110 }
    },
    {
      id: "B-003",
      name: "Materials Science & Electron Microscopy Wing",
      shortName: "Materials Lab (B-003)",
      category: "lab",
      building: "block-b",
      floor: 0,
      roomNumber: "B-003",
      capacity: 35,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): MAT402 - Scanning Electron Microscopy Calibration",
      nextLecture: "Next (04:00 PM - 06:00 PM): NANO - Nanoscale Thin Film Fabrication",
      timetable: [
      {
            "time": "09:30 AM - 11:30 AM",
            "code": "MAT201",
            "title": "Crystallography & Powder Diffraction",
            "instructor": "Dr. Sanjay Gupta",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "MAT402",
            "title": "Scanning Electron Microscopy Calibration",
            "instructor": "Dr. Sanjay Gupta",
            "type": "Lab Practical",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 06:00 PM",
            "code": "NANO",
            "title": "Nanoscale Thin Film Fabrication",
            "instructor": "Research Fellow",
            "type": "Research",
            "status": "Upcoming"
      }
],
      equipment: ["Field Emission SEM", "X-ray Diffractometer (XRD)", "High-Temperature Sintering Furnace"],
      inCharge: "Dr. Sanjay Gupta",
      contact: "sgupta@apex.edu | Ext: 5103",
      hours: "09:00 AM - 07:00 PM",
      tags: ["materials", "sem", "microscopy", "nanotech", "lab", "block b"],
      description: "Nanoscale characterization and crystallography testing ground housing scanning electron microscopes.",
      directionsHint: "Ground floor south wing; follow the blue directional floor markings towards Materials Science.",
      rect: { x: 160, y: 220, w: 180, h: 140 },
      door: { x: 250, y: 220 }
    },

    // Floor 1
    {
      id: "B-101",
      name: "Biochemistry & Molecular Genetics Lab",
      shortName: "Genetics Lab (B-101)",
      category: "lab",
      building: "block-b",
      floor: 1,
      roomNumber: "B-101",
      capacity: 40,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): BIO305 - CRISPR-Cas9 Expression Assays",
      nextLecture: "Next (04:00 PM - 06:00 PM): CLONE - Recombinant Protein Expression",
      timetable: [
      {
            "time": "09:00 AM - 11:30 AM",
            "code": "BIO201",
            "title": "Gel Electrophoresis & DNA Isolation",
            "instructor": "Prof. Diane Foster",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "BIO305",
            "title": "CRISPR-Cas9 Expression Assays",
            "instructor": "Prof. Diane Foster",
            "type": "Lab Practical",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 06:00 PM",
            "code": "CLONE",
            "title": "Recombinant Protein Expression",
            "instructor": "Lab Team",
            "type": "Research",
            "status": "Upcoming"
      }
],
      equipment: ["PCR Thermocyclers", "Gel Electrophoresis Stations", "Autoclaves", "Centrifuges (-80C Storage)"],
      inCharge: "Prof. Diane Foster",
      contact: "dfoster@apex.edu | Ext: 5111",
      hours: "08:30 AM - 07:30 PM",
      tags: ["genetics", "biotech", "dna", "pcr", "molecular biology", "lab", "block b", "floor 1"],
      description: "Biosafety Level 2 facility specializing in recombinant DNA, genomic assays, and protein electrophoresis.",
      directionsHint: "Floor 1 via Central Science stairs, turn left; B-101 is located beside the sterile preparation corridor.",
      rect: { x: 40, y: 40, w: 180, h: 140 },
      door: { x: 220, y: 110 }
    },
    {
      id: "B-102",
      name: "Marie Curie Memorial Seminar Hall",
      shortName: "Curie Seminar Hall (B-102)",
      category: "seminar",
      building: "block-b",
      floor: 1,
      roomNumber: "B-102",
      capacity: 150,
      status: "Available",
      currentEvent: "Live (02:30 PM - 04:30 PM): KEYNOTE - Innovations in Nanomedicine & Oncology",
      nextLecture: "Next (05:00 PM - 06:30 PM): COLLOQ - Biotech Industry Commercialization Forum",
      timetable: [
      {
            "time": "10:00 AM - 11:30 AM",
            "code": "SEMINAR",
            "title": "Advances in Targeted Gene Therapy",
            "instructor": "Faculty Guest Speaker",
            "type": "Lecture",
            "status": "Completed"
      },
      {
            "time": "02:30 PM - 04:30 PM",
            "code": "KEYNOTE",
            "title": "Innovations in Nanomedicine & Oncology",
            "instructor": "Dr. Liam O'Connor",
            "type": "Keynote",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "05:00 PM - 06:30 PM",
            "code": "COLLOQ",
            "title": "Biotech Industry Commercialization Forum",
            "instructor": "Apex BioTech Hub",
            "type": "Colloquium",
            "status": "Upcoming"
      }
],
      equipment: ["Full Acoustic Shell", "Laser Projector & Dual Displays", "Wireless Audio Podiums", "Video Conferencing"],
      inCharge: "Faculty of Natural Sciences Office",
      contact: "science-events@apex.edu | Ext: 5112",
      hours: "08:00 AM - 08:30 PM",
      tags: ["seminar", "hall", "curie", "science talk", "auditorium", "block b", "floor 1"],
      description: "The main academic auditorium for the School of Natural and Biomedical Sciences.",
      directionsHint: "Directly in front of the central staircase on Floor 1; double glass entrance with historical Curie display exhibit.",
      rect: { x: 280, y: 40, w: 180, h: 140 },
      door: { x: 280, y: 110 }
    },
    {
      id: "B-103",
      name: "Smart Science Classroom B-103",
      shortName: "Classroom B-103",
      category: "classroom",
      building: "block-b",
      floor: 1,
      roomNumber: "B-103",
      capacity: 70,
      status: "Occupied",
      currentEvent: "Live (01:30 PM - 03:00 PM): BIO310 - Immunology & Immune System Signaling",
      nextLecture: "Next (03:15 PM - 04:45 PM): BIO402 - Synthetic Biology Circuits & BioBricks",
      timetable: [
      {
            "time": "09:00 AM - 10:30 AM",
            "code": "BIO101",
            "title": "Foundations of Molecular Cell Biology",
            "instructor": "Dr. Liam O'Connor",
            "type": "Lecture",
            "status": "Completed"
      },
      {
            "time": "10:45 AM - 12:15 PM",
            "code": "BIO204",
            "title": "Cellular Physiology & Neurobiology",
            "instructor": "Dr. Liam O'Connor",
            "type": "Lecture",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:00 PM",
            "code": "BIO310",
            "title": "Immunology & Immune System Signaling",
            "instructor": "Dr. Liam O'Connor",
            "type": "Lecture",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "03:15 PM - 04:45 PM",
            "code": "BIO402",
            "title": "Synthetic Biology Circuits & BioBricks",
            "instructor": "Prof. Diane Foster",
            "type": "Lecture",
            "status": "Upcoming"
      }
],
      equipment: ["Interactive Whiteboard", "Digital Microscope Projection Hookup", "Student Tablet Charging Ports"],
      inCharge: "Dr. Liam O'Connor",
      contact: "loconnor@apex.edu | Ext: 5113",
      hours: "08:00 AM - 06:00 PM",
      tags: ["classroom", "biology", "lecture", "science", "block b"],
      description: "Modern lecture classroom fitted with biological sample projection and high-resolution digital displays.",
      directionsHint: "Proceed down Floor 1 east hallway; room B-103 is on the right side next to the student water lounge.",
      rect: { x: 160, y: 220, w: 180, h: 140 },
      door: { x: 250, y: 220 }
    },

    // Floor 2
    {
      id: "B-201",
      name: "Bioinformatics & Computational Biology Lab",
      shortName: "Bioinformatics Lab (B-201)",
      category: "lab",
      building: "block-b",
      floor: 2,
      roomNumber: "B-201",
      capacity: 45,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): BIN402 - AlphaFold 3D Structure Prediction Lab",
      nextLecture: "Next (04:00 PM - 05:30 PM): GENOMICS - Metagenomic Phylogeny Workshop",
      timetable: [
      {
            "time": "09:00 AM - 11:00 AM",
            "code": "BIN201",
            "title": "Python for Sequence Alignment & FASTA",
            "instructor": "Dr. Priyanshi Mehta",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "11:30 AM - 01:00 PM",
            "code": "BIN305",
            "title": "BLAST Algorithms & Multiple Sequence Alignment",
            "instructor": "Dr. Priyanshi Mehta",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "BIN402",
            "title": "AlphaFold 3D Structure Prediction Lab",
            "instructor": "Dr. Priyanshi Mehta",
            "type": "Lab Practical",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 05:30 PM",
            "code": "GENOMICS",
            "title": "Metagenomic Phylogeny Workshop",
            "instructor": "PhD Research Scholars",
            "type": "Research",
            "status": "Upcoming"
      }
],
      equipment: ["45 High-RAM Data Workstations", "NCBI & BLAST Local Mirrors", "AlphaFold Inference Node"],
      inCharge: "Dr. Priyanshi Mehta",
      contact: "pmehta@apex.edu | Ext: 5121",
      hours: "08:30 AM - 08:00 PM",
      tags: ["bioinformatics", "genomics", "computational biology", "alphafold", "lab", "block b", "floor 2"],
      description: "Interdisciplinary computational space bridging biological data analysis, phylogenetic trees, and structural genomics.",
      directionsHint: "Floor 2 west wing; take elevator up and follow the green botanical mural.",
      rect: { x: 40, y: 40, w: 180, h: 140 },
      door: { x: 220, y: 110 }
    },
    {
      id: "B-202",
      name: "Environmental Science & Climate Research Wing",
      shortName: "Climate Lab (B-202)",
      category: "lab",
      building: "block-b",
      floor: 2,
      roomNumber: "B-202",
      capacity: 35,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): ENV305 - Climate Satellite Data Modeling",
      nextLecture: "Next (04:00 PM - 05:30 PM): SAMPLE - Soil & Water Contaminant Chromatography",
      timetable: [
      {
            "time": "09:30 AM - 11:30 AM",
            "code": "ENV201",
            "title": "Urban Air Quality Sensor Telemetry",
            "instructor": "Prof. Carl Thorne",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "ENV305",
            "title": "Climate Satellite Data Modeling",
            "instructor": "Prof. Carl Thorne",
            "type": "Lab Practical",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 05:30 PM",
            "code": "SAMPLE",
            "title": "Soil & Water Contaminant Chromatography",
            "instructor": "Lab Team",
            "type": "Lab Session",
            "status": "Upcoming"
      }
],
      equipment: ["Weather Station Data Feeds", "Gas Chromatographs", "Water Quality Spectrometers", "Soil Incubators"],
      inCharge: "Prof. Carl Thorne",
      contact: "cthorne@apex.edu | Ext: 5122",
      hours: "09:00 AM - 06:30 PM",
      tags: ["environmental", "climate", "air quality", "earth science", "lab", "block b"],
      description: "Dedicated to ecological modeling, regional greenhouse emissions tracking, and environmental sample analysis.",
      directionsHint: "Floor 2 east corner; overlooks the south greenhouse arboretum.",
      rect: { x: 280, y: 40, w: 180, h: 140 },
      door: { x: 280, y: 110 }
    },

    // ===================================================
    // BLOCK C - ARYABHATA LIBRARY & INNOVATION HUB
    // ===================================================
    // Ground Floor
    {
      id: "C-001",
      name: "Central Circulation Desk & Knowledge Center",
      shortName: "Circulation Desk (C-001)",
      category: "library",
      building: "block-c",
      floor: 0,
      roomNumber: "C-001",
      capacity: 60,
      status: "Available",
      currentEvent: "Live (12:00 PM - 04:00 PM): CIRC-2 - Inter-Library Loan & E-Resource Access",
      nextLecture: "Next (04:00 PM - 11:00 PM): CIRC-3 - Evening Study Checkouts & Self-Kiosks",
      timetable: [
      {
            "time": "08:00 AM - 12:00 PM",
            "code": "CIRC-1",
            "title": "Morning Circulation & Reserve Book Desks",
            "instructor": "Librarian Margaret Hughes",
            "type": "Service Hours",
            "status": "Completed"
      },
      {
            "time": "12:00 PM - 04:00 PM",
            "code": "CIRC-2",
            "title": "Inter-Library Loan & E-Resource Access",
            "instructor": "Duty Reference Staff",
            "type": "Service Hours",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 11:00 PM",
            "code": "CIRC-3",
            "title": "Evening Study Checkouts & Self-Kiosks",
            "instructor": "Evening Desk Officer",
            "type": "Service Hours",
            "status": "Upcoming"
      }
],
      equipment: ["RFID Self-Checkout Kiosks", "Librarian Helpdesk", "Catalog Lookup Terminals", "Lost & Found"],
      inCharge: "Head Librarian Margaret Hughes",
      contact: "library-desk@apex.edu | Ext: 6001",
      hours: "08:00 AM - 11:00 PM (Everyday)",
      tags: ["library", "books", "borrow", "circulation", "rfid", "helpdesk", "block c", "ground"],
      description: "The primary point of assistance for borrow/return services, inter-library loans, and general research guidance.",
      directionsHint: "Right inside the soaring glass entrance of Aryabhata Library; large circular wood desk.",
      rect: { x: 40, y: 40, w: 180, h: 140 },
      door: { x: 220, y: 110 }
    },
    {
      id: "C-002",
      name: "Silent Study & Individual Carrels Sanctuary",
      shortName: "Silent Reading Hall (C-002)",
      category: "library",
      building: "block-c",
      floor: 0,
      roomNumber: "C-002",
      capacity: 120,
      status: "Available",
      currentEvent: "Live (01:00 PM - 06:00 PM): SILENT-2 - Afternoon Silent Research & Reading",
      nextLecture: "Next (06:00 PM - 11:59 PM): SILENT-3 - Night Owl Exam Preparation Hours",
      timetable: [
      {
            "time": "08:00 AM - 01:00 PM",
            "code": "SILENT-1",
            "title": "Morning Focused Silent Study",
            "instructor": "Library Monitor",
            "type": "Quiet Study",
            "status": "Completed"
      },
      {
            "time": "01:00 PM - 06:00 PM",
            "code": "SILENT-2",
            "title": "Afternoon Silent Research & Reading",
            "instructor": "Library Monitor",
            "type": "Quiet Study",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "06:00 PM - 11:59 PM",
            "code": "SILENT-3",
            "title": "Night Owl Exam Preparation Hours",
            "instructor": "Library Monitor",
            "type": "Quiet Study",
            "status": "Upcoming"
      }
],
      equipment: ["120 Acoustic Privacy Carrels", "Individual Reading Lamps & Outlets", "Ergonomic Mesh Chairs"],
      inCharge: "Library Services Duty Officer",
      contact: "library-quiet@apex.edu | Ext: 6002",
      hours: "24 Hours (Open Daily)",
      tags: ["silent study", "quiet", "reading", "study hall", "exam prep", "library", "block c"],
      description: "Absolute silent zone with individual privacy cubicles, reading task lights, and noise-dampening flooring.",
      directionsHint: "Ground floor north wing; push through the heavy acoustic glass swing door marked 'Silent Sanctuary'.",
      rect: { x: 280, y: 40, w: 180, h: 140 },
      door: { x: 280, y: 110 }
    },

    // Floor 1
    {
      id: "C-101",
      name: "Maker Space & Digital Prototyping Studio",
      shortName: "Maker Space (C-101)",
      category: "lab",
      building: "block-c",
      floor: 1,
      roomNumber: "C-101",
      capacity: 50,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): MAKER - 3D Printing Certification & Prototyping",
      nextLecture: "Next (04:00 PM - 06:00 PM): LASER - Laser Cutting & Acrylic Engraving Lab",
      timetable: [
      {
            "time": "09:30 AM - 11:30 AM",
            "code": "PRUSA-1",
            "title": "3D CAD Modeling & Slicing Workshop",
            "instructor": "Jason Briggs",
            "type": "Lab Practical",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "MAKER",
            "title": "3D Printing Certification & Prototyping",
            "instructor": "Jason Briggs",
            "type": "Hands-on",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 06:00 PM",
            "code": "LASER",
            "title": "Laser Cutting & Acrylic Engraving Lab",
            "instructor": "Studio Tech",
            "type": "Hands-on",
            "status": "Upcoming"
      }
],
      equipment: ["12 Prusa MK4 3D Printers", "Laser Cutters & Engravers", "CNC Router Table", "Vinyl Cutters"],
      inCharge: "Innovation Lead Jason Briggs",
      contact: "makerspace@apex.edu | Ext: 6011",
      hours: "09:00 AM - 09:00 PM",
      tags: ["makerspace", "3d printing", "laser cutter", "prototyping", "cad", "hardware", "block c", "floor 1"],
      description: "Open prototyping fabrication facility equipped with additive manufacturing, subtractive CNC, and assembly workbenches.",
      directionsHint: "Floor 1 via spiral atrium staircase; glass workshop overlooking the central pond.",
      rect: { x: 40, y: 40, w: 180, h: 140 },
      door: { x: 220, y: 110 }
    },
    {
      id: "C-102",
      name: "Startup Incubation Cell & Venture Pitch Pods",
      shortName: "Incubator & Pitch Room (C-102)",
      category: "amenity",
      building: "block-c",
      floor: 1,
      roomNumber: "C-102",
      capacity: 45,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): DEMO - Angel VC Pitch Practice & Feedback",
      nextLecture: "Next (04:00 PM - 06:00 PM): LEGAL - Startup Legal & Patent Filing Pods",
      timetable: [
      {
            "time": "10:00 AM - 12:00 PM",
            "code": "PITCH-1",
            "title": "Student Founders Mentorship Clinic",
            "instructor": "Samantha Lee",
            "type": "Advisory",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "DEMO",
            "title": "Angel VC Pitch Practice & Feedback",
            "instructor": "Samantha Lee",
            "type": "Pitch Session",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 06:00 PM",
            "code": "LEGAL",
            "title": "Startup Legal & Patent Filing Pods",
            "instructor": "Corporate Counsel",
            "type": "Workshop",
            "status": "Upcoming"
      }
],
      equipment: ["Investor Pitch Stage", "Video Pitch Recording Booth", "Agile Whiteboard Pods", "High-Speed Fiber"],
      inCharge: "Incubation Director Samantha Lee",
      contact: "incubator@apex.edu | Ext: 6012",
      hours: "08:30 AM - 10:00 PM",
      tags: ["startup", "incubator", "pitch", "entrepreneurship", "business", "block c"],
      description: "The venture hub for student-led enterprise startups, seed funding preparation, and mentorship meetings.",
      directionsHint: "Floor 1 east wing; enter through the glass door inscribed 'Apex Venture Lab'.",
      rect: { x: 280, y: 40, w: 180, h: 140 },
      door: { x: 280, y: 110 }
    },

    // Floor 2
    {
      id: "C-201",
      name: "Srinivasa Ramanujan Mathematical Seminar Hall",
      shortName: "Ramanujan Seminar Hall (C-201)",
      category: "seminar",
      building: "block-c",
      floor: 2,
      roomNumber: "C-201",
      capacity: 220,
      status: "Available",
      currentEvent: "Live (02:00 PM - 03:30 PM): MATH305 - Algorithmic Game Theory & Markets",
      nextLecture: "Next (04:00 PM - 05:30 PM): STAT402 - High-Dimensional Statistical Inference",
      timetable: [
      {
            "time": "10:30 AM - 12:00 PM",
            "code": "MATH101",
            "title": "Riemann Zeta Function & Prime Distributions",
            "instructor": "Prof. Harold Finch",
            "type": "Colloquium",
            "status": "Completed"
      },
      {
            "time": "02:00 PM - 03:30 PM",
            "code": "MATH305",
            "title": "Algorithmic Game Theory & Markets",
            "instructor": "Applied Math Dept",
            "type": "Lecture",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 05:30 PM",
            "code": "STAT402",
            "title": "High-Dimensional Statistical Inference",
            "instructor": "Prof. Carl Thorne",
            "type": "Lecture",
            "status": "Upcoming"
      }
],
      equipment: ["Three Full-Length Ceramic Green Chalkboards", "Dual 4K Laser Projection", "Bose Arena Sound", "Live Stream Desk"],
      inCharge: "Dept. of Applied Mathematics",
      contact: "math-seminars@apex.edu | Ext: 6021",
      hours: "08:00 AM - 09:00 PM",
      tags: ["seminar", "hall", "math", "ramanujan", "auditorium", "lecture", "block c", "floor 2"],
      description: "Prestigious tiered auditorium favored by pure mathematics, theoretical physics, and computational science keynotes.",
      directionsHint: "Top floor of Library Block C; directly off the elevator lobby on Floor 2.",
      rect: { x: 40, y: 40, w: 180, h: 140 },
      door: { x: 220, y: 110 }
    },
    {
      id: "C-202",
      name: "Special Collections & Rare Archives Wing",
      shortName: "Rare Archives (C-202)",
      category: "library",
      building: "block-c",
      floor: 2,
      roomNumber: "C-202",
      capacity: 30,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): ARCHIVE-2 - Historical University Documents Viewing",
      nextLecture: "Next (03:30 PM - 04:30 PM): DIGITIZE - High-Resolution Archival Scanning",
      timetable: [
      {
            "time": "10:00 AM - 01:00 PM",
            "code": "ARCHIVE-1",
            "title": "Rare Manuscripts Exhibition & Tour",
            "instructor": "Dr. Harold Finch",
            "type": "Exhibition",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "ARCHIVE-2",
            "title": "Historical University Documents Viewing",
            "instructor": "Dr. Harold Finch",
            "type": "Curated Tour",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "03:30 PM - 04:30 PM",
            "code": "DIGITIZE",
            "title": "High-Resolution Archival Scanning",
            "instructor": "Archival Tech",
            "type": "Preservation",
            "status": "Upcoming"
      }
],
      equipment: ["Climate & Humidity Regulated Cases", "Document Digitization Scanner", "White Glove Examination Tables"],
      inCharge: "Archivist Dr. Harold Finch",
      contact: "archives@apex.edu | Ext: 6022",
      hours: "10:00 AM - 04:30 PM",
      tags: ["archives", "history", "rare books", "manuscripts", "library", "block c"],
      description: "Protected repository housing historic regional manuscripts, faculty seminal publications, and university charter records.",
      directionsHint: "Floor 2 south corridor; ring chime at the security desk for escorted entry.",
      rect: { x: 280, y: 40, w: 180, h: 140 },
      door: { x: 280, y: 110 }
    },

    // ===================================================
    // BLOCK D - KALAM CONVENTION & STUDENT CENTER
    // ===================================================
    // Ground Floor
    {
      id: "D-001",
      name: "APJ Abdul Kalam Grand Auditorium",
      shortName: "Kalam Grand Auditorium (D-001)",
      category: "seminar",
      building: "block-d",
      floor: 0,
      roomNumber: "D-001",
      capacity: 850,
      status: "Available",
      currentEvent: "Live (02:00 PM - 05:00 PM): HACKATHON - Apex GenAI & Robotics Hackathon 2026",
      nextLecture: "Next (06:00 PM - 08:30 PM): CULTURAL - Annual Inter-College Symphony Orchestra",
      timetable: [
      {
            "time": "09:30 AM - 11:30 AM",
            "code": "CONVOCATION",
            "title": "University Rehearsals & Soundcheck",
            "instructor": "Event Director Daniel Craig",
            "type": "Rehearsal",
            "status": "Completed"
      },
      {
            "time": "02:00 PM - 05:00 PM",
            "code": "HACKATHON",
            "title": "Apex GenAI & Robotics Hackathon 2026",
            "instructor": "Prof. Kenneth Zhao & Dr. Sarah Mitchell",
            "type": "Symposium",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "06:00 PM - 08:30 PM",
            "code": "CULTURAL",
            "title": "Annual Inter-College Symphony Orchestra",
            "instructor": "Music Society",
            "type": "Concert",
            "status": "Upcoming"
      }
],
      equipment: ["850 Velour Theater Seats", "Proscenium Stage", "Dolby Atmos Professional Sound", "Green Rooms", "Theatrical Lighting Rig"],
      inCharge: "Chief Auditorium Manager Daniel Craig",
      contact: "auditorium@apex.edu | Ext: 7001",
      hours: "07:00 AM - 11:00 PM (By Event Booking)",
      tags: ["auditorium", "grand auditorium", "kalam", "seminar hall", "convocation", "cultural", "stage", "block d", "ground"],
      description: "Campus flagship cultural and academic performance venue for convocation ceremonies, global conferences, and concerts.",
      directionsHint: "Enter Block D main plaza; double monumental glass doors lead directly into the grand foyer of the auditorium.",
      rect: { x: 40, y: 40, w: 220, h: 180 },
      door: { x: 260, y: 130 }
    },
    {
      id: "D-002",
      name: "Apex Central Food Court & Dining Pavilion",
      shortName: "Food Court & Cafeteria (D-002)",
      category: "food",
      building: "block-d",
      floor: 0,
      roomNumber: "D-002",
      capacity: 350,
      status: "Available",
      currentEvent: "Live (11:30 AM - 03:30 PM): LUNCH - Campus Lunch Buffet & Grill Stations",
      nextLecture: "Next (04:00 PM - 07:00 PM): SNACKS - Bakery, Specialty Teas & Smoothies",
      timetable: [
      {
            "time": "07:30 AM - 10:30 AM",
            "code": "BREAKFAST",
            "title": "Morning Breakfast & Espresso Counter",
            "instructor": "Chef Marco Rossi",
            "type": "Dining",
            "status": "Completed"
      },
      {
            "time": "11:30 AM - 03:30 PM",
            "code": "LUNCH",
            "title": "Campus Lunch Buffet & Grill Stations",
            "instructor": "Dining Staff",
            "type": "Dining",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 07:00 PM",
            "code": "SNACKS",
            "title": "Bakery, Specialty Teas & Smoothies",
            "instructor": "Dining Staff",
            "type": "Dining",
            "status": "Upcoming"
      },
      {
            "time": "07:30 PM - 10:30 PM",
            "code": "DINNER",
            "title": "Dinner Service & Night Cafe",
            "instructor": "Chef Marco Rossi",
            "type": "Dining",
            "status": "Upcoming"
      }
],
      equipment: ["8 Multi-Cuisine Food Counters", "Kiosk Ordering Screens", "Outdoor Terrace Seating", "Hydration Stations"],
      inCharge: "Hospitality Lead Chef Marco Rossi",
      contact: "dining@apex.edu | Ext: 7002",
      hours: "07:30 AM - 10:30 PM",
      tags: ["food", "cafeteria", "lunch", "coffee", "canteen", "dining", "snacks", "block d", "ground"],
      description: "Vibrant dining commons serving hot international dishes, bakery items, healthy salad bars, and specialty espresso drinks.",
      directionsHint: "West wing of Block D ground floor; follow the aroma of fresh baking or outdoor umbrella dining area.",
      rect: { x: 280, y: 40, w: 180, h: 180 },
      door: { x: 280, y: 130 }
    },

    // Floor 1
    {
      id: "D-101",
      name: "University Student Council & Club Hub",
      shortName: "Student Council HQ (D-101)",
      category: "amenity",
      building: "block-d",
      floor: 1,
      roomNumber: "D-101",
      capacity: 60,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): FEST - Campus Cultural Fest Logistics Core",
      nextLecture: "Next (04:00 PM - 06:00 PM): CLUBS - Registered Societies Budget Allocation",
      timetable: [
      {
            "time": "10:00 AM - 12:00 PM",
            "code": "SENATE",
            "title": "Student Council Executive Committee",
            "instructor": "Student Union President",
            "type": "Meeting",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "FEST",
            "title": "Campus Cultural Fest Logistics Core",
            "instructor": "Fest Convenor",
            "type": "Planning",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 06:00 PM",
            "code": "CLUBS",
            "title": "Registered Societies Budget Allocation",
            "instructor": "Treasurer",
            "type": "Meeting",
            "status": "Upcoming"
      }
],
      equipment: ["Council Chambers", "Club Equipment Storage Lockers", "Banner Printing Plotter", "Rehearsal Space"],
      inCharge: "Student Union President",
      contact: "studentunion@apex.edu | Ext: 7011",
      hours: "08:00 AM - 10:00 PM",
      tags: ["student council", "clubs", "activities", "fest", "amenity", "block d", "floor 1"],
      description: "Center for student government, 40+ recognized campus societies, festival planning committees, and student advocacy.",
      directionsHint: "Take stairs or elevator to Floor 1 of Block D; follow the vibrant poster wall down the north hallway.",
      rect: { x: 40, y: 40, w: 180, h: 140 },
      door: { x: 220, y: 110 }
    },
    {
      id: "D-102",
      name: "Campus Health & Urgent Wellness Clinic",
      shortName: "Health & First-Aid Clinic (D-102)",
      category: "amenity",
      building: "block-d",
      floor: 1,
      roomNumber: "D-102",
      capacity: 25,
      status: "Available",
      currentEvent: "Live (01:00 PM - 05:00 PM): CLINIC-2 - Walk-In Clinic & Wellness Checkups",
      nextLecture: "Next (05:00 PM - 08:00 PM): WELLNESS - Counseling & Mental Health Consults",
      timetable: [
      {
            "time": "08:00 AM - 01:00 PM",
            "code": "CLINIC-1",
            "title": "General Physician Consultation & Triage",
            "instructor": "Dr. Rebecca Vance",
            "type": "Medical Care",
            "status": "Completed"
      },
      {
            "time": "01:00 PM - 05:00 PM",
            "code": "CLINIC-2",
            "title": "Walk-In Clinic & Wellness Checkups",
            "instructor": "Duty Medical Officer",
            "type": "Medical Care",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "05:00 PM - 08:00 PM",
            "code": "WELLNESS",
            "title": "Counseling & Mental Health Consults",
            "instructor": "Campus Counselor",
            "type": "Counseling",
            "status": "Upcoming"
      }
],
      equipment: ["Triage Bed", "Automated External Defibrillator (AED)", "Pharmacy Dispensary", "Mental Wellness Counseling Room"],
      inCharge: "Dr. Rebecca Vance (Medical Director)",
      contact: "healthcenter@apex.edu | Emergency Ext: 999",
      hours: "24/7 On-Call Medical Care",
      tags: ["health", "clinic", "doctor", "medical", "first aid", "emergency", "pharmacy", "block d", "floor 1"],
      description: "Full-service on-campus medical infirmary providing triage, physician checkups, prescription medicines, and first-aid response.",
      directionsHint: "Floor 1 east wing; clearly designated with illuminated red cross signage beside the elevator.",
      rect: { x: 280, y: 40, w: 180, h: 140 },
      door: { x: 280, y: 110 }
    },
    {
      id: "D-103",
      name: "Fitness Gymnasium & Indoor Recreation Studio",
      shortName: "Gym & Recreation (D-103)",
      category: "sports",
      building: "block-d",
      floor: 1,
      roomNumber: "D-103",
      capacity: 80,
      status: "Available",
      currentEvent: "Live (12:00 PM - 04:00 PM): SPORTS - Open Badminton & Indoor Courts",
      nextLecture: "Next (05:00 PM - 07:30 PM): FINALS - Inter-College Badminton Tournament Finals",
      timetable: [
      {
            "time": "06:00 AM - 10:00 AM",
            "code": "GYM-1",
            "title": "Morning Strength & Cardio Session",
            "instructor": "Coach Dave Henderson",
            "type": "Athletics",
            "status": "Completed"
      },
      {
            "time": "12:00 PM - 04:00 PM",
            "code": "SPORTS",
            "title": "Open Badminton & Indoor Courts",
            "instructor": "Gym Supervisor",
            "type": "Recreation",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "05:00 PM - 07:30 PM",
            "code": "FINALS",
            "title": "Inter-College Badminton Tournament Finals",
            "instructor": "Coach Dave Henderson",
            "type": "Tournament",
            "status": "Upcoming"
      },
      {
            "time": "07:30 PM - 10:00 PM",
            "code": "GYM-2",
            "title": "Evening Free Weights & Conditioning",
            "instructor": "Fitness Trainer",
            "type": "Athletics",
            "status": "Upcoming"
      }
],
      equipment: ["Cardio Treadmills & Rowers", "Free Weights & Power Racks", "2 Indoor Badminton Courts", "Locker Rooms & Showers"],
      inCharge: "Athletics Coach Dave Henderson",
      contact: "fitness@apex.edu | Ext: 7013",
      hours: "06:00 AM - 10:00 PM",
      tags: ["gym", "fitness", "sports", "badminton", "workout", "exercise", "block d"],
      description: "Modern athletic workout center equipped with commercial grade resistance machines, cardio equipment, and shower facilities.",
      directionsHint: "South corridor of Block D Floor 1; swipe your student ID badge at the fitness turnstile.",
      rect: { x: 160, y: 220, w: 180, h: 140 },
      door: { x: 250, y: 220 }
    },

    // ===================================================
    // BLOCK E - CHANAKYA ADMINISTRATIVE BLOCK
    // ===================================================
    // Ground Floor
    {
      id: "E-001",
      name: "Office of the Registrar & Admissions Center",
      shortName: "Registrar & Admissions (E-001)",
      category: "admin",
      building: "block-e",
      floor: 0,
      roomNumber: "E-001",
      capacity: 50,
      status: "Available",
      currentEvent: "Live (01:00 PM - 03:30 PM): ADM-2 - Enrollment Verification & Student ID Counter",
      nextLecture: "Next (03:30 PM - 05:00 PM): ADM-3 - International Student Visa Certification",
      timetable: [
      {
            "time": "09:00 AM - 12:00 PM",
            "code": "ADM-1",
            "title": "Degree Transcripts & Official Seal Issuance",
            "instructor": "Admissions Officer",
            "type": "Administrative",
            "status": "Completed"
      },
      {
            "time": "01:00 PM - 03:30 PM",
            "code": "ADM-2",
            "title": "Enrollment Verification & Student ID Counter",
            "instructor": "Registrar Office Staff",
            "type": "Administrative",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "03:30 PM - 05:00 PM",
            "code": "ADM-3",
            "title": "International Student Visa Certification",
            "instructor": "Admissions Desk",
            "type": "Administrative",
            "status": "Upcoming"
      }
],
      equipment: ["Token Queue Management System", "Document Verification Desks", "Student Records Vault"],
      inCharge: "Registrar Dr. Robert Thorne",
      contact: "registrar@apex.edu | Ext: 8001",
      hours: "09:00 AM - 05:00 PM (Mon-Fri)",
      tags: ["registrar", "admissions", "transcripts", "id cards", "admin", "block e", "ground"],
      description: "Official office for student enrollment, grade transcripts, official degree verification, and institutional paperwork.",
      directionsHint: "Main entrance of Block E; grab a digital queue token from the touch kiosk in the marble lobby.",
      rect: { x: 40, y: 40, w: 180, h: 140 },
      door: { x: 220, y: 110 }
    },
    {
      id: "E-002",
      name: "Student Financial Aid & Bursar Accounts Wing",
      shortName: "Accounts & Bursar (E-002)",
      category: "admin",
      building: "block-e",
      floor: 0,
      roomNumber: "E-002",
      capacity: 40,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): SCHOLAR - Institutional Merit Scholarships & Grants",
      nextLecture: "Next (03:30 PM - 04:30 PM): FEE-2 - Refund Inquiries & Accounts Auditing",
      timetable: [
      {
            "time": "09:30 AM - 12:30 PM",
            "code": "FEE-1",
            "title": "Semester Tuition & Fee Payment Clearance",
            "instructor": "Bursar Brenda Miller",
            "type": "Accounts",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "SCHOLAR",
            "title": "Institutional Merit Scholarships & Grants",
            "instructor": "Financial Aid Officer",
            "type": "Counseling",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "03:30 PM - 04:30 PM",
            "code": "FEE-2",
            "title": "Refund Inquiries & Accounts Auditing",
            "instructor": "Accounts Desk",
            "type": "Accounts",
            "status": "Upcoming"
      }
],
      equipment: ["3 Cashier Counters", "Scholarship Counseling Desk", "POS Payment Terminals"],
      inCharge: "Bursar Brenda Miller",
      contact: "bursar@apex.edu | Ext: 8002",
      hours: "09:30 AM - 04:30 PM",
      tags: ["accounts", "fees", "scholarships", "bursar", "finance", "admin", "block e"],
      description: "Assists students with semester tuition payments, institutional scholarships, merit grants, and account inquiries.",
      directionsHint: "Right wing of the ground floor lobby in Block E; directly adjacent to the university ATM booth.",
      rect: { x: 280, y: 40, w: 180, h: 140 },
      door: { x: 280, y: 110 }
    },
    {
      id: "E-003",
      name: "University Examination Branch & Record Cell",
      shortName: "Examination Cell (E-003)",
      category: "admin",
      building: "block-e",
      floor: 0,
      roomNumber: "E-003",
      capacity: 35,
      status: "Occupied",
      currentEvent: "Live (01:00 PM - 03:30 PM): EVAL - Automated Scantron Sheet Evaluation",
      nextLecture: "Next (03:30 PM - 05:30 PM): GRADE - Semester GPA & Grade Sheet Tabulation",
      timetable: [
      {
            "time": "09:00 AM - 12:00 PM",
            "code": "EXAM-1",
            "title": "Mid-Term Question Paper Encryption & Dispatch",
            "instructor": "Controller Dr. K. Raman",
            "type": "Confidential",
            "status": "Completed"
      },
      {
            "time": "01:00 PM - 03:30 PM",
            "code": "EVAL",
            "title": "Automated Scantron Sheet Evaluation",
            "instructor": "Evaluation Officers",
            "type": "Processing",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "03:30 PM - 05:30 PM",
            "code": "GRADE",
            "title": "Semester GPA & Grade Sheet Tabulation",
            "instructor": "Record Cell Team",
            "type": "Record Keeping",
            "status": "Upcoming"
      }
],
      equipment: ["High-Security Script Vault", "High-Speed Optical Scanners", "CCTV Surveillance Console"],
      inCharge: "Controller of Examinations Dr. K. Raman",
      contact: "exams@apex.edu | Ext: 8003",
      hours: "09:00 AM - 05:30 PM",
      tags: ["exam", "evaluation", "grades", "results", "admin", "block e"],
      description: "Oversees scheduling, confidentiality, and tabulation of all university assessments and grade point averages.",
      directionsHint: "Floor 0 rear corridor; strictly authorized visitors require identity badge presentation.",
      rect: { x: 160, y: 220, w: 180, h: 140 },
      door: { x: 250, y: 220 }
    },

    // Floor 1
    {
      id: "E-101",
      name: "Office of the Vice-Chancellor & Executive Council",
      shortName: "Vice-Chancellor's Secretariat (E-101)",
      category: "admin",
      building: "block-e",
      floor: 1,
      roomNumber: "E-101",
      capacity: 35,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): DELEGATION - International Academic Delegation Meeting",
      nextLecture: "Next (04:00 PM - 05:00 PM): BRIEF - Dean's Committee Strategic Review",
      timetable: [
      {
            "time": "09:30 AM - 11:30 AM",
            "code": "CABINET",
            "title": "University Executive Council Briefing",
            "instructor": "Vice-Chancellor Prof. Sterling",
            "type": "Governance",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "DELEGATION",
            "title": "International Academic Delegation Meeting",
            "instructor": "Vice-Chancellor's Secretariat",
            "type": "Official Meeting",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:00 PM - 05:00 PM",
            "code": "BRIEF",
            "title": "Dean's Committee Strategic Review",
            "instructor": "VC Secretariat",
            "type": "Governance",
            "status": "Upcoming"
      }
],
      equipment: ["Executive Boardroom Table", "Encrypted Teleconferencing", "Private Receptionist Foyer"],
      inCharge: "Prof. Arthur Sterling (Vice-Chancellor)",
      contact: "vc.office@apex.edu | Ext: 8011",
      hours: "09:00 AM - 05:00 PM (By Appointment)",
      tags: ["vice chancellor", "vc", "executive", "boardroom", "admin", "block e", "floor 1"],
      description: "The senior administrative leadership suite of the university, presiding over academic policy and institutional charter.",
      directionsHint: "Floor 1 center wing; take executive elevator or curved main staircase; check in with the VC's Executive Secretary.",
      rect: { x: 40, y: 40, w: 180, h: 140 },
      door: { x: 220, y: 110 }
    },
    {
      id: "E-102",
      name: "Corporate Relations & Career Placement Center",
      shortName: "Placement Cell & Interview Suites (E-102)",
      category: "admin",
      building: "block-e",
      floor: 1,
      roomNumber: "E-102",
      capacity: 75,
      status: "Available",
      currentEvent: "Live (01:30 PM - 04:00 PM): CORP-2 - Microsoft Core Software Engineer Interviews",
      nextLecture: "Next (04:30 PM - 06:30 PM): MOCK - Algorithm Whiteboard Mock Interview Prep",
      timetable: [
      {
            "time": "09:00 AM - 11:30 AM",
            "code": "CORP-1",
            "title": "Google Recruitment Technical Interviews",
            "instructor": "Jessica Vance & Google Eng Team",
            "type": "Interviews",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 04:00 PM",
            "code": "CORP-2",
            "title": "Microsoft Core Software Engineer Interviews",
            "instructor": "Corporate Interview Panel",
            "type": "Interviews",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "04:30 PM - 06:30 PM",
            "code": "MOCK",
            "title": "Algorithm Whiteboard Mock Interview Prep",
            "instructor": "Placement Mentors",
            "type": "Coaching",
            "status": "Upcoming"
      }
],
      equipment: ["10 Private Corporate Interview Cubicles", "Mock Interview Video System", "Resume Review Lounge"],
      inCharge: "Director of Placements Jessica Vance",
      contact: "careers@apex.edu | Ext: 8012",
      hours: "08:30 AM - 07:00 PM",
      tags: ["placements", "jobs", "careers", "internships", "interviews", "corporate", "admin", "block e", "floor 1"],
      description: "Hub for campus internships, corporate relations, mock interviews, and final placement drives with top global firms.",
      directionsHint: "Floor 1 east wing; marked with glass doors and corporate company partner banners.",
      rect: { x: 280, y: 40, w: 180, h: 140 },
      door: { x: 280, y: 110 }
    },
    {
      id: "E-103",
      name: "Dean of Academic Affairs & Student Mentorship",
      shortName: "Dean of Academics (E-103)",
      category: "admin",
      building: "block-e",
      floor: 1,
      roomNumber: "E-103",
      capacity: 30,
      status: "Available",
      currentEvent: "Live (01:30 PM - 03:30 PM): CREDITS - Course Credit Transfer & Degree Audit",
      nextLecture: "Next (03:30 PM - 04:30 PM): CURRICULUM - AI Specialization Curriculum Review",
      timetable: [
      {
            "time": "10:00 AM - 12:30 PM",
            "code": "ADVISE",
            "title": "Academic Standing & Major/Minor Petitions",
            "instructor": "Dean Catherine Dupont",
            "type": "Advising",
            "status": "Completed"
      },
      {
            "time": "01:30 PM - 03:30 PM",
            "code": "CREDITS",
            "title": "Course Credit Transfer & Degree Audit",
            "instructor": "Dean Academic Affairs",
            "type": "Advising",
            "status": "Live Now",
            "isCurrent": true
      },
      {
            "time": "03:30 PM - 04:30 PM",
            "code": "CURRICULUM",
            "title": "AI Specialization Curriculum Review",
            "instructor": "Academic Committee",
            "type": "Meeting",
            "status": "Upcoming"
      }
],
      equipment: ["Dean's Private Office", "Advising Conference Room", "Academic Records Terminal"],
      inCharge: "Prof. Catherine Dupont (Dean)",
      contact: "dean.academics@apex.edu | Ext: 8013",
      hours: "10:00 AM - 04:30 PM",
      tags: ["dean", "academics", "mentorship", "credits", "petitions", "admin", "block e"],
      description: "Oversees curriculum standards, major/minor declarations, grade appeals, and student academic welfare.",
      directionsHint: "Floor 1 south hallway, Room E-103, adjacent to the International Student Relations office.",
      rect: { x: 160, y: 220, w: 180, h: 140 },
      door: { x: 250, y: 220 }
    }
  ],

  // Building floor plan layout metadata (Hallways, Elevators, Restrooms, Stairs)
  floorPlans: {
    "defaultLayout": {
      width: 500,
      height: 400,
      hallways: [
        { type: "h", x: 30, y: 190, w: 440, h: 20 },
        { type: "v", x: 230, y: 30, w: 40, h: 340 }
      ],
      facilities: [
        { id: "elev-1", type: "elevator", name: "Central Elevator", x: 235, y: 45, w: 30, h: 30, icon: "elevator" },
        { id: "stairs-1", type: "stairs", name: "Main Staircase", x: 235, y: 325, w: 30, h: 30, icon: "stairs" },
        { id: "restroom-1", type: "restroom", name: "Restrooms (All-Gender / Accessible)", x: 235, y: 185, w: 30, h: 30, icon: "restroom" }
      ]
    }
  },

  // Campus Navigation Graph (Nodes and Edges for shortest path calculation)
  // Connects outdoor landmarks, building entrances, elevators, stairs, and room doors
  navigationGraph: {
    nodes: {
      // Outdoor gates & landmarks
      "gate-1": { id: "gate-1", name: "Main Campus Gate (North)", x: 500, y: 40, building: "outdoor", floor: 0 },
      "gate-2": { id: "gate-2", name: "South Gate (Metro Access)", x: 500, y: 710, building: "outdoor", floor: 0 },
      "fountain": { id: "fountain", name: "Central Quadrangle Fountain", x: 500, y: 220, building: "outdoor", floor: 0 },
      "amphitheater": { id: "amphitheater", name: "Open-Air Amphitheater", x: 500, y: 560, building: "outdoor", floor: 0 },
      "path-north-west": { id: "path-north-west", name: "North-West Campus Promenade", x: 340, y: 140, building: "outdoor", floor: 0 },
      "path-north-east": { id: "path-north-east", name: "North-East Campus Promenade", x: 660, y: 140, building: "outdoor", floor: 0 },
      "path-south-west": { id: "path-south-west", name: "South-West Campus Promenade", x: 340, y: 620, building: "outdoor", floor: 0 },
      "path-south-east": { id: "path-south-east", name: "South-East Campus Promenade", x: 660, y: 620, building: "outdoor", floor: 0 },
      "path-center-library": { id: "path-center-library", name: "Library Central Plaza", x: 500, y: 390, building: "outdoor", floor: 0 },

      // Building Entrances
      "ent-block-a": { id: "ent-block-a", name: "Block A Main Entrance", x: 340, y: 220, building: "block-a", floor: 0 },
      "ent-block-b": { id: "ent-block-b", name: "Block B Main Entrance", x: 660, y: 220, building: "block-b", floor: 0 },
      "ent-block-c": { id: "ent-block-c", name: "Block C Library Entrance", x: 500, y: 310, building: "block-c", floor: 0 },
      "ent-block-d": { id: "ent-block-d", name: "Block D Convention Center Entrance", x: 340, y: 560, building: "block-d", floor: 0 },
      "ent-block-e": { id: "ent-block-e", name: "Block E Admin Entrance", x: 660, y: 560, building: "block-e", floor: 0 },

      // Block A Internal Nodes (Ground to Floor 3)
      "A-F0-lobby": { id: "A-F0-lobby", name: "Block A Ground Lobby", x: 250, y: 200, building: "block-a", floor: 0 },
      "A-F0-elev": { id: "A-F0-elev", name: "Block A Elevator (Ground)", x: 250, y: 60, building: "block-a", floor: 0, isVerticalTransit: true, verticalGroup: "A-elev" },
      "A-F0-stairs": { id: "A-F0-stairs", name: "Block A Stairs (Ground)", x: 250, y: 340, building: "block-a", floor: 0, isVerticalTransit: true, verticalGroup: "A-stairs" },
      "A-F0-door-001": { id: "A-F0-door-001", name: "Door A-001 (Robotics Lab)", x: 220, y: 110, building: "block-a", floor: 0, locationId: "A-001" },
      "A-F0-door-002": { id: "A-F0-door-002", name: "Door A-002 (Classroom)", x: 280, y: 110, building: "block-a", floor: 0, locationId: "A-002" },
      "A-F0-door-003": { id: "A-F0-door-003", name: "Door A-003 (Computer Center 1)", x: 220, y: 290, building: "block-a", floor: 0, locationId: "A-003" },
      "A-F0-door-004": { id: "A-F0-door-004", name: "Door A-004 (Lounge)", x: 280, y: 290, building: "block-a", floor: 0, locationId: "A-004" },

      // Block A Floor 1
      "A-F1-lobby": { id: "A-F1-lobby", name: "Block A Floor 1 Hallway", x: 250, y: 200, building: "block-a", floor: 1 },
      "A-F1-elev": { id: "A-F1-elev", name: "Block A Elevator (Floor 1)", x: 250, y: 60, building: "block-a", floor: 1, isVerticalTransit: true, verticalGroup: "A-elev" },
      "A-F1-stairs": { id: "A-F1-stairs", name: "Block A Stairs (Floor 1)", x: 250, y: 340, building: "block-a", floor: 1, isVerticalTransit: true, verticalGroup: "A-stairs" },
      "A-F1-door-101": { id: "A-F1-door-101", name: "Door A-101 (Systems Lab)", x: 220, y: 110, building: "block-a", floor: 1, locationId: "A-101" },
      "A-F1-door-102": { id: "A-F1-door-102", name: "Door A-102 (Lecture Theater)", x: 280, y: 110, building: "block-a", floor: 1, locationId: "A-102" },
      "A-F1-door-103": { id: "A-F1-door-103", name: "Door A-103 (CyberSec Lab)", x: 220, y: 290, building: "block-a", floor: 1, locationId: "A-103" },
      "A-F1-door-104": { id: "A-F1-door-104", name: "Door A-104 (CSE Faculty)", x: 280, y: 290, building: "block-a", floor: 1, locationId: "A-104" },

      // Block A Floor 2
      "A-F2-lobby": { id: "A-F2-lobby", name: "Block A Floor 2 Hallway", x: 250, y: 200, building: "block-a", floor: 2 },
      "A-F2-elev": { id: "A-F2-elev", name: "Block A Elevator (Floor 2)", x: 250, y: 60, building: "block-a", floor: 2, isVerticalTransit: true, verticalGroup: "A-elev" },
      "A-F2-stairs": { id: "A-F2-stairs", name: "Block A Stairs (Floor 2)", x: 250, y: 340, building: "block-a", floor: 2, isVerticalTransit: true, verticalGroup: "A-stairs" },
      "A-F2-door-201": { id: "A-F2-door-201", name: "Door A-201 (AI Lab)", x: 220, y: 110, building: "block-a", floor: 2, locationId: "A-201" },
      "A-F2-door-202": { id: "A-F2-door-202", name: "Door A-202 (Dev Studio)", x: 280, y: 110, building: "block-a", floor: 2, locationId: "A-202" },
      "A-F2-door-203": { id: "A-F2-door-203", name: "Door A-203 (Turing Seminar Hall)", x: 220, y: 290, building: "block-a", floor: 2, locationId: "A-203" },
      "A-F2-door-204": { id: "A-F2-door-204", name: "Door A-204 (IoT Lab)", x: 280, y: 290, building: "block-a", floor: 2, locationId: "A-204" },

      // Block A Floor 3
      "A-F3-lobby": { id: "A-F3-lobby", name: "Block A Floor 3 Hallway", x: 250, y: 200, building: "block-a", floor: 3 },
      "A-F3-elev": { id: "A-F3-elev", name: "Block A Elevator (Floor 3)", x: 250, y: 60, building: "block-a", floor: 3, isVerticalTransit: true, verticalGroup: "A-elev" },
      "A-F3-stairs": { id: "A-F3-stairs", name: "Block A Stairs (Floor 3)", x: 250, y: 340, building: "block-a", floor: 3, isVerticalTransit: true, verticalGroup: "A-stairs" },
      "A-F3-door-301": { id: "A-F3-door-301", name: "Door A-301 (GPU Cluster)", x: 220, y: 110, building: "block-a", floor: 3, locationId: "A-301" },
      "A-F3-door-302": { id: "A-F3-door-302", name: "Door A-302 (VR Lab)", x: 280, y: 110, building: "block-a", floor: 3, locationId: "A-302" },
      "A-F3-door-303": { id: "A-F3-door-303", name: "Door A-303 (Seminar Room)", x: 250, y: 220, building: "block-a", floor: 3, locationId: "A-303" },

      // Block B Nodes (Sciences)
      "B-F0-lobby": { id: "B-F0-lobby", name: "Block B Ground Lobby", x: 250, y: 200, building: "block-b", floor: 0 },
      "B-F0-elev": { id: "B-F0-elev", name: "Block B Elevator (Ground)", x: 250, y: 60, building: "block-b", floor: 0, isVerticalTransit: true, verticalGroup: "B-elev" },
      "B-F0-stairs": { id: "B-F0-stairs", name: "Block B Stairs (Ground)", x: 250, y: 340, building: "block-b", floor: 0, isVerticalTransit: true, verticalGroup: "B-stairs" },
      "B-F0-door-001": { id: "B-F0-door-001", name: "Door B-001 (Physics Optics Lab)", x: 220, y: 110, building: "block-b", floor: 0, locationId: "B-001" },
      "B-F0-door-002": { id: "B-F0-door-002", name: "Door B-002 (Chemistry Lab)", x: 280, y: 110, building: "block-b", floor: 0, locationId: "B-002" },
      "B-F0-door-003": { id: "B-F0-door-003", name: "Door B-003 (Materials Science)", x: 250, y: 220, building: "block-b", floor: 0, locationId: "B-003" },

      "B-F1-lobby": { id: "B-F1-lobby", name: "Block B Floor 1 Hallway", x: 250, y: 200, building: "block-b", floor: 1 },
      "B-F1-elev": { id: "B-F1-elev", name: "Block B Elevator (Floor 1)", x: 250, y: 60, building: "block-b", floor: 1, isVerticalTransit: true, verticalGroup: "B-elev" },
      "B-F1-stairs": { id: "B-F1-stairs", name: "Block B Stairs (Floor 1)", x: 250, y: 340, building: "block-b", floor: 1, isVerticalTransit: true, verticalGroup: "B-stairs" },
      "B-F1-door-101": { id: "B-F1-door-101", name: "Door B-101 (Genetics Lab)", x: 220, y: 110, building: "block-b", floor: 1, locationId: "B-101" },
      "B-F1-door-102": { id: "B-F1-door-102", name: "Door B-102 (Curie Seminar Hall)", x: 280, y: 110, building: "block-b", floor: 1, locationId: "B-102" },
      "B-F1-door-103": { id: "B-F1-door-103", name: "Door B-103 (Classroom B-103)", x: 250, y: 220, building: "block-b", floor: 1, locationId: "B-103" },

      "B-F2-lobby": { id: "B-F2-lobby", name: "Block B Floor 2 Hallway", x: 250, y: 200, building: "block-b", floor: 2 },
      "B-F2-elev": { id: "B-F2-elev", name: "Block B Elevator (Floor 2)", x: 250, y: 60, building: "block-b", floor: 2, isVerticalTransit: true, verticalGroup: "B-elev" },
      "B-F2-stairs": { id: "B-F2-stairs", name: "Block B Stairs (Floor 2)", x: 250, y: 340, building: "block-b", floor: 2, isVerticalTransit: true, verticalGroup: "B-stairs" },
      "B-F2-door-201": { id: "B-F2-door-201", name: "Door B-201 (Bioinformatics)", x: 220, y: 110, building: "block-b", floor: 2, locationId: "B-201" },
      "B-F2-door-202": { id: "B-F2-door-202", name: "Door B-202 (Climate Lab)", x: 280, y: 110, building: "block-b", floor: 2, locationId: "B-202" },

      // Block C Nodes (Library & Innovation)
      "C-F0-lobby": { id: "C-F0-lobby", name: "Block C Ground Atrium", x: 250, y: 200, building: "block-c", floor: 0 },
      "C-F0-elev": { id: "C-F0-elev", name: "Block C Elevator (Ground)", x: 250, y: 60, building: "block-c", floor: 0, isVerticalTransit: true, verticalGroup: "C-elev" },
      "C-F0-stairs": { id: "C-F0-stairs", name: "Block C Spiral Stairs (Ground)", x: 250, y: 340, building: "block-c", floor: 0, isVerticalTransit: true, verticalGroup: "C-stairs" },
      "C-F0-door-001": { id: "C-F0-door-001", name: "Door C-001 (Circulation Desk)", x: 220, y: 110, building: "block-c", floor: 0, locationId: "C-001" },
      "C-F0-door-002": { id: "C-F0-door-002", name: "Door C-002 (Silent Study)", x: 280, y: 110, building: "block-c", floor: 0, locationId: "C-002" },

      "C-F1-lobby": { id: "C-F1-lobby", name: "Block C Floor 1 Mezzanine", x: 250, y: 200, building: "block-c", floor: 1 },
      "C-F1-elev": { id: "C-F1-elev", name: "Block C Elevator (Floor 1)", x: 250, y: 60, building: "block-c", floor: 1, isVerticalTransit: true, verticalGroup: "C-elev" },
      "C-F1-stairs": { id: "C-F1-stairs", name: "Block C Spiral Stairs (Floor 1)", x: 250, y: 340, building: "block-c", floor: 1, isVerticalTransit: true, verticalGroup: "C-stairs" },
      "C-F1-door-101": { id: "C-F1-door-101", name: "Door C-101 (Maker Space)", x: 220, y: 110, building: "block-c", floor: 1, locationId: "C-101" },
      "C-F1-door-102": { id: "C-F1-door-102", name: "Door C-102 (Startup Incubator)", x: 280, y: 110, building: "block-c", floor: 1, locationId: "C-102" },

      "C-F2-lobby": { id: "C-F2-lobby", name: "Block C Floor 2 Gallery", x: 250, y: 200, building: "block-c", floor: 2 },
      "C-F2-elev": { id: "C-F2-elev", name: "Block C Elevator (Floor 2)", x: 250, y: 60, building: "block-c", floor: 2, isVerticalTransit: true, verticalGroup: "C-elev" },
      "C-F2-stairs": { id: "C-F2-stairs", name: "Block C Spiral Stairs (Floor 2)", x: 250, y: 340, building: "block-c", floor: 2, isVerticalTransit: true, verticalGroup: "C-stairs" },
      "C-F2-door-201": { id: "C-F2-door-201", name: "Door C-201 (Ramanujan Hall)", x: 220, y: 110, building: "block-c", floor: 2, locationId: "C-201" },
      "C-F2-door-202": { id: "C-F2-door-202", name: "Door C-202 (Rare Archives)", x: 280, y: 110, building: "block-c", floor: 2, locationId: "C-202" },

      // Block D Nodes (Kalam Convention & Student Center)
      "D-F0-lobby": { id: "D-F0-lobby", name: "Block D Ground Grand Foyer", x: 250, y: 200, building: "block-d", floor: 0 },
      "D-F0-elev": { id: "D-F0-elev", name: "Block D Elevator (Ground)", x: 250, y: 60, building: "block-d", floor: 0, isVerticalTransit: true, verticalGroup: "D-elev" },
      "D-F0-stairs": { id: "D-F0-stairs", name: "Block D Stairs (Ground)", x: 250, y: 340, building: "block-d", floor: 0, isVerticalTransit: true, verticalGroup: "D-stairs" },
      "D-F0-door-001": { id: "D-F0-door-001", name: "Door D-001 (Kalam Grand Auditorium)", x: 260, y: 130, building: "block-d", floor: 0, locationId: "D-001" },
      "D-F0-door-002": { id: "D-F0-door-002", name: "Door D-002 (Food Court & Cafeteria)", x: 280, y: 130, building: "block-d", floor: 0, locationId: "D-002" },

      "D-F1-lobby": { id: "D-F1-lobby", name: "Block D Floor 1 Concourse", x: 250, y: 200, building: "block-d", floor: 1 },
      "D-F1-elev": { id: "D-F1-elev", name: "Block D Elevator (Floor 1)", x: 250, y: 60, building: "block-d", floor: 1, isVerticalTransit: true, verticalGroup: "D-elev" },
      "D-F1-stairs": { id: "D-F1-stairs", name: "Block D Stairs (Floor 1)", x: 250, y: 340, building: "block-d", floor: 1, isVerticalTransit: true, verticalGroup: "D-stairs" },
      "D-F1-door-101": { id: "D-F1-door-101", name: "Door D-101 (Student Council)", x: 220, y: 110, building: "block-d", floor: 1, locationId: "D-101" },
      "D-F1-door-102": { id: "D-F1-door-102", name: "Door D-102 (Health Clinic)", x: 280, y: 110, building: "block-d", floor: 1, locationId: "D-102" },
      "D-F1-door-103": { id: "D-F1-door-103", name: "Door D-103 (Gym & Fitness)", x: 250, y: 220, building: "block-d", floor: 1, locationId: "D-103" },

      // Block E Nodes (Administrative Block)
      "E-F0-lobby": { id: "E-F0-lobby", name: "Block E Ground Marble Lobby", x: 250, y: 200, building: "block-e", floor: 0 },
      "E-F0-elev": { id: "E-F0-elev", name: "Block E Elevator (Ground)", x: 250, y: 60, building: "block-e", floor: 0, isVerticalTransit: true, verticalGroup: "E-elev" },
      "E-F0-stairs": { id: "E-F0-stairs", name: "Block E Marble Stairs (Ground)", x: 250, y: 340, building: "block-e", floor: 0, isVerticalTransit: true, verticalGroup: "E-stairs" },
      "E-F0-door-001": { id: "E-F0-door-001", name: "Door E-001 (Registrar & Admissions)", x: 220, y: 110, building: "block-e", floor: 0, locationId: "E-001" },
      "E-F0-door-002": { id: "E-F0-door-002", name: "Door E-002 (Bursar & Accounts)", x: 280, y: 110, building: "block-e", floor: 0, locationId: "E-002" },
      "E-F0-door-003": { id: "E-F0-door-003", name: "Door E-003 (Examination Branch)", x: 250, y: 220, building: "block-e", floor: 0, locationId: "E-003" },

      "E-F1-lobby": { id: "E-F1-lobby", name: "Block E Floor 1 Executive Floor", x: 250, y: 200, building: "block-e", floor: 1 },
      "E-F1-elev": { id: "E-F1-elev", name: "Block E Elevator (Floor 1)", x: 250, y: 60, building: "block-e", floor: 1, isVerticalTransit: true, verticalGroup: "E-elev" },
      "E-F1-stairs": { id: "E-F1-stairs", name: "Block E Stairs (Floor 1)", x: 250, y: 340, building: "block-e", floor: 1, isVerticalTransit: true, verticalGroup: "E-stairs" },
      "E-F1-door-101": { id: "E-F1-door-101", name: "Door E-101 (Vice-Chancellor)", x: 220, y: 110, building: "block-e", floor: 1, locationId: "E-101" },
      "E-F1-door-102": { id: "E-F1-door-102", name: "Door E-102 (Placement Cell)", x: 280, y: 110, building: "block-e", floor: 1, locationId: "E-102" },
      "E-F1-door-103": { id: "E-F1-door-103", name: "Door E-103 (Dean of Academics)", x: 250, y: 220, building: "block-e", floor: 1, locationId: "E-103" }
    },

    // Graph Edges with weights (distance in meters), accessibility flag (wheelchair accessible)
    edges: [
      // Outdoor connections
      { from: "gate-1", to: "fountain", dist: 180, accessible: true, desc: "Walk down Central Avenue from North Gate to Quadrangle Fountain" },
      { from: "gate-1", to: "path-north-west", dist: 160, accessible: true, desc: "Follow North-West tree-lined pathway towards Turing Hall" },
      { from: "gate-1", to: "path-north-east", dist: 160, accessible: true, desc: "Follow North-East shaded pathway towards Curie Complex" },
      { from: "path-north-west", to: "ent-block-a", dist: 90, accessible: true, desc: "Enter Turing Hall via Main West Entrance Ramp" },
      { from: "path-north-east", to: "ent-block-b", dist: 90, accessible: true, desc: "Enter Curie Complex via Main East Entrance" },
      { from: "fountain", to: "ent-block-a", dist: 160, accessible: true, desc: "Cross west lawn from Fountain to Turing Hall" },
      { from: "fountain", to: "ent-block-b", dist: 160, accessible: true, desc: "Cross east lawn from Fountain to Curie Complex" },
      { from: "fountain", to: "path-center-library", dist: 170, accessible: true, desc: "Head south along Central Promenade to Library Plaza" },
      { from: "path-center-library", to: "ent-block-c", dist: 80, accessible: true, desc: "Ascend wide ramp to Aryabhata Library entrance" },
      { from: "path-center-library", to: "amphitheater", dist: 170, accessible: true, desc: "Walk south towards Open-Air Amphitheater" },
      { from: "amphitheater", to: "path-south-west", dist: 160, accessible: true, desc: "Paved path towards Kalam Convention Center" },
      { from: "amphitheater", to: "path-south-east", dist: 160, accessible: true, desc: "Paved path towards Chanakya Admin Block" },
      { from: "amphitheater", to: "gate-2", dist: 150, accessible: true, desc: "South Promenade towards Metro Station Gate 2" },
      { from: "path-south-west", to: "ent-block-d", dist: 90, accessible: true, desc: "Enter Kalam Convention & Student Center" },
      { from: "path-south-east", to: "ent-block-e", dist: 90, accessible: true, desc: "Enter Chanakya Administrative Block" },
      { from: "gate-2", to: "path-south-west", dist: 180, accessible: true, desc: "Walk from South Metro Gate to Block D" },
      { from: "gate-2", to: "path-south-east", dist: 180, accessible: true, desc: "Walk from South Metro Gate to Block E" },

      // Building A Entry to Ground Nodes
      { from: "ent-block-a", to: "A-F0-lobby", dist: 15, accessible: true, desc: "Step through automatic glass sliding doors into Lobby" },
      { from: "A-F0-lobby", to: "A-F0-elev", dist: 25, accessible: true, desc: "Walk to Central Elevator bank" },
      { from: "A-F0-lobby", to: "A-F0-stairs", dist: 25, accessible: false, desc: "Take Main Stairs" },
      { from: "A-F0-lobby", to: "A-F0-door-001", dist: 15, accessible: true, desc: "Turn left into Robotics Lab A-001" },
      { from: "A-F0-lobby", to: "A-F0-door-002", dist: 15, accessible: true, desc: "Turn right into Smart Classroom A-002" },
      { from: "A-F0-lobby", to: "A-F0-door-003", dist: 20, accessible: true, desc: "South hallway to Computer Center 1 A-003" },
      { from: "A-F0-lobby", to: "A-F0-door-004", dist: 20, accessible: true, desc: "South hallway to Student Lounge A-004" },

      // Block A Vertical Transit (Elevators: Accessible, Stairs: Non-accessible)
      { from: "A-F0-elev", to: "A-F1-elev", dist: 10, accessible: true, desc: "Take elevator to Floor 1" },
      { from: "A-F1-elev", to: "A-F2-elev", dist: 10, accessible: true, desc: "Take elevator to Floor 2" },
      { from: "A-F2-elev", to: "A-F3-elev", dist: 10, accessible: true, desc: "Take elevator to Floor 3" },
      { from: "A-F0-stairs", to: "A-F1-stairs", dist: 15, accessible: false, desc: "Climb flight of stairs to Floor 1" },
      { from: "A-F1-stairs", to: "A-F2-stairs", dist: 15, accessible: false, desc: "Climb flight of stairs to Floor 2" },
      { from: "A-F2-stairs", to: "A-F3-stairs", dist: 15, accessible: false, desc: "Climb flight of stairs to Floor 3" },

      // Block A Floor 1
      { from: "A-F1-lobby", to: "A-F1-elev", dist: 25, accessible: true, desc: "Exit elevator into Floor 1 corridor" },
      { from: "A-F1-lobby", to: "A-F1-stairs", dist: 25, accessible: false, desc: "Exit stairwell into Floor 1 corridor" },
      { from: "A-F1-lobby", to: "A-F1-door-101", dist: 15, accessible: true, desc: "Enter Systems Lab A-101" },
      { from: "A-F1-lobby", to: "A-F1-door-102", dist: 15, accessible: true, desc: "Enter Tiered Lecture Theater A-102" },
      { from: "A-F1-lobby", to: "A-F1-door-103", dist: 20, accessible: true, desc: "Enter CyberSec Lab A-103" },
      { from: "A-F1-lobby", to: "A-F1-door-104", dist: 20, accessible: true, desc: "Enter CSE Faculty Wing A-104" },

      // Block A Floor 2
      { from: "A-F2-lobby", to: "A-F2-elev", dist: 25, accessible: true, desc: "Exit elevator into Floor 2 corridor" },
      { from: "A-F2-lobby", to: "A-F2-stairs", dist: 25, accessible: false, desc: "Exit stairwell into Floor 2 corridor" },
      { from: "A-F2-lobby", to: "A-F2-door-201", dist: 15, accessible: true, desc: "Proceed to AI Lab A-201" },
      { from: "A-F2-lobby", to: "A-F2-door-202", dist: 15, accessible: true, desc: "Proceed to Dev Studio A-202" },
      { from: "A-F2-lobby", to: "A-F2-door-203", dist: 20, accessible: true, desc: "Enter Alan Turing Seminar Hall A-203" },
      { from: "A-F2-lobby", to: "A-F2-door-204", dist: 20, accessible: true, desc: "Proceed to IoT Lab A-204" },

      // Block A Floor 3
      { from: "A-F3-lobby", to: "A-F3-elev", dist: 25, accessible: true, desc: "Exit elevator into Floor 3 corridor" },
      { from: "A-F3-lobby", to: "A-F3-stairs", dist: 25, accessible: false, desc: "Exit stairwell into Floor 3 corridor" },
      { from: "A-F3-lobby", to: "A-F3-door-301", dist: 15, accessible: true, desc: "Biometric door to GPU Cluster A-301" },
      { from: "A-F3-lobby", to: "A-F3-door-302", dist: 15, accessible: true, desc: "Enter VR Immersion Studio A-302" },
      { from: "A-F3-lobby", to: "A-F3-door-303", dist: 20, accessible: true, desc: "Enter Seminar Room A-303" },

      // Block B Nodes & Connections
      { from: "ent-block-b", to: "B-F0-lobby", dist: 15, accessible: true, desc: "Enter Curie Complex Atrium" },
      { from: "B-F0-lobby", to: "B-F0-elev", dist: 25, accessible: true, desc: "Walk to Elevator" },
      { from: "B-F0-lobby", to: "B-F0-stairs", dist: 25, accessible: false, desc: "Take Science Stairs" },
      { from: "B-F0-lobby", to: "B-F0-door-001", dist: 15, accessible: true, desc: "Enter Physics Optics Lab B-001" },
      { from: "B-F0-lobby", to: "B-F0-door-002", dist: 15, accessible: true, desc: "Enter Chemistry Lab B-002" },
      { from: "B-F0-lobby", to: "B-F0-door-003", dist: 20, accessible: true, desc: "Enter Materials Science Lab B-003" },

      { from: "B-F0-elev", to: "B-F1-elev", dist: 10, accessible: true, desc: "Elevator to Floor 1" },
      { from: "B-F1-elev", to: "B-F2-elev", dist: 10, accessible: true, desc: "Elevator to Floor 2" },
      { from: "B-F0-stairs", to: "B-F1-stairs", dist: 15, accessible: false, desc: "Stairs to Floor 1" },
      { from: "B-F1-stairs", to: "B-F2-stairs", dist: 15, accessible: false, desc: "Stairs to Floor 2" },

      { from: "B-F1-lobby", to: "B-F1-elev", dist: 25, accessible: true, desc: "Exit elevator to Floor 1" },
      { from: "B-F1-lobby", to: "B-F1-stairs", dist: 25, accessible: false, desc: "Exit stairs to Floor 1" },
      { from: "B-F1-lobby", to: "B-F1-door-101", dist: 15, accessible: true, desc: "Enter Genetics Lab B-101" },
      { from: "B-F1-lobby", to: "B-F1-door-102", dist: 15, accessible: true, desc: "Enter Marie Curie Seminar Hall B-102" },
      { from: "B-F1-lobby", to: "B-F1-door-103", dist: 20, accessible: true, desc: "Enter Classroom B-103" },

      { from: "B-F2-lobby", to: "B-F2-elev", dist: 25, accessible: true, desc: "Exit elevator to Floor 2" },
      { from: "B-F2-lobby", to: "B-F2-stairs", dist: 25, accessible: false, desc: "Exit stairs to Floor 2" },
      { from: "B-F2-lobby", to: "B-F2-door-201", dist: 15, accessible: true, desc: "Enter Bioinformatics Lab B-201" },
      { from: "B-F2-lobby", to: "B-F2-door-202", dist: 15, accessible: true, desc: "Enter Climate Research Wing B-202" },

      // Block C Connections (Library)
      { from: "ent-block-c", to: "C-F0-lobby", dist: 15, accessible: true, desc: "Enter Aryabhata Library Grand Atrium" },
      { from: "C-F0-lobby", to: "C-F0-elev", dist: 25, accessible: true, desc: "Walk to Glass Elevator" },
      { from: "C-F0-lobby", to: "C-F0-stairs", dist: 25, accessible: false, desc: "Take Central Spiral Staircase" },
      { from: "C-F0-lobby", to: "C-F0-door-001", dist: 10, accessible: true, desc: "Approach Central Circulation Desk C-001" },
      { from: "C-F0-lobby", to: "C-F0-door-002", dist: 20, accessible: true, desc: "Enter Silent Reading Hall C-002" },

      { from: "C-F0-elev", to: "C-F1-elev", dist: 10, accessible: true, desc: "Elevator to Floor 1" },
      { from: "C-F1-elev", to: "C-F2-elev", dist: 10, accessible: true, desc: "Elevator to Floor 2" },
      { from: "C-F0-stairs", to: "C-F1-stairs", dist: 15, accessible: false, desc: "Spiral staircase to Floor 1" },
      { from: "C-F1-stairs", to: "C-F2-stairs", dist: 15, accessible: false, desc: "Spiral staircase to Floor 2" },

      { from: "C-F1-lobby", to: "C-F1-elev", dist: 25, accessible: true, desc: "Exit elevator to Floor 1" },
      { from: "C-F1-lobby", to: "C-F1-stairs", dist: 25, accessible: false, desc: "Exit stairs to Floor 1" },
      { from: "C-F1-lobby", to: "C-F1-door-101", dist: 15, accessible: true, desc: "Enter Maker Space C-101" },
      { from: "C-F1-lobby", to: "C-F1-door-102", dist: 15, accessible: true, desc: "Enter Startup Incubator C-102" },

      { from: "C-F2-lobby", to: "C-F2-elev", dist: 25, accessible: true, desc: "Exit elevator to Floor 2" },
      { from: "C-F2-lobby", to: "C-F2-stairs", dist: 25, accessible: false, desc: "Exit stairs to Floor 2" },
      { from: "C-F2-lobby", to: "C-F2-door-201", dist: 15, accessible: true, desc: "Enter Ramanujan Seminar Hall C-201" },
      { from: "C-F2-lobby", to: "C-F2-door-202", dist: 15, accessible: true, desc: "Enter Rare Archives Wing C-202" },

      // Block D Connections (Convention & Student Center)
      { from: "ent-block-d", to: "D-F0-lobby", dist: 15, accessible: true, desc: "Enter Kalam Grand Center Foyer" },
      { from: "D-F0-lobby", to: "D-F0-elev", dist: 25, accessible: true, desc: "Walk to Elevator" },
      { from: "D-F0-lobby", to: "D-F0-stairs", dist: 25, accessible: false, desc: "Take Concourse Stairs" },
      { from: "D-F0-lobby", to: "D-F0-door-001", dist: 15, accessible: true, desc: "Enter Kalam Grand Auditorium D-001" },
      { from: "D-F0-lobby", to: "D-F0-door-002", dist: 20, accessible: true, desc: "Enter Food Court & Cafeteria D-002" },

      { from: "D-F0-elev", to: "D-F1-elev", dist: 10, accessible: true, desc: "Elevator to Floor 1" },
      { from: "D-F0-stairs", to: "D-F1-stairs", dist: 15, accessible: false, desc: "Stairs to Floor 1" },

      { from: "D-F1-lobby", to: "D-F1-elev", dist: 25, accessible: true, desc: "Exit elevator to Floor 1" },
      { from: "D-F1-lobby", to: "D-F1-stairs", dist: 25, accessible: false, desc: "Exit stairs to Floor 1" },
      { from: "D-F1-lobby", to: "D-F1-door-101", dist: 15, accessible: true, desc: "Enter Student Council HQ D-101" },
      { from: "D-F1-lobby", to: "D-F1-door-102", dist: 15, accessible: true, desc: "Enter Health Clinic D-102" },
      { from: "D-F1-lobby", to: "D-F1-door-103", dist: 20, accessible: true, desc: "Enter Gym & Fitness Recreation D-103" },

      // Block E Connections (Admin)
      { from: "ent-block-e", to: "E-F0-lobby", dist: 15, accessible: true, desc: "Enter Marble Administrative Lobby" },
      { from: "E-F0-lobby", to: "E-F0-elev", dist: 25, accessible: true, desc: "Walk to Elevator" },
      { from: "E-F0-lobby", to: "E-F0-stairs", dist: 25, accessible: false, desc: "Take Administrative Stairs" },
      { from: "E-F0-lobby", to: "E-F0-door-001", dist: 15, accessible: true, desc: "Registrar & Admissions Desk E-001" },
      { from: "E-F0-lobby", to: "E-F0-door-002", dist: 15, accessible: true, desc: "Accounts & Bursar Wing E-002" },
      { from: "E-F0-lobby", to: "E-F0-door-003", dist: 20, accessible: true, desc: "Examination Cell E-003" },

      { from: "E-F0-elev", to: "E-F1-elev", dist: 10, accessible: true, desc: "Elevator to Floor 1" },
      { from: "E-F0-stairs", to: "E-F1-stairs", dist: 15, accessible: false, desc: "Stairs to Floor 1" },

      { from: "E-F1-lobby", to: "E-F1-elev", dist: 25, accessible: true, desc: "Exit elevator to Floor 1" },
      { from: "E-F1-lobby", to: "E-F1-stairs", dist: 25, accessible: false, desc: "Exit stairs to Floor 1" },
      { from: "E-F1-lobby", to: "E-F1-door-101", dist: 15, accessible: true, desc: "Vice-Chancellor's Secretariat E-101" },
      { from: "E-F1-lobby", to: "E-F1-door-102", dist: 15, accessible: true, desc: "Corporate Placement Cell E-102" },
      { from: "E-F1-lobby", to: "E-F1-door-103", dist: 20, accessible: true, desc: "Dean of Academic Affairs E-103" }
    ]
  },

  // Upcoming Live Campus Events Ticker
  liveEvents: [
    { id: "ev-1", title: "Apex GenAI & Robotics Hackathon 2026", locationId: "D-001", time: "Starts Today @ 02:00 PM", category: "hackathon", speaker: "Prof. Kenneth Zhao & Dr. Sarah Mitchell" },
    { id: "ev-2", title: "Quantum Computing & Photonics Keynote", locationId: "A-203", time: "Today @ 03:00 PM", category: "seminar", speaker: "Dr. Elena Rostov" },
    { id: "ev-3", title: "Startup Pitch & Angel VC Demo Hours", locationId: "C-102", time: "Today @ 04:30 PM", category: "entrepreneurship", speaker: "Samantha Lee, Apex Incubator" },
    { id: "ev-4", title: "Campus Inter-College Badminton Finals", locationId: "D-103", time: "Today @ 05:00 PM", category: "sports", speaker: "Coach Dave Henderson" }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.CAMPUS_DATA = CAMPUS_DATA;
}
