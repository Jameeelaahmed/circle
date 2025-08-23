
import Skeleton from "@mui/material/Skeleton";
import Box from '@mui/material/Box';
function CirclesSkeltonCard() {
    return (
        <div className='mx-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'>
            {[...Array(6)].map((_, idx) => (
                <Box
                    key={idx}
                    sx={{
                        width: '100%',
                        bgcolor: "var(--color-inputsBg)",
                        borderRadius: 2,
                        boxShadow: "var(--main-shadow)",
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 180,
                    }}
                >
                    {/* Avatar Skeleton */}
                    <Skeleton
                        sx={{ bgcolor: "var(--color-inputsBg)" }}
                        animation="wave"
                        variant="circular"
                        width={40}
                        height={40}
                    />                        {/* Title Skeleton */}
                    <Skeleton variant="text" width="70%" height={28} />
                    {/* Subtitle Skeleton */}
                    <Skeleton variant="text" width="50%" height={20} />
                    {/* Description Skeleton */}
                    <Skeleton variant="rectangular" width="100%" height={32} sx={{ borderRadius: 1 }} />
                </Box>
            ))}
        </div>
    )
}

export default CirclesSkeltonCard;