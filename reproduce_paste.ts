
import { parseReactComponent } from './src/lib/code-parser.ts'

const code = `<Heatmap 
  colorBack="#000" 
  intensity={0.5} 
  colors={["#ff0000", "#00ff00"]}
/>`

const result = parseReactComponent(code)
console.log('Parsed Result:', JSON.stringify(result, null, 2))

const componentName = result.componentName
const componentToShaderKey = (c: string) => {
    // Mimic CodeExport logic
    return c.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

if (componentName) {
    console.log('Mapped Key:', componentToShaderKey(componentName))
} else {
    console.log('Component Name not found')
}
