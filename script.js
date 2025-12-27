const quotes = [
    "Your future is created by what you do today, not tomorrow.",
    "Small daily improvements lead to massive long-term results.",
    "Discipline is the bridge between goals and achievement.",
    "Study like your dream job is already waiting for you.",
    "Every expert was once a beginner who refused to give up.",
    "Success is not luck, it is consistent hard work and learning.",
    "Your career path is a marathon, not a sprint. Keep moving.",
    "Failure is a lesson, not the end of your journey.",
    "Focus on skills, not just marks. Skills will pay you for life.",
    "Your best investment is investing in your own knowledge."
];

let currentQuoteIndex = 0;
const quoteEl = document.getElementById("quoteText");

function showQuote(index) {
    if (!quoteEl) return;
    quoteEl.textContent = quotes[index];
}

function rotateQuotes() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    showQuote(currentQuoteIndex);
}

showQuote(currentQuoteIndex);
setInterval(rotateQuotes, 5000);

// Page navigation
const pages = document.querySelectorAll(".page");
let currentPage = 1;

function goToPage(target) {
    if (target < 1 || target > pages.length) return;
    pages.forEach((page) => {
        const pageNum = Number(page.getAttribute("data-page"));
        page.classList.toggle("active", pageNum === target);
    });
    currentPage = target;
}

// Previous button global
const prevBtn = document.getElementById("prevBtn");
prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
});

// Start Journey button
const startJourneyBtn = document.getElementById("startJourneyBtn");
startJourneyBtn.addEventListener("click", () => {
    goToPage(2);
});

// Login form
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("fullName").value.trim();
    const dob = document.getElementById("dob").value;

    if (!name || !dob) {
        alert("Please fill your name and date of birth.");
        return;
    }

    const dobYear = new Date(dob).getFullYear();
    if (dobYear < 1970 || dobYear > 2024) {
        alert("Please select a date of birth between 1970 and 2024.");
        return;
    }

    goToPage(3);
});

// Selection state
const selectionState = {
    qualification: null,
    degree: null,
    branch: null,
    industry: null,
    domainKey: null
};

// Utility to handle selection buttons (single select per group)
function setupSelectionButtons(selector, field, nextPage) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Unselect previous
            buttons.forEach((b) => b.classList.remove("selected"));
            // Select current
            btn.classList.add("selected");
            selectionState[field] = btn.getAttribute("data-value");
            if (nextPage) {
                goToPage(nextPage);
            }
        });
    });
}

setupSelectionButtons(".qualification-btn", "qualification", 4);
setupSelectionButtons(".degree-btn", "degree", 5);
setupSelectionButtons(".branch-btn", "branch", 6);
setupSelectionButtons(".industry-btn", "industry", null);

// Confirm path button
const confirmPathBtn = document.getElementById("confirmPathBtn");
const summaryText = document.getElementById("summaryText");

confirmPathBtn.addEventListener("click", () => {
    const { qualification, degree, branch, industry } = selectionState;
    if (!qualification || !degree || !branch || !industry) {
        alert("Please select qualification, degree, branch and industry.");
        return;
    }
    summaryText.textContent =
        "Selected path: " +
        qualification +
        " → " +
        degree +
        " → " +
        branch +
        " → " +
        industry +
        ".";
    generateDomains(branch, industry);
    goToPage(7);
});

