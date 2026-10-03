"""
Helper script to enrich CAMPUS_DATA locations with comprehensive lecture schedules and timings.
"""
import re
import json

filepath = r"d:\100-Days of Python\campus-copilot\data\campus-data.js"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Timetable schedules mapped by location ID or category
SCHEDULES = {
    # Block A
    "A-001": [
        {"time": "09:00 AM - 11:00 AM", "code": "ROB201", "title": "Manipulator Kinematics Lab", "instructor": "Prof. Kenneth Zhao", "type": "Lab Practical", "status": "Completed"},
        {"time": "11:30 AM - 01:00 PM", "code": "OPEN", "title": "Hardware Diagnostics & Testing", "instructor": "Lab Assistant Maya", "type": "Open Lab", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "ROB402", "title": "Autonomous Drone Navigation", "instructor": "Prof. Kenneth Zhao", "type": "Lab Practical", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 06:00 PM", "code": "CLUB", "title": "Apex Robotics Team Build Session", "instructor": "Student Robotics Lead", "type": "Workshop", "status": "Upcoming"},
        {"time": "06:30 PM - 08:00 PM", "code": "MAINT", "title": "Manipulator Calibration & Sync", "instructor": "Lab Tech Marcus", "type": "Maintenance", "status": "Upcoming"}
    ],
    "A-002": [
        {"time": "08:30 AM - 10:00 AM", "code": "CS101", "title": "Intro to Algorithmic Problem Solving", "instructor": "Dr. Elena Rostov", "type": "Lecture", "status": "Completed"},
        {"time": "10:15 AM - 11:45 AM", "code": "CS204", "title": "Discrete Structures & Logic", "instructor": "Prof. Kenneth Zhao", "type": "Lecture", "status": "Completed"},
        {"time": "01:00 PM - 02:30 PM", "code": "CS101-B", "title": "Algorithmic Thinking (Section B)", "instructor": "Dr. Elena Rostov", "type": "Lecture", "status": "Live Now", "isCurrent": True},
        {"time": "02:45 PM - 04:15 PM", "code": "CS305", "title": "Automata & Formal Languages", "instructor": "Dr. Ananya Roy", "type": "Lecture", "status": "Upcoming"},
        {"time": "04:30 PM - 06:00 PM", "code": "TUT", "title": "Peer Mentorship & Doubts Solving", "instructor": "TA Alex Chen", "type": "Tutorial", "status": "Upcoming"}
    ],
    "A-003": [
        {"time": "08:30 AM - 10:30 AM", "code": "CS101L", "title": "C++ Programming Fundamentals Lab", "instructor": "TA Samantha & Liam", "type": "Lab Practical", "status": "Completed"},
        {"time": "11:00 AM - 01:00 PM", "code": "CS202L", "title": "Object-Oriented Programming (Java)", "instructor": "Prof. Devante Brooks", "type": "Lab Practical", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "CS302L", "title": "Database Systems & SQL Lab", "instructor": "Dr. Ananya Roy", "type": "Lab Practical", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 06:00 PM", "code": "COMP", "title": "Campus ICPC Competitive Coding", "instructor": "SysAdmin Marcus Vance", "type": "Open Lab", "status": "Upcoming"},
        {"time": "06:30 PM - 09:30 PM", "code": "OPEN", "title": "Evening Open Coding Access", "instructor": "Duty Proctor", "type": "Open Lab", "status": "Upcoming"}
    ],
    "A-004": [
        {"time": "09:00 AM - 12:00 PM", "code": "CO-WORK", "title": "Morning Study & Peer Networking", "instructor": "Open Access", "type": "Study", "status": "Completed"},
        {"time": "01:00 PM - 03:30 PM", "code": "HACK", "title": "Hackathon Brainstorming & Scrum", "instructor": "Student Tech Council", "type": "Collaboration", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 07:00 PM", "code": "MEET", "title": "Open Source Club Weekly Meetup", "instructor": "Dev Community Leads", "type": "Club Meet", "status": "Upcoming"}
    ],
    "A-101": [
        {"time": "08:30 AM - 10:30 AM", "code": "CS210", "title": "Linux Kernel Architecture Lab", "instructor": "Prof. Devante Brooks", "type": "Lab Practical", "status": "Completed"},
        {"time": "11:00 AM - 01:00 PM", "code": "CS315", "title": "Socket Programming & Networking", "instructor": "Prof. Viktor Stone", "type": "Lab Practical", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "CS210", "title": "Operating Systems Concurrency Lab", "instructor": "Prof. Devante Brooks", "type": "Lab Practical", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 06:00 PM", "code": "SYS401", "title": "Distributed Systems & Raft Consensus", "instructor": "Dr. Wei Chen", "type": "Lab Practical", "status": "Upcoming"}
    ],
    "A-102": [
        {"time": "09:00 AM - 10:30 AM", "code": "CS302", "title": "Database Engineering & Storage Engines", "instructor": "Dr. Ananya Roy", "type": "Lecture", "status": "Completed"},
        {"time": "10:45 AM - 12:15 PM", "code": "CS401", "title": "Compiler Design & Code Generation", "instructor": "Prof. Kenneth Zhao", "type": "Lecture", "status": "Completed"},
        {"time": "01:30 PM - 03:00 PM", "code": "CS302", "title": "Distributed Transactions & ACID", "instructor": "Dr. Ananya Roy", "type": "Lecture", "status": "Live Now", "isCurrent": True},
        {"time": "03:15 PM - 04:45 PM", "code": "CS420", "title": "Cloud Native Architecture & Kubernetes", "instructor": "Prof. Chloe Dubois", "type": "Lecture", "status": "Upcoming"}
    ],
    "A-103": [
        {"time": "09:00 AM - 11:00 AM", "code": "SEC201", "title": "Network Penetration Testing Lab", "instructor": "Prof. Viktor Stone", "type": "Lab Practical", "status": "Completed"},
        {"time": "11:30 AM - 01:00 PM", "code": "SEC305", "title": "Applied Cryptography & ZK Proofs", "instructor": "Prof. Viktor Stone", "type": "Lab Practical", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "SEC402", "title": "Threat Hunting & SIEM Analytics", "instructor": "Prof. Viktor Stone", "type": "Lab Practical", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 06:00 PM", "code": "CTF", "title": "Apex CTF Cyber Defense Drills", "instructor": "Cyber Club Leads", "type": "Practice", "status": "Upcoming"}
    ],
    "A-104": [
        {"time": "09:00 AM - 11:00 AM", "code": "OFFICE", "title": "HOD Academic Advisory Hours", "instructor": "Prof. Kenneth Zhao", "type": "Office Hours", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "OFFICE", "title": "Undergraduate Walk-in Advising", "instructor": "Dr. Elena Rostov", "type": "Office Hours", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 05:30 PM", "code": "FACULTY", "title": "Department Curriculum Council", "instructor": "CS Faculty Board", "type": "Meeting", "status": "Upcoming"}
    ],
    "A-201": [
        {"time": "09:00 AM - 11:00 AM", "code": "AI301L", "title": "Computer Vision & PyTorch Training", "instructor": "Dr. Sarah Mitchell", "type": "Lab Practical", "status": "Completed"},
        {"time": "11:30 AM - 01:00 PM", "code": "AI402L", "title": "Transformer Attention Mechanisms", "instructor": "Dr. Sarah Mitchell", "type": "Lab Practical", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "AI405L", "title": "Generative Diffusion Models Workshop", "instructor": "Dr. Sarah Mitchell", "type": "Lab Practical", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 06:00 PM", "code": "AI-RES", "title": "Apex AI Research Group Sync", "instructor": "PhD Scholars", "type": "Research", "status": "Upcoming"},
        {"time": "06:30 PM - 08:30 PM", "code": "GPU-RUN", "title": "Overnight Model Training Setup", "instructor": "GPU Admin", "type": "Lab Access", "status": "Upcoming"}
    ],
    "A-202": [
        {"time": "09:00 AM - 10:30 AM", "code": "SE301", "title": "Fullstack Web & API Architecture", "instructor": "Prof. Chloe Dubois", "type": "Studio", "status": "Completed"},
        {"time": "10:45 AM - 12:15 PM", "code": "SE402", "title": "Agile Scrum & CI/CD Pipelines", "instructor": "Prof. Chloe Dubois", "type": "Studio", "status": "Completed"},
        {"time": "01:30 PM - 03:00 PM", "code": "SE410", "title": "Microservices & Docker Deployment", "instructor": "Prof. Chloe Dubois", "type": "Studio", "status": "Live Now", "isCurrent": True},
        {"time": "03:30 PM - 05:00 PM", "code": "CAPSTONE", "title": "Senior Capstone Design Reviews", "instructor": "Faculty Reviewers", "type": "Review", "status": "Upcoming"}
    ],
    "A-203": [
        {"time": "10:00 AM - 11:30 AM", "code": "KEYNOTE", "title": "Distinguished Talk: Quantum Frontiers", "instructor": "Dr. Elena Rostov", "type": "Keynote", "status": "Completed"},
        {"time": "02:00 PM - 04:00 PM", "code": "SYMPOSIUM", "title": "Symposium: Generative Agents in 2026", "instructor": "Guest Speaker Dr. Alan Croft", "type": "Symposium", "status": "Live Now", "isCurrent": True},
        {"time": "04:30 PM - 06:00 PM", "code": "TECH-TALK", "title": "Building Scalable Cloud Infrastructure", "instructor": "Google Research Team", "type": "Industry Talk", "status": "Upcoming"}
    ],
    "A-204": [
        {"time": "09:00 AM - 11:00 AM", "code": "IOT201", "title": "Microcontroller Interfacing (ESP32)", "instructor": "Prof. Tariq Al-Mansoor", "type": "Lab Practical", "status": "Completed"},
        {"time": "11:30 AM - 01:00 PM", "code": "IOT304", "title": "Edge AI & TinyML Quantization", "instructor": "Prof. Tariq Al-Mansoor", "type": "Lab Practical", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "IOT401", "title": "Smart Campus LoRaWAN Sensor Mesh", "instructor": "Prof. Tariq Al-Mansoor", "type": "Lab Practical", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 06:00 PM", "code": "OPEN", "title": "Hardware Soldering & PCB Assembly", "instructor": "Lab Assistant", "type": "Open Lab", "status": "Upcoming"}
    ],
    "A-301": [
        {"time": "09:00 AM - 12:00 PM", "code": "HPC-1", "title": "Large Language Model Pretraining Cluster Run", "instructor": "Dr. Wei Chen", "type": "High Performance", "status": "Completed"},
        {"time": "01:00 PM - 04:00 PM", "code": "HPC-2", "title": "Molecular Dynamics Simulation Run", "instructor": "Dr. Wei Chen", "type": "High Performance", "status": "Live Now", "isCurrent": True},
        {"time": "04:30 PM - 07:00 PM", "code": "MAINT", "title": "Cooling System Diagnostic Check", "instructor": "Cluster Operations", "type": "System Task", "status": "Upcoming"}
    ],
    "A-302": [
        {"time": "09:30 AM - 11:30 AM", "code": "VR201", "title": "Unity 3D Spatial Computing Basics", "instructor": "Prof. Maya Lin", "type": "Lab Practical", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "VR405", "title": "Haptic Feedback & Spatial Audio Design", "instructor": "Prof. Maya Lin", "type": "Lab Practical", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 06:00 PM", "code": "STUDIO", "title": "Metaverse Medical Anatomy Simulation", "instructor": "VR Research Scholars", "type": "Project Lab", "status": "Upcoming"}
    ],
    "A-303": [
        {"time": "10:00 AM - 12:00 PM", "code": "DEFENSE", "title": "Doctoral Dissertation Proposal Defense", "instructor": "PhD Candidate & Committee", "type": "Academic Defense", "status": "Completed"},
        {"time": "02:00 PM - 04:00 PM", "code": "ROUNDTABLE", "title": "Graduate Research Methodology Seminar", "instructor": "Graduate School Dean", "type": "Seminar", "status": "Live Now", "isCurrent": True},
        {"time": "04:30 PM - 06:00 PM", "code": "MEET", "title": "Postgraduate Scholars Forum", "instructor": "Dean Academic Affairs", "type": "Meeting", "status": "Upcoming"}
    ],

    # Block B (Curie Complex)
    "B-001": [
        {"time": "09:00 AM - 11:00 AM", "code": "PHY201", "title": "Laser Interferometry & Diffraction", "instructor": "Prof. Arthur Pendelton", "type": "Lab Practical", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "PHY305", "title": "Quantum Optics & Entanglement", "instructor": "Prof. Arthur Pendelton", "type": "Lab Practical", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 05:30 PM", "code": "SPEC", "title": "Spectrophotometric Precision Analysis", "instructor": "Lab Officer", "type": "Lab Session", "status": "Upcoming"}
    ],
    "B-002": [
        {"time": "08:30 AM - 10:30 AM", "code": "CH101", "title": "Analytical Chemistry Titrations", "instructor": "Dr. Evelyn Ward", "type": "Lab Practical", "status": "Completed"},
        {"time": "11:00 AM - 01:00 PM", "code": "CH205", "title": "Organic Synthesis & Separation", "instructor": "Dr. Evelyn Ward", "type": "Lab Practical", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "CH302", "title": "Spectroscopic Kinetics & Catalysis", "instructor": "Dr. Evelyn Ward", "type": "Lab Practical", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 05:30 PM", "code": "SAFETY", "title": "Chemical Safety Protocols & Washdown", "instructor": "Safety Officer", "type": "Safety Inspection", "status": "Upcoming"}
    ],
    "B-003": [
        {"time": "09:30 AM - 11:30 AM", "code": "MAT201", "title": "Crystallography & Powder Diffraction", "instructor": "Dr. Sanjay Gupta", "type": "Lab Practical", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "MAT402", "title": "Scanning Electron Microscopy Calibration", "instructor": "Dr. Sanjay Gupta", "type": "Lab Practical", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 06:00 PM", "code": "NANO", "title": "Nanoscale Thin Film Fabrication", "instructor": "Research Fellow", "type": "Research", "status": "Upcoming"}
    ],
    "B-101": [
        {"time": "09:00 AM - 11:30 AM", "code": "BIO201", "title": "Gel Electrophoresis & DNA Isolation", "instructor": "Prof. Diane Foster", "type": "Lab Practical", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "BIO305", "title": "CRISPR-Cas9 Expression Assays", "instructor": "Prof. Diane Foster", "type": "Lab Practical", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 06:00 PM", "code": "CLONE", "title": "Recombinant Protein Expression", "instructor": "Lab Team", "type": "Research", "status": "Upcoming"}
    ],
    "B-102": [
        {"time": "10:00 AM - 11:30 AM", "code": "SEMINAR", "title": "Advances in Targeted Gene Therapy", "instructor": "Faculty Guest Speaker", "type": "Lecture", "status": "Completed"},
        {"time": "02:30 PM - 04:30 PM", "code": "KEYNOTE", "title": "Innovations in Nanomedicine & Oncology", "instructor": "Dr. Liam O'Connor", "type": "Keynote", "status": "Live Now", "isCurrent": True},
        {"time": "05:00 PM - 06:30 PM", "code": "COLLOQ", "title": "Biotech Industry Commercialization Forum", "instructor": "Apex BioTech Hub", "type": "Colloquium", "status": "Upcoming"}
    ],
    "B-103": [
        {"time": "09:00 AM - 10:30 AM", "code": "BIO101", "title": "Foundations of Molecular Cell Biology", "instructor": "Dr. Liam O'Connor", "type": "Lecture", "status": "Completed"},
        {"time": "10:45 AM - 12:15 PM", "code": "BIO204", "title": "Cellular Physiology & Neurobiology", "instructor": "Dr. Liam O'Connor", "type": "Lecture", "status": "Completed"},
        {"time": "01:30 PM - 03:00 PM", "code": "BIO310", "title": "Immunology & Immune System Signaling", "instructor": "Dr. Liam O'Connor", "type": "Lecture", "status": "Live Now", "isCurrent": True},
        {"time": "03:15 PM - 04:45 PM", "code": "BIO402", "title": "Synthetic Biology Circuits & BioBricks", "instructor": "Prof. Diane Foster", "type": "Lecture", "status": "Upcoming"}
    ],
    "B-201": [
        {"time": "09:00 AM - 11:00 AM", "code": "BIN201", "title": "Python for Sequence Alignment & FASTA", "instructor": "Dr. Priyanshi Mehta", "type": "Lab Practical", "status": "Completed"},
        {"time": "11:30 AM - 01:00 PM", "code": "BIN305", "title": "BLAST Algorithms & Multiple Sequence Alignment", "instructor": "Dr. Priyanshi Mehta", "type": "Lab Practical", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "BIN402", "title": "AlphaFold 3D Structure Prediction Lab", "instructor": "Dr. Priyanshi Mehta", "type": "Lab Practical", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 05:30 PM", "code": "GENOMICS", "title": "Metagenomic Phylogeny Workshop", "instructor": "PhD Research Scholars", "type": "Research", "status": "Upcoming"}
    ],
    "B-202": [
        {"time": "09:30 AM - 11:30 AM", "code": "ENV201", "title": "Urban Air Quality Sensor Telemetry", "instructor": "Prof. Carl Thorne", "type": "Lab Practical", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "ENV305", "title": "Climate Satellite Data Modeling", "instructor": "Prof. Carl Thorne", "type": "Lab Practical", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 05:30 PM", "code": "SAMPLE", "title": "Soil & Water Contaminant Chromatography", "instructor": "Lab Team", "type": "Lab Session", "status": "Upcoming"}
    ],

    # Block C (Aryabhata Library & Innovation)
    "C-001": [
        {"time": "08:00 AM - 12:00 PM", "code": "CIRC-1", "title": "Morning Circulation & Reserve Book Desks", "instructor": "Librarian Margaret Hughes", "type": "Service Hours", "status": "Completed"},
        {"time": "12:00 PM - 04:00 PM", "code": "CIRC-2", "title": "Inter-Library Loan & E-Resource Access", "instructor": "Duty Reference Staff", "type": "Service Hours", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 11:00 PM", "code": "CIRC-3", "title": "Evening Study Checkouts & Self-Kiosks", "instructor": "Evening Desk Officer", "type": "Service Hours", "status": "Upcoming"}
    ],
    "C-002": [
        {"time": "08:00 AM - 01:00 PM", "code": "SILENT-1", "title": "Morning Focused Silent Study", "instructor": "Library Monitor", "type": "Quiet Study", "status": "Completed"},
        {"time": "01:00 PM - 06:00 PM", "code": "SILENT-2", "title": "Afternoon Silent Research & Reading", "instructor": "Library Monitor", "type": "Quiet Study", "status": "Live Now", "isCurrent": True},
        {"time": "06:00 PM - 11:59 PM", "code": "SILENT-3", "title": "Night Owl Exam Preparation Hours", "instructor": "Library Monitor", "type": "Quiet Study", "status": "Upcoming"}
    ],
    "C-101": [
        {"time": "09:30 AM - 11:30 AM", "code": "PRUSA-1", "title": "3D CAD Modeling & Slicing Workshop", "instructor": "Jason Briggs", "type": "Lab Practical", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "MAKER", "title": "3D Printing Certification & Prototyping", "instructor": "Jason Briggs", "type": "Hands-on", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 06:00 PM", "code": "LASER", "title": "Laser Cutting & Acrylic Engraving Lab", "instructor": "Studio Tech", "type": "Hands-on", "status": "Upcoming"}
    ],
    "C-102": [
        {"time": "10:00 AM - 12:00 PM", "code": "PITCH-1", "title": "Student Founders Mentorship Clinic", "instructor": "Samantha Lee", "type": "Advisory", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "DEMO", "title": "Angel VC Pitch Practice & Feedback", "instructor": "Samantha Lee", "type": "Pitch Session", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 06:00 PM", "code": "LEGAL", "title": "Startup Legal & Patent Filing Pods", "instructor": "Corporate Counsel", "type": "Workshop", "status": "Upcoming"}
    ],
    "C-201": [
        {"time": "10:30 AM - 12:00 PM", "code": "MATH101", "title": "Riemann Zeta Function & Prime Distributions", "instructor": "Prof. Harold Finch", "type": "Colloquium", "status": "Completed"},
        {"time": "02:00 PM - 03:30 PM", "code": "MATH305", "title": "Algorithmic Game Theory & Markets", "instructor": "Applied Math Dept", "type": "Lecture", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 05:30 PM", "code": "STAT402", "title": "High-Dimensional Statistical Inference", "instructor": "Prof. Carl Thorne", "type": "Lecture", "status": "Upcoming"}
    ],
    "C-202": [
        {"time": "10:00 AM - 01:00 PM", "code": "ARCHIVE-1", "title": "Rare Manuscripts Exhibition & Tour", "instructor": "Dr. Harold Finch", "type": "Exhibition", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "ARCHIVE-2", "title": "Historical University Documents Viewing", "instructor": "Dr. Harold Finch", "type": "Curated Tour", "status": "Live Now", "isCurrent": True},
        {"time": "03:30 PM - 04:30 PM", "code": "DIGITIZE", "title": "High-Resolution Archival Scanning", "instructor": "Archival Tech", "type": "Preservation", "status": "Upcoming"}
    ],

    # Block D (Kalam Convention & Student Center)
    "D-001": [
        {"time": "09:30 AM - 11:30 AM", "code": "CONVOCATION", "title": "University Rehearsals & Soundcheck", "instructor": "Event Director Daniel Craig", "type": "Rehearsal", "status": "Completed"},
        {"time": "02:00 PM - 05:00 PM", "code": "HACKATHON", "title": "Apex GenAI & Robotics Hackathon 2026", "instructor": "Prof. Kenneth Zhao & Dr. Sarah Mitchell", "type": "Symposium", "status": "Live Now", "isCurrent": True},
        {"time": "06:00 PM - 08:30 PM", "code": "CULTURAL", "title": "Annual Inter-College Symphony Orchestra", "instructor": "Music Society", "type": "Concert", "status": "Upcoming"}
    ],
    "D-002": [
        {"time": "07:30 AM - 10:30 AM", "code": "BREAKFAST", "title": "Morning Breakfast & Espresso Counter", "instructor": "Chef Marco Rossi", "type": "Dining", "status": "Completed"},
        {"time": "11:30 AM - 03:30 PM", "code": "LUNCH", "title": "Campus Lunch Buffet & Grill Stations", "instructor": "Dining Staff", "type": "Dining", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 07:00 PM", "code": "SNACKS", "title": "Bakery, Specialty Teas & Smoothies", "instructor": "Dining Staff", "type": "Dining", "status": "Upcoming"},
        {"time": "07:30 PM - 10:30 PM", "code": "DINNER", "title": "Dinner Service & Night Cafe", "instructor": "Chef Marco Rossi", "type": "Dining", "status": "Upcoming"}
    ],
    "D-101": [
        {"time": "10:00 AM - 12:00 PM", "code": "SENATE", "title": "Student Council Executive Committee", "instructor": "Student Union President", "type": "Meeting", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "FEST", "title": "Campus Cultural Fest Logistics Core", "instructor": "Fest Convenor", "type": "Planning", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 06:00 PM", "code": "CLUBS", "title": "Registered Societies Budget Allocation", "instructor": "Treasurer", "type": "Meeting", "status": "Upcoming"}
    ],
    "D-102": [
        {"time": "08:00 AM - 01:00 PM", "code": "CLINIC-1", "title": "General Physician Consultation & Triage", "instructor": "Dr. Rebecca Vance", "type": "Medical Care", "status": "Completed"},
        {"time": "01:00 PM - 05:00 PM", "code": "CLINIC-2", "title": "Walk-In Clinic & Wellness Checkups", "instructor": "Duty Medical Officer", "type": "Medical Care", "status": "Live Now", "isCurrent": True},
        {"time": "05:00 PM - 08:00 PM", "code": "WELLNESS", "title": "Counseling & Mental Health Consults", "instructor": "Campus Counselor", "type": "Counseling", "status": "Upcoming"}
    ],
    "D-103": [
        {"time": "06:00 AM - 10:00 AM", "code": "GYM-1", "title": "Morning Strength & Cardio Session", "instructor": "Coach Dave Henderson", "type": "Athletics", "status": "Completed"},
        {"time": "12:00 PM - 04:00 PM", "code": "SPORTS", "title": "Open Badminton & Indoor Courts", "instructor": "Gym Supervisor", "type": "Recreation", "status": "Live Now", "isCurrent": True},
        {"time": "05:00 PM - 07:30 PM", "code": "FINALS", "title": "Inter-College Badminton Tournament Finals", "instructor": "Coach Dave Henderson", "type": "Tournament", "status": "Upcoming"},
        {"time": "07:30 PM - 10:00 PM", "code": "GYM-2", "title": "Evening Free Weights & Conditioning", "instructor": "Fitness Trainer", "type": "Athletics", "status": "Upcoming"}
    ],

    # Block E (Chanakya Administrative Headquarters)
    "E-001": [
        {"time": "09:00 AM - 12:00 PM", "code": "ADM-1", "title": "Degree Transcripts & Official Seal Issuance", "instructor": "Admissions Officer", "type": "Administrative", "status": "Completed"},
        {"time": "01:00 PM - 03:30 PM", "code": "ADM-2", "title": "Enrollment Verification & Student ID Counter", "instructor": "Registrar Office Staff", "type": "Administrative", "status": "Live Now", "isCurrent": True},
        {"time": "03:30 PM - 05:00 PM", "code": "ADM-3", "title": "International Student Visa Certification", "instructor": "Admissions Desk", "type": "Administrative", "status": "Upcoming"}
    ],
    "E-002": [
        {"time": "09:30 AM - 12:30 PM", "code": "FEE-1", "title": "Semester Tuition & Fee Payment Clearance", "instructor": "Bursar Brenda Miller", "type": "Accounts", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "SCHOLAR", "title": "Institutional Merit Scholarships & Grants", "instructor": "Financial Aid Officer", "type": "Counseling", "status": "Live Now", "isCurrent": True},
        {"time": "03:30 PM - 04:30 PM", "code": "FEE-2", "title": "Refund Inquiries & Accounts Auditing", "instructor": "Accounts Desk", "type": "Accounts", "status": "Upcoming"}
    ],
    "E-003": [
        {"time": "09:00 AM - 12:00 PM", "code": "EXAM-1", "title": "Mid-Term Question Paper Encryption & Dispatch", "instructor": "Controller Dr. K. Raman", "type": "Confidential", "status": "Completed"},
        {"time": "01:00 PM - 03:30 PM", "code": "EVAL", "title": "Automated Scantron Sheet Evaluation", "instructor": "Evaluation Officers", "type": "Processing", "status": "Live Now", "isCurrent": True},
        {"time": "03:30 PM - 05:30 PM", "code": "GRADE", "title": "Semester GPA & Grade Sheet Tabulation", "instructor": "Record Cell Team", "type": "Record Keeping", "status": "Upcoming"}
    ],
    "E-101": [
        {"time": "09:30 AM - 11:30 AM", "code": "CABINET", "title": "University Executive Council Briefing", "instructor": "Vice-Chancellor Prof. Sterling", "type": "Governance", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "DELEGATION", "title": "International Academic Delegation Meeting", "instructor": "Vice-Chancellor's Secretariat", "type": "Official Meeting", "status": "Live Now", "isCurrent": True},
        {"time": "04:00 PM - 05:00 PM", "code": "BRIEF", "title": "Dean's Committee Strategic Review", "instructor": "VC Secretariat", "type": "Governance", "status": "Upcoming"}
    ],
    "E-102": [
        {"time": "09:00 AM - 11:30 AM", "code": "CORP-1", "title": "Google Recruitment Technical Interviews", "instructor": "Jessica Vance & Google Eng Team", "type": "Interviews", "status": "Completed"},
        {"time": "01:30 PM - 04:00 PM", "code": "CORP-2", "title": "Microsoft Core Software Engineer Interviews", "instructor": "Corporate Interview Panel", "type": "Interviews", "status": "Live Now", "isCurrent": True},
        {"time": "04:30 PM - 06:30 PM", "code": "MOCK", "title": "Algorithm Whiteboard Mock Interview Prep", "instructor": "Placement Mentors", "type": "Coaching", "status": "Upcoming"}
    ],
    "E-103": [
        {"time": "10:00 AM - 12:30 PM", "code": "ADVISE", "title": "Academic Standing & Major/Minor Petitions", "instructor": "Dean Catherine Dupont", "type": "Advising", "status": "Completed"},
        {"time": "01:30 PM - 03:30 PM", "code": "CREDITS", "title": "Course Credit Transfer & Degree Audit", "instructor": "Dean Academic Affairs", "type": "Advising", "status": "Live Now", "isCurrent": True},
        {"time": "03:30 PM - 04:30 PM", "code": "CURRICULUM", "title": "AI Specialization Curriculum Review", "instructor": "Academic Committee", "type": "Meeting", "status": "Upcoming"}
    ]
}

# Update locations in content
# We will locate each object { id: "X", ... } and inject "timetable": [...] into it.
for loc_id, schedule in SCHEDULES.items():
    schedule_json = json.dumps(schedule, indent=6)
    
    # Also find the current ongoing event and timing string
    live_slot = next((s for s in schedule if s.get("status") == "Live Now"), None)
    upcoming_slot = next((s for s in schedule if s.get("status") == "Upcoming"), None)
    
    current_event_str = f"Live ({live_slot['time']}): {live_slot['code']} - {live_slot['title']}" if live_slot else "Open Access"
    next_event_str = f"Next ({upcoming_slot['time']}): {upcoming_slot['code']} - {upcoming_slot['title']}" if upcoming_slot else "None Scheduled"
    
    # Pattern to match location object with this ID
    # e.g.: id: "A-001",
    pattern = rf'(id:\s*"{loc_id}",[\s\S]*?)(rect:)'
    m = re.search(pattern, content)
    if m:
        prefix = m.group(1)
        # Update currentEvent line inside prefix
        prefix = re.sub(r'currentEvent:\s*"[^"]*",', f'currentEvent: "{current_event_str}",\n      nextLecture: "{next_event_str}",\n      timetable: {schedule_json},', prefix)
        content = content[:m.start(1)] + prefix + content[m.start(2):]
    else:
        print(f"Could not match pattern for {loc_id}")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Successfully enriched campus-data.js with lecture timetables and timings!")
