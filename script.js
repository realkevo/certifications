let allCertifications = [];
let currentFilter = 'all';
let searchTerm = '';

// Load certifications from data.json
async function loadCertifications() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        allCertifications = data.certifications;
        updateStatistics();
        renderCertifications();
    } catch (error) {
        console.error('Error loading certifications:', error);
    }
}

// Update statistics
function updateStatistics() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeCerts = allCertifications.filter(cert => {
        if (!cert.expiryDate) return true;
        const expiry = new Date(cert.expiryDate);
        return expiry >= today;
    }).length;

    const expiredCerts = allCertifications.filter(cert => {
        if (!cert.expiryDate) return false;
        const expiry = new Date(cert.expiryDate);
        return expiry < today;
    }).length;

    document.getElementById('totalCerts').textContent = allCertifications.length;
    document.getElementById('activeCerts').textContent = activeCerts;
    document.getElementById('expiredCerts').textContent = expiredCerts;
}

// Check if certification is expired
function isExpired(expiryDate) {
    if (!expiryDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDate);
    return expiry < today;
}

// Filter certifications based on current filter and search term
function getFilteredCertifications() {
    return allCertifications.filter(cert => {
        // Apply search filter
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            cert.title.toLowerCase().includes(searchLower) ||
            cert.issuer.toLowerCase().includes(searchLower) ||
            (cert.description || '').toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;

        // Apply status filter
        if (currentFilter === 'active') {
            return !isExpired(cert.expiryDate);
        } else if (currentFilter === 'expired') {
            return isExpired(cert.expiryDate);
        }

        return true;
    });
}

// Format date
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Render certifications
function renderCertifications() {
    const filteredCerts = getFilteredCertifications();
    const grid = document.getElementById('certificationsGrid');
    const noResults = document.getElementById('noResults');

    if (filteredCerts.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    grid.innerHTML = filteredCerts.map(cert => {
        const expired = isExpired(cert.expiryDate);
        const statusClass = expired ? 'expired' : 'active';
        const statusText = cert.expiryDate ? (expired ? 'Expired' : 'Active') : 'Lifetime';

        let content = `
            <div class="certification-card ${statusClass}">
                <div class="cert-icon">${cert.icon || '🎓'}</div>
                <div class="cert-title">${cert.title}</div>
                <div class="cert-issuer">${cert.issuer}</div>
                ${cert.description ? `<div class="cert-description">${cert.description}</div>` : ''}
                ${cert.expiryDate ? `<div class="cert-status ${statusClass}">${statusText}</div>` : `<div class="cert-status active">Lifetime</div>`}
                <div class="cert-dates">
                    ${cert.issueDate ? `
                        <div class="cert-date">
                            <span class="cert-date-label">Issued</span>
                            <span>${formatDate(cert.issueDate)}</span>
                        </div>
                    ` : ''}
                    ${cert.expiryDate ? `
                        <div class="cert-date">
                            <span class="cert-date-label">Expires</span>
                            <span>${formatDate(cert.expiryDate)}</span>
                        </div>
                    ` : ''}
                </div>
                ${cert.link ? `<a href="${cert.link}" target="_blank" class="cert-link">View Certificate →</a>` : ''}
            </div>
        `;
        return content;
    }).join('');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Load certifications on page load
    loadCertifications();

    // Search input
    document.getElementById('searchInput').addEventListener('input', function (e) {
        searchTerm = e.target.value;
        renderCertifications();
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            renderCertifications();
        });
    });
});