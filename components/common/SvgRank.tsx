import React from 'react'

const SvgLeaderboard = ({...props}) => (
    <svg height={24} viewBox="-16 0 384 384" width={24}>
        <path
            d="M0 384h96V64H0zM32 96h32v256H32zm0 0M256 384h96V128h-96zm32-224h32v192h-32zm0 0M128 384h96V160h-96zm32-192h32v160h-32zm0 0M256 64h96v32h-96zm0 0M128 96h96v32h-96zm0 0M0 0h96v32H0zm0 0"
            fill={props.active ? "#4A90E7" : "#adadad"}
        />
    </svg>
)

export default SvgLeaderboard