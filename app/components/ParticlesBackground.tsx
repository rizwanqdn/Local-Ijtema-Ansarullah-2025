// app/components/ParticlesBackground.tsx
'use client';

import React from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // or 'loadFull' if you need more features
import { useEffect, useState } from 'react';

const ParticlesBackground: React.FC = () => {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can also use the slim or full bundles for smaller file size
            await loadSlim(engine); // Using loadSlim for a smaller bundle size
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: any): Promise<void> => {
        console.log("Particles container loaded", container);
    };

    if (!init) {
        return null; // Don't render until particles engine is initialized
    }

    // You can customize the particles options here
    const particlesOptions = {
        background: {
            color: {
                value: "transparent", // Particles background is transparent, letting your image show through
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                // Adjust particle color to complement your themes (e.g., a light, neutral tone or a soft accent)
                value: "#f0f0f0", // A soft white/silver
            },
            links: {
                color: "#cccccc", // Link color, slightly darker than particles
                distance: 150,
                enable: true,
                opacity: 0.4, // Reduced link opacity
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 1, // Slower particle movement
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 60, // Fewer particles
            },
            opacity: {
                value: 0.6, // Slightly more opaque particles
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 }, // Smaller particle size
            },
        },
        detectRetina: true,
    };

    return (
        <div className="absolute inset-0 z-10"> {/* z-index 10 to be above the dimmed background */}
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={particlesOptions as any} // Cast to any to avoid type issues if options are complex
            />
        </div>
    );
};

export default ParticlesBackground;