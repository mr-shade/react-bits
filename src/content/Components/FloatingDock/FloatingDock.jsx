// Floating Dock component (JS variant) sourced from Aceternity UI reference.
// Note: Use position strategies in the parent for production placement.
import React, { useRef, useState } from 'react';
import { IconLayoutNavbarCollapse } from '@tabler/icons-react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
// Local className combiner (avoid cross-root imports for jsrepo build)
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn('relative block md:hidden', className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: { delay: idx * 0.05 }
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({ items, className }) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={e => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        // vertically center the circle boxes like the reference
        'mx-auto hidden h-16 items-center gap-4 rounded-2xl bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900',
        className
      )}
    >
      {items.map(item => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, val => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const widthIcon = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  const heightIcon = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 2, x: '-50%' }}
              className="absolute -top-8 left-1/2 w-fit whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div style={{ width: widthIcon, height: heightIcon }} className="flex items-center justify-center">
          {/* Render the exact inline SVG path for react-bits when the title matches */}
          {title && title.toLowerCase().includes('react-bits') ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 25 25"
              role="img"
              aria-label="react-bits Logo"
              className="cursor-target css-1phd9a0"
            >
              <path d="M15.6317 0.571987C16.3759 0.228574 17.2363 0.0550841 18.033 0.38644L18.1922 0.459682L18.1942 0.460659L18.41 0.587612C18.8912 0.905222 19.2097 1.37902 19.407 1.8923C19.602 2.39947 19.6967 2.98342 19.7195 3.60226L19.7244 3.86886L19.7293 4.82101L17.825 4.83078L17.8201 3.87863L17.8045 3.47042C17.7767 3.09113 17.7136 2.79437 17.6297 2.57589C17.5217 2.29489 17.4024 2.19635 17.3289 2.15792L17.284 2.13937C17.1618 2.09871 16.9051 2.08256 16.4305 2.30148C15.8996 2.5465 15.2436 3.02482 14.5086 3.74874C13.7215 4.524 12.8888 5.53694 12.0692 6.73507C12.2359 6.73273 12.4038 6.73019 12.5721 6.73019C15.8011 6.73022 18.765 7.16566 20.9539 7.89523C22.0431 8.25833 22.9938 8.71183 23.6912 9.26144C24.3778 9.80264 24.9519 10.5493 24.952 11.4919C24.9519 12.3043 24.5214 12.9748 23.9715 13.4831C23.4218 13.9912 22.6749 14.416 21.824 14.7673L20.9432 15.1306L20.2166 13.3698L21.0975 13.0066C21.833 12.7029 22.3554 12.3832 22.6785 12.0847C23.0011 11.7865 23.0476 11.5861 23.0477 11.4919C23.0476 11.3827 22.9814 11.1272 22.5125 10.7575C22.0535 10.3958 21.3298 10.028 20.3514 9.70187C18.4042 9.05287 15.6534 8.6355 12.5721 8.63546C11.9839 8.63546 11.4073 8.65026 10.8465 8.67941C10.5662 9.16529 10.292 9.6716 10.0252 10.195C9.8036 10.6298 9.59539 11.0625 9.40021 11.49C9.59576 11.9183 9.80411 12.3521 10.0262 12.7878H10.0272L10.2918 13.2976C11.6276 15.814 13.1379 17.8859 14.5086 19.236C15.2432 19.9595 15.8989 20.4376 16.4295 20.6823C16.9715 20.9322 17.23 20.8755 17.3279 20.8259L17.4061 20.7712C17.4946 20.6921 17.6094 20.5285 17.699 20.1902C17.8183 19.7396 17.8576 19.0916 17.7781 18.2556C17.6198 16.5909 17.0111 14.39 15.9705 12.0017L16.8436 11.6218L17.7166 11.2409C18.809 13.7484 19.4914 16.1499 19.6746 18.0749C19.7658 19.0336 19.7391 19.9287 19.5408 20.6775C19.343 21.4244 18.9388 22.1417 18.1932 22.5222L18.1922 22.5232C17.3525 22.9505 16.4266 22.7778 15.6326 22.4118C14.8262 22.04 13.9897 21.3992 13.1717 20.5935C11.5669 19.0128 9.8785 16.6456 8.43536 13.8562C7.94269 15.2332 7.60957 16.5119 7.44415 17.611C7.29073 18.6308 7.29006 19.4422 7.40411 20.0153C7.52086 20.6015 7.71887 20.7763 7.81622 20.8259H7.8172L7.88947 20.8523C8.09827 20.9026 8.58562 20.8602 9.46173 20.239L10.2381 19.6882L11.3397 21.2419L10.5633 21.7927L10.3582 21.9323C9.31984 22.6214 8.06557 23.0899 6.95197 22.5222V22.5232C6.11192 22.0955 5.70676 21.2449 5.53595 20.3874C5.36259 19.5163 5.38948 18.4625 5.56036 17.3269C5.81724 15.6203 6.41817 13.6025 7.31818 11.49C6.99301 10.7266 6.7076 9.97508 6.46271 9.24679C5.85761 9.38078 5.298 9.53349 4.79279 9.70187C3.81426 10.028 3.09071 10.3958 2.63165 10.7575C2.16243 11.1274 2.09658 11.3827 2.0965 11.4919C2.09671 11.6513 2.25906 12.068 3.17462 12.5876L3.36798 12.6921L4.21271 13.1335L3.3299 14.822L2.48615 14.3806L2.2674 14.2614C1.17979 13.6487 0.192367 12.742 0.1922 11.4919C0.192288 10.5492 0.766185 9.80266 1.45294 9.26144C2.15046 8.7118 3.10094 8.25834 4.19025 7.89523C4.72343 7.71753 5.30301 7.55645 5.92072 7.41574C5.76557 6.80139 5.64509 6.21178 5.56134 5.65597C5.39035 4.52081 5.36283 3.46829 5.53595 2.59738C5.70654 1.7396 6.11162 0.888515 6.95197 0.460659V0.461635C7.83252 0.0128116 8.80234 0.2186 9.65021 0.63937L10.0057 0.831752L10.8279 1.31222L9.86603 2.95675L9.04376 2.47628L8.78009 2.33371C8.20699 2.05202 7.91997 2.1051 7.81622 2.15792V2.1589C7.71887 2.20847 7.52073 2.38226 7.40411 2.96847C7.29019 3.54153 7.29149 4.35303 7.44513 5.37277C7.52452 5.89955 7.64219 6.46785 7.79767 7.06808C8.41596 6.97652 9.06014 6.90151 9.72443 6.8464C10.8365 5.04912 12.0257 3.5201 13.1717 2.39132C13.9899 1.58545 14.8252 0.944189 15.6317 0.571987ZM17.7166 11.2409L15.9705 12.0017L15.5906 11.1286L17.3367 10.3679L17.7166 11.2409ZM8.4422 7.94406C7.87898 7.94428 7.42287 8.40036 7.42267 8.96359C7.42267 9.52698 7.87886 9.98388 8.4422 9.9841C9.00573 9.9841 9.46271 9.52712 9.46271 8.96359C9.46251 8.40023 9.00561 7.94406 8.4422 7.94406Z" fill="white" transform="matrix(1,0,0,1,0,0)" />
            </svg>
          ) : (
            icon
          )}
        </motion.div>
      </motion.div>
    </a>
  );
}

export default FloatingDock;
