import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [form, setForm] = useState({
    Product_Weight: '2.5',
    Current_Price: '299',
    Delivery_Distance_km: '6.5',
    Weather_Condition: 'Clear',
    Time_of_Day_Peak: 'Off-Peak',
    Product_Category: 'Regular Grocery'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:5000/optimal_price', form);
      setResult(res.data);
    } catch (err) {
      alert("Backend not running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="bg" />
      <div className="content">

        <header>
          <h1>Smart Delivery Pricing</h1>
          <p>Real-time dynamic pricing • Fair & transparent</p>
        </header>

        <div className="layout">
          {/* Left: Form */}
          <div className="form-panel">
            <h2>Enter Order Details</h2>
            <form onSubmit={handleSubmit}>
              <input name="Current_Price" placeholder="MRP (₹)" value={form.Current_Price} onChange={handleChange} required />
              <input name="Product_Weight" type="number" step="0.1" placeholder="Weight (kg)" value={form.Product_Weight} onChange={handleChange} required />
              <input name="Delivery_Distance_km" type="number" step="0.1" placeholder="Distance (km)" value={form.Delivery_Distance_km} onChange={handleChange} required />

              <div className="row">
                <select name="Weather_Condition" value={form.Weather_Condition} onChange={handleChange}>
                  <option value="Clear">Clear</option>
                  <option value="Rain">Rain</option>
                  <option value="Fog">Fog</option>
                  <option value="Heavy Snow">Storm</option>
                </select>
                <select name="Time_of_Day_Peak" value={form.Time_of_Day_Peak} onChange={handleChange}>
                  <option value="Off-Peak">Off-Peak</option>
                  <option value="Morning Peak">Morning Peak</option>
                  <option value="Dinner Peak (High Demand)">Dinner Peak</option>
                </select>
              </div>

              <select name="Product_Category" value={form.Product_Category} onChange={handleChange} className="full">
                <option value="Regular Grocery">Regular Grocery</option>
                <option value="Fresh Produce">Fruits & Vegetables</option>
                <option value="Baby Care">Baby Care / Formula</option>
                <option value="Health & Wellness">Protein & Supplements</option>
                <option value="Imported & Premium">Imported & Gourmet</option>
                <option value="Electronics">Electronics & Gadgets</option>
              </select>

              <button type="submit" disabled={loading}>
                {loading ? "Calculating..." : "Get Price"}
              </button>
            </form>
          </div>

          {/* Right: Result */}
          <div className="result-panel">
            {result ? (
              <div className="result">
                <div className="price">₹{result.optimal_mrp}</div>
                <p>Recommended Price</p>

                <div className="info">
                  <div className="original">
                    Original: <span>₹{result.current_price}</span>
                  </div>
                  <div className="surge">+{result.surcharge_info.total_surcharge}</div>
                </div>

                <div className="breakdown">
                  <div className="item">Weather: {result.surcharge_info.weather_surcharge}</div>
                  <div className="item">Peak Time: {result.surcharge_info.peak_time_surcharge}</div>
                  <div className="item">Weight: {result.surcharge_info.weight_effect}</div>
                  <div className="item">Distance: {result.surcharge_info.distance_effect}</div>
                  <div className="item">Category: {result.surcharge_info.category_boost}</div>
                </div>

                <div className="footer">AI-Powered • Real-time • Fair Pricing</div>
              </div>
            ) : (
              <div className="placeholder">
                <div className="icon">Package</div>
                <p>Enter details to see dynamic price</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;