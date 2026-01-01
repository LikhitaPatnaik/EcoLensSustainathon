import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { identifyTrash } from "./utils/gemini";
import "./App.css";

function App() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // NEW: Total Score State
  const [totalSaved, setTotalSaved] = useState(0);

  // 1. Load score from LocalStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem("ecoScore");
    if (saved) setTotalSaved(parseInt(saved));
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    analyzeImage(imageSrc);
  }, [webcamRef]);

  const analyzeImage = async (base64Data) => {
    setLoading(true);
    const result = await identifyTrash(base64Data);
    setAnalysis(result);
    setLoading(false);

    // 2. Update Total Score if the item is Recyclable or Compostable
    if (result && result.co2_saved > 0) {
      const newScore = totalSaved + result.co2_saved;
      setTotalSaved(newScore);
      localStorage.setItem("ecoScore", newScore);
    }
  };

  const retake = () => {
    setImgSrc(null);
    setAnalysis(null);
  };

  return (
    <div className="split-layout">
      
      {/* LEFT SIDE */}
      <div className="left-pane">
        <div className="cam-wrapper">
          {imgSrc ? (
            <img src={imgSrc} alt="Captured" className="fullscreen-media" />
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="fullscreen-media"
              videoConstraints={{ facingMode: "environment"}}
            />
          )}
          {!imgSrc && (
            <button onClick={capture} className="btn-overlay">📸 TAP TO SCAN</button>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-pane">
        <div className="header">
          <div>
            <h1 className="logo">EcoLens 🌿</h1>
            <p className="subtitle">AI Recycling Assistant</p>
          </div>
          
          {/* NEW: SCOREBOARD WIDGET */}
          <div className="score-widget">
            <span className="score-label">Lifetime Impact</span>
            <span className="score-value">{totalSaved}g CO2</span>
          </div>
        </div>

        <div className="content-area">
          {!loading && !analysis && (
            <div className="placeholder-text">
              <div className="icon-large">♻️</div>
              <h3>Ready to analyze</h3>
              <p>Scan waste to check recyclability and earn Earth Points.</p>
            </div>
          )}

          {loading && (
             <div className="loading-state">
              <div className="spinner"></div>
              <p>Consulting AI Planet-Guard...</p>
            </div>
          )}

          {analysis && (
            <div className={`result-card ${analysis.category.toLowerCase()}`}>
              <div className="card-header">
                <span className="category-tag">{analysis.category.toUpperCase()}</span>
              </div>
              
              <h2>{analysis.item}</h2>
              <p className="reason-text">{analysis.reason}</p>

              <div className="danger-box">
                <strong>⚠️ Climate Consequence:</strong>
                <p>{analysis.danger}</p>
              </div>

              {/* NEW: SMART ALTERNATIVE BOX */}
              <div className="alt-box">
                <strong>💡 Sustainable Swap:</strong>
                <p>{analysis.alternative}</p>
              </div>

              <div className="impact-stats">
                <div className="impact-badge co2">
                  🌱 Action saves <strong>{analysis.co2_saved}g CO2</strong>
                </div>
                <div className="impact-badge chemical">
                  🧪 <strong>{analysis.chemical_impact}</strong>
                </div>
              </div>
              
              <button onClick={retake} className="btn-retake">
                🔄 Scan Another Item
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;