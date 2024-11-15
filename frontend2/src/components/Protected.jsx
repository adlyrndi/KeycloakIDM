import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import '@fontsource/poppins';
import "@fontsource/poppins/400.css"; 
import "@fontsource/poppins/600.css"; 
import "@fontsource/poppins/700.css"; 
import Admin from "./Admin";
import Manager from "./Manager";

const Protected = ({ token }) => {
  const isRun = useRef(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [navActive, setNavActive] = useState(false);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("auth_token"); 
      sessionStorage.removeItem("auth_token"); 

      const keycloakLogoutUrl = `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${import.meta.env.VITE_KEYCLOAK_REALM}/protocol/openid-connect/logout?redirect_uri=${window.location.origin}`;
      window.location.href = keycloakLogoutUrl;
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get("/documents", config);
        setData(res.data);
        console.log(res.data);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>{error}</div>;

  const isAdmin = data?.realm_access?.roles.includes("ADMIN");
  const isManager = data?.realm_access?.roles.includes("USER");
  const isUser = data?.realm_access?.roles.includes("USER");

  return (
    <>
      {/* Navbar Section */}
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.logo}>TELIN</div>
          <nav style={{ display: 'flex'}}>
          {isUser && (
            <li>
              <a href="http://localhost:8080/realms/test_realm/account/ " style={styles.navLink}>Edit User</a>
            </li>
          )}
            <ul style={{ ...styles.navLinks, display: navActive ? 'block' : 'flex' }}>
              <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
            </ul>
            <div style={styles.burger} onClick={() => setNavActive(!navActive)}>
              <div style={styles.line}></div>
              <div style={styles.line}></div>
              <div style={styles.line}></div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content Section */}
      {isAdmin ? (
        <Admin />
      ): isManager ?(
        <Manager/>
      ): data ? (
        <div style={styles.containerMain}>
          <div style={styles.card}>
            <h2 style={styles.headerMain}>User Information</h2>
            <div style={styles.row}>
              <div style={styles.label}><b>Name:</b></div>
              <div style={styles.value}>{data.name}</div>
            </div>
            <div style={styles.row}>
              <div style={styles.label}><b>Email:</b></div>
              <div style={styles.value}>{data.email}</div>
            </div>
            <div style={styles.row}>
              <div style={styles.label}><b>Roles:</b></div>
              <div style={styles.value}>{data.realm_access.roles.join(", ")}</div>
            </div>
            <div style={styles.row}>
              <div style={styles.label}><b>Scope:</b></div>
              <div style={styles.value}>{data.scope}</div>
            </div>
          </div>
          {/* <Card/> */}
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>Logged in but data cant be displayed!</div>
      )}
    </>
  );
};

// PropTypes validation
Protected.propTypes = {
  token: PropTypes.string.isRequired,
};


const styles = {
  
  logoutButton: {
    backgroundColor: "#FF4B4B",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "600",
    marginLeft: "20px",
    transition: "background-color 0.3s ease-in-out",
  },
  
  header: {
    backgroundColor: "#133E87",
    padding: "10px 0",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "600", 
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.5em",
    color: "#FF4B4B",
  },
  navLinks: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    transition: "all 0.3s ease-in-out",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    padding: "10px 15px",
    display: "inline-block",
    marginLeft: "20px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  burger: {
    display: "none",
    cursor: "pointer",
  },
  line: {
    width: "25px",
    height: "3px",
    backgroundColor: "#fff",
    margin: "5px",
  },
  containerMain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh", 
    width: "100%",
    height:"100%",
    margin: 0, 
    padding: 0,
    backgroundColor: "#3A6D8C",
    fontFamily: "'Poppins', sans-serif",
    boxSizing: "border-box", 
    overflow: "hidden", 
  },
  card: {
    backgroundColor: "#6A9AB0",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    padding: "30px",
    width: "400px",
    maxWidth: "90%",
    color: "#ffffff",
  },
  headerMain: {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "600",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  },
  label: {
    fontWeight: "bold",
    color: "#F5F5F7",
  },
  value: {
    textAlign: "right",
    color: "#ffffff",
  },
  '@media screen and (max-width: 768px)': {
    burger: {
      display: "block",
    },
    navLinks: {
      display: "none",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#333",
      position: "absolute",
      top: "60px",
      width: "100%",
      left: 0,
    },
    navLinksActive: {
      display: "block",
    },
  },
};


// PropTypes validation
Protected.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Protected;
