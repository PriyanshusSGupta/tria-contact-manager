import { useState } from 'react';
import { Users, Search, Tag, Settings, Camera, Download } from 'lucide-react';
import './WelcomeScreen.css';

function WelcomeScreen({ onGetStarted, onSkip }) {
  const [currentStep, setCurrentStep] = useState(0);

  const features = [
    {
      icon: <Users size={48} />,
      title: "Manage Your Contacts",
      description: "Add, edit, and organize all your contacts in one beautiful interface. Never lose touch with the people who matter most."
    },
    {
      icon: <Search size={48} />,
      title: "Smart Search",
      description: "Find contacts instantly with our intelligent search. Search by name, email, phone, or even tags."
    },
    {
      icon: <Tag size={48} />,
      title: "Organize with Tags",
      description: "Create custom tags to categorize your contacts. Filter by family, work, friends, or any category you create."
    },
    {
      icon: <Camera size={48} />,
      title: "Profile Photos",
      description: "Add profile photos to your contacts with drag-and-drop upload. Images are automatically optimized and stored locally."
    },
    {
      icon: <Settings size={48} />,
      title: "Personalize Your Experience",
      description: "Choose between light and dark themes, customize backgrounds, and switch between grid and list views."
    },
    {
      icon: <Download size={48} />,
      title: "Import & Export",
      description: "Easily import contacts from CSV files or export your contact list for backup and sharing."
    }
  ];

  const handleNext = () => {
    if (currentStep < features.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onGetStarted();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  return (
    <div className="welcome-screen-overlay">
      <div className="welcome-screen">
        <div className="welcome-header">
          <h1>Welcome to Tria</h1>
          <p>Your modern contact management solution</p>
        </div>

        <div className="welcome-content">
          <div className="feature-showcase">
            <div className="feature-icon">
              {features[currentStep].icon}
            </div>
            <h2>{features[currentStep].title}</h2>
            <p>{features[currentStep].description}</p>
          </div>

          <div className="progress-indicators">
            {features.map((_, index) => (
              <button
                key={index}
                className={`progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                onClick={() => setCurrentStep(index)}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="welcome-actions">
          <button 
            className="skip-button"
            onClick={handleSkip}
          >
            Skip Tour
          </button>
          
          <div className="navigation-buttons">
            <button 
              className="nav-button prev-button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            
            <button 
              className="nav-button next-button"
              onClick={handleNext}
            >
              {currentStep === features.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;