import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://youtube-recommendation-backend-2.onrender.com/api/recommendations");
      setVideos(response.data);
    } catch (err) {
      setError("Error fetching recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Personalized YouTube Recommendations</h1>
      </header>
      <div className="button-container">
        <button
          className="get-recommendations-btn"
          onClick={getRecommendations}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {videos.length > 0 && (
        <div className="recommendation-list">
          <ul className="video-list">
            {videos.map((video, index) => (
              <li key={index} className="video-item">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="video-thumbnail"
                />
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-link"
                >
                  {video.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
