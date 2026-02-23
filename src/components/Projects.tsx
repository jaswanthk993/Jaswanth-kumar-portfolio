import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

/* ── Types ──────────────────────────────────────────────────────────── */
interface ProjectProps {
  title: string;
  description: string;
  image: string;
  projectLink: string;
  technologies: string[];
  category: "all" | "web" | "ai" | "cloud";
}

/* ── Data ───────────────────────────────────────────────────────────── */
const projectsData: ProjectProps[] = [
  {
    title: "Jaswanth Kumar Portfolio",
    description: "A premium, high-performance portfolio featuring immersive AI-inspired animations, glassmorphic UI, and smooth scrollytelling experiences.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://github.com/jaswanthk993",
    technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion", "GSAP"],
    category: "web",
  },
  {
    title: "AI Compliance Copilot",
    description: "An intelligent compliance assistant that reads and analyzes policy documents, flags risks and violations, and helps teams stay compliant while building faster.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://github.com/jaswanthk993/Compliance-Ai",
    technologies: ["Google Cloud", "Gemini AI", "React", "TypeScript", "LangChain"],
    category: "ai",
  },
  {
    title: "Agentic Intelligence Engine",
    description: "A scalable multi-agent system built with ADK and MCP Toolbox, orchestrating tools, databases, and AI workflows in real time.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/multi-agent-app-toolbox-adk",
    technologies: ["ADK", "MCP Toolbox", "Gemini", "Node.js", "Real-time"],
    category: "ai",
  },
  {
    title: "Zero Trust AI Vault",
    description: "A secure AI platform leveraging AlloyDB Row-Level Security to enforce fine-grained access control in agent-driven systems.",
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/zero-trust-agents-with-alloydb",
    technologies: ["AlloyDB", "Zero Trust", "Security", "AI Agents", "Google Cloud"],
    category: "ai",
  },
  {
    title: "VectorScale Embedding Pipeline",
    description: "A high-performance embedding generation system processing 1M+ vectors using AlloyDB and advanced vector search.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/embeddings-at-scale-with-alloydb",
    technologies: ["AlloyDB", "Vector Search", "Embeddings", "Python", "Data Engineering"],
    category: "ai",
  },
  {
    title: "Real-Time Surplus Optimization Engine",
    description: "An AI-powered sustainability system using Gemini 1.5 Flash and AlloyDB to analyze and optimize surplus data streams.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/gemini-3-flash-on-alloydb-sustainability-app",
    technologies: ["Gemini 1.5 Flash", "AlloyDB", "Sustainability", "Analytics", "Cloud Run"],
    category: "ai",
  },
  {
    title: "Serverless AI Commerce Platform",
    description: "A full-stack e-commerce application deployed serverlessly on Cloud Run with AlloyDB-backed intelligent workflows.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/search-app-with-geminicli",
    technologies: ["Cloud Run", "AlloyDB", "Serverless", "React", "Node.js"],
    category: "ai",
  },
  {
    title: "Multi-Agent Kitchen Renovation System",
    description: "An end-to-end ADK-powered multi-agent application integrating AlloyDB and multiple tools for dynamic task orchestration.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/multi-agent-app-with-adk",
    technologies: ["ADK", "AlloyDB", "Multi-Agent", "Task Orchestration", "Python"],
    category: "ai",
  },
  {
    title: "Patent Intelligence Analyzer",
    description: "An AI-driven patent analysis agent using vector search and AlloyDB for large-scale semantic document evaluation.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/patent-search-java-adk",
    technologies: ["Vector Search", "AlloyDB", "Semantic Analysis", "NLP", "Python"],
    category: "ai",
  },
  {
    title: "TravelGen AI Planner",
    description: "A cloud-native travel agent built with ADK and MCP Toolbox, integrating Cloud SQL for intelligent itinerary generation.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/travel-agent-mcp-toolbox-adk",
    technologies: ["ADK", "MCP Toolbox", "Cloud SQL", "Itinerary Gen", "React"],
    category: "ai",
  },
  {
    title: "MCP Data Orchestration Hub",
    description: "A secure MCP server deployed on Cloud Run enabling structured database tool access across AI agents.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/mcp-toolbox-bigquery-dataset",
    technologies: ["MCP", "Cloud Run", "Data Hub", "API", "Security"],
    category: "ai",
  },
  {
    title: "Postgres AI Cloud App",
    description: "A Postgres-compatible AI application built on Google Cloud with AlloyDB and Cloud Run for scalable deployments.",
    image: "https://images.unsplash.com/photo-1544383335-cdd80277329d?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/quick-alloydb-setup",
    technologies: ["Postgres", "AlloyDB", "Cloud Run", "Google Cloud", "Scalable"],
    category: "ai",
  },
  {
    title: "Serverless E-Commerce Application on Cloud Run",
    description: "Built and deployed a full-stack e-commerce application using AlloyDB and Cloud Run with automatic scaling and managed infrastructure.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/gemini-cli-hands-on",
    technologies: ["Cloud Run", "AlloyDB", "IAM", "VPC", "Gemini CLI"],
    category: "cloud",
  },
  {
    title: "Secure MCP Server Deployment on Cloud Run",
    description: "Deployed a production-ready MCP server on Cloud Run with secure database tool access and authentication controls.",
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/codelabs/cloud-run/how-to-deploy-a-secure-mcp-server-on-cloud-run",
    technologies: ["Cloud Run", "MCP Server", "IAM", "AlloyDB"],
    category: "cloud",
  },
  {
    title: "AlloyDB Postgres-Compatible AI Application",
    description: "Configured AlloyDB and built a Postgres-compatible application deployed on Cloud Run with managed connectivity.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/connect-to-alloydb-on-cloudrun",
    technologies: ["AlloyDB", "Cloud Run", "Cloud IAM"],
    category: "cloud",
  },
  {
    title: "Cloud SQL Application Deployment",
    description: "Provisioned Cloud SQL and deployed an application on Cloud Run with secure service-to-database connectivity.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/connect-to-cloudsql-on-cloudrun",
    technologies: ["Cloud SQL", "Cloud Run", "IAM", "Service Accounts"],
    category: "cloud",
  },
  {
    title: "Large-Scale Embedding Storage with AlloyDB",
    description: "Implemented scalable vector storage and indexing in AlloyDB handling over one million embeddings efficiently.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/embeddings-at-scale-with-alloydb",
    technologies: ["AlloyDB", "Vector Indexing", "Managed Storage"],
    category: "cloud",
  },
  {
    title: "Zero Trust Row-Level Security Implementation",
    description: "Configured fine-grained row-level security policies in AlloyDB to enforce least-privilege data access in cloud-native systems.",
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/zero-trust-agents-with-alloydb",
    technologies: ["AlloyDB RLS", "IAM", "Cloud Run"],
    category: "cloud",
  },
  {
    title: "BigQuery Agentic Data Access via MCP",
    description: "Integrated BigQuery with an MCP client enabling structured tool-based query execution in a managed cloud environment.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/mcp-toolbox-bigquery-dataset",
    technologies: ["BigQuery", "MCP Toolbox", "Cloud Run"],
    category: "cloud",
  },
  {
    title: "Cloud Run Jobs for Multimodal Data Processing",
    description: "Built scheduled Cloud Run Jobs to process and prepare multimodal datasets for analytics workflows.",
    image: "https://images.unsplash.com/photo-1544383335-cdd80277329d?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://codelabs.developers.google.com/video-insights-with-cloud-run-jobs",
    technologies: ["Cloud Run Jobs", "Storage", "IAM"],
    category: "cloud",
  },
  {
    title: "Static Website Deployment",
    description: "Hosted a responsive static website on AWS S3 with CloudFront for fast and secure content delivery.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://github.com/jaswanthk993/future-ready-talent-project",
    technologies: ["AWS S3", "CloudFront", "Route 53", "HTML", "CSS", "JavaScript"],
    category: "web",
  },
  {
    title: "Cloud-Based Mental Fitness Tracker",
    description: "Built an AI-powered mental wellness tracker using Azure Cognitive Services for sentiment analysis.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://github.com/jaswanthk993/Mental-fitness-tracker-with-IBM",
    technologies: ["Azure Cognitive Services", "Azure App Services", "Python", "Flask"],
    category: "ai",
  },
  {
    title: "Stock Price Prediction using Cloud AI",
    description: "Developed a machine learning model on Google Cloud AI to predict stock prices in real-time.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://github.com/jaswanthk993/stock-prediction",
    technologies: ["Google Cloud AI", "Vertex AI", "Python", "Flask", "Cloud Storage"],
    category: "cloud",
  },
  {
    title: "AI-Driven Custom Home Design Assistant",
    description: "Developed an intelligent home design assistant that provides personalized design recommendations using AI algorithms.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://github.com/jaswanthk993/ai-driven-custom-home-design-assistant",
    technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
    category: "ai",
  },
  {
    title: "AI-Powered PDF Knowledge Assistant",
    description: "Created an intelligent PDF processing system using Google PaLM for document analysis and knowledge extraction.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://github.com/jaswanthk993/ai-powered-pdf-knowledge-assistant-using-google-palm-",
    technologies: ["Google PaLM", "Python", "FastAPI", "React", "LangChain"],
    category: "ai",
  },
  {
    title: "Energy Demand Forecasting using ARIMA",
    description: "Developed a time-series model to predict energy load. Trained ARIMA model with Pandas and statsmodels to forecast energy load accurately.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    projectLink: "https://github.com/jaswanthk993/energy-demand-forecasting-arima",
    technologies: ["Python", "ARIMA", "Pandas", "statsmodels", "Matplotlib", "Time Series"],
    category: "ai",
  },
];

