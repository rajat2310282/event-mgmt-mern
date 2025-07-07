import React, { useState, useEffect } from "react";

const balloonsCount = 10;
const confettiCount = 30;

const getRandom = (min, max) => Math.random() * (max - min) + min;

const Balloon = ({ style }) => (
  <div
    style={{
      position: "absolute",
      width: 40,
      height: 60,
      borderRadius: "60% 60% 60% 60% / 80% 80% 20% 20%",
      background: `radial-gradient(circle at 30% 30%, #ff5f6d, #ffc371)`,
      boxShadow: "0 0 10px rgba(255, 95, 109, 0.7)",
      opacity: 0.85,
      animation: `floatUp ${getRandom(8, 12)}s ease-in-out infinite`,
      ...style,
      filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.3))",
      zIndex: 0,
    }}
  />
);

const Confetti = ({ style }) => {
  const colors = ["#ff0a54", "#ff477e", "#ff85a1", "#fbb1b1", "#f9bec7"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = getRandom(6, 12);

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        backgroundColor: color,
        opacity: 0.8,
        borderRadius: Math.random() > 0.5 ? "50%" : "20%",
        animation: `confettiFall ${getRandom(4, 8)}s linear infinite`,
        ...style,
        zIndex: 0,
      }}
    />
  );
};

