// REPLACE the requireAuth function in js/auth.js with this:

function requireAuth(role) {
    const currentRole = localStorage.getItem("REC_USER_ROLE");
    
    // 1. If not logged in, redirect IMMEDIATELY to login.html
    if (!currentRole) {
        // Adjust path if your files are in subfolders
        window.location.href = window.location.pathname.includes('/tests/') ? '../login.html' : 'login.html'; 
        return;
    }

    // 2. Faculty Master Key (Allows access to everything)
    if (currentRole === "FACULTY") return;

    // 3. Student Permission Check
    if (role && currentRole !== role) {
        alert("Restricted Area: Students cannot access this page.");
        window.location.href = "index.html";
    }
}
