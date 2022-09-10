import { Route, Routes, useNavigate } from "react-router-dom";
import { ProductCreate, ProductsPage } from "pages/products";
import { Button } from "components/ui/Button";
import { AlertProvider, ProductProvider } from "./providers";
import { Alert } from "components/ui/Alert/Alert";

const App = () => {
  const navigate = useNavigate();
  const onNavigate = () => {
    navigate("/products");
  };
  return (
    <AlertProvider>
      <ProductProvider>
        <div className="relative">
          <Alert />
          <div className="flex items-center my-10  justify-center">
            <Routes>
              <Route
                path="/"
                element={
                  <Button onClick={onNavigate}>
                    Перейти к старницам товаров
                  </Button>
                }
              />
              <Route path="/products">
                <Route index element={<ProductsPage />} />
                <Route path={"create"} element={<ProductCreate />} />
                <Route path={"edit/:id"} element={<ProductCreate Edit />} />
              </Route>
            </Routes>
          </div>
        </div>
      </ProductProvider>
    </AlertProvider>
  );
};

export default App;
