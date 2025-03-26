
import './App.css'

import { Button } from "@/components/ui/button"
import { CardWithForm } from './components/CardwithForm'

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Click me</Button>
      <CardWithForm/>
    </div>
  )
}

export default App
