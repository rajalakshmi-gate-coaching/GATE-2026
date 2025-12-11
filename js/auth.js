// ==========================================
// CENTRAL AUTHENTICATION DATABASE
// ==========================================

// --- STUDENT DATABASE ---
// User ID: Roll Number (from email) | Password: GATE2026
const STUDENT_DB = {
    // Extracted from your list
    "221301053": "GATE2026", // B. Suriya Prasanth
    "221301006": "GATE2026", // V. Aruna Rajeshwari
    "221301033": "GATE2026", // Prathika V
    "221301034": "GATE2026", // Priyadarsan S
    "221301043": "GATE2026", // Saranya S
    "221301055": "GATE2026", // Tejesvi T.T
    "221301050": "GATE2026", // Sudharshan S
    
    // Generic Test IDs (Keep these for testing)
    "REC01": "GATE2026",
    "REC02": "GATE2026"
};

// --- FACULTY DATABASE ---
// User ID: Email Prefix | Password: FACULTY2026
const FACULTY_DB = {
    // Extracted from your list
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

    // Admin Override
    "RECADMIN": "ADMIN2026"
};

// --- 1. LOGIN FUNCTION ---
function attemptLogin() {
    const uidInput = document.getElementById('regNo');
    const pwdInput = document.getElementById('pwd');
    const errorMsg = document.getElementById('error');

    const uid = uidInput.value.toUpperCase().trim();
    const pwd = pwdInput.value.trim();

    // A. Check Faculty -> Send to Dashboard
    if (FACULTY_DB[uid] && FACULTY_DB[uid] === pwd) {
        localStorage.setItem("REC_USER_ROLE", "FACULTY");
        localStorage.setItem("REC_USER_ID", uid);
        window.location.href = "live_dashboard.html";
        return;
    }

    // B. Check Student -> Send to Modules Page
    if (STUDENT_DB[uid] && STUDENT_DB[uid] === pwd) {
        localStorage.setItem("REC_USER_ROLE", "STUDENT");
        localStorage.setItem("REC_USER_ID", uid);
        window.location.href = "modules.html";
        return;
    }

    // C. Failed
    if (errorMsg) {
        errorMsg.style.display = 'block';
        errorMsg.innerText = "Invalid User ID or Password";
    } else {
        alert("Invalid User ID or Password");
    }
}

// --- 2. LOGOUT FUNCTION ---
function logout() {
    localStorage.clear();
    // Redirect to the root (Login Page)
    // Adjust path if inside a subfolder
    const prefix = window.location.pathname.includes('/tests/') ? '../' : '';
    window.location.href = prefix + "index.html";
}

// --- 3. PAGE PROTECTION ---
function requireAuth(role) {
    const currentRole = localStorage.getItem("REC_USER_ROLE");
    const prefix = window.location.pathname.includes('/tests/') ? '../' : '';

    // Not logged in? Go to Login Page
    if (!currentRole) {
        window.location.href = prefix + "index.html";
        return;
    }

    // Faculty can go anywhere
    if (currentRole === "FACULTY") return;

    // Student trying to access Faculty page?
    if (role && currentRole !== role) {
        alert("Access Denied.");
        window.location.href = prefix + "modules.html";
    }
}
