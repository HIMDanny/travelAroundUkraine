import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AlertModal } from '..';
import { clearUserData, setIsModalOpen, setIsLogin } from '../../store/slices/userSlice/userSlice';
import { setCart } from '../../store/slices/cartSlice/cartSlice';

const LogOutModal = () => {
  const { isModalOpen } = useSelector((store) => store.userReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setIsModalOpen(false));
  };

  const logOut = () => {
    localStorage.removeItem('token');
    dispatch(setIsLogin(false));
    closeModal();
    dispatch(setCart([]));
    dispatch(clearUserData());
    navigate('/');
  };

  return (
    <AlertModal
      open={isModalOpen}
      onSubmit={logOut}
      onClose={closeModal}
      title="Confirm your actions"
      submitButtonText="Log Out"
    >
      Are you sure you want to log out of your account?
    </AlertModal>
  );
};

export default LogOutModal;
