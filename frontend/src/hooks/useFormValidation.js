import { useState } from 'react';

/**
 * Session 19: Manages form values, validation errors, and touched state.
 *
 * Usage:
 *   const { values, errors, touched, handleChange, handleBlur, validate } =
 *     useFormValidation({ username: '', password: '' }, rules);
 *
 * rules is an object mapping field names to validator functions (value) => errorString | null
 */
function useFormValidation(initialValues, rules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setValues(prev => ({ ...prev, [field]: value }));
    if (touched[field] && rules[field]) {
      const error = rules[field](value);
      setErrors(prev => ({ ...prev, [field]: error || '' }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (rules[field]) {
      const error = rules[field](values[field]);
      setErrors(prev => ({ ...prev, [field]: error || '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(rules).forEach(field => {
      const error = rules[field](values[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, touched, handleChange, handleBlur, validate, setValues };
}

export default useFormValidation;