// Domain data (6–10 options per combination, simplified base)
const domainDatabase = {
    // SOFTWARE DOMAINS
    "CSE-Software": [
        {
            key: "fullstack",
            name: "Full-Stack Web Development",
            subtitle: "Build end-to-end web applications from frontend to backend.",
            skills: [
                "HTML, CSS, JavaScript (ES6+)",
                "React or Angular or Vue",
                "Node.js / Express",
                "REST APIs and JSON",
                "Git, GitHub and CI basics",
                "Basic cloud deployment (Netlify, Vercel, Render)"
            ],
            fundamentals: [
                "Data structures and algorithms basics",
                "HTTP, client-server architecture",
                "Relational databases and SQL fundamentals",
                "Basic Linux commands",
                "Software development lifecycle overview"
            ],
            basics: [
                "Good problem-solving mindset",
                "Laptop with stable internet",
                "Code editor (VS Code)",
                "GitHub account to host projects"
            ],
            scope: [
                "Strong demand for web developers across startups and MNCs in India.",
                "Remote and freelance opportunities are growing.",
                "Easy to showcase skills through personal portfolio and projects."
            ],
            salary: [
                "Fresher: 3–6 LPA typical in tier-2 cities, higher in product companies.",
                "2–5 years experience: 6–18 LPA depending on skills and company.",
                "High-skill developers with strong projects can grow faster."
            ],
            requirements: [
                "Strong basics of programming and data structures",
                "Understanding of at least one frontend and one backend framework",
                "Portfolio of 2–4 solid projects",
                "Good communication and teamwork"
            ],
            companies: [
                "TCS",
                "Infosys",
                "Wipro",
                "Capgemini",
                "Accenture",
                "Cognizant"
            ],
            books: [
                "Eloquent JavaScript – Marijn Haverbeke",
                "You Don’t Know JS Yet – Kyle Simpson",
                "Clean Code – Robert C. Martin",
                "Designing Data-Intensive Applications – Martin Kleppmann",
                "HTML & CSS – Jon Duckett",
                "Learning React – Alex Banks, Eve Porcello"
            ],
            extras: [
                "Build a personal portfolio website with your projects.",
                "Contribute to open source to learn real-world practices.",
                "Participate in hackathons and coding contests."
            ]
        },
        {
            key: "dsa",
            name: "DSA & Competitive Programming",
            subtitle: "Strengthen problem-solving skills for product-based companies.",
            skills: [
                "Arrays, strings, linked lists, trees, graphs",
                "Time and space complexity analysis",
                "Dynamic programming and greedy methods",
                "Problem solving on platforms like LeetCode, CodeStudio"
            ],
            fundamentals: [
                "Strong foundation in at least one language (C++/Java/Python)",
                "Mathematics and logical reasoning",
                "Understanding recursion and iteration"
            ],
            basics: [
                "Consistent practice schedule",
                "Online judge accounts",
                "Notebook for patterns and notes"
            ],
            scope: [
                "Essential for cracking product-based company interviews.",
                "Improves logical ability for any software role."
            ],
            salary: [
                "Fresher in product companies: often 10–25+ LPA depending on company.",
                "3–5 years: significant jump if DSA + system design is strong."
            ],
            requirements: [
                "Strong dedication and regular practice",
                "Good grasp of core CS concepts",
                "Patience to solve medium/hard level problems"
            ],
            companies: [
                "Amazon",
                "Microsoft",
                "Google",
                "Flipkart",
                "Paytm",
                "Swiggy"
            ],
            books: [
                "Introduction to Algorithms – Cormen et al.",
                "Data Structures and Algorithms Made Easy – Narasimha Karumanchi",
                "Competitive Programming – Steven Halim"
            ],
            extras: [
                "Maintain a log of problems solved and patterns identified.",
                "Teach others to reinforce your own understanding."
            ]
        },
        {
            key: "cloud",
            name: "Cloud & DevOps Fundamentals",
            subtitle: "Learn deployment, automation and modern infrastructure basics.",
            skills: [
                "Linux and shell scripting basics",
                "Git, GitHub, CI/CD basics",
                "Docker and container fundamentals",
                "Intro to AWS / Azure / GCP"
            ],
            fundamentals: [
                "Basic networking concepts",
                "Application deployment pipeline",
                "Monitoring and logging basics"
            ],
            basics: [
                "Cloud free tier account",
                "Sample apps to deploy",
                "Understanding of web development basics"
            ],
            scope: [
                "Growing demand for DevOps engineers in India.",
                "Cloud skills complement software development very well."
            ],
            salary: [
                "Fresher: ~4–8 LPA for DevOps/Cloud support roles.",
                "3–5 years: 8–20 LPA depending on stack depth."
            ],
            requirements: [
                "Comfort with command line",
                "Interest in automation and tooling",
                "Basic scripting ability"
            ],
            companies: [
                "Infosys",
                "TCS",
                "HCL",
                "Accenture",
                "Mindtree"
            ],
            books: [
                "The DevOps Handbook – Gene Kim et al.",
                "Kubernetes in Action – Marko Luksa",
                "Docker Deep Dive – Nigel Poulton"
            ],
            extras: [
                "Automate your own small projects with CI/CD.",
                "Document every experiment in a blog or GitHub README."
            ]
        },
        {
            key: "datascience",
            name: "Data Science & Analytics",
            subtitle: "Work with data, statistics and insights for business decisions.",
            skills: [
                "Python with NumPy, Pandas, Matplotlib",
                "Statistics basics and probability",
                "Exploratory data analysis",
                "Intro to machine learning (scikit-learn)"
            ],
            fundamentals: [
                "Linear algebra basics",
                "Descriptive and inferential statistics",
                "Data cleaning and preprocessing"
            ],
            basics: [
                "Laptop with decent RAM",
                "Jupyter Notebook / Google Colab",
                "Datasets for practice (Kaggle)"
            ],
            scope: [
                "High demand across finance, e-commerce, healthcare etc.",
                "Strong future as data-driven decision making increases."
            ],
            salary: [
                "Fresher: 4–9 LPA typically, more in analytics firms.",
                "3–5 years: 8–20 LPA based on domain and expertise."
            ],
            requirements: [
                "Good math and logical reasoning",
                "Curiosity to understand data stories",
                "Consistent project work"
            ],
            companies: [
                "Mu Sigma",
                "Fractal Analytics",
                "Tiger Analytics",
                "TCS",
                "Accenture"
            ],
            books: [
                "Python for Data Analysis – Wes McKinney",
                "An Introduction to Statistical Learning – Gareth James et al.",
                "Hands-On Machine Learning with Scikit-Learn & TensorFlow – Aurélien Géron"
            ],
            extras: [
                "Build domain-focused projects: finance, marketing, operations etc.",
                "Participate in Kaggle competitions to improve skills."
            ]
        },
        {
            key: "ai",
            name: "AI & Machine Learning",
            subtitle: "Build intelligent systems using data and algorithms.",
            skills: [
                "Python, NumPy, Pandas",
                "Supervised and unsupervised learning",
                "Neural networks basics",
                "PyTorch or TensorFlow basics"
            ],
            fundamentals: [
                "Linear algebra and calculus basics",
                "Probability and statistics",
                "Algorithm and optimization basics"
            ],
            basics: [
                "GPU access (local or cloud) for deep learning",
                "Strong math foundation",
                "Good data handling skills"
            ],
            scope: [
                "Rapidly growing in India with many startups and R&D centers.",
                "Used in healthcare, finance, automation, and more."
            ],
            salary: [
                "Fresher: 5–10 LPA depending on profile.",
                "3–5 years: 10–25 LPA for strong ML engineers."
            ],
            requirements: [
                "Good coding skills in Python",
                "Comfort with mathematics",
                "Portfolio with ML projects"
            ],
            companies: [
                "Google",
                "Microsoft",
                "Amazon",
                "NVIDIA",
                "TCS",
                "Analytics-based startups"
            ],
            books: [
                "Pattern Recognition and Machine Learning – Bishop",
                "Deep Learning – Goodfellow, Bengio, Courville",
                "Hands-On Machine Learning – Aurélien Géron"
            ],
            extras: [
                "Start with small ML projects on tabular data before deep learning.",
                "Explain your models in simple language to non-tech people."
            ]
        },
        {
            key: "cyber",
            name: "Cyber Security (Software Focus)",
            subtitle: "Defend systems and applications from attacks.",
            skills: [
                "Networking and OS fundamentals",
                "Linux and scripting",
                "Web application security basics (OWASP Top 10)",
                "Basic ethical hacking and tools"
            ],
            fundamentals: [
                "TCP/IP and HTTP protocols",
                "Authentication, authorization and encryption basics",
                "Operating system security"
            ],
            basics: [
                "Lab environment or virtual machines",
                "Legal and ethical understanding",
                "Patience to test and document vulnerabilities"
            ],
            scope: [
                "Increasing demand as digital systems grow.",
                "Important in banking, telecom, government sectors in India."
            ],
            salary: [
                "Fresher: 4–8 LPA typical in security roles.",
                "3–5 years: 8–18 LPA depending on certifications and skills."
            ],
            requirements: [
                "Strong fundamentals in networks and OS",
                "Curiosity about how systems can break",
                "Relevant certifications help (CEH, Security+ etc.)"
            ],
            companies: [
                "Tata Communications",
                "Infosys",
                "Wipro",
                "EY",
                "Deloitte"
            ],
            books: [
                "The Web Application Hacker’s Handbook – Dafydd Stuttard, Marcus Pinto",
                "Linux Basics for Hackers – OccupyTheWeb",
                "Practical Malware Analysis – Sikorski & Honig"
            ],
            extras: [
                "Never test systems without explicit permission.",
                "Document every finding clearly and professionally."
            ]
        }
    ],

    // HARDWARE DOMAINS (ECE/EEE etc.)
    "ECE-Hardware": [
        {
            key: "embedded",
            name: "Embedded Systems & Microcontrollers",
            subtitle: "Design firmware and hardware for real-world devices.",
            skills: [
                "C programming for microcontrollers",
                "Arduino / STM32 / ESP32 basics",
                "UART, I2C, SPI protocols",
                "GPIO, timers, interrupts"
            ],
            fundamentals: [
                "Digital electronics basics",
                "Microcontroller architecture",
                "Datasheet reading and circuit basics"
            ],
            basics: [
                "Development boards (Arduino/ESP32 etc.)",
                "Breadboard, jumper wires, sensors & actuators",
                "Multimeter and basic tools"
            ],
            scope: [
                "High demand in automotive, IoT, industrial automation.",
                "India growing in electronics design and manufacturing."
            ],
            salary: [
                "Fresher: 3–6 LPA typical.",
                "3–5 years: 6–15 LPA depending on depth and domain."
            ],
            requirements: [
                "Hands-on project experience",
                "Strong debugging ability (hardware + software)",
                "Comfort with datasheets and timing diagrams"
            ],
            companies: [
                "Samsung R&D",
                "Bosch",
                "Tata Elxsi",
                "L&amp;T Technology Services",
                "Havells"
            ],
            books: [
                "The 8051 Microcontroller and Embedded Systems – Mazidi",
                "Embedded C – Michael J. Pont",
                "Designing Embedded Systems with PIC Microcontrollers – Tim Wilmshurst"
            ],
            extras: [
                "Document every project with block diagram and code explanation.",
                "Start with simple sensor-based projects and keep increasing complexity."
            ]
        },
        {
            key: "vlsi",
            name: "VLSI & Digital Design",
            subtitle: "Design and verify digital integrated circuits.",
            skills: [
                "Verilog/SystemVerilog basics",
                "Digital logic design",
                "Static timing concepts",
                "RTL design and basic verification"
            ],
            fundamentals: [
                "Combinational & sequential logic",
                "FSM design",
                "Number systems and arithmetic circuits"
            ],
            basics: [
                "Exposure to tools (ModelSim, Vivado etc.)",
                "Strong understanding of timing diagrams",
                "Good grasp of Boolean algebra"
            ],
            scope: [
                "India is becoming a hub for chip design and verification.",
                "Both service and product VLSI companies are hiring."
            ],
            salary: [
                "Fresher: 4–10 LPA depending on company.",
                "3–5 years: 8–20 LPA in good VLSI roles."
            ],
            requirements: [
                "Strong electronics and digital fundamentals",
                "Patience for detail-heavy work",
                "Some exposure to FPGA or RTL projects"
            ],
            companies: [
                "Intel",
                "Qualcomm",
                "Texas Instruments",
                "NXP",
                "Microchip"
            ],
            books: [
                "Digital Design – Morris Mano",
                "CMOS VLSI Design – Weste & Harris",
                "Verilog HDL – Samir Palnitkar"
            ],
            extras: [
                "Complete at least one mini project using HDL.",
                "Practice timing and resource reports interpretation."
            ]
        },
        {
            key: "iot",
            name: "IoT & Smart Systems",
            subtitle: "Connect physical devices to the internet for smart automation.",
            skills: [
                "Microcontrollers and sensors",
                "Wi-Fi, MQTT, HTTP basics",
                "Cloud integration (ThingSpeak, Firebase etc.)",
                "Basic mobile / web dashboard integration"
            ],
            fundamentals: [
                "Embedded systems basics",
                "Networking fundamentals",
                "Power and reliability considerations"
            ],
            basics: [
                "ESP8266/ESP32 boards",
                "Sensors and actuators",
                "Stable internet connection"
            ],
            scope: [
                "Used in smart homes, industry, agriculture, healthcare.",
                "Many Indian startups focus on IoT solutions."
            ],
            salary: [
                "Fresher: 3–7 LPA typical.",
                "3–5 years: 7–15 LPA based on domain experience."
            ],
            requirements: [
                "Hands-on project portfolio",
                "Understanding of security basics for IoT",
                "Ability to integrate hardware + cloud"
            ],
            companies: [
                "Siemens",
                "Honeywell",
                "Bosch",
                "L&amp;T",
                "Schneider Electric"
            ],
            books: [
                "Internet of Things – Raj Kamal",
                "IoT Fundamentals – Hanes, Salgueiro, Grossetete",
                "Designing the Internet of Things – Adrian McEwen"
            ],
            extras: [
                "Start with simple data logging projects.",
                "Think about scalability and reliability from early stages."
            ]
        },
        {
            key: "power",
            name: "Power Systems & Energy",
            subtitle: "Work on generation, transmission and distribution of power.",
            skills: [
                "Power system analysis basics",
                "Protection and switchgear fundamentals",
                "Electrical machines operation",
                "Safety standards and regulations"
            ],
            fundamentals: [
                "Circuit analysis and phasors",
                "Three-phase systems",
                "Transformer and motor principles"
            ],
            basics: [
                "Understanding of single-line diagrams",
                "Familiarity with simulation tools (ETAP/PSCAD basics)",
                "Field visit experiences"
            ],
            scope: [
                "Evergreen field with government and private opportunities.",
                "Renewable integration is increasing demand."
            ],
            salary: [
                "Fresher: 3–6 LPA typical.",
                "3–5 years: 6–12 LPA, higher in specialised roles."
            ],
            requirements: [
                "Strong safety mindset",
                "Willingness to work on site in many roles",
                "Good communication with cross-functional teams"
            ],
            companies: [
                "NTPC",
                "Power Grid Corporation",
                "Adani Power",
                "Tata Power",
                "Siemens Energy"
            ],
            books: [
                "Electrical Power Systems – C.L. Wadhwa",
                "Power System Analysis – Hadi Saadat",
                "Switchgear and Protection – Sunil Rao"
            ],
            extras: [
                "Try to get internships in power plants or utilities.",
                "Understand real-world constraints beyond theory."
            ]
        },
        {
            key: "automation",
            name: "Industrial Automation & PLC",
            subtitle: "Control industrial processes using PLC, SCADA and drives.",
            skills: [
                "PLC programming basics (Ladder logic)",
                "SCADA and HMI basics",
                "Sensors and actuators in industry",
                "VFD and motor control basics"
            ],
            fundamentals: [
                "Control systems basics",
                "Industrial communication protocols",
                "Electrical safety and standards"
            ],
            basics: [
                "Access to PLC training kits or labs",
                "Simulation tools for PLC programming",
                "Understanding of plant environments"
            ],
            scope: [
                "Highly demanded in manufacturing and process industries.",
                "Automation is central to Industry 4.0 growth."
            ],
            salary: [
                "Fresher: 3–6 LPA typical.",
                "3–5 years: 6–14 LPA depending on sector."
            ],
            requirements: [
                "Hands-on practice with PLC programming",
                "Flexible to work on-site and in shifts in some roles",
                "Good documentation and troubleshooting skill"
            ],
            companies: [
                "Siemens",
                "Rockwell Automation",
                "ABB",
                "Schneider Electric",
                "Honeywell"
            ],
            books: [
                "Programmable Logic Controllers – Frank D. Petruzella",
                "Industrial Automation and Robotics – A.K. Gupta",
                "Programmable Logic Controllers: Principles and Applications – Webb & Reis"
            ],
            extras: [
                "Visit industries to understand real SCADA panels.",
                "Focus on troubleshooting, not just programming."
            ]
        },
        {
            key: "hardwaredesign",
            name: "PCB & Hardware Design",
            subtitle: "Design printed circuit boards and electronics hardware.",
            skills: [
                "Schematic capture and PCB layout (KiCad/Altium/Eagle)",
                "Analog and digital circuit basics",
                "Signal integrity basics",
                "Soldering and prototyping"
            ],
            fundamentals: [
                "Ohm’s law and basic electronics",
                "Filter, amplifier and regulator basics",
                "Grounding and noise concepts"
            ],
            basics: [
                "PCB design tool installed",
                "Access to fabrication services",
                "Measurement tools (multimeter, basic oscilloscope preferred)"
            ],
            scope: [
                "Important for product companies and startups.",
                "Make in India is boosting electronics product design."
            ],
            salary: [
                "Fresher: 3–6 LPA typical.",
                "3–5 years: 6–14 LPA depending on complexity handled."
            ],
            requirements: [
                "Portfolio of designed and tested boards",
                "Understanding of design for manufacturability",
                "Attention to detail and documentation"
            ],
            companies: [
                "Havells",
                "Bajaj Electricals",
                "Tata Elxsi",
                "Motherson",
                "Local electronics startups"
            ],
            books: [
                "The Art of Electronics – Horowitz & Hill",
                "High-Speed Digital Design – Howard Johnson",
                "PCB Design for Real-World EMI Control – Bruce Archambeault"
            ],
            extras: [
                "Start with simple single-layer boards and move to 4-layer.",
                "Always review layouts with checklists."
            ]
        }
    ]
};

