export function Mark() {
  return <svg viewBox="0 0 39 30" fill="currentColor" aria-hidden="true"><path d="M0 21 14 0h8L8 21zM7 29 26 0h8L15 29zM20 29l9-14h8l-9 14z" /></svg>;
}

export function Arrow({ direction = 'up-right', size = 18 }) {
  const paths = {
    'up-right': 'M5 19 19 5M5 5h14v14',
    down: 'M12 3v17m-7-7 7 7 7-7',
    right: 'M3 12h17m-7-7 7 7-7 7',
    up: 'M12 21V4m-7 7 7-7 7 7',
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[direction]} /></svg>;
}
