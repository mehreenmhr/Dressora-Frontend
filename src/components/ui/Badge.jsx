export default function Badge({ children, variant = 'primary' }) {
  const variantClass = {
    primary: 'badge',
    success: 'badge--success',
    warning: 'badge--warning',
    error: 'badge--error',
    info: 'badge--info',
  }[variant] || 'badge';

  return <span className={variantClass}>{children}</span>;
}
