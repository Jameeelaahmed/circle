import CircleCard from '../../components/CircleCard/CircleCard';
function CirclesPagePresentational({ circles, membersByCircle, handleCardClick }) {
    if (!circles.length) {
        return <div className="text-center text-lg text-gray-400 py-10">No circles to show.</div>;
    }
    return (
        <div className='mx-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'>
            {circles.map((circle) => (
                <div key={circle.id} onClick={() => handleCardClick(circle)} style={{ cursor: 'pointer' }}>
                    <CircleCard circle={circle} membersByCircle={membersByCircle} />
                </div>
            ))}
        </div>
    );
}

export default CirclesPagePresentational
