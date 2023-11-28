import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

export default function BackdropComponent({ open, size, sx, thickness, messenger }) {
	const defaultSX = {
		color: '#7CDA24',
		position: 'absolute',
	}

	return (
		<Backdrop
			sx={{
				color: '#fff',
				zIndex: (theme) => theme.zIndex.drawer + 1,
				position: messenger ? 'relative' : 'fixed',
			}}
			width='50%'
			open={open}>
			<CircularProgress
				variant='indeterminate'
				disableShrink
				color='inherit'
				size={size ? size : 40}
				sx={sx ? sx : defaultSX}
				thickness={thickness ? thickness : 15}
			/>
		</Backdrop>
	)
}