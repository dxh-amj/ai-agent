import {
  IconChartBar,
  IconDatabase,
  IconHeadset,
  IconRobot,
  IconSpeakerphone,
  IconTrendingUp,
} from "@tabler/icons-react";
import React from "react";

import type { Agent } from "../data";

interface AgentAvatarProps {
  agent: Agent;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const iconMap: Record<string, React.ElementType> = {
  trending_up: IconTrendingUp,
  call: IconHeadset,
  database: IconDatabase,
  campaign: IconSpeakerphone,
  insights: IconChartBar,
};

export const AgentAvatar = ({ agent, size = "md", className = "" }: AgentAvatarProps) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  const iconSizes = {
    sm: 20,
    md: 32,
    lg: 48,
    xl: 64,
  };

  const IconComponent = iconMap[agent.icon] || IconRobot;

  return (
    <div className={`relative group ${className}`}>
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl bg-linear-to-br ${agent.color} opacity-40 blur-xl group-hover:opacity-60 transition-opacity duration-500`}
      />

      {/* Main container */}
      <div
        className={`${sizeClasses[size]} relative flex items-center justify-center rounded-2xl bg-linear-to-br ${agent.color} shadow-lg shadow-black/5 ring-1 ring-white/20 backdrop-blur-md overflow-hidden transform transition-transform duration-300 group-hover:scale-105`}
      >
        {/* Glass shine effect */}
        <div className="absolute inset-0 bg-linear-to-br from-white/40 to-transparent opacity-50 pointer-events-none" />

        {/* Inner gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-tr from-black/10 to-transparent pointer-events-none" />

        {/* Content: Image or Icon */}
        <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
          {agent.imageUrl ? (
            <img
              src={agent.imageUrl}
              alt={agent.name}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="text-white drop-shadow-md">
              <IconComponent size={iconSizes[size]} stroke={1.5} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
