// pages/api/microservice.js

export default async function handler(req, res) {
    try {
      const response = await fetch('http://my-microservice.services.local');
      const data = await response.json();
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json({ error: 'MS call failed' });
    }
  }
  