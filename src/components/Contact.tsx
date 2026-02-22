import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const spring = { type: "spring" as const, stiffness: 50, damping: 20 };

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: "Message sent!", description: "Thank you for your message. I'll get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={spring}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <motion.div
            className="w-32 h-1 bg-primary mx-auto mb-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ ...spring, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out through the contact form or direct channels below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* ── Contact Info ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={spring}
            viewport={{ once: true }}
          >
            <div className="rounded-lg shadow-sm border border-border p-8 bg-slate-900 hover:shadow-[0_0_24px_rgba(34,211,238,0.06)] transition-shadow duration-500">
              <h3 className="text-2xl font-medium mb-6">Contact Information</h3>

              <motion.div
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
              >
                {[
                  { icon: Mail, label: "Email", value: "jaswanthk993@gmail.com", href: "mailto:jaswanthk993@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+91 8309619236", href: "tel:+918309619236" },
                  { icon: MapPin, label: "Location", value: "Rajahmundry, Andhra Pradesh, India" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-start gap-4"
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0, transition: spring },
                    }}
                  >
                    <motion.div
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.15, backgroundColor: "hsl(175 80% 45%)", color: "#fff" }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground/70 mb-1">{item.label}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-foreground hover:text-primary transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-foreground">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social */}
              <div className="mt-10">
                <h4 className="text-xl font-medium mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  {[
                    { href: "https://github.com/jaswanthk993", label: "GitHub", path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
                    { href: "https://www.linkedin.com/in/jaswanth-kumar-/", label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                  ].map((social, i) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-primary/10 flex items-center justify-center transition-colors"
                      aria-label={social.label}
                      whileHover={{ scale: 1.2, boxShadow: "0 0 12px rgba(34,211,238,0.25)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d={social.path} clipRule="evenodd" />
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Contact Form ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={spring}
            viewport={{ once: true }}
          >
            <div className="rounded-lg shadow-sm border border-border p-8 bg-slate-900 hover:shadow-[0_0_24px_rgba(34,211,238,0.06)] transition-shadow duration-500">
              <h3 className="text-2xl font-medium mb-6">Send a Message</h3>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {[
                  { id: "name", label: "Your Name", placeholder: "John Doe", type: "text" },
                  { id: "email", label: "Email Address", placeholder: "john@example.com", type: "email" },
                ].map(field => (
                  <motion.div
                    key={field.id}
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: spring } }}
                  >
                    <label htmlFor={field.id} className="block text-sm font-medium text-foreground/70 mb-1">{field.label}</label>
                    <Input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      value={(formData as any)[field.id]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      className="transition-shadow duration-300 focus:shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                    />
                  </motion.div>
                ))}

                <motion.div
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: spring } }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-1">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    required
                    className="transition-shadow duration-300 focus:shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                  />
                </motion.div>

                <motion.div
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: spring } }}
                >
                  <Button
                    type="submit"
                    className="w-full transition-shadow duration-300 hover:shadow-[0_0_16px_rgba(34,211,238,0.3)]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send size={16} />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;