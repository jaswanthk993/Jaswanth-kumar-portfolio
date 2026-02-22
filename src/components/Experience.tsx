import { CalendarDays, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

/* ── Types ──────────────────────────────────────────────────────────── */
interface ExperienceProps {
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies?: string[];
}

/* ── Data ───────────────────────────────────────────────────────────── */
const experienceData: ExperienceProps[] = [
  {
    title: "Contributor",
    company: "GirlScript Summer of Code",
    duration: "July 2025 - August 2025 (2 months)",
    description: "Contributing to open-source projects as part of the GirlScript Summer of Code program, collaborating with developers worldwide on impactful tech solutions.",
    technologies: ["Open Source", "Git", "GitHub", "Collaboration"],
  },
  {
    title: "Google Cloud GenAI Internship",
    company: "SmartInternz",
    duration: "January 2025 - March 2025 (3 months)",
    description: "Completed an intensive internship focused on Google Cloud's Generative AI capabilities, building real-world AI applications using Gemini and cloud-native technologies.",
    technologies: ["Google Cloud", "Gemini AI", "GenAI", "Cloud Run"],
  },
  {
    title: "Cloud Intern",
    company: "ExcelR",
    duration: "June 2024 - July 2024 (2 months)",
    description: "Virtual internship focused on cloud computing technologies, gaining hands-on experience in Azure. Assisted in deploying cloud infrastructure and optimizing automation processes for real-world applications.",
    technologies: ["Azure", "Cloud Infrastructure", "Automation"],
  },
  {
    title: "Microsoft Business Intelligence / Power BI",
    company: "Pantechelearning",
    duration: "June 2024 - July 2024 (2 months)",
    description: "Completed training in Microsoft Business Intelligence tools and Power BI, developing skills in data visualization, reporting, and business analytics.",
    technologies: ["Power BI", "Business Intelligence", "Data Analytics", "Reporting"],
  },
  {
    title: "EV Design using MATLAB",
    company: "Pantechelearning",
    duration: "May 2024 - June 2024 (2 months)",
    description: "Participated in a specialized internship focused on electric vehicle design using MATLAB. Developed simulation models and optimization algorithms for EV components.",
    technologies: ["MATLAB", "EV Design", "Simulation"],
  },
  {
    title: "Cloud Intern",
    company: "Edunet Foundation",
    duration: "February 2024 - March 2024 (2 months)",
    description: "Focused on implementing cloud-native applications and learning cloud security best practices. Engaged in hands-on labs using Azure and AWS to develop scalable cloud-based solutions.",
    technologies: ["Azure", "AWS", "Cloud Security"],
  },
  {
    title: "Future Ready Talent Internship",
    company: "Microsoft",
    duration: "November 2023 - January 2024 (3 months)",
    description: "Virtual internship program providing opportunity to learn in-demand technology skills for solving real-world problems using Microsoft Azure & GitHub tools.",
    technologies: ["Microsoft Azure", "GitHub", "Industry Skills"],
  },
  {
    title: "Cloud Trainee",
    company: "Techwing",
    duration: "August 2023 - October 2023 (3 months)",
    description: "Underwent comprehensive cloud training program covering major cloud platforms and services. Participated in hands-on projects to implement cloud infrastructure and solutions.",
    technologies: ["Cloud Services", "Infrastructure", "DevOps"],
  },
  {
    title: "Full-stack Developer",
    company: "Pantechelearning",
    duration: "July 2023 - September 2023 (3 months)",
    description: "Developed full-stack web applications using modern JavaScript frameworks. Collaborated with team members to design, implement and deploy web solutions for clients.",
    technologies: ["JavaScript", "React", "Node.js", "MongoDB"],
  },
  {
    title: "Artificial Intelligence Intern",
    company: "Edunet Foundation",
    duration: "June 2023 - July 2023 (2 months)",
    description: "Gained practical experience in AI and IBM skills. Applied skills and knowledge to create positive impact in the field.",
    technologies: ["AI", "Machine Learning", "IBM Watson"],
  },
  {
    title: "Python Developer Intern",
    company: "Linta Technologies Private Limited",
    duration: "May 2023 - June 2023 (2 months)",
    description: "Gained valuable experience in Python development and worked on various projects. Collaborated with experienced developers to design and implement Python-based solutions.",
    technologies: ["Python", "APIs", "Software Development"],
  },
];

/* ── Shared spring ──────────────────────────────────────────────────── */
const spring = { type: "spring" as const, stiffness: 50, damping: 20 };

/* ── Experience Item ────────────────────────────────────────────────── */
const ExperienceItem = ({ item, index }: { item: ExperienceProps; index: number }) => {
  const isLast = index === experienceData.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ ...spring, delay: index * 0.08 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`flex gap-4 ${!isLast ? "pb-8" : ""}`}
    >
      {/* Timeline dot + line */}
      <div className="relative flex-none">
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary"
          whileHover={{ scale: 1.2, backgroundColor: "hsl(175 80% 45%)", color: "#fff" }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Briefcase size={20} />
        </motion.div>
        {/* Animated vertical connector line */}
        {!isLast && (
          <motion.div
            className="absolute top-10 bottom-0 left-1/2 w-0.5 -translate-x-1/2"
            style={{ background: "linear-gradient(180deg, hsl(175 80% 45% / 0.3), hsl(175 80% 45% / 0.05))" }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ ...spring, delay: 0.2 + index * 0.08 }}
            viewport={{ once: true }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-medium">{item.title}</h3>
        <div className="flex flex-wrap items-center gap-x-3 text-sm text-foreground/70 mb-2">
          <span className="font-medium">{item.company}</span>
          <span>•</span>
          <span>{item.duration}</span>
        </div>
        <p className="text-foreground/80 mb-3">{item.description}</p>

        {item.technologies && (
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech, ti) => (
              <motion.span
                key={ti}
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: ti * 0.04 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, backgroundColor: "hsl(175 80% 45% / 0.3)" }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ── Main Component ─────────────────────────────────────────────────── */
const Experience = () => {
  return (
    <section id="experience" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={spring}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl mb-4 font-bold">Experience</h2>
          <motion.div
            className="w-32 h-1 bg-primary mx-auto mb-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ ...spring, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-foreground/70 max-w-2xl mx-auto">A timeline of my professional experience background.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {experienceData.map((item, index) => (
            <ExperienceItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;