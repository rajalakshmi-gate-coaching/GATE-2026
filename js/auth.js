// ==========================================
// CENTRAL AUTHENTICATION (Simplified)
// ==========================================

const STUDENT_DB = {
    "REC01": "GATE2026", "REC02": "GATE2026", "REC03": "GATE2026",
    "REC04": "GATE2026", "REC05": "GATE2026", "REC10": "GATE2026"
};

const FACULTY_DB = {
    "FAC01": "ADMIN2026", "HOD_BT": "REC_HOD", "RECADMIN": "GATE2026"
};

function attemptLogin() {
    const uid = document.getElementById('regNo').value.toUpperCase().trim();
    const pwd = document.getElementById('pwd').value.trim();
    
    if (FACULTY_DB[uid] && FACULTY_DB[uid] === pwd) {
        localStorage.setItem("REC_USER_ROLE", "FACULTY");
        localStorage.setItem("REC_USER_ID", uid);
        window.history.back(); // Go back to the test they were trying to open
    } 
    else if (STUDENT_DB[uid] && STUDENT_DB[uid] === pwd) {
        localStorage.setItem("REC_USER_ROLE", "STUDENT");
        localStorage.setItem("REC_USER_ID", uid);
        window.history.back(); // Go back to the test they were trying to open
    } 
    else {
        alert("Invalid Credentials");
    }
}

// PROTECTION FUNCTION
// We only call this inside the Exam Pages now.
function requireAuth() {
    const user = localStorage.getItem("REC_USER_ID");
    
    if (!user) {
        alert("🔒 Authentication Required\n\nYou must login to start this test.");
        // Determine path to login based on where we are
        const prefix = window.location.pathname.includes('/tests/') ? '../' : '';
        window.location.href = prefix + "login.html";
    }
}
