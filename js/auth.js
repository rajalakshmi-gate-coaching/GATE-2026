// ==========================================
// CENTRAL AUTHENTICATION DATABASE
// ==========================================

// --- 1. BIOTECH SPECIAL LIST (For Auto-Redirect) ---
const BIOTECH_IDS = [
    "230401028", // Deepika J V
    "230401038", // Geetha shri.B
    "230401022", // Bindu madhavi D
    "230401189", // Vithyaa B
    "230401011", // Aravind V
    "230401019", // Benjamin Winfred
    "23010401003", // Abishek S
    "230401127", // Rakshitha V S
    "230401114", // Oviyapriya V
    "230401069"  // Kanmani.T
];

// --- 2. STUDENT DATABASE (Roll No : Password) ---
const STUDENT_DB = {
    // -- BIOTECH BATCH --
    "230401028": "GATE2026",
    "230401038": "GATE2026",
    "230401022": "GATE2026",
    "230401189": "GATE2026",
    "230401011": "GATE2026",
    "230401019": "GATE2026",
    "23010401003": "GATE2026",
    "230401127": "GATE2026",
    "230401114": "GATE2026",
    "230401069": "GATE2026",

    // -- EXISTING STUDENTS (Standard) --
    "221301053": "GATE2026", 
    "221301006": "GATE2026", 
    "221301033": "GATE2026", 
    "221301034": "GATE2026", 
    "221301043": "GATE2026", 
    "221301055": "GATE2026", 
    "221301050": "GATE2026", 
    
    // -- TEST ACCOUNTS --
    "REC01": "GATE2026",
    "REC02": "GATE2026"
};

// --- 3. FACULTY DATABASE ---
const FACULTY_DB = {
    "RAMALAKSHMI.K": "FACULTY2026",
    "ANAND.R": "FACULTY2026",
    "SUDHAKAR.V": "FACULTY2026",
    "BHARATHI.P": "FACULTY2026",
    "NIVEADHITHA.S": "FACULTY2026",
    "ARUTHRADEVI.G": "FACULTY2026",
    "KULASTICJASSY.A": "FACULTY2026",
    "NITHYABALASUNDARI.S": "FACULTY2026",
    "PRIYADARSHINI.SR": "FACULTY2026",
    "DIVYASHREE.JS": "FACULTY2026",
    "MIDHUNA.LV": "FACULTY2026",
    "RECADMIN": "ADMIN2026"
};

// ==========================================
// 4. LOGIN LOGIC
// ==========================================
function attemptLogin() {
    const uidInput = document.getElementById('regNo');
    const pwdInput = document.getElementById('pwd');
    const errorMsg = document.getElementById('error');

    if(!uidInput || !pwdInput) return; 

    // Normalize Input (Trim & Uppercase)
    const uid = uidInput.value.toUpperCase().trim();
    const pwd = pwdInput.value.trim();

    console.log("Login Attempt:", uid);

    // --- CHECK FACULTY ---
    if (FACULTY_DB[uid] && FACULTY_DB[uid] === pwd) {
        localStorage.setItem("REC_USER_ROLE", "FACULTY");
        localStorage.setItem("REC_USER_ID", uid);
        window.location.href = "live_dashboard.html"; 
        return;
    }

    // --- CHECK STUDENTS ---
    if (STUDENT_DB[uid] && STUDENT_DB[uid] === pwd) {
        localStorage.setItem("REC_USER_ROLE", "STUDENT");
        localStorage.setItem("REC_USER_ID", uid);

        // ** SPECIAL REDIRECT FOR BIOTECH **
        if (BIOTECH_IDS.includes(uid)) {
            window.location.href = "bt_home.html";
        } else {
            window.location.href = "modules.html";
        }
        return;
    }

    // --- FAILED ---
    if (errorMsg) {
        errorMsg.style.display = 'block';
        errorMsg.innerText = "Invalid Credentials";
    } else {
        alert("Invalid User ID or Password");
    }
}

// ==========================================
// 5. COMMON UTILS
// ==========================================
function logout() {
    localStorage.clear(); 
    // Go up one level if inside 'tests' folder
    const prefix = window.location.pathname.includes('/tests/') ? '../' : '';
    window.location.href = prefix + "index.html";
}

function requireAuth(requiredRole) {
    const currentRole = localStorage.getItem("REC_USER_ROLE");
    const prefix = window.location.pathname.includes('/tests/') ? '../' : '';

    if (!currentRole) {
        window.location.href = prefix + "index.html";
        return;
    }

    if (currentRole === "FACULTY") return; 

    if (requiredRole === "FACULTY" && currentRole === "STUDENT") {
        alert("Access Denied: Faculty Only.");
        window.location.href = prefix + "modules.html";
    }
}
