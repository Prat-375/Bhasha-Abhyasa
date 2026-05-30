// AuthModal.jsx
// frontend/src/components/AuthModal.jsx
// Shown when a logged-out user clicks a level card.
// Two buttons: Login → /login, Sign Up → /signup

import { useNavigate } from "react-router";

function AuthModal({ onClose }) {
  const navigate = useNavigate();

  const go = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="auth-modal-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="auth-modal">
        <div className="auth-modal-icon">🔐</div>

        <h2 className="auth-modal-title">Sign in to continue</h2>
        <p className="auth-modal-sub">
          Create a free account or log in to access lessons, quizzes and track your progress.
        </p>

        <div className="auth-modal-actions">
          <button className="auth-modal-btn auth-modal-btn-primary" onClick={() => go("/login")}>
            Log in
          </button>
          <button className="auth-modal-btn auth-modal-btn-secondary" onClick={() => go("/signup")}>
            Create account
          </button>
        </div>

        <button className="auth-modal-close" onClick={onClose} aria-label="Close">✕</button>
      </div>
    </>
  );
}

export default AuthModal;