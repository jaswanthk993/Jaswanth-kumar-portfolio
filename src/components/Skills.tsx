import { CheckCircle2, Code, Database, Server, Cloud, Brain, Languages, Award } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ── Types ──────────────────────────────────────────────────────────── */
interface SkillProgressProps {
  name: string;
  percentage: number;
}

/* ── Data ───────────────────────────────────────────────────────────── */
const technicalSkills: SkillProgressProps[] = [
  { name: "Gemini CLI", percentage: 90 },
  { name: "Google Cloud Run", percentage: 88 },
  { name: "Alloy DB", percentage: 85 },
  { name: "Cloud Computing (AWS, Azure, GCP)", percentage: 90 },
  { name: "Python", percentage: 85 },
  { name: "Artificial Intelligence", percentage: 80 },
  { name: "Machine Learning", percentage: 75 },
  { name: "Git & GitHub", percentage: 85 },
  { name: "HTML/CSS/JavaScript", percentage: 80 },
  { name: "Flask", percentage: 75 },
  { name: "DevOps", percentage: 70 },
];

const softSkills: SkillProgressProps[] = [
  { name: "Problem Solving", percentage: 90 },
  { name: "Communication", percentage: 85 },
  { name: "Time Management", percentage: 80 },
  { name: "Logic Building", percentage: 85 },
  { name: "Leadership", percentage: 80 },
];

const languages = [
  "Hindi (Professional Working)",
  "Telugu (Native or Bilingual)",
  "English (Professional Working)",
];
const certifications = [
  "Investment Banking",
  "Email Writing",
  "Time Management",
  "Enterprise Design Thinking Practitioner",
  "Getting Started with Enterprise Data Science",
];
const otherSkills = [
  "Problem Solving", "Leadership", "Communication",
  "Logic Building", "Git & GitHub", "MATLAB", "Teamwork",
];

/* ── Shared spring ──────────────────────────────────────────────────── */
const spring = { type: "spring" as const, stiffness: 50, damping: 20 };

/* ── Animated Progress Bar ──────────────────────────────────────────── */
const AnimatedBar = ({ skill, index }: { skill: SkillProgressProps; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: index * 0.06 }}
      viewport={{ once: true }}
      className="mb-6 last:mb-0 group"
    >
      <div className="flex justify-between mb-2">
        <h3 className="font-medium group-hover:text-primary transition-colors duration-300">{skill.name}</h3>
        <motion.span
          className="font-medium text-primary tabular-nums"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 + index * 0.06 }}
        >
          {skill.percentage}%
        </motion.span>
      </div>
      {/* Bar track */}
      <div className="h-2 rounded-full bg-secondary/80 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, hsl(175 80% 45%), hsl(185 85% 55%))",
            boxShadow: "0 0 8px hsl(175 80% 45% / 0.4)",
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.percentage}%` } : { width: 0 }}
          transition={{
            type: "spring",
            stiffness: 30,
            damping: 15,
            delay: 0.2 + index * 0.06,
          }}
        />
      </div>
    </motion.div>
  );
};

/* ── Main Component ─────────────────────────────────────────────────── */
const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={spring}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and professional competencies.
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="all" className="mb-10">
            <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">All Skills</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="soft">Soft Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {technicalSkills.map((skill, i) => (
                  <AnimatedBar key={i} skill={skill} index={i} />
                ))}
                {softSkills.map((skill, i) => (
                  <AnimatedBar key={`soft-${i}`} skill={skill} index={technicalSkills.length + i} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="technical" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {technicalSkills.map((skill, i) => (
                  <AnimatedBar key={i} skill={skill} index={i} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="soft" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {softSkills.map((skill, i) => (
                  <AnimatedBar key={i} skill={skill} index={i} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Languages & Certifications */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {/* Languages */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1, transition: spring },
              }}
              className="bg-secondary/70 p-8 rounded-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.08)] transition-shadow duration-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <Languages className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-medium">Languages</h3>
              </div>
              <ul className="space-y-2">
                {languages.map((language, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2 text-foreground/80"
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0, transition: { ...spring, delay: i * 0.08 } },
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>{language}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Certifications */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { ...spring, delay: 0.1 } },
              }}
              className="bg-secondary/70 p-8 rounded-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.08)] transition-shadow duration-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-medium">Certifications</h3>
              </div>
              <ul className="space-y-2">
                {certifications.map((cert, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2 text-foreground/80"
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0, transition: { ...spring, delay: i * 0.08 } },
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>{cert}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Other Skills — pop-in badges */}
          <motion.div
            className="bg-secondary/70 p-8 rounded-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={spring}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-medium mb-6 text-center">Other Professional Skills</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {otherSkills.map((skill, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 80, damping: 14, delay: i * 0.06 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08, boxShadow: "0 0 12px rgba(34,211,238,0.25)" }}
                  className="bg-white dark:bg-navy-dark px-4 py-2 rounded-full border border-border text-sm font-medium text-blue-700 cursor-default transition-colors duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;