/* ── Shared spring ──────────────────────────────────────────────────── */
const spring = { type: "spring" as const, stiffness: 50, damping: 20 };

/* ── 3D Tilt Card ───────────────────────────────────────────────────── */
const ProjectCard = ({ project }: { project: ProjectProps }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.02,1.02,1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.4s cubic-bezier(.03,.98,.52,.99)", willChange: "transform" }}
    >
      <Card className="h-full overflow-hidden transition-all duration-500 bg-gray-900/50 backdrop-blur-md border border-gray-800 hover:border-primary hover:shadow-[0_0_20px_rgba(34,113,255,0.4),0_0_40px_rgba(34,113,255,0.2)] group relative">
        <div className="aspect-video w-full overflow-hidden relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent transition-opacity duration-300 group-hover:opacity-50" />
        </div>
        <CardHeader>
          <CardTitle className="text-xl text-white">{project.title}</CardTitle>
          <CardDescription className="text-gray-400">{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.04 }}
                viewport={{ once: true }}
                className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800/80 text-gray-300 border border-gray-700 transition-all hover:bg-primary hover:text-white hover:border-primary"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button variant="outline" size="sm" asChild className="border-gray-700 text-gray-300 hover:border-primary hover:text-primary hover:bg-primary/10">
            <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              {project.projectLink.includes("github.com") ? <Github size={16} /> : <ExternalLink size={16} />}
              <span>{project.projectLink.includes("github.com") ? "Code" : "View Lab"}</span>
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

