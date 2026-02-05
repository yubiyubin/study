import { Header } from "../components/header";
import "./Page404.css";

export const Page404 = ({ cart }) => {
  return (
    <>
      <title>404</title>
      <Header cart={cart} />
      <div className="error-message">404: Page Not FOUND</div>
    </>
  );
};