// Helper to map branch + industry to key
function getDomainKey(branch, industry) {
    const normalizedBranch = branch.toUpperCase();
    const normalizedIndustry = industry.toUpperCase();

    if (normalizedIndustry === "SOFTWARE") {
        return "CSE-Software"; // also used for IT / AI & DS for now
    }

    if (normalizedIndustry === "HARDWARE") {
        return "ECE-Hardware"; // common set for ECE/EEE/MECH/CIVIL etc.
    }

    return null;
}

// Generate domains based on branch and industry
const domainListEl = document.getElementById("domainList");

function generateDomains(branch, industry) {
    domainListEl.innerHTML = "";
    const key = getDomainKey(branch, industry);
    if (!key || !domainDatabase[key]) {
        const fallback = document.createElement("p");
        fallback.textContent = "Domains not configured yet for this combination.";
        domainListEl.appendChild(fallback);
        return;
    }

    const domains = domainDatabase[key];
    domains.forEach((domain) => {
        const btn = document.createElement("button");
        btn.className = "option-btn domain-btn";
        btn.textContent = domain.name;
        btn.setAttribute("data-key", domain.key);
        btn.addEventListener("click", () => {
            selectionState.domainKey = domain.key;
            showDomainDetails(key, domain.key);
            goToPage(8);
        });
        domainListEl.appendChild(btn);
    });
}

