import { useState } from 'react';
import ImageUpload from './ImageUpload.jsx';
import ContactAvatar from './ContactAvatar.jsx';
import './ImageUploadDemo.css';

function ImageUploadDemo() {
  const [demoImage, setDemoImage] = useState(null);
  const [demoName, setDemoName] = useState('John Doe');

  const handleImageChange = (imageDataUrl) => {
    setDemoImage(imageDataUrl);
  };

  const handleImageRemove = () => {
    setDemoImage(null);
  };

  return (
    <div className="image-upload-demo">
      <div className="demo-header">
        <h2>📸 Profile Photo Upload Demo</h2>
        <p>Test the image upload functionality with drag & drop or click to select</p>
      </div>

      <div className="demo-content">
        <div className="demo-section">
          <h3>Upload Interface</h3>
          <ImageUpload
            currentImage={demoImage}
            onImageChange={handleImageChange}
            onImageRemove={handleImageRemove}
            name={demoName}
          />
        </div>

        <div className="demo-section">
          <h3>Avatar Preview</h3>
          <div className="avatar-previews">
            <div className="avatar-size">
              <label>Small</label>
              <ContactAvatar name={demoName} image={demoImage} size="small" />
            </div>
            <div className="avatar-size">
              <label>Medium</label>
              <ContactAvatar name={demoName} image={demoImage} size="medium" />
            </div>
            <div className="avatar-size">
              <label>Large</label>
              <ContactAvatar name={demoName} image={demoImage} size="large" />
            </div>
          </div>
        </div>

        <div className="demo-section">
          <h3>Name Input</h3>
          <input
            type="text"
            value={demoName}
            onChange={(e) => setDemoName(e.target.value)}
            placeholder="Enter name for avatar initials"
            className="demo-name-input"
          />
        </div>

        <div className="demo-features">
          <h3>✨ Features</h3>
          <ul>
            <li>🖱️ Click to select or drag & drop images</li>
            <li>📏 Automatic resizing to 300x300 max</li>
            <li>🗜️ JPEG compression for smaller file sizes</li>
            <li>🔄 Fallback to initials if image fails</li>
            <li>❌ Easy image removal</li>
            <li>📱 Mobile-friendly interface</li>
            <li>♿ Accessibility support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadDemo;