
import { ArrowDown, Linkedin, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "@/assets/jaswanth-kumar.jpg";
const Hero = () => {
  const scrollToEducation = () => {
    const educationSection = document.getElementById("education");
    if (educationSection) {
      educationSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section className="min-h-screen flex items-center pt-20 pb-16">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-20">
        {/* Hero Image */}
        <div className="order-1 md:order-2 w-full md:w-2/5 flex justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent opacity-20 blur-lg"></div>
            <div className="absolute inset-4 bg-white dark:bg-navy-dark rounded-full"></div>
            <img src={heroImage} alt="Jaswanth Kumar" className="absolute inset-0 w-full h-full object-cover rounded-full p-4" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="order-2 md:order-1 w-full md:w-3/5 text-center md:text-left">
          <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="text-primary font-medium mb-4">
            Hello, I'm
          </motion.p>

          <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Jaswanth Kumar
          </motion.h1>

          <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }} className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto md:mx-0 font-medium">Aspiring AI &amp; Cloud Enthusiast | Problem Solver | Open to New Challenges|Passionate about building AI-driven solutions, automating tasks, and innovating in tech to create real-world impact. 🚀</motion.p>

          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }} className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
            <Button size="lg" asChild>
              <a href="/#contact">Get in Touch</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/jaswanthk993" target="_blank" rel="noopener noreferrer">
                View GitHub
              </a>
            </Button>
          </motion.div>

          <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: 0.5
          }} className="flex gap-6 justify-center md:justify-start">
            <a href="https://www.linkedin.com/in/jaswanth-kumar-/" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors" aria-label="LinkedIn Profile">
              <Linkedin size={24} />
            </a>
            <a href="https://github.com/jaswanthk993" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors" aria-label="GitHub Profile">
              <Github size={24} />
            </a>
            <a href="mailto:jaswanthk993@gmail.com" className="text-foreground/70 hover:text-primary transition-colors" aria-label="Email">
              <Mail size={24} />
            </a>
          </motion.div>
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <button onClick={scrollToEducation} className="flex flex-col items-center text-foreground/70 hover:text-primary transition-colors">
          <span className="text-sm mb-2">Scroll to see my education</span>
          <ArrowDown size={20} className="animate-bounce" />
        </button>
      </div>
    </div>
  </section>;
};
export default Hero;
