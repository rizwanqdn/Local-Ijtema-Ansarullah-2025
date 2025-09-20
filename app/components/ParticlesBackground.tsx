// app/components/ParticlesBackground.tsx
'use client';

import React from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { IOptions, RecursivePartial, Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from 'react';

// Define the props that the component will accept
interface ParticlesBackgroundProps {
  particleColor: string;
  linkHoverColor: string;
}

// Accept the props in the function signature
const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ particleColor, linkHoverColor }) => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    // Change the type from 'any' to 'Container | undefined'
    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log("Particles container loaded", container);
    };

    if (!init) {
        return null;
    }

    const particlesOptions: RecursivePartial<IOptions> = {
        background: {
            color: {
                value: "transparent",
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
                    parallax: {
                        enable: false,
                        force: 2,
                        smooth: 10,
                    },
                },
                onDiv: {
                    selectors: [],
                    enable: false,
                    mode: [],
                    type: "circle",
                },
                resize: {
                    enable: true,
                    delay: 0.5,
                }
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
                value: particleColor,
            },
            links: {
                color: linkHoverColor,
                distance: 150,
                enable: true,
                opacity: 0.4,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
                angle: {
                    offset: 0,
                    value: 0
                },
                attract: {
                    enable: false,
                    rotate: {
                        x: 600,
                        y: 1200
                    }
                },
                gravity: {
                    enable: false,
                    acceleration: 9.81,
                    inverse: false,
                    maxSpeed: 50,
                },
                path: {
                    clamp: true,
                    delay: {
                        value: 0
                    },
                    enable: false,
                    generator: 'random'
                },
                spin: {
                    acceleration: 0,
                    enable: false
                },
                trail: {
                    enable: false,
                    length: 1,
                    fill: {}
                },
                vibrate: false,
                warp: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 60,
            },
            opacity: {
                value: 0.6,
                animation: {
                    enable: false,
                    speed: 1,
                    sync: false,
                    startValue: "random",
                    destroy: "none",
                    count: 0,
                    decay: 0,
                    delay: 0,
                    mode: "random"
                },
            },
            shape: {
                type: "circle",
                options: {},
                fill: true,
                close: true,
            },
            size: {
                value: { min: 1, max: 3 },
                animation: {
                    enable: false,
                    speed: 40,
                    sync: false,
                    startValue: "random",
                    destroy: "none",
                    count: 0,
                    decay: 0,
                    delay: 0,
                    mode: "random"
                },
            },
        },
        detectRetina: true,
    };

    return (
        <div className="absolute inset-0 z-10">
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={particlesOptions}
            />
        </div>
    );
};

export default ParticlesBackground;