// Show domain details
const domainTitle = document.getElementById("domainTitle");
const domainSubtitle = document.getElementById("domainSubtitle");
const skillsList = document.getElementById("skillsList");
const fundamentalsList = document.getElementById("fundamentalsList");
const basicsList = document.getElementById("basicsList");
const scopeList = document.getElementById("scopeList");
const salaryList = document.getElementById("salaryList");
const requirementsList = document.getElementById("requirementsList");
const companiesList = document.getElementById("companiesList");
const booksList = document.getElementById("booksList");
const extrasList = document.getElementById("extrasList");

function fillList(ulElement, items) {
    ulElement.innerHTML = "";
    items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        ulElement.appendChild(li);
    });
}

const domainOptionTag = document.getElementById("domainOptionTag");

function showDomainDetails(domainKey, domainItemKey) {
    const collection = domainDatabase[domainKey];
    if (!collection) return;
    const itemIndex = collection.findIndex((d) => d.key === domainItemKey);
    if (itemIndex === -1) return;

    const item = collection[itemIndex];

    domainTitle.textContent = item.name;
    domainSubtitle.textContent = item.subtitle;
    domainOptionTag.textContent = "OPTION " + (itemIndex + 1);

    fillList(skillsList, item.skills);
    fillList(fundamentalsList, item.fundamentals);
    fillList(basicsList, item.basics);
    fillList(scopeList, item.scope);
    fillList(salaryList, item.salary);
    fillList(requirementsList, item.requirements);
    fillList(companiesList, item.companies);
    fillList(booksList, item.books);
    fillList(extrasList, item.extras);
}

// Initialise first page
goToPage(1);