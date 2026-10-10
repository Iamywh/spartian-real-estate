"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X, ArrowRight } from "lucide-react";
import { nav } from "@/lib/data";
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
export function Button({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link href={href} className={`button ${light ? "light" : ""}`}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function Shell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const home = path === "/";
  return (
    <>
      <a href="#main" className="skip">
        Ir al contenido
      </a>
      <div className="demo-bar">
        Una nueva visión para Tenerife <span>—</span> Demo conceptual · Sin
        inmuebles a la venta
      </div>
      <header className="header">
        <Link href="/" aria-label="SPARTIAN Inicio" className="brand">
          SPARTIAN<span>DESARROLLO INMOBILIARIO</span>
        </Link>
        <nav aria-label="Navegación principal" className="desktop-nav">
          {nav.slice(1, 5).map(([n, u]) => (
            <Link
              key={u}
              href={u}
              aria-current={path === u ? "page" : undefined}
            >
              {n}
            </Link>
          ))}
        </nav>
        <div className="header-right">
          <span className="language">ES</span>
          <button
            ref={trigger}
            onClick={() => setOpen(true)}
            className="menu-button"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="menu"
          >
            Menú <Menu size={23} />
          </button>
        </div>
      </header>
      <dialog
        id="menu"
        ref={dialog}
        className="menu-dialog"
        onCancel={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialog.current) setOpen(false);
        }}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="menu-panel"
            >
              <div className="menu-top">
                <span className="brand">SPARTIAN</span>
                <button
                  autoFocus
                  aria-label="Cerrar menú"
                  onClick={() => {
                    setOpen(false);
                    trigger.current?.focus();
                  }}
                >
                  <X />
                </button>
              </div>
              <p className="eyebrow">ESPACIOS CON UNA NUEVA HISTORIA</p>
              <nav aria-label="Menú completo">
                {nav.map(([n, u], i) => (
                  <Link href={u} key={u} onClick={() => setOpen(false)}>
                    <small>0{i + 1}</small>
                    {n}
                    <ArrowUpRight />
                  </Link>
                ))}
              </nav>
              <div className="menu-bottom">
                Santa Cruz de Tenerife · Islas Canarias
                <Link href="/configurador">
                  Diseña tu futuro hogar <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
      <main id="main" className={home ? "" : "inner-main"}>
        {children}
      </main>
      <footer>
        <div className="footer-top">
          <div>
            <Link href="/" className="brand">
              SPARTIAN<span>DESARROLLO INMOBILIARIO</span>
            </Link>
            <p>
              Transformamos espacios.
              <br />
              Creamos hogares.
            </p>
          </div>
          <div>
            <span className="eyebrow">EMPECEMOS UNA CONVERSACIÓN</span>
            <Link href="/contacto" className="footer-cta">
              ¿Lo imaginamos juntos? <ArrowUpRight />
            </Link>
            <p>Santa Cruz de Tenerife, Islas Canarias</p>
          </div>
        </div>
        <div className="footer-links">
          {nav.slice(1).map(([n, u]) => (
            <Link key={u} href={u}>
              {n}
            </Link>
          ))}
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} SPARTIAN · Proyecto en desarrollo
          </span>
          <div>
            <Link href="/aviso-legal">Aviso legal</Link>
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/admin/demo">Explorar panel demo</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
