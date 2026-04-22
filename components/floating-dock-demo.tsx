import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";

export default function FloatingDockDemo() {
  const links = [
    {
      title: "Linkedin",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/shaikmohammedarshadulla/",
    },

    {
      title: "X (Twitter)",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://x.com/valoucard",
    },
    {
      title: "Whatsapp",
      icon: (
        <IconBrandWhatsapp className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://wa.me/917989053744?text=%E2%80%8E%20Feel%20free%20to%20DM%20me%20for%20any%20kind%20of%20works%20or%20queries",
    },
    {
      title: "Mail",
      icon: (
        <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "mailto:shaikmohammedarshadulla@gmail.com",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.instagram.com/skarshad9.9.9/",
    },

    {
      title: "Discord",
      icon: (
        <IconBrandDiscord className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://discord.com/users/valoucard766",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/ArshadullaShaik",
    },
  ];
  return (
    <div className="relative z-20 flex w-full items-center justify-center xl:w-fit xl:justify-end xl:self-end">
      <FloatingDock
        mobileClassName="z-20"
        desktopClassName="md:scale-90 lg:scale-95 xl:scale-100"
        items={links}
      />
    </div>
  );
}
