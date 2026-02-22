import { motion } from "framer-motion";
import { Book, Briefcase, Code, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/* ── Shared spring config ───────────────────────────────────────────── */
const spring = { type: "spring" as const, stiffness: 50, damping: 20 };

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* ── Heading ─────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...spring }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <motion.div
              className="w-32 h-1 bg-primary mx-auto mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ ...spring, delay: 0.3 }}
              viewport={{ once: true }}
              style={{ originX: 0.5 }}
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ── Text column – staggered paragraphs ──────────────── */}
          <div className="lg:col-span-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              className="space-y-6 text-lg"
            >
              {[
                "I'm a product-minded AI builder who enjoys turning complex problems into simple, scalable solutions.",
                "I work at the intersection of AI, cloud platforms, and product thinking, focusing on building systems that are not just technically sound but genuinely useful for real users. I care deeply about why a problem exists before jumping into how to solve it.",
                "I've led and contributed to projects like AI Compliance Copilot, where I took ownership from problem definition to prototype deployment—breaking down ambiguous requirements, designing intelligent workflows, and delivering solutions on cloud infrastructure.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  className="text-foreground/80"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: spring },
                  }}
                >
                  {text}
                </motion.p>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: spring },
                }}
              >
                <h3 className="text-xl font-semibold text-foreground mt-4">How I think and work</h3>
                <ul className="text-foreground/80 list-disc list-inside space-y-1 mt-2">
                  {[
                    "Start with user pain, not features",
                    "Break ambiguity into clear, testable assumptions",
                    "Build fast, learn early, and iterate with intent",
                    "Balance product value with technical feasibility",
                  ].map((item, j) => (
                    <motion.li
                      key={j}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        visible: { opacity: 1, x: 0, transition: { ...spring, delay: j * 0.06 } },
                      }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {[
                "I enjoy collaborating with diverse teams, learning continuously, and working in environments that value clarity, ownership, and long-term impact.",
                "My goal is to build products that scale responsibly, solve meaningful problems, and create real value.",
              ].map((text, i) => (
                <motion.p
                  key={`end-${i}`}
                  className="text-foreground/80"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: spring },
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>
          </div>

          {/* ── Cards column – slide in from right ──────────────── */}
          <div className="lg:col-span-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6"
            >
              {/* Education Card */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 40, scale: 0.95 },
                  visible: { opacity: 1, x: 0, scale: 1, transition: spring },
                }}
              >
                <Card className="h-full hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-shadow duration-500">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Education</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Book className="text-primary" size={18} />
                        <div>
                          <p className="font-medium">B.Tech in EEE</p>
                          <p className="text-sm text-foreground/70">GIET Engineering College, 2021-2025</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Empty Card (placeholder) */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 40, scale: 0.95 },
                  visible: { opacity: 1, x: 0, scale: 1, transition: spring },
                }}
              >
                <Card className="h-full" />
              </motion.div>

              {/* Languages Card */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 40, scale: 0.95 },
                  visible: { opacity: 1, x: 0, scale: 1, transition: spring },
                }}
              >
                <Card className="h-full hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-shadow duration-500">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Languages</h3>
                    <div className="space-y-2">
                      <p className="flex justify-between"><span>English</span><span className="text-foreground/70">Professional Working</span></p>
                      <p className="flex justify-between"><span>Hindi</span><span className="text-foreground/70">Professional Working</span></p>
                      <p className="flex justify-between"><span>Telugu</span><span className="text-foreground/70">Native</span></p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Interests Card */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 40, scale: 0.95 },
                  visible: { opacity: 1, x: 0, scale: 1, transition: spring },
                }}
              >
                <Card className="h-full hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-shadow duration-500">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Interests</h3>
                    <div className="space-y-2">
                      {[
                        { icon: Heart, label: "Artificial Intelligence" },
                        { icon: Code, label: "Cloud Computing" },
                        { icon: Heart, label: "Financial Markets" },
                        { icon: Code, label: "Entrepreneurship" },
                      ].map(({ icon: Icon, label }, k) => (
                        <div key={k} className="flex items-center space-x-2">
                          <Icon className="text-primary" size={18} />
                          <p>{label}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;