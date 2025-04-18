"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import "./AIStudio.css";

/**
 * @typedef {Object} AIStudioProps
 * @property {string} [apiKey] - Optional API key for DeepAI
 */

/**
 * AIStudio Component
 *
 * A React component that provides AI-powered image generation and colorization
 * using the DeepAI API.
 *
 * @m {AIStudioProps} props - Component props
 * @returns {JSX.Element} The AIStudio component
 */
function AIStudio({ apiKey = "YOUR_API_KEY" }) {
  // Navigation state
  const [currentSection, setCurrentSection] = useState("hero");
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Form states
  const [prompt, setPrompt] = useState("");
  const [promptError, setPromptError] = useState("");
  const [fileError, setFileError] = useState("");

  // Result states
  const [generatedImage, setGeneratedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [colorizedImage, setColorizedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle scroll indicator visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Validates the prompt input and generates an image if valid
   * @returns {Promise<void>}
   */
  async function generateImage() {
    // Validate prompt
    if (!prompt.trim()) {
      setPromptError("Please enter a description for your image");
      return;
    }

    setPromptError("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.deepai.org/api/text2img", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedImage(data.output_url);
    } catch (error) {
      console.error("Error generating image:", error);
      setPromptError("Failed to generate image. Please try again.");
    }

    setIsLoading(false);
  }

  /**
   * Validates the uploaded image and colorizes it if valid
   * @returns {Promise<void>}
   */
  async function colorizeImage() {
    if (!uploadedImage) {
      setFileError("Please upload an image first");
      return;
    }

    setFileError("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.deepai.org/api/colorizer", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: uploadedImage,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setColorizedImage(data.output_url);
    } catch (error) {
      console.error("Error colorizing image:", error);
      setFileError("Failed to colorize image. Please try again.");
    }

    setIsLoading(false);
  }

  /**
   * Handles file upload and validates the file
   * @param {React.ChangeEvent<HTMLInputElement>} event - The file input change event
   */
  function handleFileUpload(event) {
    setFileError("");
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp"];
    if (!validTypes.includes(file.type)) {
      setFileError("Please upload a valid image file (JPEG, PNG, GIF, BMP)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size exceeds 5MB limit");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };
    reader.onerror = () => {
      setFileError("Error reading file");
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="ai-studio">
      <header className="app-header">
        <h3 className="app-logo">AI Studio</h3>
        <nav className="app-nav">
          <a className="nav-link">Home</a>
          <a className="nav-link">Features</a>
          <a className="nav-link">Gallery</a>
        </nav>
      </header>

      <section className="hero-section">
        <h1 className="hero-title">Transform Your Vision Into Art</h1>
        <p className="hero-description">
          Create stunning AI-generated images or bring your black & white photos
          to life with our advanced colorization technology
        </p>
        {showScrollIndicator && (
          <div className="scroll-indicator">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </div>
        )}
      </section>

      <div className="features-section">
        <h2 className="section-title">Create Magic with AI</h2>
        <div className="features-container">
          <div className="feature-column">
            <div className="feature-card">
              <h2>Generate Image from Text</h2>
              <div className="input-group">
                <input
                  className={`feature-input ${promptError ? "input-error" : ""}`}
                  placeholder="Enter your image description..."
                  value={prompt}
                  onInput={(event) => {
                    setPrompt(event.target.value);
                    if (promptError) setPromptError("");
                  }}
                  aria-label="Image description"
                  aria-describedby="prompt-error"
                />
                {promptError && (
                  <div className="error-message" id="prompt-error">
                    {promptError}
                  </div>
                )}
              </div>
              <button
                className="generate-button"
                onClick={() => generateImage()}
              >
                Generate Image
              </button>
              {generatedImage && (
                <img
                  alt="Generated image"
                  src={generatedImage}
                  className="result-image"
                />
              )}
            </div>
          </div>

          <div className="feature-column">
            <div className="feature-card">
              <h2>Colorize Black & White Image</h2>
              <div className="input-group">
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/gif, image/bmp"
                  onChange={(event) => handleFileUpload(event)}
                  className={`file-input ${fileError ? "input-error" : ""}`}
                  aria-label="Upload image"
                  aria-describedby="file-error"
                />
                {fileError && (
                  <div className="error-message" id="file-error">
                    {fileError}
                  </div>
                )}
              </div>
              <button
                className="colorize-button"
                onClick={() => colorizeImage()}
              >
                Colorize Image
              </button>
              {uploadedImage && (
                <img
                  alt="Uploaded image"
                  src={uploadedImage}
                  className="result-image"
                />
              )}
              {colorizedImage && (
                <img
                  alt="Colorized image"
                  src={colorizedImage}
                  className="result-image"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-container">
            <div className="loading-spinner" />
            <span>Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIStudio;
