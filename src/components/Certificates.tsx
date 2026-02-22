import { Award, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const spring = { type: "spring" as const, stiffness: 50, damping: 20 };

const certificates = [
  { title: "Build Real World AI Applications with Gemini and Imagen", issuer: "Google Cloud", issued: "2025", summary: "Certified in building production-ready AI applications using Google's Gemini and Imagen models for generative AI solutions.", link: "#" },
  { title: "Develop Solutions with Azure AI Document Intelligence", issuer: "Microsoft", issued: "2025", summary: "Expertise in developing AI-powered document processing solutions using Azure AI Document Intelligence services.", link: "#" },
  { title: "Postman API Fundamentals Student Expert", issuer: "Postman", issued: "2025", summary: "Certified as a Student Expert in API fundamentals, testing, and development using Postman.", link: "#" },
  { title: "Enterprise Design Thinking Practitioner", issuer: "IBM", issued: "2024", summary: "Certified practitioner in IBM's Enterprise Design Thinking methodology for user-centered innovation.", link: "#" },
  { title: "Getting Started with Enterprise Data Science", issuer: "IBM", issued: "2024", summary: "Foundation certification in enterprise-level data science methodologies and applications.", link: "#" },
  { title: "Oracle Certified Professional – Generative AI", issuer: "Oracle University", credential: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional", issued: "October 30, 2025", validUntil: "October 30, 2027", summary: "Recognized by Oracle Corporation for professional-level competency in Oracle Cloud Infrastructure and applied generative-AI capabilities.", link: "#" },
  { title: "Troubleshooter (L2) – Code Vipassana, Season 11", issuer: "Google Developer Groups (GDG) Cloud Kochi", issued: "2025", summary: "Earned the L2 Troubleshooter badge for successfully resolving complex technical challenges in Season 11.", link: "#" },
  { title: "Exceptional Performance – Code Vipassana, Season 10", issuer: "Google Developer Groups (GDG) Cloud Kochi", issued: "2025", summary: "Awarded for exceptional mastery and applied capability in Season 10: AI Agents.", link: "#" },
  { title: "Oracle Certified Professional – Multicloud Architecture", issuer: "Oracle University", credential: "Oracle Cloud Infrastructure 2025 Certified Multicloud Architect Professional", issued: "September 1, 2025", summary: "Recognized for expert-level understanding of OCI-based multicloud architectures and cross-platform cloud integration strategies.", link: "#" },
] as const;

const Certificates = () => {
  return (
    <section id="certificates" className="py-20 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">Certificates</h2>
          <motion.div
            className="w-32 h-1 bg-primary mx-auto mb-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ ...spring, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and recognition for technical excellence
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1, transition: spring },
              }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 200, damping: 15 } }}
            >
              <Card className="h-full transition-all duration-500 hover:shadow-[0_0_24px_rgba(34,211,238,0.08)] hover:border-primary/30">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 flex items-start gap-2">
                        <motion.div
                          whileHover={{ rotate: 12, scale: 1.15 }}
                          transition={{ type: "spring", stiffness: 300, damping: 12 }}
                        >
                          <Award className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                        </motion.div>
                        <span>{cert.title}</span>
                      </CardTitle>
                      <CardDescription className="text-base font-medium text-foreground/80">
                        {cert.issuer}
                      </CardDescription>
                    </div>
                    {cert.link && (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {"credential" in cert && cert.credential && (
                    <p className="text-sm font-medium text-muted-foreground">
                      <span className="text-foreground">Credential:</span> {cert.credential}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 text-sm">
                    <Badge variant="secondary">Issued: {cert.issued}</Badge>
                    {"validUntil" in cert && cert.validUntil && (
                      <Badge variant="outline">Valid Until: {cert.validUntil}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cert.summary}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
