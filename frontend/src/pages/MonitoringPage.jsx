import React from 'react';

const MonitoringPage = () => {
  const publicIp = window.location.hostname; // Assumes IP is used for access

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            System Monitoring
          </h1>
          <p className="text-slate-400 mt-2">Real-time health and performance metrics (Optimized for t3.micro)</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Grafana Card */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400 text-sm">G</span>
              Grafana Dashboards
            </h2>
            <p className="text-slate-400 mb-6">
              Visual dashboards for CPU, Memory, and Application metrics.
            </p>
            <a 
              href={`http://${publicIp}/grafana`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-500 transition-colors rounded-xl font-medium text-white"
            >
              Open Grafana
            </a>
            <p className="text-xs text-slate-500 mt-4 italic">
              * Default user: admin. Use password from GitHub Actions logs.
            </p>
          </div>

          {/* Prometheus Card */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-fire-500/20 rounded-lg flex items-center justify-center text-red-400 text-sm">P</span>
              Prometheus Queries
            </h2>
            <p className="text-slate-400 mb-6">
              Query raw time-series data and inspect scraping targets.
            </p>
            <a 
              href={`http://${publicIp}/prometheus`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-red-600 hover:bg-red-500 transition-colors rounded-xl font-medium text-white"
            >
              Open Prometheus
            </a>
          </div>
        </div>

        {/* Embedded Instructions */}
        <div className="bg-slate-900/30 border border-indigo-500/20 rounded-2xl p-8">
          <h3 className="text-xl font-semibold mb-4 text-indigo-400">Monitoring Configuration</h3>
          <ul className="space-y-4 text-slate-300">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">1</span>
              <div>
                <strong>Metrics Scaping:</strong> The backend exports metrics on <code>/metrics</code>. Prometheus automatically scrapes this using a <code>ServiceMonitor</code>.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">2</span>
              <div>
                <strong>Resource Tuning:</strong> This stack is tuned for <code>t3.micro</code> limits. Alertmanager is disabled and retention is set to 24h to save memory.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">3</span>
              <div>
                <strong>Security:</strong> Monitoring endpoints are public via Ingress. For production, consider adding basic auth or VPN restrictions.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;
