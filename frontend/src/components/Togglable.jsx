import PropTypes from 'prop-types';
import { /*forwardRef, useImperativeHandle,*/ useState } from 'react';

// forwardRef
// Let other component request useRef from outside of component
const Togglable = /*forwardRef(*/ (props /*, ref*/) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // Returns toggleVisibility function,
  // use blogFormRef.current.toggleVisibility()
  // to close children component.
  /*useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });*/

  if (!visible) {
    return (
      <div>
        <button className="btn-normal" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="togglableContent">
        {props.children}
        <button className="btn-normal" onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  );
};
//);

// Resolves eslint error: Component definition is missing display name
Togglable.displayName = 'Togglable';

// Defines required string type property
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
