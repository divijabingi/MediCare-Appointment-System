import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Welcome to MediCare</h1>
<p>
Book appointments with experienced doctors quickly and easily. Register or login to schedule and manage your appointments.
</p>      <div style={{display: "grid", height: "100%"}}>
        <img style={{maxWidth: "100%", maxHeight: "100vh", margin: "auto"}} src="hospital.jpg" alt=""/>
      </div>
    </div>
  );
}

export default Home;