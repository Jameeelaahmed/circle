import CircleCard from '../../components/CircleCard/CircleCard';
function CirclesPagePresentational({ circles, membersByCircle, handleCardClick }) {
    return (
        <div className='pt-paddingTop mx-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'>
            {circles.map((circle) => (
                <div key={circle.id} onClick={() => handleCardClick(circle)} style={{ cursor: 'pointer' }}>
                    <CircleCard circle={circle} membersByCircle={membersByCircle} />
                </div>
            ))}
        </div>
    );
}

export default CirclesPagePresentational
