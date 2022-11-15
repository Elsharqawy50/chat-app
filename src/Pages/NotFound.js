import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NotFoundIcon from "../components/Icons/NotFoundIcon";

export const Error404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <main className="bg-white not_found d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6 align-self-center">
              <NotFoundIcon />
            </div>

            <div className="col-md-6 align-self-center error404">
              <h1>404</h1>
              <h2>UH OH! You're lost.</h2>
              <p>
                The page you are looking for does not exist. How you got here is
                a mystery. But you can click the button below to go back to the
                homepage.
              </p>
              <Button onClick={() => navigate("/")} className="btn btn-danger">
                HOME
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Error404;
