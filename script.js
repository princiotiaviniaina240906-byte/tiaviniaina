// ============================================
// PORTFOLIO TIAVINA - SCRIPT PRINCIPAL
// ============================================

// État de l'application
const appState = {
    currentSection: null,
    previousSection: null,
    sections: {}
};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio Tiavina - Chargement terminé');
    
    // Initialiser toutes les sections
    initSections();
    
    // Configurer les boutons principaux
    setupMainButtons();
    
    // Configurer le bouton "Voir le Profile"
    setupViewProfileButton();
    
    // Configurer le téléchargement du CV
    setupCVDownload();
    
    // Configurer le formulaire de contact
    setupContactForm();
    
    // Configurer les boutons "Voir plus de détails"
    setupToggleDetailsButtons();
    
    // Configurer le formulaire newsletter
    setupNewsletterForm();
    
    // Afficher l'écran initial
    showInitialView();
});

// Initialiser les sections
function initSections() {
    // Récupérer toutes les sections
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        const id = section.id;
        appState.sections[id] = section;
        section.style.display = 'none';
    });
}

// Configurer les boutons principaux
function setupMainButtons() {
    const mainButtons = document.querySelectorAll('.main-btn');
    
    mainButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            showSection(targetId);
        });
    });
}

// Configurer le bouton "Voir le Profile"
function setupViewProfileButton() {
    const viewProfileBtn = document.getElementById('viewProfileBtn');
    if (viewProfileBtn) {
        viewProfileBtn.addEventListener('click', function() {
            // Animation du clic
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            // Afficher la section Résumé
            showSection('resume-section');
        });
    }
}

// Configurer le téléchargement du CV
function setupCVDownload() {
    const downloadCVBtn = document.getElementById('downloadCvBtn');
    const footerDownloadBtn = document.getElementById('footer-cv-download');
    
    const downloadCV = function(e) {
        if (e) e.preventDefault();
        
        // Animation du téléchargement
        const btn = e ? e.currentTarget : downloadCVBtn;
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Téléchargement...';
        btn.disabled = true;
        
        // Simulation du téléchargement
        setTimeout(() => {
            // Créer un lien de téléchargement
            const link = document.createElement('a');
            link.href = 'cv-tiavina-rakotovao.pdf';
            link.download = 'CV_Tiavina_Rakotovao.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Remettre le texte original
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            // Notification
            showNotification('CV téléchargé avec succès!', 'success');
        }, 1000);
    };
    
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', downloadCV);
    }
    
    if (footerDownloadBtn) {
        footerDownloadBtn.addEventListener('click', downloadCV);
    }
}

// Configurer le formulaire de contact
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const message = document.getElementById('message').value;
            
            // Validation
            if (!message.trim()) {
                showNotification('Veuillez écrire un message', 'error');
                return;
            }
            
            // Simulation d'envoi
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Envoi réussi
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
                showNotification('Votre message a été envoyé avec succès!', 'success');
                
                // Réinitialiser le formulaire
                document.getElementById('message').value = '';
                
                // Remettre le bouton à l'état initial
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
}

// Configurer les boutons "Voir plus de détails"
function setupToggleDetailsButtons() {
    const toggleButtons = document.querySelectorAll('.toggle-details-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectContent = this.closest('.project-content');
            const details = projectContent.querySelector('.project-details');
            const showText = this.querySelector('.show-text');
            const hideText = this.querySelector('.hide-text');
            
            if (details.style.display === 'none' || !details.style.display) {
                // Afficher les détails
                details.style.display = 'block';
                showText.style.display = 'none';
                hideText.style.display = 'inline';
                
                // Animation
                details.style.opacity = '0';
                details.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    details.style.transition = 'all 0.3s ease';
                    details.style.opacity = '1';
                    details.style.transform = 'translateY(0)';
                }, 10);
            } else {
                // Cacher les détails
                details.style.opacity = '0';
                details.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    details.style.display = 'none';
                    showText.style.display = 'inline';
                    hideText.style.display = 'none';
                }, 300);
            }
        });
    });
}

// Configurer le formulaire newsletter
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletter-email').value;
            
            // Validation email
            if (!validateEmail(email)) {
                showNotification('Veuillez entrer une adresse email valide', 'error');
                return;
            }
            
            // Simulation d'inscription
            const submitBtn = this.querySelector('.subscribe-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscription...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Inscription réussie
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Inscrit!';
                showNotification('Vous êtes maintenant inscrit à la newsletter!', 'success');
                
                // Réinitialiser le formulaire
                document.getElementById('newsletter-email').value = '';
                
                // Remettre le bouton à l'état initial
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
}

// Afficher une section
function showSection(sectionId) {
    // Sauvegarder la section précédente
    appState.previousSection = appState.currentSection;
    appState.currentSection = sectionId;
    
    // Cacher l'écran initial
    const initialView = document.getElementById('initialView');
    initialView.classList.remove('active');
    initialView.style.display = 'none';
    
    // Cacher toutes les sections
    Object.values(appState.sections).forEach(section => {
        section.style.display = 'none';
    });
    
    // Afficher la section demandée
    const targetSection = appState.sections[sectionId];
    if (targetSection) {
        targetSection.style.display = 'block';
        
        // Animation d'entrée
        targetSection.style.opacity = '0';
        targetSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            targetSection.style.transition = 'all 0.5s ease';
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 10);
        
        // Afficher le footer
        document.querySelector('.footer').style.display = 'block';
        
        // Scroll vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Retour à l'écran initial
function goBack() {
    // Cacher la section actuelle
    if (appState.currentSection) {
        const currentSection = appState.sections[appState.currentSection];
        if (currentSection) {
            currentSection.style.display = 'none';
        }
    }
    
    // Afficher l'écran initial
    const initialView = document.getElementById('initialView');
    initialView.style.display = 'flex';
    
    setTimeout(() => {
        initialView.classList.add('active');
    }, 10);
    
    // Cacher le footer
    document.querySelector('.footer').style.display = 'none';
    
    // Réinitialiser l'état
    appState.previousSection = appState.currentSection;
    appState.currentSection = null;
    
    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Afficher l'écran initial
function showInitialView() {
    const initialView = document.getElementById('initialView');
    initialView.style.display = 'flex';
    
    setTimeout(() => {
        initialView.classList.add('active');
    }, 10);
}

// Afficher une notification
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Ajouter au document
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Valider un email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Configuration des boutons "Retour"
document.querySelectorAll('.back-btn').forEach(button => {
    button.addEventListener('click', goBack);
});

// ============================================
// STYLES POUR LES NOTIFICATIONS (ajoutés dynamiquement)
// ============================================
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }
    
    .notification-success {
        background: #27ae60;
        color: white;
    }
    
    .notification-error {
        background: #e74c3c;
        color: white;
    }
    
    .notification-info {
        background: #3498db;
        color: white;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(notificationStyles);