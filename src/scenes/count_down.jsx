import styles from './count_down.module.css'
import React, { useEffect, useState } from 'react'


export function CountDown ({ onCountOvered }){
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count === 0) {
      onCountOvered()
    }
  }, [count, onCountOvered])

  useEffect(() => {
    let timerID

    function step() {
      setCount((current) => current - 1)
      timerID = window.setTimeout(step, 1000)
    }

    timerID = window.setTimeout(step, 1000)

    return () => {
      clearTimeout(timerID)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onCountOvered])

  if (count === 0) {
    return null
  }

  return (
    <dev className={styles.container} >
      <h1 className={styles.count} >
        {count}
      </h1>
    </dev>
  );
};




