import { useLocation, Navigate, Outlet } from "react-router-dom"
import { connect } from "react-redux";

const RequireAuth = ({ isAuthenticated }) => {
    const location = useLocation();

    return (
        isAuthenticated
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(RequireAuth);
