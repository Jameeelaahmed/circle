import CircleCard from '../../components/CircleCard/CircleCard';
function CirclesPagePresentational({ circles, handleCardClick }) {
    return (
        <div className='pt-paddingTop mx-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'>
            {circles.map((circle) => (
                <div key={circle.circleId} onClick={() => handleCardClick(circle)} style={{ cursor: 'pointer' }}>
                    <CircleCard circle={circle} />
                </div>
            ))}
        </div>
    );
}

export default CirclesPagePresentational
