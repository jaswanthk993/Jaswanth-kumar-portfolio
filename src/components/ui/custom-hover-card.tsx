
import React, { useState } from 'react';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from "@/components/ui/hover-card";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CustomHoverCardProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  contentClassName?: string;
  align?: "center" | "start" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
}

export function CustomHoverCard({
  trigger,
  content,
  contentClassName,
  align = "center",
  side = "bottom",
  sideOffset = 4
}: CustomHoverCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HoverCard
      openDelay={100}
      closeDelay={100}
      onOpenChange={setIsOpen}
    >
      <HoverCardTrigger asChild>
        {trigger}
      </HoverCardTrigger>
      <HoverCardContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn("p-4 bg-card border border-primary/20", contentClassName)}
        asChild
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          {content}
        </motion.div>
      </HoverCardContent>
    </HoverCard>
  );
}
