import React, { useMemo } from 'react';
import { motion as Motion } from 'framer-motion';
import { 
  ArrowRight,
  User,
  Database,
  Shield,
  Globe,
  Code,
  Server,
  Cloud,
  Smartphone,
  Monitor,
  Zap,
  Cpu,
  HardDrive,
  Layers,
  Lock,
  Wifi
} from 'lucide-react';

// Parse a Mermaid "graph TD" or "graph LR" block into nodes and edges
function parseMermaid(mermaidCode) {
  const nodes = new Map();
  const edges = [];

  if (!mermaidCode) return { nodes: [], edges: [] };

  const lines = mermaidCode.split('\n').map(l => l.trim()).filter(Boolean);

  const prettify = (str) => {
    if (!str) return str;
    // Handle camelCase, kebab-case, and underscores
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/[_\-]/g, ' ')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  for (const line of lines) {
    if (line.startsWith('graph') || line.startsWith('%%') || line.startsWith('subgraph') || line === 'end' || line.startsWith('style') || line.startsWith('classDef') || line.startsWith('class')) continue;

    // Match edge: A["Label"] -->|text| B["Label"] or A(Label) --- B{Label} etc.
    const edgeMatch = line.match(
      /([A-Za-z0-9_\-]+)(?:[\(\[\{]+["']?(.+?)["']?[\)\]\}]+)?\s*[-=]+[->]*\s*(?:\|(.+?)\|\s*)?([A-Za-z0-9_\-]+)(?:[\(\[\{]+["']?(.+?)["']?[\)\]\}]+)?/
    );

    if (edgeMatch) {
      const [, srcId, srcLabel, edgeLabel, tgtId, tgtLabel] = edgeMatch;
      
      if (!nodes.has(srcId)) {
        nodes.set(srcId, { id: srcId, label: srcLabel || prettify(srcId) });
      } else if (srcLabel) {
        nodes.get(srcId).label = srcLabel;
      }

      if (!nodes.has(tgtId)) {
        nodes.set(tgtId, { id: tgtId, label: tgtLabel || prettify(tgtId) });
      } else if (tgtLabel) {
        nodes.get(tgtId).label = tgtLabel;
      }

      edges.push({ from: srcId, to: tgtId, label: edgeLabel || '' });
    } else {
      // Standalone node definition: A["Label"] or A(Label) or A{Label}
      const nodeMatch = line.match(/([A-Za-z0-9_\-]+)[\(\[\{]+["']?(.+?)["']?[\)\]\}]+/);
      if (nodeMatch) {
        const [, id, label] = nodeMatch;
        if (!nodes.has(id)) {
          nodes.set(id, { id, label });
        } else {
          nodes.get(id).label = label;
        }
      } else if (line.match(/^[A-Za-z0-9_\-]+$/)) {
        // Just a single ID on a line
        const id = line.trim();
        if (!nodes.has(id)) {
          nodes.set(id, { id, label: prettify(id) });
        }
      }
    }
  }

  return { nodes: [...nodes.values()], edges };
}

// Guess an icon and color based on node label
function getNodeStyle(label) {
  const l = label.toLowerCase();
  if (l.includes('user') || l.includes('client') || l.includes('mobile') || l.includes('app'))
    return { icon: <Smartphone className="w-5 h-5" />, color: 'from-blue-500 to-indigo-600' };
  if (l.includes('auth') || l.includes('login') || l.includes('security'))
    return { icon: <Shield className="w-5 h-5" />, color: 'from-emerald-500 to-green-600' };
  if (l.includes('db') || l.includes('database') || l.includes('mongo') || l.includes('postgres') || l.includes('sql') || l.includes('firebase') || l.includes('supabase'))
    return { icon: <Database className="w-5 h-5" />, color: 'from-purple-500 to-pink-600' };
  if (l.includes('api') || l.includes('gateway') || l.includes('endpoint') || l.includes('rest') || l.includes('graphql'))
    return { icon: <Code className="w-5 h-5" />, color: 'from-orange-500 to-red-500' };
  if (l.includes('server') || l.includes('backend') || l.includes('service') || l.includes('engine'))
    return { icon: <Server className="w-5 h-5" />, color: 'from-cyan-500 to-blue-600' };
  if (l.includes('cloud') || l.includes('cdn') || l.includes('aws') || l.includes('deploy'))
    return { icon: <Cloud className="w-5 h-5" />, color: 'from-indigo-500 to-purple-600' };
  if (l.includes('web') || l.includes('frontend') || l.includes('react') || l.includes('ui'))
    return { icon: <Monitor className="w-5 h-5" />, color: 'from-teal-500 to-cyan-600' };
  if (l.includes('ai') || l.includes('ml') || l.includes('model') || l.includes('llm') || l.includes('analysis'))
    return { icon: <Cpu className="w-5 h-5" />, color: 'from-violet-500 to-purple-600' };
  if (l.includes('cache') || l.includes('redis') || l.includes('queue'))
    return { icon: <HardDrive className="w-5 h-5" />, color: 'from-amber-500 to-orange-600' };
  if (l.includes('state') || l.includes('sync') || l.includes('layer'))
    return { icon: <Layers className="w-5 h-5" />, color: 'from-rose-500 to-pink-600' };
  if (l.includes('socket') || l.includes('realtime') || l.includes('stream'))
    return { icon: <Wifi className="w-5 h-5" />, color: 'from-green-500 to-emerald-600' };
  if (l.includes('lock') || l.includes('encrypt') || l.includes('token'))
    return { icon: <Lock className="w-5 h-5" />, color: 'from-red-500 to-rose-600' };
  return { icon: <Zap className="w-5 h-5" />, color: 'from-gray-500 to-slate-600' };
}

const FlowDiagram = ({ projectData }) => {
  // Extract Mermaid code from the blueprint markdown
  const { nodes, edges } = useMemo(() => {
    if (!projectData?.blueprint) return { nodes: [], edges: [] };
    
    const mermaidMatch = projectData.blueprint.match(/```mermaid\s*([\s\S]*?)```/);
    if (mermaidMatch) {
      return parseMermaid(mermaidMatch[1]);
    }
    return { nodes: [], edges: [] };
  }, [projectData?.blueprint]);

  // Build adjacency for grouping into rows (BFS-style top-sort)
  const rows = useMemo(() => {
    if (nodes.length === 0) return [];
    
    // Simple: if few nodes, just show them in a single horizontal row
    if (nodes.length <= 6) return [nodes];

    // Otherwise split into rows of ~4
    const result = [];
    for (let i = 0; i < nodes.length; i += 4) {
      result.push(nodes.slice(i, i + 4));
    }
    return result;
  }, [nodes]);

  // Fallback: build a flow from tech stack + features if no Mermaid found
  const fallbackNodes = useMemo(() => {
    if (nodes.length > 0) return [];
    if (!projectData) return [];

    const fb = [];
    // Use tech stack to build a basic architecture flow
    if (projectData.techStack?.length) {
      fb.push({ id: 'user', label: 'User / Client' });
      
      const frontend = projectData.techStack.find(t => /react|vue|angular|next|flutter|swift/i.test(t));
      if (frontend) fb.push({ id: 'frontend', label: `Frontend (${frontend})` });
      
      const backend = projectData.techStack.find(t => /node|express|fastapi|django|flask|spring|go/i.test(t));
      if (backend) fb.push({ id: 'backend', label: `Backend (${backend})` });
      
      const ai = projectData.techStack.find(t => /tensorflow|pytorch|openai|llm|ai|ml|groq|gemini/i.test(t));
      if (ai) fb.push({ id: 'ai', label: `AI Engine (${ai})` });

      const db = projectData.techStack.find(t => /mongo|postgres|mysql|firebase|supabase|dynamo|redis/i.test(t));
      if (db) fb.push({ id: 'db', label: `Database (${db})` });
      
      const cloud = projectData.techStack.find(t => /aws|gcp|azure|vercel|netlify|docker/i.test(t));
      if (cloud) fb.push({ id: 'cloud', label: `Deploy (${cloud})` });
    }

    return fb.length > 1 ? fb : [];
  }, [nodes, projectData]);

  const displayNodes = nodes.length > 0 ? nodes : fallbackNodes;

  if (!displayNodes.length) {
    return (
      <div className="bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-3xl p-12 text-center shadow-lg">
        <Globe className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No architecture diagram available for this blueprint.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-600 px-8 py-5 flex items-center gap-3">
        <Globe className="w-6 h-6 text-white" />
        <h3 className="text-xl font-black text-white uppercase tracking-wider">System Architecture</h3>
      </div>

      {/* Flow Diagram — Horizontal */}
      <div className="p-8 overflow-x-auto">
        {rows.length > 0 ? (
          // Mermaid-parsed rows
          rows.map((row, rowIdx) => (
            <div key={rowIdx} className="flex items-center justify-center gap-4 mb-6 last:mb-0 flex-wrap lg:flex-nowrap">
              {row.map((node, idx) => {
                const style = getNodeStyle(node.label);
                return (
                  <React.Fragment key={node.id}>
                    <Motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (rowIdx * row.length + idx) * 0.08 }}
                      className="flex-shrink-0"
                    >
                      <div className={`w-40 h-28 bg-gradient-to-br ${style.color} rounded-2xl flex flex-col items-center justify-center text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-3`}>
                        <div className="mb-2">{style.icon}</div>
                        <div className="text-[11px] font-bold text-center leading-tight px-1 line-clamp-2">
                          {node.label}
                        </div>
                      </div>
                    </Motion.div>
                    {idx < row.length - 1 && (
                      <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: (rowIdx * row.length + idx) * 0.08 + 0.05 }}
                        className="flex-shrink-0"
                      >
                        <ArrowRight className="w-6 h-6 text-indigo-400 dark:text-indigo-500" />
                      </Motion.div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          ))
        ) : (
          // Fallback horizontal flow
          <div className="flex items-center justify-center gap-4 flex-wrap lg:flex-nowrap">
            {displayNodes.map((node, idx) => {
              const style = getNodeStyle(node.label);
              return (
                <React.Fragment key={node.id}>
                  <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex-shrink-0"
                  >
                    <div className={`w-40 h-28 bg-gradient-to-br ${style.color} rounded-2xl flex flex-col items-center justify-center text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-3`}>
                      <div className="mb-2">{style.icon}</div>
                      <div className="text-[11px] font-bold text-center leading-tight px-1 line-clamp-2">
                        {node.label}
                      </div>
                    </div>
                  </Motion.div>
                  {idx < displayNodes.length - 1 && (
                    <Motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.1 + 0.05 }}
                      className="flex-shrink-0"
                    >
                      <ArrowRight className="w-6 h-6 text-indigo-400 dark:text-indigo-500" />
                    </Motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

      {/* Edge Labels / Connections Legend */}
      {edges.length > 0 && (
        <div className="px-8 pb-6 border-t-2 border-gray-100 dark:border-slate-800 pt-6">
          <h4 className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">Connections</h4>
          <div className="flex flex-wrap gap-3">
            {edges.map((edge, idx) => {
              const fromNode = displayNodes.find(n => n.id === edge.from);
              const toNode = displayNodes.find(n => n.id === edge.to);
              return (
                <div key={idx} className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2 text-xs">
                  <span className="font-bold text-gray-700 dark:text-gray-300">{fromNode?.label || edge.from}</span>
                  <ArrowRight className="w-4 h-4 text-indigo-500" />
                  <span className="font-bold text-gray-700 dark:text-gray-300">{toNode?.label || edge.to}</span>
                  {edge.label && <span className="text-gray-400 ml-1">({edge.label})</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowDiagram;
