function Modal(props) {
  return (
    <div className="
      flex justify-center items-center
      overflow-x-hidden overflow-y-auto fixed
      inset-0 z-50 outline-none focus:outline-none
      bg-black bg-opacity-50 filter
      backdrop-blur-sm">
      <div>
        { props.children }
      </div>
    </div>
  );
}

export default Modal;
