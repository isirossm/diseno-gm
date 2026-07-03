const localtunnel = require('localtunnel');

(async () => {
  try {
    console.log("Connecting to localtunnel...");
    const tunnel = await localtunnel({ port: 5000 });
    console.log("TUNNEL_URL=" + tunnel.url);
    
    tunnel.on('close', () => {
      console.log("Tunnel closed");
    });
  } catch (err) {
    console.error("Tunnel error:", err);
  }
})();
