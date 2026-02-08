import React from 'react';
import '../../css/loader.css';
import ReactDOM from 'react-dom';
import { Transition } from '@headlessui/react';

const Loading = ({ show }) => {
  const loadingRoot = document.getElementById('loading');

  if (!loadingRoot) return null;

  return ReactDOM.createPortal(
    <Transition
      show={show}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="w-full h-screen bg-white/20 fixed inset-0 z-100 flex justify-center items-center backdrop-blur-[1px] pointer-events-auto">
        <div className="custom-loader"></div>
      </div>
    </Transition>,
    loadingRoot
  );
  // <div className="absolute w-full h-full bg-red-400">
  //     <div class="custom-loader"></div>
  // </div>
};

export default Loading;
