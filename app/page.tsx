"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const lead = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      location: formData.get("location") as string,
      interest: formData.get("interest") as string,
      budget: formData.get("budget") as string,
      message: formData.get("message") as string,
    };

    const { error } = await supabase
      .from("leads")
      .insert([lead]);

    setLoading(false);

    if (error) {
      console.error(error);
      setError("Unable to submit your enquiry. Please try again.");
      return;
    }

    form.reset();
    setSubmitted(true);
  };

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-content">
          <p className="tagline">
            🌱 PREMIUM AGRICULTURAL FARMS
          </p>

          <h1>
            Find Your Perfect
            <span> Farm Land</span>
          </h1>

          <p className="hero-text">
            Explore premium agricultural farm lands around
            Bengaluru and Mysuru. Submit your enquiry and
            our team will contact you.
          </p>

          <a href="#enquiry" className="hero-button">
            Enquire Now
          </a>
        </div>
      </section>

      <section className="benefits">
        <div className="benefit">
          <div className="icon">🌿</div>
          <h3>Premium Farm Lands</h3>
          <p>
            Carefully selected agricultural properties.
          </p>
        </div>

        <div className="benefit">
          <div className="icon">📍</div>
          <h3>Great Locations</h3>
          <p>
            Properties around Bengaluru and Mysuru.
          </p>
        </div>

        <div className="benefit">
          <div className="icon">🤝</div>
          <h3>Personal Assistance</h3>
          <p>
            Get assistance throughout your enquiry.
          </p>
        </div>
      </section>

      <section id="enquiry" className="form-section">
        <div className="form-container">

          <div className="form-heading">
            <p className="tagline">
              GET IN TOUCH
            </p>

            <h2>
              Farm Property Enquiry
            </h2>

            <p>
              Tell us what you are looking for and
              our team will get back to you.
            </p>
          </div>

          {submitted ? (
            <div className="success-message">
              <div className="success-icon">
                ✓
              </div>

              <h2>
                Thank You!
              </h2>

              <p>
                Your enquiry has been received.
                Our team will contact you shortly.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="again-button"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                <div className="form-group">
                  <label htmlFor="name">
                    Full Name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Phone Number *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">
                    Your Location
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="e.g. Bengaluru"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="interest">
                    Farm Interest *
                  </label>

                  <select
                    id="interest"
                    name="interest"
                    required
                  >
                    <option value="">
                      Select your interest
                    </option>

                    <option value="Agricultural Land">
                      Agricultural Land
                    </option>

                    <option value="Farm House">
                      Farm House
                    </option>

                    <option value="Farm Plot">
                      Farm Plot
                    </option>

                    <option value="Weekend Farm">
                      Weekend Farm
                    </option>

                    <option value="Investment Land">
                      Investment Land
                    </option>

                    <option value="Organic Farm">
                      Organic Farm
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="budget">
                    Budget
                  </label>

                  <select
                    id="budget"
                    name="budget"
                  >
                    <option value="">
                      Select your budget
                    </option>

                    <option value="Below ₹25 Lakhs">
                      Below ₹25 Lakhs
                    </option>

                    <option value="₹25–50 Lakhs">
                      ₹25–50 Lakhs
                    </option>

                    <option value="₹50 Lakhs–₹1 Crore">
                      ₹50 Lakhs–₹1 Crore
                    </option>

                    <option value="₹1–2 Crores">
                      ₹1–2 Crores
                    </option>

                    <option value="Above ₹2 Crores">
                      Above ₹2 Crores
                    </option>

                    <option value="Not Decided">
                      Not Decided
                    </option>
                  </select>
                </div>

              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us what type of farm property you are looking for..."
                />
              </div>

              {error && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "15px",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : "Submit Enquiry"}
              </button>

            </form>
          )}

        </div>
      </section>

      <footer>
        <p>
          © 2026 GreenLand Farms. All rights reserved.
        </p>
      </footer>
    </main>
  );
}