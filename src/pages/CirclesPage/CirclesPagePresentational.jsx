import CircleCard from '../../components/CircleCard/CircleCard'
function CirclesPagePresentational({ circles }) {
    return (
        <div className='pt-paddingTop mx-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'>
            {circles.map((circle) => (
                <CircleCard key={circle.circleId} circle={circle} />
            ))}
        </div>
    )
}

export default CirclesPagePresentational
