/**
 * Captures a screenshot from the shader canvas and crops to center 50%
 * Uses requestAnimationFrame to ensure we capture during an active render
 */
export function captureCanvas(): Promise<string | null> {
    return new Promise((resolve) => {
        // Use requestAnimationFrame to capture right after render
        requestAnimationFrame(() => {
            // Find the canvas element within the shader component
            const canvas = document.querySelector('[data-paper-shader] canvas') as HTMLCanvasElement | null

            if (!canvas) {
                console.warn('Canvas not found for capture')
                resolve(null)
                return
            }

            try {
                // Try to get WebGL context to force a read
                const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
                if (gl) {
                    // Force a finish to ensure all rendering is complete
                    gl.finish()
                }

                const { width, height } = canvas

                // Calculate crop dimensions (center 50%)
                const cropWidth = width / 2
                const cropHeight = height / 2
                const startX = width / 4
                const startY = height / 4

                // Create a temporary canvas for cropping
                const tempCanvas = document.createElement('canvas')
                tempCanvas.width = cropWidth
                tempCanvas.height = cropHeight
                const ctx = tempCanvas.getContext('2d')

                if (!ctx) {
                    console.warn('Could not get 2d context for cropping')
                    resolve(null)
                    return
                }

                // Draw the cropped portion
                ctx.drawImage(
                    canvas,
                    startX,
                    startY,
                    cropWidth,
                    cropHeight,
                    0,
                    0,
                    cropWidth,
                    cropHeight
                )

                // Return as data URL
                resolve(tempCanvas.toDataURL('image/png'))
            } catch (error) {
                console.warn('Canvas capture failed:', error)
                resolve(null)
            }
        })
    })
}
