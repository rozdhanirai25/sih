export function Icon({ children, size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export function CameraIcon(props) {
  return (
    <Icon {...props}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </Icon>
  );
}

export function UploadIcon(props) {
  return (
    <Icon {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </Icon>
  );
}

export function PlayIcon(props) {
  return (
    <Icon {...props}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </Icon>
  );
}

export function SaveIcon(props) {
  return (
    <Icon {...props}>
      <path d="M19 21H5a2 2 0 0 1-2-2V7l4-4h11l3 3v13a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </Icon>
  );
}

export function HomeIcon(props) {
  return (
    <Icon {...props}>
      <path d="M3 9l9-7 9 7" />
      <path d="M9 22V12h6v10" />
    </Icon>
  );
}

export function SparkleIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 2l1.8 4.6L18 8l-4.2 1.4L12 14l-1.8-4.6L6 8l4.2-1.4L12 2z" />
      <path d="M19 11l.9 2.3L22 14l-2.1.7L19 17l-.9-2.3L16 14l2.1-.7L19 11z" />
    </Icon>
  );
}
