import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center bg-light">
      <title>Planify - Sign Up</title>
      <div className="row w-100 justify-content-center align-items-center">
        
        {/* Left: Login Form Card */}
        <div className="col-lg-5 p-5">
          <div className="card shadow-lg rounded-4 p-4">
            <div className="d-flex align-items-center justify-content-center gap-1 mb-2">
              <img src="logo planify new.png" width="50" alt="Planify Logo" />
              <h5 className="fw-bold mb-0">Planify</h5>
            </div>
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-2">Create Account</h2>
              <p className="mb-0">Already have an account?<a href="/login"> Sign in</a></p>
            </div>
            <form>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Email" required />
              </div>
              <div className="mb-3 position-relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-control" 
                  placeholder="Password" 
                  required 
                />
                <span 
                  className="position-absolute top-50 end-0 translate-middle-y me-3" 
                  onClick={togglePassword} 
                  style={{ cursor: 'pointer' }}
                >
                  <img 
                    id="eyeIcon" 
                    src="https://img.icons8.com/ios-glyphs/24/visible--v1.png" 
                    alt="Show Password" 
                  />
                </span>
              </div>
              <div className="mb-3 position-relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-control" 
                  placeholder="Password" 
                  required 
                />
                <span 
                  className="position-absolute top-50 end-0 translate-middle-y me-3" 
                  onClick={togglePassword} 
                  style={{ cursor: 'pointer' }}
                >
                  <img 
                    id="eyeIcon" 
                    src="https://img.icons8.com/ios-glyphs/24/visible--v1.png" 
                    alt="Show Password" 
                  />
                </span>
              </div>
              <div className="d-flex justify-content-center mb-3">
                <button type="submit" className="btn btn-primary fw-semibold w-100">
                  Create Account
                </button>
              </div>
            </form>
            <div className="d-flex align-items-center my-4">
              <hr className="flex-grow-1 border-1 border-muted" />
              <span className="mx-3 text-muted">Or continue with</span>
              <hr className="flex-grow-1 border-1 border-muted" />
            </div>
            <div className="text-center">
              <button className="btn btn-outline-light border shadow-sm rounded-circle">
                <img src="google.png" width="30" alt="Google" />
              </button>
            </div>
            <p className="text-muted mt-4 text-center small">
              By signing up, you agree to our <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>.
            </p>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
          <img src="gmb.png" alt="Illustration" className="img-fluid illustration-img" />
        </div>

      </div>
    </div>
  );
};

export default CreateAccount;
