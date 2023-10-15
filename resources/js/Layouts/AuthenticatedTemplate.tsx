
import { PrivatePage } from '@/Components/PrivatePage';
import { Sidebar } from '@/Parts/Sidebar';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export const AuthenticatedTemplate = PrivatePage(() => {
	return (
		<Box>
			<Sidebar />

			<Box
				float='right'
				minHeight='100vh'
				height='100%'
				overflow='auto'
				position='relative'
				maxHeight='100%'
				// w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
				// maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
				w='100%'
				ps={{ base: 0, xl: '300px' }}
				transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
				transitionDuration='.2s, .2s, .35s'
				transitionProperty='top, bottom, width'
				transitionTimingFunction='linear, linear, ease'>

				{/* <Portal>
					<Box>
						<Navbar
							onOpen={onOpen}
							title={getActiveRoute(routes)}
							secondary={getActiveNavbar(routes)}
							fixed={false}
							{...props}
						/>
					</Box>
				</Portal> */}

				<Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>
					<Outlet />
				</Box>

				<Box>
					{/* <Footer /> */}
				</Box>
			</Box>
		</Box>
	);
});
