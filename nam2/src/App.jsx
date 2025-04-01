
import "./App.css";
import Page from "./pages/page";
import { ThemeProvider } from "@/components/Theme/theme-provider"

function App() {

  return (
    <>
      {/* <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Click me</Button>      
      <CardWithForm />
      </div> */}
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Page />
      </ThemeProvider>
      </>
  );
}

export default App;
