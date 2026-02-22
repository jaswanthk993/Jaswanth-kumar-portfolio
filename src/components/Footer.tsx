import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const spring = { type: "spring" as const, stiffness: 50, damping: 20 };

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/70 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {/* About */}
          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: spring } }}>
            <h3 className="text-xl font-bold gradient-text mb-4">Jaswanth Kumar</h3>
            <p className="text-foreground/70 mb-4 max-w-xs">
              Innovative technologist with expertise in cloud computing, AI, and full-stack development.
            </p>
            <div className="flex gap-4">
              {[
                { href: "https://github.com/jaswanthk993", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/jaswanth-kumar-/", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:jaswanthk993@gmail.com", icon: Mail, label: "Email" },
              ].map(social => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.label !== "Email" ? "_blank" : undefined}
                  rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                  className="text-foreground/70 hover:text-primary transition-colors"
                  aria-label={social.label}
                  whileHover={{ scale: 1.25, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: spring } }}>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["projects", "skills", "experience", "contact"].map(link => (
                <li key={link}>
                  <Link
                    to={`/#${link}`}
                    className="text-foreground/70 hover:text-primary hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: spring } }}>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-foreground/70">
              <li>Rajahmundry, Andhra Pradesh, India</li>
              <li>
                <a href="mailto:jaswanthk993@gmail.com" className="hover:text-primary transition-colors">
                  jaswanthk993@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918309619236" className="hover:text-primary transition-colors">
                  +91 8309619236
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-border mt-8 pt-8 text-center text-foreground/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>© {currentYear} Jaswanth Kumar. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
