import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "@fontsource/poppins/600.css"; 
import PropTypes from "prop-types";

const Task = ({ token }) => {
  const isRun = useRef(false);
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 

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

        const res = await axios.get("/task", config); 
        setData(res.data); 
        console.log(res.data); 
      } catch (err) {
        setError("Failed to fetch tasks");
        console.error(err); 
      } finally {
        setLoading(false);
      }
    };

    fetchData(); 
  }, [token]); 

  if (loading) return <div style={styles.loadingText}>Loading...</div>;
  if (error) return <div style={styles.errorText}>{error}</div>;

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Page</h2>
        <p style={styles.description}>Welcome to the admin dashboard!</p>

        {data ? (
          <div>
            <h3>User Tasks:</h3>
            <ul style={styles.dataText}>
              {data.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No tasks available</div>
        )}
      </div>
    </div>
  );
};


Task.propTypes = {
  token: PropTypes.string.isRequired,
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#3A6D8C',
    margin: 0,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "600",
  },
  card: {
    backgroundColor: '#6A9AB0',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '80%',
    maxWidth: '500px',
  },
  title: {
    fontSize: '2em',
    color: '#ffffff',
    marginBottom: '15px',
  },
  description: {
    fontSize: '1.2em',
    color: '#ffffff',
  },
  loadingText: {
    textAlign: 'center',
    color: 'white',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
  dataText: {
    textAlign: 'left',
    color: '#ffffff',
    backgroundColor: '#333',
    padding: '15px',
    borderRadius: '8px',
    fontSize: '1em',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
};

export default Task;
