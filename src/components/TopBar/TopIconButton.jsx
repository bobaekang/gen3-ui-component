import React from 'react';
import PropTypes from 'prop-types';
import './TopIconButton.css';

const TopIconButton = ({
  item, onActiveTab = () => {}, isActive = false, tabIndex,
}) => (
  <div
    className={isActive ? 'top-icon-button top-icon-button--active body' : 'top-icon-button body'}
    onClick={onActiveTab}
    onKeyDown={onActiveTab}
    role='button'
    tabIndex={tabIndex}
  >
    {item.name}
    <i className={item.iconClassName} />
  </div>
);

TopIconButton.propTypes = {
  item: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  onActiveTab: PropTypes.func,
  tabIndex: PropTypes.number.isRequired,
};

TopIconButton.defaultProps = {
  onActiveTab: () => {},
  isActive: false,
};

export default TopIconButton;
