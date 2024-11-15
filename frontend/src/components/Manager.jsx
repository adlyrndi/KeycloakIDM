
import "@fontsource/poppins/600.css"; 

const Manager = () => {
  

  return (
    <>
      <div style={styles.pageContainer}>
        <div style={styles.card}>
          <h2 style={styles.title}>Manager Page</h2>
          <p style={styles.description}>Welcome to the Manager dashboard!</p>
        </div>
      </div>
    </>
  );
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
    fontWeight: '600',
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
};


if (window.innerWidth <= 768) {
  styles.burger.display = 'flex';
  styles.navLinks.display = 'none';
}

export default Manager;
