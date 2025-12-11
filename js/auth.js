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

// ==========================================
// LOGIN LOGIC
// ==========================================
function attemptLogin() {
    // Get inputs and convert ID to uppercase for consistency
    const uidInput = document.getElementById('regNo');
    const pwdInput = document.getElementById('pwd');
    const errorMsg = document.getElementById('error');

    if(!uidInput || !pwdInput) return; // Safety check

    const uid = uidInput.value.toUpperCase().trim();
    const pwd = pwdInput.value.trim();

    // 1. CHECK FACULTY
    if (FACULTY_DB[uid] && FACULTY_DB[uid] === pwd) {
        localStorage.setItem("REC_USER_ROLE", "FACULTY");
        localStorage.setItem("REC_USER_ID", uid);
        
        // Redirect Faculty DIRECTLY to Dashboard
        window.location.href = "live_dashboard.html"; 
        return;
    }

    // 2. CHECK STUDENTS
    if (STUDENT_DB[uid] && STUDENT_DB[uid] === pwd) {
        localStorage.setItem("REC_USER_ROLE", "STUDENT");
        localStorage.setItem("REC_USER_ID", uid);
        
        // Redirect Students to Home Page to choose exam
        // If they came from a specific test link, go back there
        if(document.referrer && document.referrer.includes('tests/')) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
        return;
    }

    // 3. FAILED LOGIN
    if (errorMsg) {
        errorMsg.style.display = 'block';
        errorMsg.innerText = "Invalid User ID or Password";
    } else {
        alert("Invalid User ID or Password");
    }
}

// ==========================================
// PAGE PROTECTION
// ==========================================
function requireAuth(requiredRole) {
    const currentRole = localStorage.getItem("REC_USER_ROLE");
    
    // 1. If not logged in, force login
    if (!currentRole) {
        // Calculate path to login based on current location
        const prefix = window.location.pathname.includes('/tests/') ? '../' : '';
        window.location.href = prefix + "login.html";
        return;
    }

    // 2. Faculty has Master Access (Can see student pages)
    if (currentRole === "FACULTY") {
        return; 
    }

    // 3. Students cannot see Faculty Pages
    if (requiredRole === "FACULTY" && currentRole === "STUDENT") {
        alert("Access Denied: Faculty Only Area.");
        window.location.href = "index.html";
    }
}
