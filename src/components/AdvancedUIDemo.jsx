import { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import WelcomeScreen from './WelcomeScreen.jsx';
import BackgroundPattern from './BackgroundPattern.jsx';
import Divider from './Divider.jsx';
import './AdvancedUIDemo.css';

function AdvancedUIDemo() {
  const [progress, setProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState('dots');

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 0 : newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleStartLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const patterns = ['dots', 'grid', 'diagonal', 'hexagon', 'waves'];

  return (
    <div className="advanced-ui-demo">
      <BackgroundPattern pattern={selectedPattern} opacity={0.03} />

      <div className="demo-header">
        <h1>🎨 Advanced UI Components</h1>
        <p>Showcase of professional UI components and interactions</p>
      </div>

      <div className="demo-grid">
        {/* Progress Bars Section */}
        <div className="demo-section">
          <h2>Progress Indicators</h2>
          <div className="progress-demos">
            <ProgressBar
              progress={progress}
              label="File Upload Progress"
              variant="primary"
              size="medium"
            />
            <ProgressBar
              progress={75}
              label="Profile Completion"
              variant="success"
              size="small"
            />
            <ProgressBar
              progress={45}
              label="Storage Usage"
              variant="warning"
              size="large"
            />
          </div>
        </div>

        {/* Loading Spinners Section */}
        <div className="demo-section">
          <h2>Loading Spinners</h2>
          <div className="spinner-demos">
            <LoadingSpinner size="small" variant="primary" />
            <LoadingSpinner
              size="medium"
              variant="success"
              showPercentage={true}
              percentage={Math.round(progress)}
            />
            <LoadingSpinner
              size="large"
              variant="secondary"
              label="Processing..."
            />
          </div>
          <button
            className="demo-button"
            onClick={handleStartLoading}
          >
            Show Loading Overlay
          </button>
        </div>

        {/* Background Patterns Section */}
        <div className="demo-section">
          <h2>Background Patterns</h2>
          <div className="pattern-selector">
            {patterns.map(pattern => (
              <button
                key={pattern}
                className={`pattern-button ${selectedPattern === pattern ? 'active' : ''}`}
                onClick={() => setSelectedPattern(pattern)}
              >
                {pattern}
              </button>
            ))}
          </div>
        </div>

        {/* Dividers Section */}
        <div className="demo-section">
          <h2>Enhanced Dividers</h2>
          <div className="divider-demos">
            <Divider variant="solid" color="default" />
            <Divider variant="dashed" color="primary">Section Break</Divider>
            <Divider variant="dotted" color="success" />
            <Divider variant="gradient" color="secondary">Gradient Style</Divider>
          </div>
        </div>

        {/* Welcome Screen Section */}
        <div className="demo-section">
          <h2>Onboarding Experience</h2>
          <button
            className="demo-button primary"
            onClick={() => setShowWelcome(true)}
          >
            Show Welcome Screen
          </button>
          <p className="demo-description">
            Interactive onboarding tour with step-by-step feature introduction
          </p>
        </div>

        {/* Features List */}
        <div className="demo-section full-width">
          <h2>✨ Component Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🎯 Progress Tracking</h3>
              <ul>
                <li>Animated progress bars</li>
                <li>Multiple size variants</li>
                <li>Color-coded states</li>
                <li>Percentage display</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>⏳ Loading States</h3>
              <ul>
                <li>Circular progress spinners</li>
                <li>Overlay loading screens</li>
                <li>Percentage indicators</li>
                <li>Custom labels</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>🎨 Visual Polish</h3>
              <ul>
                <li>Subtle background patterns</li>
                <li>Enhanced dividers</li>
                <li>Smooth animations</li>
                <li>Theme-aware styling</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>👋 User Onboarding</h3>
              <ul>
                <li>Interactive welcome tour</li>
                <li>Feature highlights</li>
                <li>Step-by-step guidance</li>
                <li>Skip functionality</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <LoadingSpinner
          overlay={true}
          size="large"
          variant="primary"
          label="Processing your request..."
          showPercentage={true}
          percentage={Math.round(progress)}
        />
      )}

      {/* Welcome Screen */}
      {showWelcome && (
        <WelcomeScreen
          onGetStarted={() => setShowWelcome(false)}
          onSkip={() => setShowWelcome(false)}
        />
      )}
    </div>
  );
}

export default AdvancedUIDemo;