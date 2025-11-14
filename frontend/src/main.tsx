import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Toaster } from "sonner";
import App from "./App.tsx";
import BackToTop from "./components/common/backToTop.tsx";
import { ThemeProvider } from "./context/themeContext.tsx";
import "./index.css";
import store from "./rtk/store/store.ts";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toaster position="top-right" expand={true} richColors closeButton />
    <Provider store={store}>
      <ThemeProvider>
        <App />
        <BackToTop />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
