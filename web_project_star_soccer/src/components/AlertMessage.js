function AlertMessage({ alertMessage }) {
  const className = `alert__message alert__message_${alertMessage.type}`;
  return (
    <div className={className}>
      <p className="alert__message_text">{alertMessage.message}</p>
    </div>
  );
}

export default AlertMessage;
