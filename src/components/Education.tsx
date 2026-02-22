
import { GraduationCap, CalendarDays, School, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

/* ── Types ──────────────────────────────────────────────────────────── */
interface EducationItemProps {
  institution: string;
  degree: string;
  duration: string;
  description: string;
  gpa?: string;
  location?: string;
}

/* ── Data ───────────────────────────────────────────────────────────── */
const educationData: EducationItemProps[] = [
  {
    institution: "Godavari Institute of Engineering & Technology (GIET)",
    degree: "B.Tech, Electrical and Electronics Engineering",
    duration: "November 2021 - May 2025",
    description: "Pursuing a B.Tech degree focusing on electrical and electronics engineering with additional coursework in programming and technology.",
    gpa: "7.40",
    location: "Rajahmundry, India",
  },
  {
    institution: "Narayana Junior College",
    degree: "Intermediate Education (MPC)",
    duration: "June 2019 - May 2021",
    description: "Completed intermediate education with a focus on Mathematics, Physics, and Chemistry.",
    gpa: "71%",
    location: "Rajahmundry, India",
  },
  {
    institution: "Government High School",
    degree: "School Education",
    duration: "May 2019",
    description: "Completed foundational education with excellence, developing core academic skills and fundamental knowledge.",
    gpa: "9.7",
    location: "Rajahmundry, India",
  },
];

/* ── Shared spring ──────────────────────────────────────────────────── */
const spring = { type: "spring" as const, stiffness: 50, damping: 20 };

const icons = [GraduationCap, BookOpen, School];

/* ── Education Item ─────────────────────────────────────────────────── */
const EducationItem = ({ item, index }: { item: EducationItemProps; index: number }) => {
  const Icon = icons[index] || School;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...spring, delay: index * 0.15 }}
      viewport={{ once: true, amount: 0.2 }}
      className="mb-8 last:mb-0"
    >
      <Card className="overflow-hidden border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_24px_rgba(34,211,238,0.08)]">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <motion.div
              className="bg-primary/10 p-3 rounded-full text-primary flex-shrink-0 transition-colors"
              whileHover={{ scale: 1.15, backgroundColor: "hsl(175 80% 45%)", color: "#fff" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Icon size={24} />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold">{item.institution}</h3>
              <p className="text-lg font-medium text-foreground/90 mb-1">{item.degree}</p>
              <div className="flex items-center text-sm text-foreground/70 mb-1">
                <CalendarDays size={16} className="mr-1" />
                <span>{item.duration}</span>
              </div>
              {item.location && (
                <p className="text-sm text-foreground/70 mb-3">Location: {item.location}</p>
              )}
              <p className="text-foreground/80">{item.description}</p>
              {item.gpa && (
                <motion.p
                  className="mt-2 font-medium text-primary"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ ...spring, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  GPA: {item.gpa}
                </motion.p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/* ── Main Component ─────────────────────────────────────────────────── */
const Education = () => {
  return (
    <section id="education" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={spring}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
          <motion.div
            className="w-32 h-1 bg-primary mx-auto mb-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ ...spring, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-foreground/70 max-w-2xl mx-auto">
            My academic journey and qualifications that have shaped my knowledge and expertise.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {educationData.map((item, index) => (
            <EducationItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
