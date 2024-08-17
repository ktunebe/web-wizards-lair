
const Torch = ({flameFlickers}) => {
	
	// Flame styles using flickers
	const flameStyles = {
		backgroundColor: `rgb(234, ${flameFlickers.innerColorG}, 14)`,
		transform: `rotate(${flameFlickers.rotate}deg)`,
		filter: `drop-shadow(5px -5px ${flameFlickers.blur}px rgb(234, ${flameFlickers.outerColorG}, 14))`,
		borderRadius: '80% 0 55% 50% / 55% 0 80% 50%',
		borderColor: `rgb(234, ${flameFlickers.outerColorG}, 14)`,
	}

	return (
      <div className="flex flex-col items-center">
        <div
          className="h-6 sm:h-8 md:h-10 lg:h-12 w-6 sm:w-8 md:w-10 lg:w-12 border-l-2 sm:border-l-4 border-t-[4px] sm:border-t-[5px] lg:border-t-[7px] border-b-2 sm:border-b-4 border-r-[4px] sm:border-r-[5px] lg:border-r-[7px]"
          style={flameStyles}></div>
        <div className="sconce -mt-1 w-1.5 sm:w-2 md:w-2.5 lg:w-3 h-7 sm:h-8 md:h-10 lg:h-11 rounded bg-amber-900"></div>
      </div>
	)
}

export default Torch