/* ── Main Component ─────────────────────────────────────────────────── */
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "web" | "ai" | "cloud">("all");

  const filteredProjects = projectsData.filter(p => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="py-24 bg-black relative isolate">
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-600">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto mb-6 rounded-full" />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A comprehensive showcase of my expertise in AI Agents, Cloud Architecture, and Full-Stack Development.
          </p>
        </motion.div>

        {/* Filter buttons — Simplified for reliability */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {(["all", "web", "ai", "cloud"] as const).map((val) => (
            <button
              key={val}
              onClick={() => setActiveFilter(val)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeFilter === val
                ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(34,113,255,0.4)]"
                : "bg-gray-900/50 text-gray-400 border-gray-800 hover:border-gray-700 hover:text-gray-200"
                }`}
            >
              {val === "ai" ? "AI/ML" : val.charAt(0).toUpperCase() + val.slice(1)}
            </button>
          ))}
        </div>

        {/* Cards grid — removed 'hidden' initial state to ensure visibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => (
              <motion.div
                key={`${project.title}-${activeFilter}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500 border border-dashed border-gray-800 rounded-2xl">
              No projects found in this category.
            </div>
          )}
        </div>

        {/* GitHub link */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Button variant="outline" size="lg" asChild className="border-gray-800 hover:border-primary hover:text-primary bg-gray-900/20 backdrop-blur-sm">
            <a href="https://github.com/jaswanthk993" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Github size={20} />
              <span>Explore More on GitHub</span>
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;