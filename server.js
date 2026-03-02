const express = require('express');
const path = require('path');
const app = express();
const PORT = 3333;

const publicPath = path.join(__dirname, 'public');
console.log('Serving static files from:', publicPath);
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// 模拟演讲数据
const talks = [
  {
    id: 1,
    time: "10:00 AM - 11:00 AM",
    title: "Scaling LLMs: From Research to Production",
    speakers: ["Dr. Sarah Chen", "Alex Rivera"],
    categories: ["AI", "Infrastructure"],
    description: "Deep dive into the challenges of deploying large language models at scale and optimizing inference latency."
  },
  {
    id: 2,
    time: "11:10 AM - 12:10 PM",
    title: "The Future of WebAssembly: Beyond the Browser",
    speakers: ["Marcus Thorne"],
    categories: ["WebDev", "Wasm"],
    description: "Exploring how WebAssembly is revolutionizing server-side compute and edge computing paradigms."
  },
  {
    id: 3,
    time: "12:20 PM - 01:20 PM",
    title: "Zero Trust Architecture in Cloud Native Apps",
    speakers: ["Elena Rodriguez"],
    categories: ["Security", "Cloud"],
    description: "Implementing granular security policies in Kubernetes environments using service mesh technologies."
  },
  {
    id: "lunch",
    time: "01:20 PM - 02:20 PM",
    title: "🍱 Networking Lunch Break",
    isBreak: true,
    description: "Buffet lunch provided in the main hall. Great time for networking!"
  },
  {
    id: 4,
    time: "02:20 PM - 03:20 PM",
    title: "Rust for JS Developers: Bridging the Gap",
    speakers: ["James Wu"],
    categories: ["WebDev", "Rust"],
    description: "Why and how JavaScript developers are adopting Rust to build high-performance tooling."
  },
  {
    id: 5,
    time: "03:30 PM - 04:30 PM",
    title: "Real-time Data Processing with Apache Flink",
    speakers: ["Samira Khan", "Tom Baker"],
    categories: ["Data", "Backend"],
    description: "Architecting streaming pipelines that handle millions of events per second with millisecond latency."
  },
  {
    id: 6,
    time: "04:40 PM - 05:40 PM",
    title: "The Renaissance of CSS: Container Queries & Beyond",
    speakers: ["Ivy Nguyen"],
    categories: ["Frontend", "Design"],
    description: "Mastering the new wave of CSS features that are changing responsive design forever."
  }
];

app.get('/api/talks', (req, res) => {
  res.json(talks);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});