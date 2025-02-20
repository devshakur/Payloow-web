import { useState } from 'react';

const PasswordInput = ({ formik }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <label htmlFor="Password" className="text-primary-text text-[14px] font-semibold font-plus-jakarta">
        Password<span className="text-red-700">*</span>
      </label>
      <div className="relative">
        <input
          id="outlined-required-5"
          placeholder="Create Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          autoComplete="current-password"
          {...formik.getFieldProps('password')}
          className="input-field"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223c1.885-2.973 4.617-4.973 8.02-4.973 3.402 0 6.135 2 8.02 4.973a11.982 11.982 0 01-1.855 1.98M12 15c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 14.121a3 3 0 114.242-4.242m0 0a3 3 0 11-4.242 4.242M3 3l18 18"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.58 12.58A2.004 2.004 0 0012 10c-1.105 0-2 .895-2 2s.895 2 2 2c.716 0 1.35-.373 1.732-.954m2.307 2.735a11.964 11.964 0 01-1.732 1.201M12 4c3.402 0 6.135 2 8.02 4.973-1.31 1.625-2.887 2.972-4.605 4.004"
              />
            </svg>
          )}
        </button>
      </div>
      {formik.touched.password && formik.errors.password ? (
        <div style={{ color: 'red', marginTop: '-2vh' }}>{formik.errors.password}</div>
      ) : null}
    </div>
  );
};

export default PasswordInput;
