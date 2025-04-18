import React from 'react';

const CompassCard = ({ direction, speed }) => {
    const fullLength = 110;
    const gapSize = 10; // empty space in the middle for wind speed

    const angleRad = direction * (Math.PI / 180);

    // Arrow head (front)
    const arrowX = 100 + (fullLength - gapSize / 2) * Math.sin(angleRad);
    const arrowY = 100 - (fullLength - gapSize / 2) * Math.cos(angleRad);

    // Arrow tail (back)
    const tailX = 100 - (fullLength - gapSize / 2) * Math.sin(angleRad);
    const tailY = 100 + (fullLength - gapSize / 2) * Math.cos(angleRad);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
        }}>
            <svg width="550" height="375" viewBox="-20 -20 240 290">
                {/* Outer Circle */}
                <circle cx="100" cy="100" r="90" stroke="#333" strokeWidth="3" fill="none" />

                {/* Tick Marks every 10° */}
                {Array.from({ length: 36 }).map((_, i) => {
                    const tickAngle = i * 10 * (Math.PI / 180);
                    const outerX = 100 + 80 * Math.cos(tickAngle);
                    const outerY = 100 + 80 * Math.sin(tickAngle);
                    const innerX = 100 + 75 * Math.cos(tickAngle);
                    const innerY = 100 + 75 * Math.sin(tickAngle);
                    return (
                        <line
                            key={i}
                            x1={innerX}
                            y1={innerY}
                            x2={outerX}
                            y2={outerY}
                            stroke="#777"
                            strokeWidth={i % 3 === 0 ? 2 : 1}
                        />
                    );
                })}

                {/* Front Arrow (head) */}
                <line
                    x1={100}
                    y1={100}
                    x2={arrowX}
                    y2={arrowY}
                    stroke="#333"
                    strokeWidth="3"
                    strokeLinecap="round"
                    markerEnd="url(#arrowhead)"
                />

                {/* Back Arrow (tail) */}
                <line
                    x1={100}
                    y1={100}
                    x2={tailX}
                    y2={tailY}
                    stroke="#333"
                    strokeWidth="3"
                    strokeLinecap="round"
                    markerEnd="url(#circleTail)"
                />

                {/* Arrowhead marker */}
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
                    </marker>

                    <marker id="circleTail" markerWidth="6" markerHeight="6" refX="2" refY="3" orient="auto">
                        <circle cx="3" cy="3" r="2" fill="#FFBF00" />
                    </marker>
                </defs>

                {/* Cardinal Labels */}
                {[
                    { label: "N", angle: 0 },
                    { label: "E", angle: 90 },
                    { label: "S", angle: 180 },
                    { label: "W", angle: 270 },
                ].map(({ label, angle }) => {
                    const rad = angle * (Math.PI / 180);
                    const x = 100 + 90 * Math.sin(rad);
                    const y = 100 - 90 * Math.cos(rad);
                    return (
                        <text key={label} x={x} y={y + 5} textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">
                            {label}
                        </text>
                    );
                })}

                {/* Wind speed in the center */}
                <text x="100" y="105" textAnchor="middle" fill="#FFBF00" fontSize="16" fontWeight="bold">
                    {speed.toFixed(1)} km/h
                </text>
            </svg>
        </div>
    );
};

export default CompassCard;
