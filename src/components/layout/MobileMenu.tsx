'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site-config';
import { mailHref, telHref, whatsappHref, defaultWhatsappMessage } from '@/lib/links';
import { EASE } from '@/lib/motion';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

type MobileMenuProps = { onClose: () => void };

export function MobileMenu({ onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const contacts = [
    { icon: Phone, label: siteConfig.phoneDisplay, href: telHref() },
    {
      icon: WhatsAppIcon,
      label: 'WhatsApp',
      href: whatsappHref(defaultWhatsappMessage),
    },
    { icon: Mail, label: siteConfig.email, href: mailHref() },
  ];

  return (
    <motion.div
      id="menu-mobile"
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-40 flex flex-col bg-ivory lg:hidden"
    >
      <nav aria-label="Navigation mobile" className="flex-1 overflow-y-auto px-6 pb-8 pt-28">
        <ul>
          {siteConfig.navigation.map((item, i) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 + i * 0.07, ease: EASE }}
              className="border-b border-ink/8"
            >
              <a
                href={item.href}
                onClick={onClose}
                className="group flex items-baseline gap-4 py-5"
              >
                <span className="label-xs text-[10px] text-bronze-deep">0{i + 1}</span>
                <span className="font-display text-[2rem] leading-none text-ink transition-colors group-hover:text-bronze">
                  {item.label}
                </span>
              </a>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 + 4 * 0.07, ease: EASE }}
            className="border-b border-ink/8"
          >
            <a
              href="#demande"
              onClick={onClose}
              className="group flex items-baseline gap-4 py-5"
            >
              <span className="label-xs text-[10px] text-bronze-deep">05</span>
              <span className="font-display text-[2rem] leading-none text-ink transition-colors group-hover:text-bronze">
                Demander un trajet
              </span>
            </a>
          </motion.li>
        </ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-10 space-y-4"
        >
          <p className="label-xs text-ink/55">Contact direct</p>
          <ul className="space-y-3">
            {contacts.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 text-sm text-ink/70"
                  >
                    <Icon size={15} strokeWidth={1.5} className="text-bronze" aria-hidden />
                    {label}
                  </a>
                ) : (
                  <span className="flex items-center gap-3 text-sm text-ink/40">
                    <Icon size={15} strokeWidth={1.5} className="text-bronze/60" aria-hidden />
                    {label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </nav>
    </motion.div>
  );
}
