import React from 'react';
import Button from '../Button';
import styles from './ToastPlayground.module.css';
import ToastShelf from '../ToastShelf';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState();
  const [toastList, setToastList] = React.useState([]);

  function createToast() {
    const newToast = { id: crypto.randomUUID(), message, variant };
    setToastList([...toastList, newToast]);
    setMessage('');
    setVariant('notice');
  }

  function deleteToast(deleteId) {
    const remainingToast = toastList.filter(({ id }) => id !== deleteId);
    setToastList(remainingToast);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf toasts={toastList} handleDelete={deleteToast} />
      {/* {showToast && (
        <Toast variant={variant} onDismiss={handleDismissToast}>
          {message}
        </Toast>
      )} */}
      <form
        className={styles.controlsWrapper}
        onSubmit={(e) => {
          e.preventDefault();
          createToast();
        }}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              required
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.messageInput}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((type) => {
              return (
                <label htmlFor="variant-notice" key={type}>
                  <input
                    required
                    id={`variant-${type}`}
                    type="radio"
                    name="variant"
                    value={type}
                    checked={variant === type}
                    onChange={(e) => setVariant(e.target.value)}
                  />
                  {type}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
