import type React from "react"
import { useState, useEffect } from "react"
import { useSpring, animated, useSprings } from "@react-spring/web"
import "./Dock.css"

type Position = "bottom" | "top" | "left" | "right"
type FlexDirection = "row" | "column"

interface DockProps {
  position?: Position
  collapsible?: boolean
  responsive?: Position
}

const Dock: React.FC<DockProps> = ({ position = "bottom", collapsible = false, responsive = "bottom" }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [isDockVisible, setDockVisible] = useState(!collapsible)
  const [currentPosition, setCurrentPosition] = useState<Position>(position)

  const dockItems = ["🍕", "🍔", "🌭", "🌮", "🌯"]

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index)
  }

  const handleMouseLeave = () => {
    setHoverIndex(null)
  }

  const handleParentMouseEnter = () => {
    if (collapsible) {
      setDockVisible(true)
    }
  }

  const handleParentMouseLeave = () => {
    if (collapsible) {
      setDockVisible(false)
    }
  }

  useEffect(() => {
    const updatePosition = () => {
      if (responsive && window.innerWidth <= 768) {
        setCurrentPosition(responsive)
      } else {
        setCurrentPosition(position)
      }
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    return () => window.removeEventListener("resize", updatePosition)
  }, [position, responsive])

  const getDockStyle = () => {
    const direction: FlexDirection = currentPosition === "left" || currentPosition === "right" ? "column" : "row"
    return { flexDirection: direction }
  }

  const getTranslateValue = (index: number) => {
    if (hoverIndex === index) {
      switch (currentPosition) {
        case "left":
          return "translateX(5px) translateY(0px)"
        case "right":
          return "translateX(-5px) translateY(0px)"
        case "top":
          return "translateX(0px) translateY(5px)"
        case "bottom":
          return "translateX(0px) translateY(-5px)"
        default:
          return "translateX(0px) translateY(0px)"
      }
    }
    return "translateX(0px) translateY(0px)"
  }

  const springs = useSprings(
    dockItems.length,
    dockItems.map((_, index) => ({
      transform:
        hoverIndex === index
          ? `scale(1.5) ${getTranslateValue(index)}`
          : hoverIndex !== null && Math.abs(hoverIndex - index) === 1
            ? `scale(1.3) translateX(0px) translateY(0px)`
            : `scale(1) translateX(0px) translateY(0px)`,
      config: { tension: 200, friction: 15 }
    }))
  )

  const visibilitySpring = useSpring({
    opacity: isDockVisible ? 1 : 0,
    config: { tension: 120, friction: 14 },
  })

  return (
    <div
      className={`dock-container ${currentPosition}`}
      onMouseEnter={handleParentMouseEnter}
      onMouseLeave={handleParentMouseLeave}
    >
      <animated.div 
        className="dock" 
        style={{ 
          ...visibilitySpring,
          ...getDockStyle() as any
        }}
      >
        {springs.map((props, index) => (
          <animated.div
            key={dockItems[index]}
            className="dock-item"
            style={props}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {dockItems[index]}
          </animated.div>
        ))}
      </animated.div>
    </div>
  )
}

export default Dock