import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ── Types ──────────────────────────────────────────────────────────── */
interface ProjectProps {
  title: string;
  description: string;
  image: string;
  githubLink: string;
  technologies: string[];
  category: "all" | "web" | "ai" | "cloud";
}

/* ── Data ───────────────────────────────────────────────────────────── */
const projectsData: ProjectProps[] = [
  {
    title: "AI Compliance Copilot",
    description: "An intelligent compliance assistant that reads and analyzes policy documents, flags risks and violations, and helps teams stay compliant while building faster.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    githubLink: "https://github.com/jaswanthk993/ai-compliance-copilot",
    technologies: ["Google Cloud", "Gemini AI", "React", "TypeScript", "LangChain"],
    category: "ai",
  },
  {
    title: "Static Website Deployment",
    description: "Hosted a responsive static website on AWS S3 with CloudFront for fast and secure content delivery.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    demoLink: "https://example.com",
    githubLink: "https://github.com/jaswanthk993/future-ready-talent-project",
    technologies: ["AWS S3", "CloudFront", "Route 53", "HTML", "CSS", "JavaScript"],
    category: "web",
  },
  {
    title: "Cloud-Based Mental Fitness Tracker",
    description: "Built an AI-powered mental wellness tracker using Azure Cognitive Services for sentiment analysis.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    demoLink: "https://example.com",
    githubLink: "https://github.com/jaswanthk993/Mental-fitness-tracker-with-IBM",
    technologies: ["Azure Cognitive Services", "Azure App Services", "Python", "Flask"],
    category: "ai",
  },
  {
    title: "Stock Price Prediction using Cloud AI",
    description: "Developed a machine learning model on Google Cloud AI to predict stock prices in real-time.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    demoLink: "https://example.com",
    githubLink: "https://github.com/jaswanthk993/stock-prediction",
    technologies: ["Google Cloud AI", "Vertex AI", "Python", "Flask", "Cloud Storage"],
    category: "cloud",
  },
  {
    title: "AI-Driven Custom Home Design Assistant",
    description: "Developed an intelligent home design assistant that provides personalized design recommendations using AI algorithms.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80",
    demoLink: "https://example.com",
    githubLink: "https://github.com/jaswanthk993/ai-driven-custom-home-design-assistant",
    technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
    category: "ai",
  },
  {
    title: "AI-Powered PDF Knowledge Assistant",
    description: "Created an intelligent PDF processing system using Google PaLM for document analysis and knowledge extraction.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
    demoLink: "https://example.com",
    githubLink: "https://github.com/jaswanthk993/ai-powered-pdf-knowledge-assistant-using-google-palm",
    technologies: ["Google PaLM", "Python", "FastAPI", "React", "LangChain"],
    category: "ai",
  },
  {
    title: "Energy Demand Forecasting using ARIMA",
    description: "Developed a time-series model to predict energy load. Trained ARIMA model with Pandas and statsmodels to forecast energy load accurately.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    githubLink: "https://github.com/jaswanthk993/energy-demand-forecasting-arima",
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
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <Github size={16} />
              <span>Code</span>
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
  const filteredProjects = activeFilter === "all" ? projectsData : projectsData.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding bg-black">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={spring}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sky-700">My Projects</h2>
          <motion.div
            className="w-32 h-1 bg-[#2271FF] mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ ...spring, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of my recent development work, showcasing skills in cloud computing, AI, and full-stack development.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex justify-center mb-10">
          <Tabs defaultValue="all" className="w-full max-w-md">
            <TabsList className="grid grid-cols-4 w-full bg-gray-900/50 border border-gray-800">
              {(["all", "web", "ai", "cloud"] as const).map(val => (
                <TabsTrigger
                  key={val}
                  value={val}
                  onClick={() => setActiveFilter(val)}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-gray-400"
                >
                  {val === "ai" ? "AI/ML" : val.charAt(0).toUpperCase() + val.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Cards grid — staggered cascade */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.title + activeFilter}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: spring },
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button variant="outline" size="lg" asChild className="border-gray-200 hover:border-[#2271FF] hover:text-[#2271FF]">
            <a href="https://github.com/jaswanthk993" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Github size={18} />
              <span>View More on GitHub</span>
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;