const DiscoBall = () => {
  return (
    <div className="disco-ball" aria-hidden="true">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="disco-segment" style={{ transform: `rotate(${i * 18}deg)` }} />
      ))}
    </div>
  );
};

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: "",
    eventType: "",
    theme: "",
    extraRequirements: "",
    venue: "",
    eventDate: "",
    eventTime: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSubmitted(true);
      console.log("Event details submitted successfully!");
    } else {
      alert("Failed to submit event details");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};


  // Generate balloons and confetti positions
  const [balloons, setBalloons] = useState([]);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const b = [];
    for (let i = 0; i < balloonsCount; i++) {
      b.push({
        left: `${getRandom(0, 95)}%`,
        delay: `${getRandom(0, 10)}s`,
        duration: `${getRandom(8, 12)}s`,
        animationTimingFunction: "ease-in-out",
      });
    }
    setBalloons(b);

    const c = [];
    for (let i = 0; i < confettiCount; i++) {
      c.push({
        left: `${getRandom(0, 100)}%`,
        delay: `${getRandom(0, 10)}s`,
        duration: `${getRandom(4, 8)}s`,
        size: getRandom(6, 12),
      });
    }
    setConfetti(c);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap');
          select option {
          background-color: #ffffff;
          color: #000000;
        }
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          font-family: 'Poppins', sans-serif;
          overflow: hidden;
          background: radial-gradient(circle at center, #1d2731 0%, #0f1012 80%);
          color: #fff;
        }

        @keyframes glowPulse {
          0% {
            box-shadow: 0 0 12px 2px #1db954;
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            box-shadow: 0 0 22px 8px #1db954;
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            box-shadow: 0 0 12px 2px #1db954;
            transform: scale(1);
            opacity: 0.8;
          }
        }

        @keyframes floatUp {
          0% { transform: translateY(100vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-150px) translateX(15px) rotate(360deg); opacity: 0; }
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          padding: 1rem;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #1db954 transparent;
          z-index: 10;
          position: relative;
        }

        /* Custom scrollbar */
        .container::-webkit-scrollbar {
          width: 10px;
        }
        .container::-webkit-scrollbar-track {
          background: transparent;
        }
        .container::-webkit-scrollbar-thumb {
          background-color: #1db954;
          border-radius: 10px;
          border: 3px solid transparent;
        }

        .form-box {
          background: rgba(0, 0, 0, 0.45);
          padding: 2rem 3rem;
          border-radius: 20px;
          max-width: 520px;
          width: 100%;
          box-shadow: 0 0 30px #1db954;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          overflow: auto;
          max-height: 90vh;
          color: #fff;
          border: 2px solid rgba(29, 185, 84, 0.6);
          z-index: 20;
          position: relative;
        }

        h2 {
          margin-bottom: 1.5rem;
          font-weight: 600;
          text-align: center;
          color: #1db954;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 0 8px #1db954;
        }

        form {
          display: flex;
          flex-direction: column;
        }
        label {
          font-weight: 600;
          margin-bottom: 0.4rem;
          font-size: 0.9rem;
        }
        input, select, textarea {
          padding: 14px 16px;
          border-radius: 12px;
          border: none;
          font-size: 1rem;
          margin-bottom: 1.2rem;
          outline: none;
          transition: box-shadow 0.3s ease;
          background: rgba(255 255 255 / 0.1);
          color: #fff;
          border: 1.5px solid rgba(255 255 255 / 0.15);
          backdrop-filter: blur(6px);
        }
        input::placeholder, textarea::placeholder {
          color: rgba(255 255 255 / 0.5);
        }
        input:focus, select:focus, textarea:focus {
          box-shadow: 0 0 12px #1db954;
          border-color: #1db954;
          background: rgba(255 255 255 / 0.15);
        }
        button {
          background: #1db954;
          color: #000;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          padding: 14px 0;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.25s ease;
          box-shadow: 0 0 15px #1db954;
        }
        button:hover {
          background: #17a43d;
          box-shadow: 0 0 20px #17a43d;
        }

        .thank-you {
          text-align: center;
          font-size: 1.3rem;
          font-weight: 600;
          color: #1db954;
          padding: 2rem 0;
        }

        /* Disco Ball Styles */
        .disco-ball {
          position: fixed;
          top: 10%;
          right: 10%;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle at center, #e0e0e0, #888);
          box-shadow: inset 0 0 15px #fff, 0 0 30px #1db954;
          animation: glowPulse 4s ease-in-out infinite;
          filter: drop-shadow(0 0 8px #1db954);
          z-index: 15;
          display: flex;
          flex-wrap: wrap;
          transform-style: preserve-3d;
          perspective: 600px;
        }

        .disco-segment {
          flex: 0 0 20%;
          height: 20%;
          background: linear-gradient(45deg, #1db954 0%, #0f0 100%);
          border: 1px solid #0f0;
          opacity: 0.7;
          box-shadow: 0 0 10px #1db954;
          transform-origin: 50% 100%;
          animation: discoRotate 6s linear infinite;
          filter: drop-shadow(0 0 3px #1db954);
        }

        @keyframes discoRotate {
          0% { transform: rotateX(0deg) rotateY(0deg);}
          100% { transform: rotateX(360deg) rotateY(360deg);}
        }
      `}</style>

      {/* Disco Ball
      <DiscoBall /> */}

      {/* Balloons floating */}
      {balloons.map((style, i) => (
        <Balloon
          key={i}
          style={{
            left: style.left,
            animationDelay: style.delay,
            animationDuration: style.duration,
            animationTimingFunction: style.animationTimingFunction,
            bottom: "-80px",
          }}
        />
      ))}

      {/* Confetti falling */}
      {confetti.map((style, i) => (
        <Confetti
          key={i}
          style={{
            left: style.left,
            animationDelay: style.delay,
            animationDuration: style.duration,
            bottom: "100vh",
          }}
        />
      ))}

      <div className="container" role="main">
        <div className="form-box" role="form" aria-label="Event Management Form">
          <h2>Event Management Details</h2>
          {submitted ? (
            <p className="thank-you" tabIndex={0}>
              Thanks for submitting your event details! We will get back to you
              soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+91 1234567890"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <label htmlFor="numberOfPeople">Number of People Attending</label>
              <input
                type="number"
                id="numberOfPeople"
                name="numberOfPeople"
                placeholder="Enter number of attendees"
                value={formData.numberOfPeople}
                onChange={handleChange}
                min="1"
                required
              />

              <label htmlFor="eventType">Type of Event</label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
              >
                <option value="">-- Select event type --</option>
                <option value="birthday">Birthday Party</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate Event</option>
                <option value="concert">Concert</option>
                <option value="other">Other</option>
              </select>

              <label htmlFor="theme">Theme (if any)</label>
              <input
                type="text"
                id="theme"
                name="theme"
                placeholder="E.g., Retro, Beach, Formal"
                value={formData.theme}
                onChange={handleChange}
              />

              <label htmlFor="extraRequirements">Extra Requirements</label>
              <textarea
                id="extraRequirements"
                name="extraRequirements"
                placeholder="Anything else you need?"
                value={formData.extraRequirements}
                onChange={handleChange}
              />

              <label htmlFor="venue">Venue</label>
              <input
                type="text"
                id="venue"
                name="venue"
                placeholder="Enter venue address"
                value={formData.venue}
                onChange={handleChange}
                required
              />

              <label htmlFor="eventDate">Date of Event</label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
              />

              <label htmlFor="eventTime">Time of Event</label>
              <input
                type="time"
                id="eventTime"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleChange}
                required
              />

              <button type="submit">Submit Details</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
